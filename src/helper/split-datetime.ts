import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export default function splitDateTime(value: string, timezone: string) {
    const zonedDate = toZonedTime(value, timezone);

    return {
        date: format(zonedDate, 'yyyy-MM-dd'),
        time: format(zonedDate, 'HH:mm'),
    };
}
