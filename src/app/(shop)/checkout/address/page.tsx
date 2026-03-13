import { Title } from '@/components';
import Link from 'next/link';

export default function NamePage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center">
        <div className="w-full  flex flex-col justify-center text-left">
            <Title>Address</Title>
            <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>First Name</span>
                    <input 
                    type="text" 
                    className="p-2 border rounded-md bg-white text-black"
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Last Name</span>
                    <input 
                    type="text" 
                    className="p-2 border rounded-md bg-white text-black"
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Address</span>
                    <input 
                    type="text" 
                    className="p-2 border rounded-md bg-white text-black"
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Address 2 (optional)</span>
                    <input 
                    type="text" 
                    className="p-2 border rounded-md bg-white text-black"
                    />
                </div>


                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Zip code</span>
                    <input 
                    type="text" 
                    className="p-2 border rounded-md bg-white text-black"
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>City</span>
                    <input 
                    type="text" 
                    className="p-2 border rounded-md bg-white text-black"
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Country</span>
                    <select 
                    className="p-2 border rounded-md bg-white text-black"
                    >
                    <option value="">[ Seleccione ]</option>
                    <option value="CRI">Costa Rica</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span className='mb-1 text-base'>Telephone</span>
                    <input 
                    type="text" 
                    className="p-2 border rounded-md bg-white text-black"
                    />
                </div>

            </div>
        </div>
        <footer className="flex flex-col mt-4 sm:mt-6 w-70 self-end">
            <Link 
            href='/checkout'
            className="btn-primary flex justify-center w-full font-semibold">
                Next
            </Link>
        </footer>
    </div>
  )
}