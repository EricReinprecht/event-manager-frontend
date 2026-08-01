import type { FormFieldConfig } from '@components/forms/entity/types';

export default function createTicketCategoryAccessWindows(t: any): FormFieldConfig {
    return {
        name: 'accessWindows',

        label: t('party.ticketCategory.accessWindows'),

        type: 'repeater',

        addLabel: t('party.ticketCategory.accessWindow.add'),

        removeLabel: t('party.ticketCategory.accessWindow.remove'),

        itemLabel: t('party.ticketCategory.accessWindow.item'),

        titleFormatter: (item: any) => {
            if (!item.startDate || !item.startTime || !item.endDate || !item.endTime) {
                return t('party.ticketCategory.accessWindow.title');
            }

            return `${item.startDate} ${item.startTime} - ${item.endDate} ${item.endTime}`;
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
                },

                {
                    name: 'startTime',
                    label: t('party.ticketCategory.accessWindow.startTime'),
                    type: 'time',

                    validation: {
                        required: true,
                    },
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
                },

                {
                    name: 'endTime',
                    label: t('party.ticketCategory.accessWindow.endTime'),
                    type: 'time',

                    validation: {
                        required: true,
                    },
                },
            ],
        ],
    };
}
