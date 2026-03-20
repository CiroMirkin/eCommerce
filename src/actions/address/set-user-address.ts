"use server"

import { Address } from "@/interfaces"
import { prisma } from "@/lib/prisma"

export const setUserAddress = async (address: Address, userId: string) => {
    try {
        const newAddress = await createOrReplaceAddress(address, userId)
        return {
            ok: true,
            address: newAddress,
            message: "Address saved successfully.",
        }

    }
    catch(error) {
        console.error("setUserAddress Action", error)
        return {
            ok: false,
            address: null,
            message: "Sorry, we weren't able to save your address."
        }
    }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const storeAddress = await prisma.userAddress.findUnique({
            where: { userId },
        })

        const addressToSave = {
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            secondAddress: address.secondAddress || '',
            zipCode: address.zipCode,
            city: address.city,
            countryId: address.country,
            telephone: address.telephone,
        }

        if(!storeAddress) {
            const newAddress = await prisma.userAddress.create({
                data: {
                    ...addressToSave,
                    userId,
                },
            })
            return newAddress
        }

        const updatedAddress = await prisma.userAddress.update({
            where: { userId },
            data: addressToSave,
        })
        return updatedAddress
    } 
    catch (error) {
        console.error("createOrReplaceAddress inside setUserAddress Action", error)
    }
}
