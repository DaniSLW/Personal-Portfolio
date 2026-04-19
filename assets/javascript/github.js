async function loadGitHubStats(username) {
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await reposRes.json();

    const totalStars = repos.reduce((sum, repo) => {
      return sum + repo.stargazers_count;
    }, 0);

    document.getElementById("githubName").textContent = userData.name;
    document.getElementById("githubUsername").textContent = userData.login;
    document.getElementById("githubAvatar").src = userData.avatar_url;
    document.getElementById("repoCount").textContent = userData.public_repos;
    document.getElementById("starCount").textContent = totalStars;

  } catch (error) {
    console.error("Error loading GitHub data:", error);
  }
}

loadGitHubStats("DaniSLW");