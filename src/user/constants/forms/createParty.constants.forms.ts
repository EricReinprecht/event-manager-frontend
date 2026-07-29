import type { FormSectionConfig } from '@components/forms/entity/types';

export const CREATE_PARTY_FORM: FormSectionConfig[] = [
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
