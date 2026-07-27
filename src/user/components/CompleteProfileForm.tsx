import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = {
    firstName: string;

    lastName: string;
};

export default function CompleteProfileForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    function submit(data: FormData) {
        console.log(data);
    }

    return (
        <form className="security-form" onSubmit={handleSubmit(submit)}>
            <input placeholder="First name" {...register('firstName')} />

            <input placeholder="Last name" {...register('lastName')} />

            <button>Save profile</button>
        </form>
    );
}
