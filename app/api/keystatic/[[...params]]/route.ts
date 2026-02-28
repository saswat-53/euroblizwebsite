import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';
import { getSession } from '@/lib/auth/session';

const { GET, POST: keystatic_POST } = makeRouteHandler({
  config,
  localBaseDirectory: process.cwd(),
});

async function POST(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === '/api/keystatic/github/logout') {
    try {
      const session = await getSession();
      await session.destroy();
    } catch {}
  }

  return keystatic_POST(request);
}

export { GET, POST };
