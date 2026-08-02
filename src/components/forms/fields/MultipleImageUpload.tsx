import { useCallback, useState } from 'react';
import { Images, LoaderCircle, Trash2 } from 'lucide-react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import type { MediaReference } from '@user/types/party.types';
import { maximumMediaFileSize, mediaRejectionKey, uploadMedia } from './upload-media';

interface Props {
    value?: MediaReference[];
    accept?: string;
    disabled?: boolean;
    onChange(value: MediaReference[]): void;
}

export default function MultipleImageUpload({ value = [], accept = 'image/*', disabled, onChange }: Props) {
    const { t } = useTranslation('entityForm');
    const [previews, setPreviews] = useState<Array<{ key: string; name: string; url: string }>>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const upload = useCallback(
        async (files: File[]) => {
            if (!files.length) return;

            const localPreviews = files.map((file) => ({
                key: `${file.name}-${file.size}-${file.lastModified}`,
                name: file.name,
                url: URL.createObjectURL(file),
            }));
            setPreviews(localPreviews);
            setUploading(true);
            setError('');

            try {
                const uploaded = await Promise.all(files.map(uploadMedia));
                onChange([...value, ...uploaded]);
            } catch {
                setError(t('media.uploadFailed'));
            } finally {
                setUploading(false);
                setPreviews([]);
                localPreviews.forEach(({ url }) => URL.revokeObjectURL(url));
            }
        },
        [onChange, t, value],
    );

    const reject = ([rejection]: FileRejection[]) =>
        setError(t(mediaRejectionKey(rejection?.errors[0]?.code)));

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: accept.startsWith('image/') ? { 'image/*': [] } : undefined,
        multiple: true,
        maxFiles: 10,
        maxSize: maximumMediaFileSize,
        disabled: disabled || uploading,
        onDropAccepted: (files) => void upload(files),
        onDropRejected: reject,
    });

    return (
        <div className="media-upload media-upload--multiple" data-uploading={uploading}>
            {!disabled && (
                <div
                    {...getRootProps({
                        className: `media-upload__dropzone ${isDragActive ? 'is-active' : ''}`,
                        'aria-label': t('media.chooseGallery'),
                    })}
                >
                    <input {...getInputProps()} />
                    {uploading ? <LoaderCircle className="media-upload__spinner" size={28} /> : <Images size={30} />}
                    <div>
                        <strong>{uploading ? t('media.uploading') : isDragActive ? t('media.dropMultiple') : t('media.addGallery')}</strong>
                        <span>{t('media.multipleHint')}</span>
                    </div>
                </div>
            )}

            {error && <p className="form-error">{error}</p>}

            <div className="media-upload__items">
                {previews.map((preview) => (
                    <figure key={preview.key} className="media-upload__item is-uploading">
                        <img src={preview.url} alt={preview.name} />
                        <span className="media-upload__item-status"><LoaderCircle className="media-upload__spinner" size={18} /></span>
                    </figure>
                ))}
                {value.map((item) => (
                    <figure key={item.id} className="media-upload__item">
                        <img src={item.url} alt={item.filename} />
                        {!disabled && (
                            <button type="button" aria-label={t('media.remove')} onClick={() => onChange(value.filter(({ id }) => id !== item.id))}>
                                <Trash2 size={16} aria-hidden="true" />
                            </button>
                        )}
                    </figure>
                ))}
            </div>
        </div>
    );
}
