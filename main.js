const puppeteer = require("puppeteer");

const email = "jatinbisht2308@gmail.com";
const password = "jatin2308";
let currentTab;
// .launch is used to launch the chromium browser
let browserOpenPromise = puppeteer.launch({
  headless: false,
  defaultViewportnull: null,
  args: ["--start-maximized"],
});
// using arrow function
// .then will envoke the function who ever you have passed in it here we are prining that browser is opened and this process will happen when your promise is completed with out any error.
browserOpenPromise
  .then(function (browser) {
    console.log("Browser is opened:");
    // .pages() -> an array of all open pages/tab inside the browser
    let allTabsPromise = browser.pages();
    // console.log(allTabsPromise.length);
    return allTabsPromise;
  })
  //return allTabsPromise is similar to allTabsPromise.then(function (allTabs)) instead of writng it mannually we are returning it to the next promise.then (inplace of promise). 🔥 🔥 🔥
  .then(function (allTabs) {
    currentTab = allTabs[0];
    console.log("New Tab");
    // .goto-> url to navigate to the page link you have given inside the function.
    let hackerrankPage = currentTab.goto("https://www.hackerrank.com/auth/login");
    return hackerrankPage;
  })
  .then(function () {
    console.log("Opened hackerrank home page");
    let emailTypePromise = currentTab.type("input[name = 'username']", email);
    // let passwordTypedPromise = currentTab.type("#id_password", password);
    return emailTypePromise;
  })
  .then(function () {
    console.log("Email is typed......");
    let passwordIsTypedPromise = currentTab.type("input[type = 'password']", password);
    return passwordIsTypedPromise;
  })
  .then (function ()
  {
      console.log("Password is typed......");
      let clickOnSignInPromise = currentTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
      return clickOnSignInPromise;
  })
  .then (function ()
  {
    console.log("Successfully signed in.......");
  })
  .catch(function (err) {
    console.log(err);
  });
