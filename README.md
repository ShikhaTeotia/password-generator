# Password Generator

A random password generator with adjustable length, character options and a strength meter, built with HTML, CSS and JavaScript.

**Live demo:** https://shikhateotia.github.io/password-generator/

## Features

- Adjustable password length (4 to 94 characters)
- Choose lowercase, uppercase, numbers and symbols
- Strength meter that shows entropy in bits
- One-click copy to clipboard
- Secure randomness using the browser's Web Crypto API
- Responsive design for desktop and mobile

## How it works

The generator builds a pool from the selected character types, shuffles it with a Fisher-Yates shuffle, and takes the first characters up to the chosen length. It is a JavaScript version of my original Python program.

## Project structure

- `index.html` - page structure
- `style.css` - styling and layout
- `script.js` - password generation logic

## Run locally

Download the three files into one folder and open `index.html` in your browser. No installation needed.

## Built with

HTML5, CSS3 and vanilla JavaScript
