-- Run this once in the Supabase SQL editor (free tier).
create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique check (char_length(email) <= 254),
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Let the public API role insert (and nothing else).
grant usage on schema public to anon;
grant insert on public.waitlist to anon;
grant usage on sequence public.waitlist_id_seq to anon;

-- The public (anon) key may only INSERT. Nobody can read the list without the service key.
drop policy if exists "anyone can join the waitlist" on public.waitlist;
create policy "anyone can join the waitlist"
  on public.waitlist for insert
  to anon
  with check (true);
