# Password Generator App 🔑
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-v1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)

**Live demo**: [password generator](https://complex-password-generator-app.netlify.app/)

## Overview
- The Password Generator App is a simple and efficient tool built with vanilla JavaScript, Tailwind CSS, and bootstrapped using Vite. 
- It allows users to generate passwords with various customization options, including capital letters, numbers, symbols, and the ability to make passwords pronounceable. The app also employs the Zxcvbn library to evaluate and display password strength, categorizing it as weak, fair, or strong.

![app-screenshot](./public/app-screenshot.png)
![mobile-screenshot](./public/mobile-screenshot.jpeg)

## Features

- Generate Passwords: Create secure passwords with ease.
- Customization Options: Tailor your passwords by selecting options:
  - Capital Letters
  - Numbers
  - Symbols
  - Pronounceable
- Password Strength: The Zxcvbn library assesses and provides feedback on password strength.
  - Weak: Passwords that are easily guessable.
  - Fair: Passwords that offer moderate security.
  - Strong: Highly secure passwords.

## Usage

1. Open the Password Generator App in your web browser.
2. Configure your desired password options by checking or unchecking the options.
3. Your generated password will be displayed, taking into account your selected options.
4. The app will also provide a password strength rating.

## Installation

To run the Password Generator App locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project's root directory.
3. Install the required dependencies using npm or yarn:

   ```bash
   npm install
   # or
   yarn install
   ```
4. Run the application `npm run dev`
