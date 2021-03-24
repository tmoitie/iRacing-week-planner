import { Cookie } from 'tough-cookie';

export default async function login(page, username, password) {
  await page.goto('https://members.iracing.com/membersite/login.jsp');

  const userField = await page.$('[name="username"]');
  await userField.focus();
  await userField.type(username);

  const passwordField = await page.$('[name="password"]');
  await passwordField.focus();
  await passwordField.type(password);

  const button = await page.$('input.log-in');
  await button.click();

  await page.waitForResponse('https://members.iracing.com/membersite/member/Home.do');

  console.log('Logged in');

  const cookies = await page.cookies('https://members.iracing.com');
  const cookieWeWant = cookies.find((cookie) => cookie.name === 'irsso_membersv2');

  return new Cookie({
    key: cookieWeWant.name,
    value: cookieWeWant.value,
    httpOnly: cookieWeWant.httpOnly,
    domain: cookieWeWant.domain,
    path: cookieWeWant.path,
    expires: cookieWeWant.expires === -1 ? 'Infinity' : new Date(cookieWeWant.expires),
    secure: cookieWeWant.secure,
  });

}
