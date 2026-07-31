import type { FormSectionConfig } from '@components/forms/entity/types';

export function createPartyForm(
    categories: {
        label: string;
        value: string;
    }[],
    t: any,
): FormSectionConfig[] {
    return [
        {
            title: t('party.create.sections.general'),

            fields: [
                {
                    name: 'title',
                    label: t('party.fields.title'),
                    type: 'text',
                    required: true,
                },

                {
                    name: 'description',
                    label: t('party.fields.description'),
                    type: 'textarea',
                },

                {
                    name: 'categoryIds',
                    label: t('party.fields.categories'),
                    type: 'multiselect',
                    required: true,
                    options: categories,
                },
            ],
        },

        {
            title: t('party.create.sections.location'),

            fields: [
                {
                    name: 'locationName',
                    label: t('party.fields.locationName'),
                    type: 'text',
                    required: true,
                },

                {
                    name: 'location',
                    label: '',
                    type: 'location',
                },
            ],
        },

        {
            title: t('party.create.sections.schedule'),

            rows: [
                [
                    {
                        name: 'startDate',
                        label: t('party.fields.startDate'),
                        type: 'date',
                        required: true,
                    },
                    {
                        name: 'startTime',
                        label: t('party.fields.startTime'),
                        type: 'time',
                        required: true,
                    },
                ],

                [
                    {
                        name: 'endDate',
                        label: t('party.fields.endDate'),
                        type: 'date',
                        required: true,
                    },
                    {
                        name: 'endTime',
                        label: t('party.fields.endTime'),
                        type: 'time',
                        required: true,
                    },
                ],
            ],
        },
    ];
}
