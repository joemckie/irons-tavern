import { z } from 'zod';
import { zfd } from 'zod-form-data';

async function validatePlayerExists(playerName: string) {
  try {
    const response = await fetch(
      `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${playerName}`,
    );

    return response.status === 200;
  } catch {
    return false;
  }
}

export const AddPlayerSchema = zfd.formData({
  playerName: z
    .string()
    .max(12)
    .refine(validatePlayerExists, 'Invalid player name'),
  joinDate: z.coerce.date().max(new Date()),
});
