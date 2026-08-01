import type { FormSectionConfig } from '@components/forms/entity/types';

import createAccessWindows from './accessWindows.party.forms';

export default function createTicketCategoriesSection(t: any): FormSectionConfig {
    return {
        title: t('party.sections.ticketCategories'),

        collapsible: true,

        defaultOpen: true,

        fields: [
            {
                name: 'ticketCategories',

                label: t('party.fields.ticketCategories'),

                type: 'repeater',

                addLabel: t('party.ticketCategory.add'),

                removeLabel: t('party.ticketCategory.remove'),

                itemLabel: t('party.ticketCategory.item'),

                titleField: 'name',

                fields: [
                    {
                        name: 'name',

                        label: t('party.ticketCategory.name'),

                        type: 'text',

                        validation: {
                            required: true,
                            minLength: 2,
                            maxLength: 100,
                        },
                    },

                    {
                        name: 'price',

                        label: t('party.ticketCategory.price'),

                        type: 'number',

                        validation: {
                            required: true,
                            min: 0,
                        },
                    },

                    {
                        name: 'capacity',

                        label: t('party.ticketCategory.capacity'),

                        type: 'number',

                        validation: {
                            required: true,
                            min: 1,
                        },
                    },

                    {
                        name: 'requiresVerification',

                        label: t('party.ticketCategory.requiresVerification'),

                        type: 'checkbox',
                    },

                    {
                        name: 'refundRequiresApproval',

                        label: t('party.ticketCategory.refundRequiresApproval'),

                        type: 'checkbox',
                    },

                    createAccessWindows(t),
                ],
            },
        ],
    };
}
