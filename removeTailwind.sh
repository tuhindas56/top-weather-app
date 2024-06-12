#!/usr/bin/bash
npm remove tailwindcss @tailwindcss/forms prettier-plugin-tailwindcss autoprefixer
clear
rm src/style.css src/ts/main.ts tailwind.config.js postcss.config.js
touch src/style.css src/ts/main.ts
echo "*, *::before, *::after {box-sizing: border-box;}* {margin: 0;}body {line-height: 1.5;-webkit-font-smoothing: antialiased;min-height: 100vh;}img, picture, video, canvas, svg {display: block;max-width: 100%;}input, button, textarea, select {font: inherit;}p, h1, h2, h3, h4, h5, h6 {overflow-wrap: break-word;}#root, #__next {isolation: isolate;}" > src/style.css
echo "import '../style.css'" > src/ts/main.ts
sed '5d' .prettierrc > temp
rm .prettierrc
cat temp > .prettierrc && rm temp
rm sass.sh
rm removeTailwind.sh
npx prettier .prettierrc --write
npx prettier postcss.config.js --write
npx prettier src/style.css --write
clear
echo "Done!"