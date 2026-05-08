-- Run this in your Supabase project: SQL Editor → New query → paste → Run.
-- Idempotent: safe to re-run.

create table if not exists public.intake_submissions (
  id              uuid        primary key default gen_random_uuid(),
  received_at     timestamptz not null    default now(),
  name            text        not null,
  email           text        not null,
  company         text,
  role            text,
  website         text,
  project_type    text,
  services        text[]      not null    default '{}',
  problem         text,
  outcome         text,
  automation      text,
  tools           text,
  timeline        text,
  budget          text,
  notes           text
);

-- Multi-step flow additions (idempotent for migration of an existing table).
alter table public.intake_submissions add column if not exists phone text;
alter table public.intake_submissions add column if not exists next_step_choice text;
alter table public.intake_submissions add column if not exists step_completed smallint not null default 1;
alter table public.intake_submissions alter column company drop not null;
alter table public.intake_submissions alter column project_type drop not null;
alter table public.intake_submissions alter column problem drop not null;

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
