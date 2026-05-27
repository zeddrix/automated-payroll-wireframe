/** When to surface inline field errors in auth forms */

export interface ShouldShowFieldErrorInput {
  touched: boolean;
  submitted: boolean;
  hasError: boolean;
}

export function shouldShowFieldError(input: ShouldShowFieldErrorInput): boolean {
  return (input.touched || input.submitted) && input.hasError;
}
