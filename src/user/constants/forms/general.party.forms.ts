import type { FormSectionConfig } from '@components/forms/entity/types';

export default function createGeneralSection(categories: any[], t: any): FormSectionConfig {
    return {
        id: 'general',

        title: t('party.create.sections.general'),

        collapsible: true,

        defaultOpen: true,

        fields: [
            {
                name: 'title',
                label: t('party.fields.title'),
                type: 'text',

                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 100,
                },
            },

            {
                name: 'description',
                label: t('party.fields.description'),
                type: 'textarea',

                validation: {
                    maxLength: 2000,
                },
            },

            {
                name: 'categoryIds',
                label: t('party.fields.categories'),
                type: 'multiselect',

                validation: {
                    required: true,
                },

                options: categories,
            },

            {
                name: 'thumbnail',
                label: t('party.fields.thumbnail'),
                type: 'media',
                accept: 'image/*',
            },

            {
                name: 'images',
                label: t('party.fields.galleryImages'),
                type: 'media',
                multiple: true,
                accept: 'image/*',
            },
        ],
    };
}
