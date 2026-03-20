import { Address } from "@/interfaces";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    address: Address,
    setAddress: (address: State['address']) => void,
}

const addressStoreApi: StateCreator<State> = (set, get) => ({
    address: {
        firstName: '',
        lastName: '',
        address: '',
        secondAddress: '',
        zipCode: '',
        city: '',
        country: '',
        telephone: '',
    },
    setAddress: (address) => {
        set({ address })
    },
})

export const useAddressStore = create<State>()(
    persist(addressStoreApi, {
        name: 'address',
    })
)
