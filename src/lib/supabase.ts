import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy-initialized client-side Supabase client (limited permissions)
let _supabase: SupabaseClient | null = null;

export const getSupabase = () => {
    if (!_supabase) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        _supabase = createClient(supabaseUrl, supabaseAnonKey);
    }
    return _supabase;
};

// Keep backward-compatible export (lazy via getter)
export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
    },
});

// Server-side Supabase client (full permissions) - only use in API routes
export const getServiceSupabase = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    return createClient(supabaseUrl, serviceRoleKey);
};
