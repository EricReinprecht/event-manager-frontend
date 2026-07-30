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
                    name: 'locationName',
                    label: t('party.fields.location'),
                    type: 'text',
                    required: true,
                },

                {
                    name: 'location',
                    label: 'Search location',
                    type: 'location',
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
            title: t('party.create.sections.schedule'),

            fields: [
                {
                    name: 'startAt',
                    label: t('party.fields.start'),
                    type: 'datetime',
                    required: true,
                },

                {
                    name: 'endAt',
                    label: t('party.fields.end'),
                    type: 'datetime',
                    required: true,
                },
            ],
        },
    ];
}
