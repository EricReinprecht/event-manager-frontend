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

        {
            title: t('party.sections.ticketCategories'),

            fields: [
                {
                    name: 'ticketCategories',
                    label: t('party.fields.ticketCategories'),
                    type: 'repeater',

                    addLabel: t('party.ticketCategory.add'),

                    removeLabel: t('party.ticketCategory.remove'),

                    itemLabel: t('party.ticketCategory.item'),

                    fields: [
                        {
                            name: 'name',
                            label: t('party.ticketCategory.name'),
                            type: 'text',
                            required: true,
                        },

                        {
                            name: 'price',
                            label: t('party.ticketCategory.price'),
                            type: 'number',
                            required: true,
                        },

                        {
                            name: 'capacity',
                            label: t('party.ticketCategory.capacity'),
                            type: 'number',
                            required: true,
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

                        {
                            name: 'accessWindows',
                            label: t('party.ticketCategory.accessWindows'),
                            type: 'repeater',

                            addLabel: t('party.ticketCategory.accessWindows.add'),

                            removeLabel: t('party.ticketCategory.accessWindows.remove'),

                            itemLabel: t('party.ticketCategory.accessWindows.item'),

                            rows: [
                                [
                                    {
                                        name: 'startDate',
                                        label: t('party.ticketCategory.accessWindows.startDate'),
                                        type: 'date',
                                        required: true,
                                    },

                                    {
                                        name: 'startTime',
                                        label: t('party.ticketCategory.accessWindows.startTime'),
                                        type: 'time',
                                        required: true,
                                    },
                                ],

                                [
                                    {
                                        name: 'endDate',
                                        label: t('party.ticketCategory.accessWindows.endDate'),
                                        type: 'date',
                                        required: true,
                                    },

                                    {
                                        name: 'endTime',
                                        label: t('party.ticketCategory.accessWindows.endTime'),
                                        type: 'time',
                                        required: true,
                                    },
                                ],
                            ],
                        },
                    ],
                },
            ],
        },
    ];
}
