let tolerance = 10.999;
let score = 0;
let minlength = 200;
let maxlength = 500;
let correctPercentage;
let perfects = 0;

const bar_holder = document.getElementById("bar-holder");
const bar = document.getElementById("bar");
const submitButton = document.getElementById("submit");
const input = document.getElementById("percentage_guess");
const feedback = document.getElementById("feedback");
const toleranceSpan = document.getElementById("tolerance_span");
const scoreText = document.getElementById("score_span");

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generate() {
  const rand = random(minlength, maxlength);
  bar_holder.style.width = `${rand}px`;
  const smaller = random(1, 100);
  bar.style.width = `${smaller}%`;
  correctPercentage = smaller;
}

function bound(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function checkGuess() {
  const guess = parseInt(input.value);
  feedback.style.height = "18px";
  feedback.style.padding = "10px";
  feedback.style.transition = "0.5s ease-out";

  if (guess >= 0 && guess <= 100) {
    if (
      bound(correctPercentage - tolerance) <= guess &&
      bound(correctPercentage + tolerance) >= guess
    ) {
      if (correctPercentage == guess) {
        perfects++;
        const mainText = "Perfect!";

        feedback.innerHTML = `<span class="content-percentage__text--golden">${mainText
          .split("")
          .map((char, i) => {
            return `<span class="content-percentage__text--shine" style="animation-delay: ${
              -0.1 * i
            }s">${char}</span>`;
          })
          .join("")}</span>`;
        if (perfects > 1) {
          feedback.innerHTML +=
            ` <span class="content-percentage__text--golden">` +
            `×${perfects}`
              .split("")
              .map((char, i) => {
                return `<span class="content-percentage__text--shine" style="animation-delay: ${
                  -0.1 * (mainText.length + 1 + i)
                }s">${char}</span>`;
              })
              .join("") +
            `</span>`;
        }
        feedback.style.transition = "0.1s ease-out";
        feedback.style.height = "35px";
        feedback.style.padding = "10px 10px 15px 10px";

        score += 10;
        tolerance = 10;
      } else {
        feedback.textContent = `Close enough! The correct value was ${correctPercentage}%`;
        score++;
        tolerance /= 1.1;
        perfects = 0;
      }
    } else {
      feedback.textContent = `Incorrect! The correct value was ${correctPercentage}%`;
      score = 0;
      tolerance = 10;
      perfects = 0;
    }

    scoreText.textContent = score;
    toleranceSpan.textContent = `${Math.floor(tolerance)}%`;

    generate();
    input.value = "";
  } else {
    if (isNaN(guess)) {
      feedback.textContent = `The input cannot be empty`;
    } else {
      feedback.textContent = `Value (${guess}) not recognized.`;
    }
  }
}

submitButton.addEventListener("click", checkGuess);

generate();