import z from "zod"


let TeamSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().max(255),
    members: z.array(z.object({
        email: z.string(),
        role: z.string()
    })).min(1)
})


export default TeamSchema