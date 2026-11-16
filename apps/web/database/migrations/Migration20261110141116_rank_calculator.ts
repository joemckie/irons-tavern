import { Migration } from '@mikro-orm/migrations';

export class Migration20261110141116_rank_calculator extends Migration {
  override name = 'Migration20261110141116_rank_calculator';

  override up(): void | Promise<void> {
    this.addSql(`create extension if not exists citext;`);

    this.addSql(
      `create table "player_game_mode" ("player_name" citext not null, "game_mode" int not null, primary key ("player_name"));`,
    );

    this.addSql(
      `create table "draft_rank_submission" ("osrs_account_id" uuid not null, "data" jsonb not null, "updated_at" timestamptz not null, primary key ("osrs_account_id"));`,
    );

    this.addSql(
      `alter table "rank_submission" drop constraint "rank_submission_osrs_account_id_foreign";`,
    );

    this.addSql(
      `alter table "osrs_account" add "join_date" timestamptz not null, add "rank" varchar(255) null, add "is_mobile_only" boolean not null default false, add "is_name_invalid" boolean not null default false, add "last_notified_rank" varchar(255) null;`,
    );
    this.addSql(
      `alter table "osrs_account" alter column "name" type citext using ("name"::citext);`,
    );
    this.addSql(
      `alter table "osrs_account" add constraint "osrs_account_user_discord_id_name_unique" unique ("user_discord_id", "name");`,
    );

    this.addSql(`alter table "rank_submission" add "data" jsonb not null;`);
    this.addSql(
      `alter table "rank_submission" alter column "osrs_account_id" drop not null;`,
    );
    this.addSql(
      `alter table "rank_submission" add constraint "rank_submission_osrs_account_id_foreign" foreign key ("osrs_account_id") references "osrs_account" ("id") on delete set null;`,
    );

    this.addSql(
      `alter table "draft_rank_submission" add constraint "draft_rank_submission_osrs_account_id_foreign" foreign key ("osrs_account_id") references "osrs_account" ("id") on update cascade on delete cascade;`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "player_game_mode" cascade;`);
    this.addSql(`drop table if exists "draft_rank_submission" cascade;`);

    this.addSql(
      `alter table "rank_submission" drop constraint "rank_submission_osrs_account_id_foreign";`,
    );

    this.addSql(
      `alter table "osrs_account" drop constraint "osrs_account_user_discord_id_name_unique";`,
    );
    this.addSql(
      `alter table "osrs_account" drop column "join_date", drop column "rank", drop column "is_mobile_only", drop column "is_name_invalid", drop column "last_notified_rank";`,
    );
    this.addSql(
      `alter table "osrs_account" alter column "name" type varchar(255) using ("name"::varchar(255));`,
    );

    this.addSql(`alter table "rank_submission" drop column "data";`);
    this.addSql(
      `alter table "rank_submission" alter column "osrs_account_id" set not null;`,
    );
    this.addSql(
      `alter table "rank_submission" add constraint "rank_submission_osrs_account_id_foreign" foreign key ("osrs_account_id") references "osrs_account" ("id");`,
    );
  }
}
