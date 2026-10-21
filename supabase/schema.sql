-- Portfolio feedback demo. Safe to run more than once.
create table if not exists public.portfolio_feedback (
  id uuid primary key,
  face text not null check (face in ('wow','happy','medium','sad')),
  note text not null default '' check (char_length(note) <= 280),
  name text not null default 'Anonymous' check (char_length(name) <= 40),
  created_at timestamptz not null default now()
);

create index if not exists portfolio_feedback_created_idx
  on public.portfolio_feedback (created_at desc);

-- All access goes through the Next.js API route using the service-role key,
-- so no public policies are created. Row-level security blocks direct access.
alter table public.portfolio_feedback enable row level security;
