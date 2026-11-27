import { auth } from "@/auth";
import { connection } from "next/server";
import { withRequestContext } from "@/database/db";
import { OSRSAccount } from "@/database/entities/osrs-account";

export async function fetchPlayerAccounts() {
  await connection();

  return withRequestContext(async (em) => {
    const session = await auth();

    if (!session?.user?.id) {
      return [];
    }

    const accounts = await em.find(
      OSRSAccount,
      { user: session.user.id },
      { orderBy: { name: "asc" } },
    );

    return accounts.map((account) => account.toPlayer());
  });
}
