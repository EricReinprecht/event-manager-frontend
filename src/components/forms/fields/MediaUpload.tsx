import { useCallback, useEffect, useMemo, useState } from 'react';
import { LoaderCircle, Trash2, UploadCloud } from 'lucide-react';
import { useDropzone, type FileRejection } from 'react-dropzone';

import apiClient from '@/api/client';
import routes from '@/constants/routes';
import type { MediaReference } from '@user/types/party.types';

interface PreviewFile {
    key: string;
    name: string;
    url: string;
}

interface Props {
    value?: MediaReference | MediaReference[];
    multiple?: boolean;
    accept?: string;
    disabled?: boolean;
    onChange(value: MediaReference | MediaReference[] | undefined): void;
}

const maximumFileSize = 10 * 1024 * 1024;

export default function MediaUpload({
    value,
    multiple = false,
    accept = 'image/*',
    disabled,
    onChange,
}: Props) {
    const items = useMemo(() => (Array.isArray(value) ? value : value ? [value] : []), [value]);
    const [previews, setPreviews] = useState<PreviewFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const upload = useCallback(
        async (files: File[]) => {
            if (!files.length) return;
            const selected = multiple ? files : files.slice(0, 1);
            const localPreviews = selected.map((file) => ({
                key: `${file.name}-${file.size}-${file.lastModified}`,
                name: file.name,
                url: URL.createObjectURL(file),
            }));
            setPreviews(localPreviews);
            setUploading(true);
            setError('');
            try {
                const results = await Promise.all(
                    selected.map(async (file): Promise<MediaReference> => {
                        const data = new FormData();
                        data.append('file', file);
                        const response = await apiClient.post(routes.MediaUpload, data);
                        const raw = response.data;
                        const rawUrl = raw.url ?? raw.URL;
                        return {
                            id: raw.id ?? raw.ID,
                            url: rawUrl
                                ? new URL(
                                      rawUrl,
                                      new URL(import.meta.env.VITE_API_URL).origin,
                                  ).toString()
                                : URL.createObjectURL(file),
                            filename: raw.filename ?? raw.Filename ?? file.name,
                        };
                    }),
                );
                onChange(multiple ? [...items, ...results] : results[0]);
            } catch {
                setError('Upload failed. Please try again.');
            } finally {
                setUploading(false);
                setPreviews([]);
                localPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
            }
        },
        [items, multiple, onChange],
    );

    function reject(files: FileRejection[]) {
        const firstError = files[0]?.errors[0];
        setError(
            firstError?.code === 'file-too-large'
                ? 'Images must not exceed 10 MB.'
                : firstError?.message || 'Only supported image files can be uploaded.',
        );
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: accept.startsWith('image/') ? { 'image/*': [] } : undefined,
        multiple,
        maxFiles: multiple ? 10 : 1,
        maxSize: maximumFileSize,
        disabled: disabled || uploading,
        onDropAccepted: (files) => void upload(files),
        onDropRejected: reject,
    });

    useEffect(
        () => () => previews.forEach((preview) => URL.revokeObjectURL(preview.url)),
        [previews],
    );

    function remove(id: string) {
        const next = items.filter((current) => current.id !== id);
        onChange(multiple ? next : undefined);
    }

    return (
        <div className="media-upload" data-uploading={uploading}>
            <div
                {...getRootProps({
                    className: `media-upload__dropzone ${isDragActive ? 'is-active' : ''}`,
                    'aria-label': `Choose ${multiple ? 'images' : 'an image'} or drag files here`,
                })}
            >
                <input {...getInputProps()} />
                <UploadCloud size={32} aria-hidden="true" />
                <div>
                    <strong>{isDragActive ? 'Drop images here' : 'Drag images here'}</strong>
                    <span>PNG, JPG, WebP or GIF · max. 10 MB</span>
                </div>
            </div>

            {uploading && (
                <p className="media-upload__status" role="status">
                    <LoaderCircle className="media-upload__spinner" size={18} /> Uploading…
                </p>
            )}
            {error && <p className="form-error">{error}</p>}

            <div className="media-upload__items">
                {previews.map((preview) => (
                    <figure key={preview.key} className="media-upload__item is-uploading">
                        <img src={preview.url} alt={preview.name} />
                        <figcaption>{preview.name}</figcaption>
                    </figure>
                ))}
                {items.map((item) => (
                    <figure key={item.id} className="media-upload__item">
                        <img src={item.url} alt={item.filename} />
                        {!disabled && (
                            <button
                                type="button"
                                aria-label="Remove image"
                                onClick={() => remove(item.id)}
                            >
                                <Trash2 size={16} aria-hidden="true" />
                            </button>
                        )}
                    </figure>
                ))}
            </div>
        </div>
    );
}
