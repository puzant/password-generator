import debounce from "lodash/debounce";
import { zxcvbnOptions, zxcvbn } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";

import "./style.css";

const zxcvbnCustomOptions = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  useLevenshteinDistance: true,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(zxcvbnCustomOptions);

const buttonContainer = document.getElementById("options-container");
const rangeInput = document.getElementById("rangeInput");

const passwordOptions = {
  N: false,
  U: false,
  S: false,
  P: false,
};

const toggleKey = (key) => {
  passwordOptions[key] = !passwordOptions[key];
  generatePassword(rangeInput.value);
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generatePassword = (length) => {
  const { N, U, S, P } = passwordOptions || {};

  let password = "";
  let characters = "abcdefghijklmnopqrstuvwxyz";
  const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  if (N) characters += numbers;
  if (U) characters += capitalLetters;
  if (S) characters += symbols;
  if (P) characters += [];

  const characterCount = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(0, characterCount - 1);
    password += characters.charAt(randomIndex);
  }

  let score;
  document.getElementById("generated-password").textContent = password;
  return password;
};

const getPasswordIntensity = (score) => {
  const generatedPasswordContainer = document.getElementById(
    "generated-password-container"
  );

  const passwordOptionsContainer = document.getElementById("options-container");

  switch (score) {
    case 0:
      document.body.style.backgroundColor = "#3d0c11";
      generatedPasswordContainer.style.backgroundColor = "#ED4133";
      passwordOptionsContainer.style.backgroundColor = "#2E0808";
      document.getElementById("intensity-text").textContent = "weak password";
      break;
    case 1:
      document.body.style.backgroundColor = "#3d0c11";
      generatedPasswordContainer.style.backgroundColor = "#ED4133";
      passwordOptionsContainer.style.backgroundColor = "#2E0808";
      document.getElementById("intensity-text").textContent = "weak password";
      break;
    case 2:
      document.body.style.backgroundColor = "#4c3801";
      generatedPasswordContainer.style.backgroundColor = "#fcba03";
      passwordOptionsContainer.style.backgroundColor = "#322501";
      document.getElementById("intensity-text").textContent = "fair password";
      break;
    case 3:
      document.body.style.backgroundColor = "#4c3801";
      generatedPasswordContainer.style.backgroundColor = "#fcba03";
      passwordOptionsContainer.style.backgroundColor = "#322501";
      document.getElementById("intensity-text").textContent = "fair password";
      break;
    case 4:
      document.body.style.backgroundColor = "#3B661D";
      generatedPasswordContainer.style.backgroundColor = "#76cc39";
      passwordOptionsContainer.style.backgroundColor = "#18290B";
      document.getElementById("intensity-text").textContent = "strong password";
      break;
  }
};

const handleRangeChange = () => {
  const genereatedPassword = generatePassword(rangeInput.value);
  const score = zxcvbn(genereatedPassword).score;
  getPasswordIntensity(score);
};

document.addEventListener("DOMContentLoaded", () => {
  handleRangeChange();
  generatePassword(1);
});

document.getElementById("reload-btn").addEventListener("click", () => {
  generatePassword(rangeInput.value);
});

rangeInput.addEventListener(
  "input",
  debounce(() => {
    handleRangeChange();
  }, 500)
);

buttonContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("cursor-pointer"))
    e.target.classList.toggle("active");
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "n":
      const nBtn = document.getElementById("N");
      nBtn.classList.toggle("active");
      toggleKey("N");
      break;
    case "u":
      const uBtn = document.getElementById("U");
      uBtn.classList.toggle("active");
      toggleKey("U");
      break;
    case "s":
      const sBtn = document.getElementById("S");
      sBtn.classList.toggle("active");
      toggleKey("S");
      break;
    case "p":
      const pBtn = document.getElementById("P");
      pBtn.classList.toggle("active");
      toggleKey("P");
      break;
    case " ":
      generatePassword(rangeInput.value);
  }
});
