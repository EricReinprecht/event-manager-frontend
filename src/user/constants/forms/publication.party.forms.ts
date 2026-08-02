import { format } from 'date-fns';

import type { FormSectionConfig } from '@components/forms/entity/types';

export default function createPublicationSection(t: any): FormSectionConfig {
    return {
        id: 'publication',
        title: t('party.publication.title'),
        collapsible: true,
        defaultOpen: true,
        clearable: true,
        validate(values) {
            if (!!values.publishDate !== !!values.publishTime) {
                return t('party.validation.publicationDateTimeRequired');
            }

            if (!values.publishDate || !values.publishTime) return null;

            const publishAt = new Date(`${values.publishDate}T${values.publishTime}:00`);
            const partyEnd = new Date(`${values.endDate}T${values.endTime}:00`);
            if (publishAt <= new Date() || publishAt >= partyEnd) {
                return t('party.validation.publishAtInvalid');
            }

            return null;
        },
        rows: [
            [
                {
                    name: 'publishDate',
                    label: t('party.publication.publishDate'),
                    type: 'date',
                    minDate: () => format(new Date(), 'yyyy-MM-dd'),
                    maxDate: (values) => values.endDate,
                    showMonthDropdown: true,
                    showYearDropdown: true,
                    clearFieldsOnEmpty: ['publishTime'],
                },
                {
                    name: 'publishTime',
                    label: t('party.publication.publishTime'),
                    type: 'time',
                    minTime: (values) =>
                        values.publishDate === format(new Date(), 'yyyy-MM-dd')
                            ? format(new Date(), 'HH:mm')
                            : undefined,
                    maxTime: (values) =>
                        values.publishDate === values.endDate ? values.endTime : undefined,
                    disabledWhen: (values) => !values.publishDate,
                },
            ],
        ],
    };
}
