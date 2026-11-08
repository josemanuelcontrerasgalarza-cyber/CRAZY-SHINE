-- Crazy Shine · Neon (PostgreSQL) schema
create table if not exists bookings (
  id             bigint generated always as identity primary key,
  created_at     timestamptz not null default now(),
  name           text        not null check (char_length(name) between 2 and 120),
  phone          text        not null check (char_length(phone) between 7 and 20),
  vehicle        text        check (char_length(vehicle) <= 120),
  service        text        check (char_length(service) <= 80),
  preferred_date date,
  message        text        check (char_length(message) <= 1000),
  consent        boolean     not null,
  status         text        not null default 'new' check (status in ('new', 'contacted', 'booked', 'done', 'cancelled')),
  source         text        not null default 'web'
);

create index if not exists bookings_created_at_idx on bookings (created_at desc);
create index if not exists bookings_status_idx on bookings (status);
