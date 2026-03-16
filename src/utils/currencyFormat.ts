
export const currencyFormat = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARG',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}
