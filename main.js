const pupet = require("puppeteer");
console.log("Before");
let currentPage;
const browserOpenPromise = pupet.launch({headless: false});
browserOpenPromise.then(function (browser) {
    // console.log("Browser openend!!");
    let pagesArrayPromise = browser.pages();
    return pagesArrayPromise;
}).then(function (browserPg){
 currentPage = browserPg[0];
 let gotoPromise = currentPage.goto("https://www.google.com/");
 return gotoPromise;
})
console.log("AFTER");