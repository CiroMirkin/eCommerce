"use client"

import { login, registerUser } from '@/actions'
import { cn } from '@/lib/cn'
import { GooeyToaster, gooeyToast } from 'goey-toast'
import { useForm } from 'react-hook-form'

type FormInputs = {
    name: string
    email: string
    password: string
}

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const onSubmit = async (data: FormInputs) => {
        const { name, email, password } = data
        const registerResponse = await registerUser({ name, email, password })
        
        if(!registerResponse.ok) {
            gooeyToast.error(registerResponse.message)
            return;
        }
        gooeyToast.success(registerResponse.message)

        const loginResponse = await login(email.toLowerCase(), password)
        if(!loginResponse.ok) {
            gooeyToast.error(loginResponse.message)
            return;
        }
        window.location.replace('/products')
    }

    return (
        <>
            <GooeyToaster position="top-right" />
            <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col">
                <label htmlFor="text" className={cn(
                    'mb-2',
                    !!errors.name && "text-red-500"
                )}>
                    Full Name
                </label>
                {errors.name?.type === 'required' && (
                    <span className='text-red-500'>* The name is required.</span>
                )}
                <input
                    className={cn(
                        "px-5 py-2 border bg-white text-black caret-black rounded mb-5",
                        !!errors.name && "border-red-500 bg-red-100"
                    )}
                    type="text"
                    autoFocus
                    {...register('name', { required: true })}
                />

                <label htmlFor="email" className={cn(
                    'mb-2',
                    !!errors.email && "text-red-500"
                )}>
                    Email
                </label>
                {errors.email?.type === 'required' && (
                    <span className='text-red-500'>* The email is required.</span>
                )}
                <input
                    className={cn(
                        "px-5 py-2 border bg-white text-black caret-black rounded mb-5",
                        !!errors.email && "border-red-500 bg-red-100"
                    )}
                    type="email"
                    {...register('email', { required: true })}
                />

                <label htmlFor="password" className={cn(
                    'mb-2',
                    !!errors.password && "text-red-500"
                )}>
                    Password
                </label>
                {errors.password?.type === 'required' && (
                    <span className='text-red-500'>* The password is required.</span>
                )}
                <input
                    className={cn(
                        "px-5 py-2 border bg-white text-black caret-black rounded mb-5",
                        !!errors.password && "border-red-500 bg-red-100"
                    )}
                    type="password"
                    {...register('password', { required: true })}
                />

                <button
                    className="btn-primary"
                    type="submit"
                >
                    Sign In
                </button>
            </form>
        </>
    )
}