-- Run this in your Supabase project: SQL Editor → New query → paste → Run.
-- Idempotent: safe to re-run.

create table if not exists public.intake_submissions (
  id              uuid        primary key default gen_random_uuid(),
  received_at     timestamptz not null    default now(),
  name            text        not null,
  email           text        not null,
  company         text        not null,
  role            text,
  website         text,
  project_type    text        not null,
  services        text[]      not null    default '{}',
  problem         text        not null,
  outcome         text,
  automation      text,
  tools           text,
  timeline        text,
  budget          text,
  notes           text
);

create index if not exists intake_submissions_received_at_idx
  on public.intake_submissions (received_at desc);

create index if not exists intake_submissions_email_idx
  on public.intake_submissions (email);

alter table public.intake_submissions enable row level security;

-- Public form: anyone can submit. Reads/updates/deletes stay blocked
-- (no policy = no access). Use the Supabase dashboard to view rows.
drop policy if exists "anon can insert intake submissions" on public.intake_submissions;
drop policy if exists "anyone can insert intake submissions" on public.intake_submissions;
create policy "anyone can insert intake submissions"
  on public.intake_submissions
  for insert
  to public
  with check (true);
