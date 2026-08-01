import type { FormSectionConfig } from '@components/forms/entity/types';

export default function createLocationSection(t: any): FormSectionConfig {
    return {
        title: t('party.create.sections.location'),

        collapsible: true,

        defaultOpen: true,

        fields: [
            {
                name: 'locationName',
                label: t('party.fields.locationName'),
                type: 'text',

                validation: {
                    required: true,
                    maxLength: 200,
                },
            },

            {
                name: 'location',
                label: '',
                type: 'location',

                validation: {
                    required: true,
                },
            },
        ],
    };
}
