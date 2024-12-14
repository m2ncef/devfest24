import { z } from 'zod';

export const DemoSchema = z.object({
  category: z.enum(['ecommerce', 'design', 'development'], {
    required_error: 'Please select a business category',
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  datestart: z.string().min(1, 'Launch date is required'),
  montestart: z.string().min(1, 'Initial budget is required'),
  monthend: z.string().min(1, 'Target revenue is required'),
});

export type DemoType = z.infer<typeof DemoSchema>;
