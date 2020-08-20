module.exports = {
    preset: "jest-puppeteer",
    globals: {
        URL: "https://poke-quiz-masters.herokuapp.com/"
    },
    testMatch: [
        "**/test/**/*.test.js"
    ],
    verbose: true
}