fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project');

    Object.entries(data).forEach(([category, projects]) => {
      
      //const title = document.createElement('h2');
      //title.textContent = category.replace('-', ' ');
      //container.appendChild(title);

      const section = document.createElement('div');

      projects.forEach(project => {
        const card = document.createElement('div');

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.title;

        const preview = document.createElement('img');
        preview.src = project["preview-image"];
        preview.alt = "Project Preview";

        const link_git = document.createElement('a');
        link_git.textContent = "GitHub";
        link_git.href = project["github-link"];
        link_git.target = "_blank";

        const link_demo = document.createElement('a');
        link_demo.textContent = "Demo";
        link_demo.href = project["demo-link"];
        link_demo.target = "_blank";

        card.appendChild(projectTitle);
        card.appendChild(preview);
        card.appendChild(link_git);
        card.appendChild(link_demo);

        section.appendChild(card);
      });

      container.appendChild(section);
    });
  })
  .catch(err => console.error(err));