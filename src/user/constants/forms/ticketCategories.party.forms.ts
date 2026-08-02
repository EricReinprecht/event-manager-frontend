import type { FormSectionConfig } from '@components/forms/entity/types';

import createAccessWindows from './accessWindows.party.forms';

export default function createTicketCategoriesSection(t: any): FormSectionConfig {
    return {
        id: 'ticketCategories',

        title: t('party.sections.ticketCategories'),

        collapsible: true,

        defaultOpen: true,

        fields: [
            {
                name: 'ticketCategories',

                label: t('party.fields.ticketCategories'),

                type: 'repeater',

                validate(category: any, values: Record<string, any> = {}) {
                    const normalizedName = String(category.name ?? '').trim().toLowerCase();
                    const duplicates = (values.ticketCategories ?? []).filter(
                        (item: { name?: string }) =>
                            String(item.name ?? '').trim().toLowerCase() === normalizedName,
                    ).length;
                    if (normalizedName && duplicates > 1) {
                        return { name: t('party.validation.ticketCategoryNameUnique') };
                    }
                    return {};
                },

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
