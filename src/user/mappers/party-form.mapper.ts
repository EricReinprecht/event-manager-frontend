import buildDateTime from '@/helper/build-datetime';
import splitDateTime from '@/helper/split-datetime';
import { format } from 'date-fns';
import type {
    CreatePartyRequest,
    MediaReference,
    PartyDetailed,
    PartyFormValues,
    UpdatePartyRequest,
} from '@user/types/party.types';

function normalizeMedia(media?: MediaReference) {
    if (!media) return undefined;
    return {
        ...media,
        url: new URL(media.url, new URL(import.meta.env.VITE_API_URL).origin).toString(),
    };
}

export const emptyPartyFormValues: PartyFormValues = {
    title: '',
    description: '',
    locationName: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    publishDate: '',
    publishTime: '',
    categoryIds: [],
    images: [],
    ticketCategories: [],
};

export function partyToFormValues(party: PartyDetailed): PartyFormValues {
    const timezone = party.location.timezone;
    const start = splitDateTime(party.startAt, timezone);
    const end = splitDateTime(party.endAt, timezone);
    const publishAt = party.publishAt ? new Date(party.publishAt) : undefined;

    return {
        title: party.title,
        description: party.description ?? '',
        locationName: party.locationName,
        location: party.location,
        startDate: start.date,
        startTime: start.time,
        endDate: end.date,
        endTime: end.time,
        publishDate: publishAt ? format(publishAt, 'yyyy-MM-dd') : '',
        publishTime: publishAt ? format(publishAt, 'HH:mm') : '',
        thumbnail: normalizeMedia(party.thumbnail),
        images: (party.images ?? []).map((image) => normalizeMedia(image)!),
        categoryIds: party.categories?.map(({ id }) => id) ?? [],
        ticketCategories: (party.ticketCategories ?? []).map((category) => ({
            ...category,
            accessWindows: (category.accessWindows ?? []).map((window) => {
                const windowStart = splitDateTime(window.startsAt, timezone);
                const windowEnd = splitDateTime(window.endsAt, timezone);
                return {
                    id: window.id,
                    startDate: windowStart.date,
                    startTime: windowStart.time,
                    endDate: windowEnd.date,
                    endTime: windowEnd.time,
                };
            }),
        })),
    };
}

export function formValuesToPartyRequest(
    values: PartyFormValues,
    mode: 'create' | 'edit',
): CreatePartyRequest | UpdatePartyRequest {
    if (!values.location) throw new Error('Party location is required');
    const timezone = values.location.timezone;
    const ticketCategories = values.ticketCategories.map((category) => ({
        ...(mode === 'edit' && category.id ? { id: category.id } : {}),
        name: category.name,
        price: category.price,
        capacity: category.capacity,
        requiresVerification: category.requiresVerification,
        refundRequiresApproval: category.refundRequiresApproval,
        refundPolicyId: category.refundPolicyId,
        accessWindows: category.accessWindows.map((window) => ({
            ...(mode === 'edit' && window.id ? { id: window.id } : {}),
            startsAt: buildDateTime(window.startDate, window.startTime, timezone),
            endsAt: buildDateTime(window.endDate, window.endTime, timezone),
        })),
    }));

    const request = {
        title: values.title.trim(),
        description: values.description.trim(),
        locationName: values.locationName.trim(),
        location: values.location,
        startAt: buildDateTime(values.startDate, values.startTime, timezone),
        endAt: buildDateTime(values.endDate, values.endTime, timezone),
        categories: values.categoryIds,
        thumbnailId: values.thumbnail?.id,
        imageIds: values.images.map(({ id }) => id),
        ticketCategories,
    };

    if (mode === 'edit') {
        return {
            ...request,
            publishAt:
                values.publishDate && values.publishTime
                    ? new Date(`${values.publishDate}T${values.publishTime}:00`).toISOString()
                    : null,
        };
    }

    return request;
}
