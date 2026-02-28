import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

const { GET, POST: keystatic_POST } = makeRouteHandler({
  config,
  localBaseDirectory: process.cwd(),
});

async function POST(request: Request) {
  const url = new URL(request.url);
  const response = await keystatic_POST(request);

  if (url.pathname === '/api/keystatic/github/logout') {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieValue = `admin_auth_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${isProduction ? '; Secure' : ''}`;

    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    newResponse.headers.append('Set-Cookie', cookieValue);
    return newResponse;
  }

  return response;
}

export { GET, POST };
