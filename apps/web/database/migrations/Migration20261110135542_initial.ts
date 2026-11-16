import { Migration } from '@mikro-orm/migrations';

export class Migration20261110135542_initial extends Migration {
  override name = 'Migration20261110135542_initial';

  override up(): void | Promise<void> {
    this.addSql(
      `create table "user" ("discord_id" varchar(255) not null, "name" varchar(255) not null, primary key ("discord_id"));`,
    );

    this.addSql(
      `create table "osrs_account" ("id" uuid not null, "name" varchar(255) not null, "user_discord_id" varchar(255) not null, primary key ("id"));`,
    );

    this.addSql(
      `create table "rank_submission" ("id" uuid not null, "metadata" jsonb not null, "diff" jsonb not null, "osrs_account_id" uuid not null, primary key ("id"));`,
    );

    this.addSql(
      `alter table "osrs_account" add constraint "osrs_account_user_discord_id_foreign" foreign key ("user_discord_id") references "user" ("discord_id");`,
    );

    this.addSql(
      `alter table "rank_submission" add constraint "rank_submission_osrs_account_id_foreign" foreign key ("osrs_account_id") references "osrs_account" ("id");`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(
      `alter table "osrs_account" drop constraint "osrs_account_user_discord_id_foreign";`,
    );
    this.addSql(
      `alter table "rank_submission" drop constraint "rank_submission_osrs_account_id_foreign";`,
    );

    this.addSql(`drop table if exists "user" cascade;`);
    this.addSql(`drop table if exists "osrs_account" cascade;`);
    this.addSql(`drop table if exists "rank_submission" cascade;`);
  }
}
