import axios from 'axios';
import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';
import crypto from "node:crypto";

export const client = axios.create({
  baseURL: 'https://members-ng.iracing.com',
});

let token = '';

function mask(secret, id) {
  const hasher = crypto.createHash("sha256");
  const normalized_id = id.trim().toLowerCase();

  hasher.update(`${secret}${normalized_id}`);

  return hasher.digest("base64");
}

export const clientGet = async (url, queryParams = {}) => {
  const params = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    params.append(key, value);
  });

  const response = await client.get(`${url}?${params.toString()}`, { headers: { 'Authorization': `Bearer ${token}` } });

  if (response.headers['content-type'] && !response.headers['content-type'].includes('application/json')) {
    throw new Error(`Bad response from iRacing: ${response.headers['content-type']}`);
  }

  return axios.get(response.data.link);
};

export async function auth(username, password, clientId, clientSecret) {
  // const hashPassword = Base64.stringify(sha256(password + username.toLowerCase()));

  const hashPassword = mask(password, username);

  const params = new URLSearchParams();
  params.append('grant_type', 'password_limited');
  params.append('client_id', clientId);
  params.append('client_secret', mask(clientSecret, clientId));
  params.append('username', username);
  params.append('password', mask(password, username));
  params.append('scope', 'iracing.auth');

  const response = await axios.post('https://oauth.iracing.com/oauth2/token', params, {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });

  // todo store this and refresh flows

  token = response.data.access_token;
}
