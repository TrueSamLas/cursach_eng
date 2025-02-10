alter table "public"."demo" add constraint "demo_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."demo" validate constraint "demo_user_id_fkey";



