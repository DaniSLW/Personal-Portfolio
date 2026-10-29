const dynamicText = document.querySelector(".typewriter");
const words = ["Frontend", "Backend"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);

    dynamicText.textContent = currentChar;
    let typeSpeed = isDeleting ? 100 : 150;

    if(!isDeleting && charIndex < currentWord.length) {
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
    } else {
        isDeleting = !isDeleting;
        typeSpeed = isDeleting ? 1500 : 500;

        if(!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect();