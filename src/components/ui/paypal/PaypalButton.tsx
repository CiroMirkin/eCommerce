"use client"

import {
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import {
    CreateOrderData,
    CreateOrderActions,
    OnApproveData,
    OnApproveActions,
} from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";
import { gooeyToast, GooeyToaster } from "goey-toast";

interface Props {
    orderId: string
    amount: number
}

export function PaypalButton({ orderId, amount }: Props) {
    const [{ isPending }] = usePayPalScriptReducer()

    if(isPending) {
        return (
            <div className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded mt-2"></div>
            </div>
        )
    }

    const roundedAmount = (Math.round(amount * 100) / 100)

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        const transactionId = await actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        value:  roundedAmount.toString(),
                        currency_code: "USD",
                    },
                },
            ],
        })

        const { ok, message } = await setTransactionId(orderId, transactionId)
       
        if(!ok) {
            gooeyToast.error(message)
        }
        return transactionId
    }

    const handleApprove = async (data: OnApproveData, actions: OnApproveActions) => {
        const details = await actions.order?.capture()
        if(!details) return
        if(!details.id) return

        const { ok, message } = await paypalCheckPayment(details.id)
        if(!ok) {
            gooeyToast.error(message)
        }
        gooeyToast.success(message)
    }

    return (
        <>
            <GooeyToaster richColors />
            <PayPalButtons
                createOrder={createOrder}
                onApprove={handleApprove}
            />
        </>
    )
}