import type { FieldErrors, FieldValues, Resolver, ResolverResult } from 'react-hook-form';
import type { ZodType } from 'zod';

/**
 * Lightweight Zod → react-hook-form resolver.
 * Avoids the @hookform/resolvers dependency.
 */
export function zodResolver<TFieldValues extends FieldValues = FieldValues>(
  schema: ZodType,
): Resolver<TFieldValues> {
  return (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return { values: result.data as TFieldValues, errors: {} } as ResolverResult<TFieldValues>;
    }

    const errors: FieldErrors<TFieldValues> = {} as FieldErrors<TFieldValues>;

    for (const issue of result.error.issues) {
      if (Array.isArray(issue.path) && issue.path.length > 0) {
        const key = String(issue.path[0]) as keyof TFieldValues;
        if (!errors[key]) {
          (errors as any)[key] = {
            type: String((issue as { code?: string }).code ?? 'validation'),
            message: issue.message,
          };
        }
      }
    }

    return { values: {}, errors } as ResolverResult<TFieldValues>;
  };
}
