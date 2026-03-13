import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export default async function LoginPage() {
    return (
        <div className="w-full md:max-w-lg mx-auto pt-10 md:pt-20">
            <h1 className={`${titleFont.className} text-4xl mb-5`}>Log In</h1>

            <div className="flex flex-col">

                <label htmlFor="email" className='mb-2'>Email</label>
                <input
                    className="px-5 py-2 border bg-white text-black caret-black rounded mb-5"
                    type="email" />

                <label htmlFor="password" className='mb-2'>Password</label>
                <input
                    className="px-5 py-2 border bg-white text-black caret-black rounded mb-5"
                    type="password" />

                <button
                    className="btn-primary">
                    Log In
                </button>

                {/* divider line */}
                <div className="flex items-center my-5">
                    <div className="flex-1 border-t border-gray-500"></div>
                    <div className="px-2 text-gray-800">Or</div>
                    <div className="flex-1 border-t border-gray-500"></div>
                </div>

                <Link
                    href="/auth/register"
                    className="btn-secondary text-center">
                    Create a new account
                </Link>

            </div>
        </div>
    )
}
