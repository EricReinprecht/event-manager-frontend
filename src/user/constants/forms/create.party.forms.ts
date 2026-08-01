import type { FormSectionConfig } from '@components/forms/entity/types';
import createGeneralSection from './general.party.forms';
import createLocationSection from './location.party.forms';
import createScheduleSection from './schedule.party.forms';
import createTicketCategoriesSection from './ticketCategories.party.forms';

export function createPartyForm(
    categories: {
        label: string;
        value: string;
    }[],
    t: any,
): FormSectionConfig[] {
    return [
        createGeneralSection(categories, t),

        createLocationSection(t),

        createScheduleSection(t),

        createTicketCategoriesSection(t),
    ];
}
