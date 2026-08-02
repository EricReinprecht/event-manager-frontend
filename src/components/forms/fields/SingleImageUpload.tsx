import { useCallback, useEffect, useState } from 'react';
import { ImagePlus, LoaderCircle, Trash2 } from 'lucide-react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import type { MediaReference } from '@user/types/party.types';
import { maximumMediaFileSize, mediaRejectionKey, uploadMedia } from './upload-media';

interface Props {
    value?: MediaReference;
    accept?: string;
    disabled?: boolean;
    onChange(value: MediaReference | undefined): void;
}

export default function SingleImageUpload({ value, accept = 'image/*', disabled, onChange }: Props) {
    const { t } = useTranslation('entityForm');
    const [preview, setPreview] = useState<{ name: string; url: string }>();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const upload = useCallback(
        async ([file]: File[]) => {
            if (!file) return;

            const localUrl = URL.createObjectURL(file);
            setPreview({ name: file.name, url: localUrl });
            setUploading(true);
            setError('');

            try {
                onChange(await uploadMedia(file));
            } catch {
                setError(t('media.uploadFailed'));
            } finally {
                setUploading(false);
                setPreview(undefined);
                URL.revokeObjectURL(localUrl);
            }
        },
        [onChange, t],
    );

    const reject = ([rejection]: FileRejection[]) =>
        setError(t(mediaRejectionKey(rejection?.errors[0]?.code)));

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: accept.startsWith('image/') ? { 'image/*': [] } : undefined,
        multiple: false,
        maxFiles: 1,
        maxSize: maximumMediaFileSize,
        disabled: disabled || uploading,
        onDropAccepted: (files) => void upload(files),
        onDropRejected: reject,
    });

    useEffect(() => () => preview && URL.revokeObjectURL(preview.url), [preview]);

    const displayed = preview ?? value;

    return (
        <div className="media-upload media-upload--single" data-uploading={uploading}>
            {displayed && (
                <figure className={`media-upload__cover ${preview ? 'is-uploading' : ''}`}>
                    <img
                        src={displayed.url}
                        alt={'filename' in displayed ? displayed.filename : displayed.name}
                    />
                    {!disabled && !uploading && value && (
                        <button type="button" aria-label={t('media.remove')} onClick={() => onChange(undefined)}>
                            <Trash2 size={18} aria-hidden="true" />
                        </button>
                    )}
                    {uploading && (
                        <span className="media-upload__cover-status">
                            <LoaderCircle className="media-upload__spinner" size={22} /> {t('media.uploading')}
                        </span>
                    )}
                </figure>
            )}

            {!disabled && (
                <div
                    {...getRootProps({
                        className: `media-upload__dropzone ${isDragActive ? 'is-active' : ''}`,
                        'aria-label': value ? t('media.replace') : t('media.choose'),
                    })}
                >
                    <input {...getInputProps()} />
                    <ImagePlus size={30} aria-hidden="true" />
                    <div>
                        <strong>{isDragActive ? t('media.dropSingle') : value ? t('media.replace') : t('media.chooseCover')}</strong>
                        <span>{t('media.formats')}</span>
                    </div>
                </div>
            )}

            {error && <p className="form-error">{error}</p>}
        </div>
    );
}
