import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });

  // Verifica a sessão do usuário
  const { data: { session } } = await supabase.auth.getSession();

  // Redireciona para a página de login se o usuário não estiver autenticado
  if (!session && req.nextUrl.pathname !== '/login') {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}