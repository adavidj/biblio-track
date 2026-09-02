// Auto-generated validation schemas
import { z } from 'zod';
export const updateProfileDtoSchema = z.object({
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
});

