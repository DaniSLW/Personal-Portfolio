// ===== PROJECT CARDS =====
(function () {
  const techConfig = {
    HTML: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M128 96L162.9 491.8L319.5 544L477.1 491.8L512 96L128 96zM436.2 223.9L252.4 223.9L256.5 273.3L432.1 273.3L418.5 421.7L320.6 448.7L320.6 449L319.5 449L220.8 421.7L214.8 345.9L262.5 345.9L266 384L319.5 398.5L373.2 384L379.2 321.8L212.3 321.8L199.5 176.2L440.6 176.2L436.2 223.9z"/></svg>`,
      color: 'HTML'
    },
    CSS: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M472.3 96L96 96L96 472.3C96 491.3 103.6 509.5 117 523C130.4 536.5 148.7 544 167.7 544L472.3 544C491.3 544 509.5 536.4 523 523C536.5 509.6 544 491.3 544 472.3L544 167.7C544 148.7 536.4 130.5 523 117C509.6 103.5 491.3 96 472.3 96zM428.4 495.4C420.7 486.9 416.7 474.7 416.4 458.8L447.7 458.8C447.9 472.9 452.8 479.9 462.5 479.9C467.4 479.9 470.9 478.3 473 475.2C475 472.1 476 467.2 476 460.4C476 455 474.7 450.5 472 447C468.5 442.8 463.9 439.5 458.8 437.5L447.2 432C436.9 427.1 429.4 421.2 424.7 414.4C420.2 407.6 418 398.1 418 386C418 372.4 422 361.4 429.8 352.9C437.9 344.4 448.9 340.2 463 340.2C476.6 340.2 487.1 344.4 494.5 352.7C502 361.1 506 373 506.3 388.6L476.2 388.6C476.4 383.5 475.3 378.4 473.2 373.8C471.5 370.4 468.2 368.7 463.2 368.7C454.4 368.7 450 373.9 450 384.4C450 389.7 451.1 393.8 453.2 397C456.3 400.5 460.2 403.2 464.6 404.8L475.7 409.7C487.2 415 495.4 421.4 500.5 429.1C505.6 436.8 508.1 447.1 508.1 460.1C508.1 475.6 504.1 487.5 495.8 495.8C487.6 504.1 476.3 508.3 461.7 508.3C447.1 508.3 436.1 504.1 428.3 495.6zM327.4 495.4C319.7 486.9 315.7 474.7 315.4 458.8L346.7 458.8C346.9 472.9 351.8 479.9 361.5 479.9C366.4 479.9 369.9 478.3 371.9 475.2C373.9 472.1 374.9 467.2 374.9 460.4C374.9 455 373.6 450.5 371 447C367.5 442.8 362.9 439.5 357.8 437.5L346.2 432C335.9 427.1 328.4 421.2 323.7 414.4C319.2 407.6 317 398.1 317 386C317 372.4 321 361.4 328.8 352.9C336.9 344.4 347.9 340.2 362 340.2C375.6 340.2 386.1 344.4 393.4 352.7C401 361.1 404.9 373 405.3 388.6L375.2 388.6C375.4 383.5 374.3 378.4 372.2 373.8C370.5 370.4 367.2 368.7 362.2 368.7C353.4 368.7 349 373.9 349 384.4C349 389.7 350.1 393.8 352.2 397C355.3 400.5 359.2 403.2 363.6 404.8L374.7 409.7C386.2 415 394.4 421.4 399.5 429.1C404.6 436.8 407.1 447.1 407.1 460.1C407.1 475.6 403 487.5 394.8 495.8C386.6 504.1 375.3 508.3 360.7 508.3C346.1 508.3 335.1 504.1 327.3 495.6zM221.8 496.5C213.4 488.8 209.3 477.3 209.3 462L209.3 386.6C209.3 371.4 213.7 359.9 222.5 352C231.4 344.2 243.2 340.2 257.7 340.2C271.8 340.2 282.9 344.2 291.1 352.2C299.4 360.2 303.6 372.2 303.6 388.1L303.6 394.1L270.5 394.1L270.5 388.3C270.5 382.2 269.2 377.6 266.5 374.7C265.4 373.2 263.9 372 262.2 371.2C260.5 370.4 258.7 370 256.8 370.1C251.4 370.1 247.6 371.9 245.4 375.7C243.1 380.9 242.1 386.5 242.4 392.1L242.4 457.6C242.4 471.3 247.2 478.2 256.8 478.4C261.3 478.4 264.7 476.8 267 473.6C269.5 469.5 270.7 464.8 270.5 460L270.5 455.1L303.6 455.1L303.6 460.2C303.6 470.8 301.5 479.7 297.4 486.8C293.4 493.7 287.5 499.3 280.3 502.8C272.6 506.5 264.2 508.3 255.7 508.1C241.5 508.1 230.2 504.2 221.9 496.5z"/></svg>`,
      color: 'CSS'
    },
    JavaScript: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 96L96 544L544 544L544 96L96 96zM339.8 445.4C339.8 489 314.2 508.9 276.9 508.9C243.2 508.9 223.7 491.5 213.7 470.4L248 449.7C254.6 461.4 260.6 471.3 275.1 471.3C288.9 471.3 297.7 465.9 297.7 444.8L297.7 301.7L339.8 301.7L339.8 445.4zM439.4 508.9C400.3 508.9 375 490.3 362.7 465.9L397 446.1C406 460.8 417.8 471.7 438.5 471.7C455.9 471.7 467.1 463 467.1 450.9C467.1 436.5 455.7 431.4 436.4 422.9L425.9 418.4C395.5 405.5 375.4 389.2 375.4 354.9C375.4 323.3 399.5 299.3 437 299.3C463.8 299.3 483 308.6 496.8 333L464 354C456.8 341.1 449 336 436.9 336C424.6 336 416.8 343.8 416.8 354C416.8 366.6 424.6 371.7 442.7 379.6L453.2 384.1C489 399.4 509.1 415.1 509.1 450.3C509.1 488.1 479.3 508.9 439.4 508.9z"/></svg>`,
      color: 'JavaScript'
    },
    JSON: {
      icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.823 15.122c-.517 0-.816.491-.816 1.146 0 .661.311 1.126.82 1.126.517 0 .812-.49.812-1.146 0-.604-.291-1.126-.816-1.126z"/><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM8.022 16.704c0 .961-.461 1.296-1.2 1.296-.176 0-.406-.029-.557-.08l.086-.615c.104.035.239.06.391.06.319 0 .52-.145.52-.67v-2.122h.761v2.131zm1.459 1.291c-.385 0-.766-.1-.955-.205l.155-.631c.204.105.521.211.846.211.35 0 .534-.146.534-.365 0-.211-.159-.331-.564-.476-.562-.195-.927-.506-.927-.996 0-.576.481-1.017 1.277-1.017.38 0 .659.08.861.171l-.172.615c-.135-.065-.375-.16-.705-.16s-.491.15-.491.325c0 .215.19.311.627.476.596.22.876.53.876 1.006.001.566-.436 1.046-1.362 1.046zm3.306.005c-1.001 0-1.586-.755-1.586-1.716 0-1.012.646-1.768 1.642-1.768 1.035 0 1.601.776 1.601 1.707C14.443 17.33 13.773 18 12.787 18zm4.947-.055h-.802l-.721-1.302a12.64 12.64 0 0 1-.585-1.19l-.016.005c.021.445.031.921.031 1.472v1.016h-.701v-3.373h.891l.701 1.236c.2.354.4.775.552 1.155h.014c-.05-.445-.065-.9-.065-1.406v-.985h.702v3.372zM14 9h-1V4l5 5h-4z"/></svg>`,
      color: 'JSON'
    }
  };

  const GITHUB_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72z"/></svg>`;
  const DEMO_SVG  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320z"/></svg>`;

  function createCard(project) {
    const card = document.createElement('div');
    card.classList.add('card-project');

    const title = document.createElement('h3');
    title.textContent = project.title || 'Untitled';
    card.appendChild(title);

    const imgWrap = document.createElement('div');
    imgWrap.classList.add('image-wrapper');
    const img = document.createElement('img');
    img.src   = project['preview-image'] || 'https://i.postimg.cc/wjd4cx7c/pngwing-com.png';
    img.alt   = project.title + ' preview';
    img.loading = 'lazy';
    imgWrap.appendChild(img);
    card.appendChild(imgWrap);

    if (Array.isArray(project.tech) && project.tech.length) {
      const badges = document.createElement('div');
      badges.classList.add('badges-container');
      project.tech.forEach(item => {
        const cfg = techConfig[item] || { icon: '🔧', color: 'default' };
        const badge = document.createElement('span');
        badge.classList.add('badge-project', cfg.color || item);
        badge.innerHTML = `<span class="icon">${cfg.icon}</span><span>${item}</span>`;
        badges.appendChild(badge);
      });
      card.appendChild(badges);
    }

    const desc = document.createElement('p');
    desc.textContent = project.description || '';
    card.appendChild(desc);

    const statusText = project.status || 'Unknown';
    const status = document.createElement('div');
    status.textContent = statusText;
    status.classList.add('status-project', statusText.toLowerCase().replace(/\s+/g, '-'));
    card.appendChild(status);

    const links = document.createElement('div');
    links.classList.add('links-container');

    if (project['demo-link'] && project['demo-link'] !== 'N/A') {
      const demo = document.createElement('a');
      demo.innerHTML = `${DEMO_SVG} Demo`;
      demo.href   = project['demo-link'];
      demo.target = '_blank';
      demo.rel    = 'noopener noreferrer';
      demo.classList.add('demo-link');
      links.appendChild(demo);
    }

    if (project['github-link'] && project['github-link'] !== 'N/A') {
      const gh = document.createElement('a');
      gh.innerHTML = `${GITHUB_SVG} GitHub`;
      gh.href   = project['github-link'];
      gh.target = '_blank';
      gh.rel    = 'noopener noreferrer';
      gh.classList.add('github-link');
      links.appendChild(gh);
    }

    if (links.children.length) card.appendChild(links);

    return card;
  }

  fetch('data.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch data.json');
      return res.json();
    })
    .then(data => {
      const container = document.getElementById('project');
      if (!container) return;

      const fragment = document.createDocumentFragment();
      Object.values(data).forEach(projects => {
        projects.forEach(project => fragment.appendChild(createCard(project)));
      });
      container.appendChild(fragment);
    })
    .catch(err => console.error('Error loading projects:', err));
})();

const hamburger = document.getElementById('navHamburger');
const mobileNav = document.getElementById('mobileNav');
function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  mobileNav.setAttribute('aria-hidden', String(!isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});