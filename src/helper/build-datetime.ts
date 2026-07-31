import { fromZonedTime } from 'date-fns-tz';

export default function buildDateTime(date: string, time: string, timezone: string) {
    const dateOnly = date.split('T')[0];

    return fromZonedTime(`${dateOnly}T${time}:00`, timezone).toISOString();
}
