import debounce from "lodash/debounce";
import Toastify from "toastify-js";
import { zxcvbnOptions, zxcvbn } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";

import { getRandomInt, generatePronouncablePassword } from "./utils";

import "./style.css";
import "toastify-js/src/toastify.css";

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

const nBtn = document.getElementById("N");
const uBtn = document.getElementById("U");
const sBtn = document.getElementById("S");
const pBtn = document.getElementById("P");
const intensityText = document.getElementById("intensity-text");
const rangeInput = document.getElementById("rangeInput");
const generatedPassword = document.getElementById("generated-password");
const passwordLength = document.getElementById("password-length")
const reloadBtn = document.getElementById('reload-btn')

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

  if (P) {
    password = generatePronouncablePassword(length);
  } else {
    for (let i = 0; i < length; i++) {
      const randomIndex = getRandomInt(0, characterCount - 1);
      password += characters.charAt(randomIndex);
    }
  }

  generatedPassword.textContent = password;
  passwordLength.textContent = password.length;
  
  return password;
};

const getPasswordIntensity = (score) => {
  const generatedPasswordContainer = document.getElementById(
    "generated-password-container"
  );

  const passwordOptionsContainer = document.getElementById("options-container");

  switch (score) {
    case 0:
    case 1:
      document.body.style.backgroundColor = "#3d0c11";
      generatedPasswordContainer.style.backgroundColor = "#ED4133";
      passwordOptionsContainer.style.backgroundColor = "#2E0808";
      intensityText.textContent = "weak password";
      break;
    case 2:
    case 3:
      document.body.style.backgroundColor = "#4c3801";
      generatedPasswordContainer.style.backgroundColor = "#fcba03";
      passwordOptionsContainer.style.backgroundColor = "#322501";
      intensityText.textContent = "fair password";
      break;
    case 4:
      document.body.style.backgroundColor = "#3B661D";
      generatedPasswordContainer.style.backgroundColor = "#76cc39";
      passwordOptionsContainer.style.backgroundColor = "#18290B";
      intensityText.textContent = "strong password";
      break;
  }
};

const handleRangeChange = () => {
  const genereatedPassword = generatePassword(rangeInput.value);
  const score = zxcvbn(genereatedPassword).score;
  getPasswordIntensity(score);
};

//---------------------------------------------------- Event Listners ------------------------------------------------------------\\

document.addEventListener("DOMContentLoaded", () => {
  handleRangeChange();
  generatePassword(1);
});

reloadBtn.addEventListener("click", () => {
  reloadBtn.classList.add('animate-rotate');
  generatePassword(rangeInput.value);
});

reloadBtn.addEventListener('animationend', () => {
  reloadBtn.classList.remove('animate-rotate')
})

document.getElementById("copy-btn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(generatedPassword.textContent);

    Toastify({
      text: "Password Copied!",
      duration: 3000,
      newWindow: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#fff",
        color: "#111",
      },
    }).showToast();
  } catch (err) {
    console.error("Unable to copy text: ", err);
  }
});

rangeInput.addEventListener(
  "input",
  debounce(() => {
    handleRangeChange();
  }, 500)
);

nBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("cursor-pointer"))
    e.target.classList.toggle("active");
  toggleKey("N");
});

uBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("cursor-pointer"))
    e.target.classList.toggle("active");
  toggleKey("U");
});

sBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("cursor-pointer"))
    e.target.classList.toggle("active");
  toggleKey("S");
});

pBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("cursor-pointer"))
    e.target.classList.toggle("active");
  toggleKey("P");
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "n":
      nBtn.classList.toggle("active");
      toggleKey("N");
      break;
    case "u":
      uBtn.classList.toggle("active");
      toggleKey("U");
      break;
    case "s":
      sBtn.classList.toggle("active");
      toggleKey("S");
      break;
    case "p":
      pBtn.classList.toggle("active");
      toggleKey("P");
      break;
    case " ":
      generatePassword(rangeInput.value);
  }
});
