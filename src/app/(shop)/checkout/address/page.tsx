import { Title } from '@/components';
import AddressForm from './AddressForm';
import { getCountries, getUserAddress } from '@/actions';
import { Country } from '@/interfaces';
import { auth } from '@auth';
import { notFound } from 'next/navigation';

export default async function AddressPage() {
    const countries: Country[] = await getCountries()
    
    const session = await auth()
    if(!session?.user) notFound()

    const {
        countryId,
        secondAddress,
        ...userAddress
    } = await getUserAddress(session!.user.id) || { countryId: '', secondAddress: '' }

    return (
        <div className="flex flex-col sm:justify-center sm:items-center">
            <div className="w-full  flex flex-col justify-center text-left">
                <Title>Address</Title>
                <AddressForm
                    countries={countries}
                    userStoredAddress={userAddress && {
                        ...userAddress,
                        country: countryId,
                        secondAddress: secondAddress ?? undefined,
                    }}
                />
            </div>
        </div>
    )
}