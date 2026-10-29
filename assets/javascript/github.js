// ===== GITHUB STATS =====
(async function loadGitHubStats(username) {
  const ids = {
    name:     document.getElementById('githubName'),
    login:    document.getElementById('githubUsername'),
    avatar:   document.getElementById('githubAvatar'),
    repos:    document.getElementById('repoCount'),
    stars:    document.getElementById('starCount'),
  };

  [ids.name, ids.login, ids.repos, ids.stars].forEach(el => {
    if (el) el.classList.add('gh-loading');
  });

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    ]);

    if (!userRes.ok) throw new Error(`GitHub API: ${userRes.status}`);

    const userData = await userRes.json();
    const repos    = reposRes.ok ? await reposRes.json() : [];

    const totalStars = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
      : 0;

    function countUp(el, target, duration = 800) {
      if (!el) return;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    if (ids.name)   { ids.name.textContent   = userData.name || username; }
    if (ids.login)  { ids.login.textContent  = '@' + userData.login; }
    if (ids.avatar) {
      ids.avatar.src = userData.avatar_url;
      ids.avatar.style.opacity = '0';
      ids.avatar.onload = () => {
        ids.avatar.style.transition = 'opacity 0.4s ease';
        ids.avatar.style.opacity = '1';
      };
    }

    countUp(ids.repos, userData.public_repos);
    countUp(ids.stars, totalStars);

  } catch (err) {
    console.warn('Could not load GitHub data:', err.message);
    if (ids.name)  ids.name.textContent  = username;
    if (ids.login) ids.login.textContent = '@' + username;
    if (ids.repos) ids.repos.textContent = '—';
    if (ids.stars) ids.stars.textContent = '—';
  } finally {
    [ids.name, ids.login, ids.repos, ids.stars].forEach(el => {
      if (el) el.classList.remove('gh-loading');
    });
  }
})('DaniSLW');