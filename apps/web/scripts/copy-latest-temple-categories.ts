import clipboardy from 'clipboardy';

const response = await fetch(
  'https://templeosrs.com/api/collection-log/category_parameters.php',
);

const responseText = await response.text();
const categories = responseText.split(', ');

const templeCategories = new Set<string>(categories);

await clipboardy.write(
  [...templeCategories].map((name) => `'${name}'`).join(',\n'),
);
