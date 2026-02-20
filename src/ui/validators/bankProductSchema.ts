import { z } from 'zod';

const todayMidnight = (): Date => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const bankProductSchema = z
  .object({
    id: z.string().min(3, 'Mínimo 3 caracteres').max(10, 'Máximo 10 caracteres'),
    name: z.string().min(5, 'Mínimo 5 caracteres').max(100, 'Máximo 100 caracteres'),
    description: z.string().min(10, 'Mínimo 10 caracteres').max(200, 'Máximo 200 caracteres'),
    logo: z.string().min(1, 'Requerido'),
    date_release: z
      .date({ error: 'Fecha inválida' })
      .refine((d) => d >= todayMidnight(), 'Debe ser igual o mayor a la fecha actual'),
    date_revision: z.date({ error: 'Fecha inválida' }),
  })
  .superRefine((data, ctx) => {
    if (data.date_release && data.date_revision) {
      const expected = new Date(data.date_release);
      expected.setFullYear(expected.getFullYear() + 1);

      // Allow ± 1 day tolerance for timezone differences
      const diff = Math.abs(data.date_revision.getTime() - expected.getTime());
      if (diff > 86_400_000) {
        ctx.addIssue({
          code: 'custom',
          path: ['date_revision'],
          message: 'Debe ser exactamente un año posterior a la fecha de liberación',
        });
      }
    }
  });

export type BankProductFormData = z.infer<typeof bankProductSchema>;
