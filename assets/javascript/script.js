fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('projects');

    Object.entries(data).forEach(([category, projects]) => {
      
      const title = document.createElement('h2');
      title.textContent = category.replace('-', ' ');
      container.appendChild(title);

      const section = document.createElement('div');

      projects.forEach(project => {
        const card = document.createElement('div');

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.title;

        const preview = document.createElement('p');
        preview.textContent = "Preview: " + project["preview-image"];

        const link = document.createElement('a');
        link.textContent = "GitHub";
        link.href = project["github-link"];
        link.target = "_blank";

        card.appendChild(projectTitle);
        card.appendChild(preview);
        card.appendChild(link);

        section.appendChild(card);
      });

      container.appendChild(section);
    });
  })
  .catch(err => console.error(err));