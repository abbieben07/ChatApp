module.exports = {
  plugins: [
    { tailwindcss: { config: "./tailwind.config.js" } },
    "@nativescript/tailwind"
  ]
}

// export default {
//   plugins: {
//     "@tailwindcss/postcss": { config: "./tailwind.config.js" },
//     "@nativescript/tailwind": {},
//   }
// }