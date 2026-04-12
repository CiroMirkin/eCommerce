import z from "zod"

export const productScheme = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform(n => Number(n.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(n => Number(n.toFixed())),
    categoryId: z.string(),
    sizes: z.coerce.string().transform(v => v.split(',')),
    tags: z.string(),
})
