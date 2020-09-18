export default function contributorsFilter(contributors) {
  const contributorsFiltered = contributors.filter((contributor) => {
    return contributor.login !== 'dependabot[bot]';
  });

  return contributorsFiltered.map(contributor => ({
    id: contributor.id,
    html_url: contributor.html_url,
    login: contributor.login,
  }));
}
