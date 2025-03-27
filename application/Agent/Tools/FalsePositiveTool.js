import {tool} from 'ai';
import {z} from 'zod';

let FalsePositiveAnswer = tool({
    description: 'A tool for providing the final answer.',
    parameters:z.object({
        repositoryId: z.string(),
        vulnerabilities: z.array(z.object({
            vulnerabilityId: z.string(),
            isFalsePositive: z.boolean(),
            assurance: z.number(),
            remediation: z.string(),
            explanation: z.string()
        }))
    }),
    answer:z.string()
})

export default FalsePositiveAnswer;