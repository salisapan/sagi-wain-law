-- Contact-form lead capture for the sagi-wain-law site.
-- Apply via `supabase db push` or paste into the Supabase SQL editor,
-- against a dedicated Supabase project for this site (not realrtade's).

create table if not exists public.sagi_wain_leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  email      text,
  message    text,
  interest   text,
  source     text not null default 'website-contact-form',
  created_at timestamptz not null default now()
);

alter table public.sagi_wain_leads enable row level security;

-- Anonymous visitors can submit a lead (INSERT only). No SELECT/UPDATE/DELETE
-- for anon, so submitted leads are only readable via the service role / dashboard
-- or through the notification email sent by the send-lead-notification function.
drop policy if exists "anon can submit lead" on public.sagi_wain_leads;
create policy "anon can submit lead"
  on public.sagi_wain_leads
  for insert
  to anon
  with check (true);
