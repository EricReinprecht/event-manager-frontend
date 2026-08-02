import type { PartyLocation } from '@user/types/party.types';

import { Map, Marker, useMap } from '@vis.gl/react-google-maps';

import { useEffect, useRef, useState } from 'react';

interface Props {
    value?: PartyLocation;

    onChange(value: PartyLocation): void;

    disabled?: boolean;

    error?: string;
}

interface Suggestion {
    placePrediction: google.maps.places.PlacePrediction;
}

async function resolveTimezone(latitude: number, longitude: number) {
    const fallback = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    try {
        const params = new URLSearchParams({
            location: `${latitude},${longitude}`,
            timestamp: Math.floor(Date.now() / 1000).toString(),
            key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        });
        const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?${params}`);
        const data = (await response.json()) as { status?: string; timeZoneId?: string };
        return data.status === 'OK' && data.timeZoneId ? data.timeZoneId : fallback;
    } catch {
        return fallback;
    }
}

export default function LocationPicker({
    value,
    onChange,
    disabled = false,
    error: validationError,
}: Props) {
    const [search, setSearch] = useState('');

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const [warning, setWarning] = useState('');

    const [error, setError] = useState('');

    const [position, setPosition] = useState<{
        lat: number;
        lng: number;
    } | null>(
        value?.latitude && value.longitude
            ? {
                  lat: value.latitude,
                  lng: value.longitude,
              }
            : null,
    );

    const selectingRef = useRef(false);

    const inputRef = useRef<HTMLInputElement>(null);

    function isCompleteAddress(location: PartyLocation) {
        return (
            !!location.street &&
            !!location.houseNumber &&
            !!location.city &&
            !!location.country &&
            !!location.postalCode
        );
    }

    useEffect(() => {
        if (!search || disabled || selectingRef.current) {
            setSuggestions([]);
            return;
        }

        let cancelled = false;

        async function loadSuggestions() {
            const response =
                await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
                    input: search,
                });

            if (cancelled || selectingRef.current) {
                return;
            }

            setSuggestions(response.suggestions as Suggestion[]);
        }

        loadSuggestions();

        return () => {
            cancelled = true;
        };
    }, [search, disabled]);

    async function selectSuggestion(suggestion: Suggestion) {
        selectingRef.current = true;

        setSuggestions([]);

        const place = suggestion.placePrediction.toPlace();

        await place.fetchFields({
            fields: ['formattedAddress', 'location', 'addressComponents'],
        });

        const location = place.location;

        if (!location) {
            selectingRef.current = false;
            return;
        }

        const components = place.addressComponents ?? [];

        function getPlaceComponent(...types: string[]) {
            return components.find((component) =>
                types.some((type) => component.types.includes(type)),
            );
        }

        const timezone = await resolveTimezone(location.lat(), location.lng());
        const metadata: PartyLocation = {
            street: getPlaceComponent('route')?.longText ?? '',

            houseNumber:
                getPlaceComponent('street_number', 'premise', 'subpremise')?.longText ?? '',

            city:
                getPlaceComponent('locality', 'postal_town', 'administrative_area_level_2')
                    ?.longText ?? '',

            country: getPlaceComponent('country')?.longText ?? '',

            postalCode: getPlaceComponent('postal_code')?.longText ?? '',

            latitude: location.lat(),

            longitude: location.lng(),

            timezone,

            source: 'autocomplete',
        };

        if (!isCompleteAddress(metadata)) {
            setError(
                'Please select a complete address including street, house number, city and postal code.',
            );

            selectingRef.current = false;

            return;
        }

        const newPosition = {
            lat: location.lat(),
            lng: location.lng(),
        };

        setError('');

        setWarning('');

        setPosition(newPosition);

        setSearch(place.formattedAddress ?? '');

        onChange(metadata);

        inputRef.current?.blur();

        setTimeout(() => {
            selectingRef.current = false;
        }, 300);
    }

    async function reverseGeocode(lat: number, lng: number) {
        const geocoder = new google.maps.Geocoder();

        const response = await geocoder.geocode({
            location: {
                lat,
                lng,
            },
        });

        const result = response.results[0];

        if (!result) {
            setError('Could not find address.');

            return;
        }

        const components = result.address_components;

        function getGeocoderComponent(...types: string[]) {
            return components.find((component) =>
                types.some((type) => component.types.includes(type)),
            );
        }

        const timezone = await resolveTimezone(lat, lng);
        const metadata: PartyLocation = {
            street: getGeocoderComponent('route')?.long_name ?? '',

            houseNumber:
                getGeocoderComponent('street_number', 'premise', 'subpremise')?.long_name ?? '',

            city:
                getGeocoderComponent('locality', 'postal_town', 'administrative_area_level_2')
                    ?.long_name ?? '',

            country: getGeocoderComponent('country')?.long_name ?? '',

            postalCode: getGeocoderComponent('postal_code')?.long_name ?? '',

            latitude: lat,

            longitude: lng,

            timezone,

            source: 'map',
        };

        if (!metadata.country || !metadata.city) {
            setError('Please select a location closer to an address.');

            setWarning('');

            return;
        }

        if (!isCompleteAddress(metadata)) {
            setWarning(
                'No street address found. This location will be saved using coordinates only.',
            );
        } else {
            setWarning('');
        }

        setError('');

        setPosition({
            lat,
            lng,
        });

        onChange(metadata);
    }

    function MapClickHandler() {
        const map = useMap();

        useEffect(() => {
            if (!map || disabled) {
                return;
            }

            const listener = map.addListener('click', (event: google.maps.MapMouseEvent) => {
                if (!event.latLng) {
                    return;
                }

                reverseGeocode(event.latLng.lat(), event.latLng.lng());
            });

            return () => listener.remove();
        }, [map, disabled]);

        return null;
    }

    return (
        <div className="location-picker">
            {!disabled && (
                <div className="location-picker__search">
                    <label>Search Address</label>
                    <input
                        ref={inputRef}
                        value={search}
                        placeholder="Search full address"
                        className={`${validationError ? 'has-error' : ''}`}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setError('');
                            setWarning('');
                        }}
                    />

                    {suggestions.length > 0 && (
                        <div className="location-picker__dropdown">
                            {suggestions.map((item, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => selectSuggestion(item)}
                                >
                                    {item.placePrediction.text.toString()}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {error && <p className="form-error">{error}</p>}

            {warning && <p className="location-picker__warning">⚠ {warning}</p>}

            <div className="location-picker__metadata">
                <h4>Address details</h4>

                <div className="location-picker__row">
                    <div className="location-picker__field">
                        <label>Street</label>
                        <input value={value?.street ?? ''} disabled />
                    </div>

                    <div className="location-picker__field">
                        <label>House No.</label>
                        <input value={value?.houseNumber ?? ''} disabled />
                    </div>
                </div>

                <div className="location-picker__row">
                    <div className="location-picker__field">
                        <label>City</label>
                        <input value={value?.city ?? ''} disabled />
                    </div>

                    <div className="location-picker__field">
                        <label>Postal code</label>
                        <input value={value?.postalCode ?? ''} disabled />
                    </div>
                </div>

                <div className="location-picker__row">
                    <div className="location-picker__field">
                        <label>Country</label>
                        <input value={value?.country ?? ''} disabled />
                    </div>

                    <div className="location-picker__field">
                        <label>Timezone</label>
                        <input value={value?.timezone ?? ''} disabled />
                    </div>
                </div>

                <div className="location-picker__row">
                    <div className="location-picker__field">
                        <label>Latitude</label>
                        <input value={value?.latitude ?? ''} disabled />
                    </div>

                    <div className="location-picker__field">
                        <label>Longitude</label>
                        <input value={value?.longitude ?? ''} disabled />
                    </div>
                </div>
            </div>

            <div className={`location-picker__map ${validationError ? 'has-error' : ''}`}>
                <Map
                    defaultZoom={16}
                    defaultCenter={{
                        lat: 47.414,
                        lng: 9.741,
                    }}
                    gestureHandling="cooperative"
                    disableDefaultUI
                >
                    <MapController position={position} />

                    <MapClickHandler />

                    {position && <Marker position={position} />}
                </Map>
            </div>

            {validationError && <p className="form-error">{validationError}</p>}
        </div>
    );
}

function MapController({
    position,
}: {
    position: {
        lat: number;
        lng: number;
    } | null;
}) {
    const map = useMap();

    useEffect(() => {
        if (!map || !position) {
            return;
        }

        map.panTo(position);
    }, [map, position]);

    return null;
}
