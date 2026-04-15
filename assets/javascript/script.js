fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project');

    Object.entries(data).forEach(([category, projects]) => {

      projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('card-project');

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.title;

        const projectDescription = document.createElement('p');
        projectDescription.textContent = project.description;

        const preview = document.createElement('img');
        preview.src = project["preview-image"];
        preview.alt = "Project Preview";

        const badge1 = document.createElement('span');
        badge1.textContent = project.badge1;
        badge1.classList.add('badge-project');

        const badge2 = document.createElement('span');
        badge2.textContent = project.badge2;
        badge2.classList.add('badge-project');

        const badge3 = document.createElement('span');
        badge3.textContent = project.badge3;
        badge3.classList.add('badge-project');

        const badge4 = document.createElement('span');
        badge4.textContent = project.badge4;
        badge4.classList.add('badge-project');

        const status = document.createElement('div');
        status.textContent = project.status;
        status.classList.add('status-project');
        status.classList.add(project.status.toLowerCase().replace(/\s/g, '-'));

        const link_git = document.createElement('a');
        link_git.innerHTML = "<i class='fab fa-github'></i> GitHub";
        link_git.href = project["github-link"];
        link_git.target = "_blank";
        link_git.classList.add('github-link');

        const link_demo = document.createElement('a');
        link_demo.innerHTML = "<i class='fas fa-eye'></i> Demo";
        link_demo.href = project["demo-link"];
        link_demo.target = "_blank";
        link_demo.classList.add('demo-link');

        card.appendChild(projectTitle);
        card.appendChild(preview);
        if(project.badge1 !== "N/A")
          card.appendChild(badge1);
        if(project.badge2 !== "N/A")
          card.appendChild(badge2);
        if(project.badge3 !== "N/A")
          card.appendChild(badge3);
        if(project.badge4 !== "N/A")
          card.appendChild(badge4);
        card.appendChild(projectDescription);
        card.appendChild(status);
        card.appendChild(link_demo);
        card.appendChild(link_git);
        
       container.appendChild(card);
      });
    });
  })
  .catch(err => console.error(err));