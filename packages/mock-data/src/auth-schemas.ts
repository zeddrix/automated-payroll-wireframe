import { z } from 'zod';
import { passwordMeetsPolicy } from './auth-policy.js';

const emailRequired = 'Email is required';
const emailInvalid = 'Enter a valid email address';

export const loginSchema = z.object({
  email: z.string().trim().min(1, emailRequired).email(emailInvalid),
  password: z.string().min(1, 'Password is required')
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .transform((v) => v.trim())
      .pipe(
        z.string().min(1, 'Full name is required').min(2, 'Full name must be at least 2 characters')
      ),
    email: z.string().trim().min(1, emailRequired).email(emailInvalid),
    password: z
      .string()
      .min(1, 'Password is required')
      .refine(passwordMeetsPolicy, 'Password does not meet security requirements'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms to continue' })
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, emailRequired).email(emailInvalid)
});

export type LoginValues = z.infer<typeof loginSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export type SignUpFieldKey = keyof SignUpValues;
export type LoginFieldKey = keyof LoginValues;
export type ForgotPasswordFieldKey = keyof ForgotPasswordValues;

export interface ParseResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Partial<Record<string, string>>;
}

function zodFieldErrors(error: z.ZodError): Partial<Record<string, string>> {
  const out: Partial<Record<string, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && out[key] === undefined) {
      out[key] = issue.message;
    }
  }
  return out;
}

function firstErrorMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'Validation failed';
}

export function parseLogin(email: string, password: string): ParseResult<LoginValues> {
  const result = loginSchema.safeParse({ email, password });
  if (result.success) {
    return { success: true, data: result.data };
  }
  const fieldErrors = zodFieldErrors(result.error);
  return { success: false, error: firstErrorMessage(result.error), fieldErrors };
}

export function parseSignUp(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  termsAccepted: boolean
): ParseResult<SignUpValues> {
  const result = signUpSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
    termsAccepted
  });
  if (result.success) {
    return { success: true, data: result.data };
  }
  const fieldErrors = zodFieldErrors(result.error);
  return { success: false, error: firstErrorMessage(result.error), fieldErrors };
}

export function parseForgotPassword(email: string): ParseResult<ForgotPasswordValues> {
  const result = forgotPasswordSchema.safeParse({ email });
  if (result.success) {
    return { success: true, data: result.data };
  }
  const fieldErrors = zodFieldErrors(result.error);
  return { success: false, error: firstErrorMessage(result.error), fieldErrors };
}

export function isLoginSubmittable(email: string, password: string): boolean {
  return loginSchema.safeParse({ email, password }).success;
}

export function isSignUpSubmittable(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  termsAccepted: boolean
): boolean {
  return signUpSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
    termsAccepted
  }).success;
}

export function isForgotPasswordSubmittable(email: string): boolean {
  return forgotPasswordSchema.safeParse({ email }).success;
}

export interface SignUpTouchState {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  terms?: boolean;
}

export function getSignUpFieldErrors(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  termsAccepted: boolean,
  options: { touched: SignUpTouchState; submitted: boolean }
): Partial<Record<SignUpFieldKey, string | null>> {
  const parsed = parseSignUp(name, email, password, confirmPassword, termsAccepted);
  const raw = parsed.fieldErrors ?? {};
  const keys: SignUpFieldKey[] = ['name', 'email', 'password', 'confirmPassword', 'termsAccepted'];
  const out: Partial<Record<SignUpFieldKey, string | null>> = {};
  for (const key of keys) {
    const message = raw[key] ?? null;
    const touchKey = key === 'termsAccepted' ? 'terms' : key;
    const touched = options.touched[touchKey as keyof SignUpTouchState] ?? false;
    const hasError = message !== null;
    const show = hasError && (options.submitted || touched);
    out[key] = show ? message : null;
  }
  return out;
}

export function getLoginFieldErrors(
  email: string,
  password: string,
  options: { touched: Partial<Record<LoginFieldKey, boolean>>; submitted: boolean }
): Partial<Record<LoginFieldKey, string | null>> {
  const parsed = parseLogin(email, password);
  const raw = parsed.fieldErrors ?? {};
  const keys: LoginFieldKey[] = ['email', 'password'];
  const out: Partial<Record<LoginFieldKey, string | null>> = {};
  for (const key of keys) {
    const message = raw[key] ?? null;
    const touched = options.touched[key] ?? false;
    const hasError = message !== null;
    const show = hasError && (options.submitted || touched);
    out[key] = show ? message : null;
  }
  return out;
}

export function getForgotPasswordFieldErrors(
  email: string,
  options: { touched: Partial<Record<ForgotPasswordFieldKey, boolean>>; submitted: boolean }
): Partial<Record<ForgotPasswordFieldKey, string | null>> {
  const parsed = parseForgotPassword(email);
  const raw = parsed.fieldErrors ?? {};
  const message = raw.email ?? null;
  const touched = options.touched.email ?? false;
  const show = message !== null && (options.submitted || touched);
  return { email: show ? message : null };
}
