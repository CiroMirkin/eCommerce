import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import RegisterForm from './RegisterForm';

export default async function RegisterPage() {
    return (
        <div className="w-full md:max-w-lg mx-auto pt-10 md:pt-20">
            <h1 className={`${titleFont.className} text-4xl mb-5`}>Sign In</h1>

            <div className="flex flex-col">

                <RegisterForm/>

                {/* divider line */}
                <div className="flex items-center my-5">
                    <div className="flex-1 border-t border-gray-500"></div>
                    <div className="px-2 text-gray-800">Or</div>
                    <div className="flex-1 border-t border-gray-500"></div>
                </div>

                <Link
                    href="/auth/login"
                    className="btn-secondary text-center">
                    Log In
                </Link>

            </div>
        </div>
    )
}
