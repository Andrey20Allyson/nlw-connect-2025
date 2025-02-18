import z from 'zod'

const schema = z.object({
  PORT: z.coerce.number().default(3333),
})

export const env = schema.parse(process.env)
