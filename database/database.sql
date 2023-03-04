

create or replace function public.handle_new_setting()
              returns trigger
              language plpgsql
              security definer set search_path = public
    as $$
begin
insert into public.settings (name, address, profile_id, "default")
values ('name-printer', '192.168.0.0', new.id, true );
return new;
end;
$$;

-- trigger the function every time a user is created
drop trigger if exists on_auth_user_setting_created on auth.user;
create trigger on_auth_user_setting_created
    after insert on auth.users
    for each row execute procedure public.handle_new_setting();