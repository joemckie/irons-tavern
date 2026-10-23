import { z } from 'zod';
import clipboardy from 'clipboardy';

const response = await fetch(
  'https://oldschool.runescape.wiki/?title=Module:Collection_log/data.json&action=raw&ctype=application%2Fjson',
);

const data = z
  .array(
    z.object({
      name: z.string().min(1),
    }),
  )
  .parse(await response.json());

const collectionLogItemNames = new Set<string>(data.map((item) => item.name));

await clipboardy.write(
  [...collectionLogItemNames].map((name) => `'${name}'`).join(',\n'),
);
