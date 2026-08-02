import type { FormSectionConfig } from '@components/forms/entity/types';
import buildDateTime from '@/helper/build-datetime';
import { format } from 'date-fns';

function oneMinuteAfter(time?: string): string | undefined {
    if (!time) return undefined;

    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + 1;

    if (totalMinutes >= 24 * 60) return '23:59';

    return `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(
        totalMinutes % 60,
    ).padStart(2, '0')}`;
}

export default function createScheduleSection(t: any): FormSectionConfig {
    return {
        id: 'schedule',

        title: t('party.create.sections.schedule'),

        collapsible: true,

        defaultOpen: true,

        clearable: true,

        validate(values) {
            if (!values.startDate || !values.startTime || !values.endDate || !values.endTime) {
                return null;
            }

            if (!values.location?.timezone) return null;
            const start = new Date(
                buildDateTime(values.startDate, values.startTime, values.location.timezone),
            );
            const end = new Date(
                buildDateTime(values.endDate, values.endTime, values.location.timezone),
            );

            if (start >= end) {
                return t('party.validation.endAfterStart');
            }

            return null;
        },

        rows: [
            [
                {
                    name: 'startDate',
                    label: t('party.fields.startDate'),
                    type: 'date',

                    validation: {
                        required: true,
                    },

                    minDate: () => format(new Date(), 'yyyy-MM-dd'),

                    maxDate: (values) => values.endDate,
                },

                {
                    name: 'startTime',
                    label: t('party.fields.startTime'),
                    type: 'time',

                    validation: {
                        required: true,
                    },

                    disabledWhen: (values) => !values.startDate,
                },
            ],

            [
                {
                    name: 'endDate',
                    label: t('party.fields.endDate'),
                    type: 'date',

                    validation: {
                        required: true,
                    },

                    minDate: (values) => values.startDate,

                    disabledWhen: (values) => !values.startDate,
                },

                {
                    name: 'endTime',
                    label: t('party.fields.endTime'),
                    type: 'time',

                    validation: {
                        required: true,
                    },

                    minTime: (values) =>
                        values.endDate === values.startDate
                            ? oneMinuteAfter(values.startTime)
                            : undefined,

                    disabledWhen: (values) => !values.endDate,
                },
            ],
        ],
    };
}
