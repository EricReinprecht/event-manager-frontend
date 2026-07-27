import CompleteProfileForm from '@user/components/CompleteProfileForm';

import CompleteProfileLayout from '@user/layouts/CompleteProfileLayout';

export default function CompleteProfilePage() {
    return (
        <CompleteProfileLayout>
            <h1>Complete your profile</h1>

            <CompleteProfileForm />
        </CompleteProfileLayout>
    );
}
