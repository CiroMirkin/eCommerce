"use client"

import Link from 'next/link';
import { authenticate } from '@/actions';
import { useFormStatus } from 'react-dom';
import { GooeyToaster, gooeyToast } from 'goey-toast'
import { cn } from '@/lib/cn';
import { Spinner } from '@/components';
import { useActionState, useEffect } from 'react';

export default function LoginForm() {
    const [ state, dispatch ] = useActionState(authenticate, undefined)

    useEffect(() => {
        if(state === "Invalid credentials.") gooeyToast.error('Invalid credentials')
        if(state === "Something went wrong.") gooeyToast.error('Sorry, something went wrong.')
        if(state === "Success Sign in.") {
            window.location.replace('/products')
        }
    }, [state])

    return (
        <>
            <GooeyToaster position="top-right" />
            <form action={dispatch} className="flex flex-col">
                <label htmlFor="email" className='mb-2'>Email</label>
                <input
                    className="px-5 py-2 border bg-white text-black caret-black rounded mb-5"
                    type="email"
                    name='email'
                />
                <label htmlFor="password" className='mb-2'>Password</label>
                <input
                    className="px-5 py-2 border bg-white text-black caret-black rounded mb-5"
                    type="password"
                    name='password'
                />
                <LoginButton />

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
            </form>
        </>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type='submit'
            className={cn("btn-primary flex items-center gap-2", pending && "pointer-events-none opacity-50")}
            arial-disabled={String(pending)}
            disabled={pending}
        >
            { pending && <Spinner /> } Log In
        </button>
    )
}