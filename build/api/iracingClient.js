import FileCookieStore from '@root/file-cookie-store';
import { CookieJar } from 'tough-cookie';
import axios from 'axios';
import { HttpCookieAgent, HttpsCookieAgent } from 'http-cookie-agent/http';
import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';

const store = new FileCookieStore('./cookie.txt', { auto_sync: false });
const jar = new CookieJar(store);

export const client = axios.create({
  baseURL: 'https://members-ng.iracing.com',
  httpAgent: new HttpCookieAgent({ cookies: { jar } }),
  httpsAgent: new HttpsCookieAgent({ cookies: { jar } }),
});

export const clientGet = async (url, queryParams = {}) => {
  const params = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    params.append(key, value);
  });

  const response = await client.get(`${url}?${params.toString()}`);
  return client.get(response.data.link);
};

export async function auth(username, password) {
  const cookies = await jar.getCookies('https://members-ng.iracing.com');
  const authCookie = cookies.find((cookie) => cookie.key === 'authtoken_members');
  if (authCookie && authCookie.TTL() > 0) {
    return;
  }

  const hashPassword = Base64.stringify(sha256(password + username.toLowerCase()));
  await client.post('/auth', {
    email: username,
    password: hashPassword,
  });
  store.save();
}
