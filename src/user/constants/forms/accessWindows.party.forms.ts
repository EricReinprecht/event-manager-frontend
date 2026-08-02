import type { FormFieldConfig } from '@components/forms/entity/types';
import buildDateTime from '@/helper/build-datetime';

export default function createTicketCategoryAccessWindows(t: any): FormFieldConfig {
    return {
        name: 'accessWindows',

        label: t('party.ticketCategory.accessWindows'),

        type: 'repeater',

        clearable: true,

        addLabel: t('party.ticketCategory.accessWindow.add'),

        removeLabel: t('party.ticketCategory.accessWindow.remove'),

        itemLabel: t('party.ticketCategory.accessWindow.item'),

        titleFormatter: (item: any) => {
            if (!item.startDate || !item.startTime || !item.endDate || !item.endTime) {
                return t('party.ticketCategory.accessWindow.title');
            }

            return `${item.startDate} ${item.startTime} - ${item.endDate} ${item.endTime}`;
        },

        validate(item, values) {
            if (!item.startDate || !item.startTime || !item.endDate || !item.endTime) {
                return {};
            }

            const timezone = values?.location?.timezone;
            if (!timezone) return {};
            const start = new Date(buildDateTime(item.startDate, item.startTime, timezone));
            const end = new Date(buildDateTime(item.endDate, item.endTime, timezone));

            if (start >= end) {
                return {
                    endDate: t('party.validation.endAfterStart'),
                };
            }

            if (values?.startDate && values?.startTime && values?.endDate && values?.endTime) {
                const partyStart = new Date(
                    buildDateTime(values.startDate, values.startTime, timezone),
                );
                const partyEnd = new Date(buildDateTime(values.endDate, values.endTime, timezone));
                if (start < partyStart || end > partyEnd) {
                    return { endDate: t('party.validation.accessWindowInsideSchedule') };
                }
            }

            return {};
        },

        rows: [
            [
                {
                    name: 'startDate',
                    label: t('party.ticketCategory.accessWindow.startDate'),
                    type: 'date',

                    validation: {
                        required: true,
                    },

                    minDate: (values) => values.startDate,

                    maxDate: (values, item) => {
                        if (!item?.endDate) return values.endDate;
                        return item.endDate < values.endDate ? item.endDate : values.endDate;
                    },

                    clearFieldsOnEmpty: ['startTime'],
                },

                {
                    name: 'startTime',
                    label: t('party.ticketCategory.accessWindow.startTime'),
                    type: 'time',

                    validation: {
                        required: true,
                    },

                    minTime: (values, item) =>
                        item?.startDate === values.startDate ? values.startTime : undefined,

                    maxTime: (values, item) =>
                        item?.startDate === values.endDate ? values.endTime : undefined,

                    disabledWhen: (_values, item) => !item?.startDate,
                },
            ],

            [
                {
                    name: 'endDate',
                    label: t('party.ticketCategory.accessWindow.endDate'),
                    type: 'date',

                    validation: {
                        required: true,
                    },

                    minDate: (values, item) => {
                        if (!item?.startDate) return values.startDate;
                        return item.startDate > values.startDate ? item.startDate : values.startDate;
                    },

                    maxDate: (values) => values.endDate,

                    clearFieldsOnEmpty: ['endTime'],
                },

                {
                    name: 'endTime',
                    label: t('party.ticketCategory.accessWindow.endTime'),
                    type: 'time',

                    validation: {
                        required: true,
                    },

                    minTime: (values, item) => {
                        if (item && item.endDate === item.startDate) return item.startTime;
                        if (item?.endDate === values.startDate) return values.startTime;
                        return undefined;
                    },

                    maxTime: (values, item) =>
                        item?.endDate === values.endDate ? values.endTime : undefined,

                    disabledWhen: (_values, item) => !item?.endDate,
                },
            ],
        ],
    };
}
