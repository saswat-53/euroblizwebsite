import { makeRouteHandler } from '@keystatic/next/route-handler';
import { NextResponse } from 'next/server';
import config from '../../../../keystatic.config';

const { GET: keystatic_GET, POST } = makeRouteHandler({
  config,
  localBaseDirectory: process.cwd(),
});

async function GET(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === '/api/keystatic/github/logout') {
    const keystatic_response = await keystatic_GET(request);
    const location = keystatic_response.headers.get('Location') ?? '/keystatic';

    const response = NextResponse.redirect(new URL(location, request.url), {
      status: keystatic_response.status,
    });

    // Copy Keystatic's own Set-Cookie headers (clears GitHub OAuth tokens)
    keystatic_response.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'set-cookie') {
        response.headers.append('Set-Cookie', value);
      }
    });

    // Delete our iron-session cookie
    response.cookies.delete('admin_auth_session');

    return response;
  }

  return keystatic_GET(request);
}

export { GET, POST };
