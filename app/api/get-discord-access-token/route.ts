import { setAccessToken, setRefreshToken } from '@/app/rank-calculator/actions';
import { makeDiscordRequest } from '@/app/rank-calculator/utils/discord';
import { constants } from '@/config/constants';
import { REST } from '@discordjs/rest';
import { RESTPostOAuth2AccessTokenResult, Routes } from 'discord-api-types/v10';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    if (!constants.discord.token) {
      throw new Error('No discord token provided');
    }

    if (!constants.discord.clientSecret) {
      throw new Error('No discord secret provided');
    }

    if (!constants.discord.redirectUri) {
      throw new Error('No discord redirect URI provided');
    }

    if (!constants.discord.clientId) {
      throw new Error('No discord client ID provided');
    }

    const code = request.nextUrl.searchParams.get('code');

    if (!code) {
      throw new Error('Please provide a code');
    }

    const discord = new REST({
      makeRequest: makeDiscordRequest,
    }).setToken(constants.discord.token);

    const response = (await discord.post(Routes.oauth2TokenExchange(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: constants.discord.clientId,
        client_secret: constants.discord.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: constants.discord.redirectUri,
        scope: 'identify',
      }).toString(),
      passThroughBody: true,
      auth: false,
    })) as RESTPostOAuth2AccessTokenResult;

    await Promise.all([
      setAccessToken(response.access_token, response.expires_in),
      setRefreshToken(response.refresh_token),
    ]);

    return NextResponse.redirect(
      `${constants.publicUrl}/rank-calculator/players`,
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      error,
      success: false,
    });
  }
}
