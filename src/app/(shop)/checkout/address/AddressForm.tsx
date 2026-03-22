"use client"

import { deleteUserAddress, setUserAddress } from "@/actions"
import { Address, Country } from "@/interfaces"
import { cn } from "@/lib/cn"
import { useAddressStore } from "@/store"
import { gooeyToast, GooeyToaster } from "goey-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

interface AddressFormInput {
    firstName: string
    lastName: string
    address: string
    secondAddress?: string
    zipCode: string
    city: string
    country: string
    telephone: string
    rememberAddress: boolean
}

interface Props {
    countries: Country[]
    userStoredAddress?: Partial<Address>
}

export default function AddressForm({ countries, userStoredAddress = {} }: Props) {
    const router = useRouter()    
    const { address ,setAddress } = useAddressStore()
    const { data: session } = useSession({ required: true })
    const { handleSubmit, register, formState: { isValid }, reset } = useForm<AddressFormInput>({
        defaultValues: {
            ...userStoredAddress,
            rememberAddress: false,
        }
    })

    useEffect(() => {
        if(address.firstName) {
            reset({...address})
        }
    }, [address, reset])
    
    const onSubmit = async (data: AddressFormInput) => {
        const { rememberAddress, ...userAddress} = data
        setAddress(userAddress)
        if(rememberAddress) {
            const setResponse = await setUserAddress(userAddress, session!.user.id)
            if(!setResponse.ok) gooeyToast.error(setResponse.message)
            router.push('/checkout')
            return
        }
    
        const deleteResponse = await deleteUserAddress(session!.user.id)
        if(!deleteResponse.ok) {
            gooeyToast.error(deleteResponse.message)
            return
        }
        gooeyToast.success(deleteResponse.message)
        router.push('/checkout')
    }

    return (
        <>
            <GooeyToaster position="top-right" />
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>First Name</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-white text-black"
                        {...register('firstName', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Last Name</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-white text-black"
                        {...register('lastName', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Address</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-white text-black"
                        {...register('address', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Address 2 (Optional)</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-white text-black"
                        {...register('secondAddress')}
                    />
                </div>


                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Zip code</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-white text-black"
                        {...register('zipCode', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>City</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-white text-black"
                        {...register('city', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Country</span>
                    <select
                        className="p-2 border rounded-md bg-white text-black"
                        {...register('country', { required: true })}
                    >
                        <option value="">[ Select ]</option>
                        { countries.map(country => ( 
                            <option key={country.id} value={country.id}>
                                { country.name }
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Telephone</span>
                    <input
                        type="tel"
                        minLength={6}
                        className="p-2 border rounded-md bg-white text-black"
                        {...register('telephone', { required: true })}
                    />
                </div>

                <div className="inline-flex items-center">
                    <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="checkbox"
                    >
                        <input
                            type="checkbox"
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary-500 checked:bg-primary-500 checked:before:bg-primary-500 hover:before:opacity-10"
                            id="checkbox"
                            {...register('rememberAddress')}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-dark opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </label>
                    <span>Remember Address?</span>
                </div>

                <footer className="flex flex-col mt-4 sm:mt-6 w-70 justify-self-end">
                    <button
                        type="submit"
                        className={cn(
                            "btn-primary flex justify-center w-full font-semibold",
                            !isValid && "btn-disabled"
                        )}
                    >
                        Next step
                    </button>
                </footer>
            </form>
        </>
    )
}