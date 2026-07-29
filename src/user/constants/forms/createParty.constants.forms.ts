import type { FormSectionConfig } from '@components/forms/entity/types';

export function createPartyForm(
    categories: {
        label: string;
        value: string;
    }[],
): FormSectionConfig[] {
    return [
        {
            title: 'General Information',

            fields: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    required: true,
                },

                {
                    name: 'description',
                    label: 'Description',
                    type: 'textarea',
                },

                {
                    name: 'location',
                    label: 'Location',
                    type: 'text',
                },

                {
                    name: 'categoryIds',
                    label: 'Categories',
                    type: 'multiselect',
                    required: true,
                    options: categories,
                },
            ],
        },

        {
            title: 'Schedule',

            fields: [
                {
                    name: 'startAt',
                    label: 'Start',
                    type: 'datetime',
                    required: true,
                },

                {
                    name: 'endAt',
                    label: 'End',
                    type: 'datetime',
                    required: true,
                },
            ],
        },
    ];
}
