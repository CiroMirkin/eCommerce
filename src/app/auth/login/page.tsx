import { titleFont } from '@/config/fonts';
import LoginForm from './LoginForm';

export default async function LoginPage() {
    return (
        <div className="w-full md:max-w-lg mx-auto pt-10 md:pt-20">
            <h1 className={`${titleFont.className} text-4xl mb-5`}>Log In</h1>
            <LoginForm />
        </div>
    )
}
