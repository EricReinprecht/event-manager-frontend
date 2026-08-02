import apiClient from '@/api/client';
import routes from '@/constants/routes';
import type { MediaReference } from '@user/types/party.types';

export const maximumMediaFileSize = 10 * 1024 * 1024;

export async function uploadMedia(file: File): Promise<MediaReference> {
    const data = new FormData();
    data.append('file', file);

    const response = await apiClient.post(routes.MediaUpload, data);
    const raw = response.data;
    const rawUrl = raw.url ?? raw.URL;

    return {
        id: raw.id ?? raw.ID,
        url: rawUrl
            ? new URL(rawUrl, new URL(import.meta.env.VITE_API_URL).origin).toString()
            : URL.createObjectURL(file),
        filename: raw.filename ?? raw.Filename ?? file.name,
    };
}

export function mediaRejectionKey(code?: string) {
    return code === 'file-too-large' ? 'media.fileTooLarge' : 'media.unsupported';
}
