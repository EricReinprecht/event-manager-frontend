import { useState } from 'react';

interface Props {
    value?: {
        locationName: string;
        latitude: number | null;
        longitude: number | null;
        timezone: string;
    };

    onChange(value: any): void;
}

export default function LocationPicker({ value, onChange }: Props) {
    const [search, setSearch] = useState(value?.locationName ?? '');

    function selectLocation() {
        // temporary example
        // later replaced with Google Places result

        onChange({
            locationName: search,
            latitude: 47.414,
            longitude: 9.741,
            timezone: 'Europe/Vienna',
        });
    }

    return (
        <div className="location-picker">
            <input
                value={search}
                placeholder="Search location"
                onChange={(e) => setSearch(e.target.value)}
            />

            <button type="button" onClick={selectLocation}>
                Select
            </button>

            {value?.latitude && (
                <small>
                    {value.latitude}, {value.longitude}
                    <br />
                    {value.timezone}
                </small>
            )}
        </div>
    );
}
