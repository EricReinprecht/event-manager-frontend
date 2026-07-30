import type { PartyLocation } from '@user/types/party.types';
import { useRef, useEffect, useState } from 'react';
interface Props {
    value?: PartyLocation;

    onChange(value: PartyLocation): void;

    disabled?: boolean;
}

interface Suggestion {
    placePrediction: google.maps.places.PlacePrediction;
}

export default function LocationPicker({ value, onChange, disabled = false }: Props) {
    const [search, setSearch] = useState('');

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const [error, setError] = useState('');

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
        if (!search || disabled) {
            setSuggestions([]);
            return;
        }

        let cancelled = false;

        async function loadSuggestions() {
            try {
                const response =
                    await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
                        input: search,

                        includedPrimaryTypes: ['street_address', 'premise'],
                    });

                if (cancelled) {
                    return;
                }

                setSuggestions(response.suggestions as Suggestion[]);
            } catch {
                setSuggestions([]);
            }
        }

        loadSuggestions();

        return () => {
            cancelled = true;
        };
    }, [search, disabled]);

    async function selectSuggestion(suggestion: Suggestion) {
        setError('');

        const place = suggestion.placePrediction.toPlace();

        await place.fetchFields({
            fields: ['formattedAddress', 'location', 'addressComponents'],
        });

        const location = place.location;

        if (!location) {
            setError('Could not determine location.');

            return;
        }

        const components = place.addressComponents ?? [];

        function getComponent(type: string) {
            return components.find((component) => component.types.includes(type));
        }

        const metadata: PartyLocation = {
            street: getComponent('route')?.longText ?? '',

            houseNumber: getComponent('street_number')?.longText ?? '',

            city:
                getComponent('locality')?.longText ??
                getComponent('administrative_area_level_2')?.longText ??
                '',

            country: getComponent('country')?.longText ?? '',

            postalCode: getComponent('postal_code')?.longText ?? '',

            latitude: location.lat(),

            longitude: location.lng(),

            timezone: 'Europe/Vienna',
        };

        if (!isCompleteAddress(metadata)) {
            setError(
                'Please select a complete address including street, house number, city and postal code.',
            );

            setSuggestions([]);

            return;
        }

        onChange(metadata);

        setSearch('');

        setSuggestions([]);
    }

    return (
        <div className="location-picker">
            <div className="location-picker__search">
                <input
                    ref={inputRef}
                    value={search}
                    placeholder="Search full address"
                    disabled={disabled}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {suggestions.length > 0 && (
                    <div className="location-picker__dropdown">
                        {suggestions.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                disabled={disabled}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => selectSuggestion(item)}
                            >
                                {item.placePrediction.text.toString()}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {error && <p className="form-error">{error}</p>}

            {value && (
                <div className="location-picker__metadata">
                    <input value={value.street ?? ''} placeholder="Street" disabled />

                    <input value={value.houseNumber ?? ''} placeholder="House number" disabled />

                    <input value={value.city ?? ''} placeholder="City" disabled />

                    <input value={value.country ?? ''} placeholder="Country" disabled />

                    <input value={value.postalCode ?? ''} placeholder="Postal code" disabled />

                    <input value={value.latitude ?? ''} placeholder="Latitude" disabled />

                    <input value={value.longitude ?? ''} placeholder="Longitude" disabled />

                    <input value={value.timezone ?? ''} placeholder="Timezone" disabled />
                </div>
            )}

            <div className="location-picker__map">{/* Google map later */}</div>
        </div>
    );
}
