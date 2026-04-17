fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project');

    Object.entries(data).forEach(([category, projects]) => {

      projects.forEach(project => {

        const card = document.createElement('div');
        card.classList.add('card-project');

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.title || "No title";

        const preview = document.createElement('img');
        preview.src = project["preview-image"] || "";
        preview.alt = "Project Preview";

        const badgesContainer = document.createElement('div');
        badgesContainer.classList.add('badges-container');

        ['badge1', 'badge2', 'badge3', 'badge4'].forEach(key => {
          if (project[key] && project[key] !== "N/A") {
            const badge = document.createElement('span');
            badge.textContent = project[key];
            badge.classList.add('badge-project');
            badgesContainer.appendChild(badge);
          }
        });

        const projectDescription = document.createElement('p');
        projectDescription.textContent = project.description || "";

        const status = document.createElement('div');
        const statusText = project.status || "Unknown";
        status.textContent = statusText;
        status.classList.add('status-project');
        status.classList.add(
          statusText.toLowerCase().replace(/\s/g, '-')
        );

        const linksContainer = document.createElement('div');
        linksContainer.classList.add('links-container');

        if (project["demo-link"] && project["demo-link"] !== "N/A") {
          const linkDemo = document.createElement('a');
          linkDemo.innerHTML = "<i class='fas fa-eye'></i> Demo";
          linkDemo.href = project["demo-link"];
          linkDemo.target = "_blank";
          linkDemo.classList.add('demo-link');
          linksContainer.appendChild(linkDemo);
        }

        if (project["github-link"] && project["github-link"] !== "N/A") {
          const linkGit = document.createElement('a');
          linkGit.innerHTML = "<i class='fab fa-github'></i> GitHub";
          linkGit.href = project["github-link"];
          linkGit.target = "_blank";
          linkGit.classList.add('github-link');
          linksContainer.appendChild(linkGit);
        }

        card.appendChild(projectTitle);
        card.appendChild(preview);

        if (badgesContainer.children.length > 0) {
          card.appendChild(badgesContainer);
        }

        card.appendChild(projectDescription);
        card.appendChild(status);

        if (linksContainer.children.length > 0) {
          card.appendChild(linksContainer);
        }

        container.appendChild(card);
      });
    });
  })
  .catch(err => console.error("Error loading projects:", err));