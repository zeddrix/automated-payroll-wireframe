/** Password policy rules for sign-up — shared by schemas and checklist UI */

export type PasswordRequirementId = 'minLength' | 'hasLetter' | 'hasNumber' | 'hasSpecial';

export interface PasswordRequirement {
  id: PasswordRequirementId;
  label: string;
  test: (password: string) => boolean;
}

export const PASSWORD_REQUIREMENTS: readonly PasswordRequirement[] = [
  {
    id: 'minLength',
    label: 'At least 8 characters',
    test: (password) => password.length >= 8
  },
  {
    id: 'hasLetter',
    label: 'At least one letter',
    test: (password) => /[A-Za-z]/.test(password)
  },
  {
    id: 'hasNumber',
    label: 'At least one number',
    test: (password) => /\d/.test(password)
  },
  {
    id: 'hasSpecial',
    label: 'At least one special character',
    test: (password) => /[^A-Za-z0-9]/.test(password)
  }
] as const;

export function evaluatePasswordRequirements(
  password: string
): Record<PasswordRequirementId, boolean> {
  const result = {} as Record<PasswordRequirementId, boolean>;
  for (const rule of PASSWORD_REQUIREMENTS) {
    result[rule.id] = rule.test(password);
  }
  return result;
}

export function passwordMeetsPolicy(password: string): boolean {
  return PASSWORD_REQUIREMENTS.every((rule) => rule.test(password));
}
