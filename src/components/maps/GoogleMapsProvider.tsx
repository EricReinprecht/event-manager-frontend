import { APIProvider } from '@vis.gl/react-google-maps';

interface Props {
    children: React.ReactNode;
}

export default function GoogleMapsProvider({ children }: Props) {
    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
            {children}
        </APIProvider>
    );
}
