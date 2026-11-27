import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import dedent from "dedent";
import { APIDMChannel, ButtonStyle, ComponentType, Routes } from "discord-api-types/v10";
import { NextRequest, NextResponse } from "next/server";
import { fetchPlayerDetails } from "@/app/rank-calculator/data-sources/fetch-player-details/fetch-player-details";
import { getRankName } from "@/app/rank-calculator/utils/get-rank-name";
import { sendDiscordMessage } from "@/app/rank-calculator/utils/send-discord-message";
import { clientConstants } from "@/config/constants.client";
import { discordBotClient } from "@/discord";
import { withRequestContext } from "@/database/db";
import { OSRSAccount } from "@/database/entities/osrs-account";
import {
  fetchItemDropRates,
  generateRequiredItemList,
} from "@/app/rank-calculator/data-sources/fetch-dropped-item-info";
import { buildNotableItemList } from "@/app/rank-calculator/utils/build-notable-item-list";
import { calculatePlayerRank } from "@/app/rank-calculator/utils/calculators/calculate-player-rank";
import type { EntityManager } from "@mikro-orm/core";

export async function GET(request: NextRequest) {
  return withRequestContext((em) => checkAutoRank(em, request));
}

async function checkAutoRank(em: EntityManager, request: NextRequest) {
  try {
    const player = z
      .string({ error: "Player is required" })
      .transform((encodedPlayer) => decodeURIComponent(encodedPlayer))
      .parse(request.nextUrl.searchParams.get("player"));

    const discordId = z
      .string({ error: "Discord ID is required" })
      .parse(request.nextUrl.searchParams.get("discord_id"));

    const playerDetails = await fetchPlayerDetails(em, player, discordId);

    if (!playerDetails.success) {
      throw new Error("Failed to fetch player details");
    }

    const { currentRank, hasThirdPartyData, playerName } = playerDetails.data;

    if (!hasThirdPartyData) {
      return NextResponse.json({ success: true });
    }

    const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);
    const items = Object.entries(await buildNotableItemList(dropRates));
    const { rank } = calculatePlayerRank(playerDetails.data, items);

    if (rank !== currentRank) {
      const account = await em.findOneOrFail(OSRSAccount, {
        user: discordId,
        name: player,
      });

      // Send a message if the user has not been notified of this rank in the past
      if (account.lastNotifiedRank !== rank) {
        const { id: dmChannelId } = (await discordBotClient.post(Routes.userChannels(), {
          body: { recipient_id: discordId },
        })) as APIDMChannel;

        await sendDiscordMessage(
          {
            content: dedent`
              Congratulations, you are eligible for the ${getRankName(rank)} rank on ${playerName}!
              
              Click the button below to go to the rank calculator and apply.
            `,
            components: [
              {
                components: [
                  {
                    label: "Apply for rank",
                    url: `${clientConstants.publicUrl}/rank-calculator/${encodeURIComponent(player)}`,
                    style: ButtonStyle.Link,
                    type: ComponentType.Button,
                  },
                ],
                type: ComponentType.ActionRow,
              },
            ],
          },
          dmChannelId,
        );

        account.lastNotifiedRank = rank;

        await em.flush();
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json({ success: false });
  }
}
