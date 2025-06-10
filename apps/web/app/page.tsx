import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function Home() {
  redirect('/login');
}
