import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import { defaultModuleTabPath } from '@aps/contracts';

export function load() {
  redirect(307, `${base}${defaultModuleTabPath('auth')}`);
}
