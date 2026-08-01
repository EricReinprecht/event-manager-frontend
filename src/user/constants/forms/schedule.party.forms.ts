import type { FormSectionConfig } from '@components/forms/entity/types';

export default function createScheduleSection(t: any): FormSectionConfig {
    return {
        title: t('party.create.sections.schedule'),

        collapsible: true,

        defaultOpen: true,

        rows: [
            [
                {
                    name: 'startDate',
                    label: t('party.fields.startDate'),
                    type: 'date',

                    validation: {
                        required: true,
                    },
                },

                {
                    name: 'startTime',
                    label: t('party.fields.startTime'),
                    type: 'time',

                    validation: {
                        required: true,
                    },
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
                },

                {
                    name: 'endTime',
                    label: t('party.fields.endTime'),
                    type: 'time',

                    validation: {
                        required: true,
                    },
                },
            ],
        ],
    };
}
