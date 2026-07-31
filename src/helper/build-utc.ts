import { fromZonedTime } from 'date-fns-tz';

export default function buildUTC(date: string, time: string, timezone: string) {
    return fromZonedTime(`${date}T${time}:00`, timezone).toISOString();
}
