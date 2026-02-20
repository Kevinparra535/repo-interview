import { bankProductSchema } from '@/ui/validators/bankProductSchema';

describe('bankProductSchema', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const nextYear = new Date(tomorrow);
  nextYear.setFullYear(nextYear.getFullYear() + 1);

  it('accepts valid payload', () => {
    const result = bankProductSchema.safeParse({
      id: 'abc123',
      name: 'Cuenta Premium',
      description: 'Descripción válida para producto bancario',
      logo: 'https://example.com/logo.png',
      date_release: tomorrow,
      date_revision: nextYear,
    });

    expect(result.success).toBe(true);
  });

  it('rejects short id and name', () => {
    const result = bankProductSchema.safeParse({
      id: 'ab',
      name: 'abc',
      description: 'Descripción válida para producto bancario',
      logo: 'https://example.com/logo.png',
      date_release: tomorrow,
      date_revision: nextYear,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain('Mínimo 3 caracteres');
      expect(messages).toContain('Mínimo 5 caracteres');
    }
  });

  it('rejects release date before today', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const result = bankProductSchema.safeParse({
      id: 'abc123',
      name: 'Cuenta Premium',
      description: 'Descripción válida para producto bancario',
      logo: 'https://example.com/logo.png',
      date_release: yesterday,
      date_revision: nextYear,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message.includes('igual o mayor'))).toBe(
        true,
      );
    }
  });

  it('rejects revision date not one year after release', () => {
    const wrongRevision = new Date(tomorrow);
    wrongRevision.setMonth(wrongRevision.getMonth() + 6);

    const result = bankProductSchema.safeParse({
      id: 'abc123',
      name: 'Cuenta Premium',
      description: 'Descripción válida para producto bancario',
      logo: 'https://example.com/logo.png',
      date_release: tomorrow,
      date_revision: wrongRevision,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.message.includes('exactamente un año posterior')),
      ).toBe(true);
    }
  });
});
