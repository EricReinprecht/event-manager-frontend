import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export default function utcToLocalDateTime(utc: string, timezone: string) {
    const zoned = toZonedTime(utc, timezone);

    return format(zoned, "yyyy-MM-dd'T'HH:mm");
}
