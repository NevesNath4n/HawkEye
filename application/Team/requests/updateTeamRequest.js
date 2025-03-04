import z from 'zod';

let updateTeamRequestParser = z.object({
    name: z.string().max(255),
    description: z.string().max(255),
    members: z.array(z.object({email:z.string().email(),role:z.string()})),
});


export default updateTeamRequestParser;