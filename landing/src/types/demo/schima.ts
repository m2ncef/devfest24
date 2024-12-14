import { z } from "zod";

export const DemoSchema = z.object({
companyName:z.string(),
industry:z.string(),
numberEmpl: z.string(),
revenue:z.string(),
marketing:z.string(),
costumerBase: z.string(),
growthRate: z.string(),
NumberCompititors: z.string(),
OperationCost: z.string(),


});



export type DemoType = z.infer<typeof DemoSchema>;  
