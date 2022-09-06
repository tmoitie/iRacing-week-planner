import axios from 'axios';

export default async function getContributors(githubToken) {
  const githubOptions = githubToken ? {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  } : {};

  const contribResponse = await axios.get(
    'https://api.github.com/repos/tmoitie/iRacing-week-planner/contributors',
    githubOptions,
  );

  const contributorsFiltered = contribResponse.data.filter((contributor) => contributor.login !== 'dependabot[bot]');

  return contributorsFiltered.map((contributor) => ({
    id: contributor.id,
    html_url: contributor.html_url,
    login: contributor.login,
  }));
}
