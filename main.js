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
    let hackerrankPage = currentTab.goto(
      "https://www.hackerrank.com/auth/login"
    );
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
    let passwordIsTypedPromise = currentTab.type(
      "input[type = 'password']",
      password
    );
    return passwordIsTypedPromise;
  })
  .then(function () {
    console.log("Password is typed......");
    let clickOnSignInPromise = currentTab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    );
    return clickOnSignInPromise;
  })
  .then(function () {
    console.log("Successfully signed in.......");
  })
  .then(function () {
    // Click in the algorithm button(because puppet is not waiting for the page to be laoded so it is not able to find the selector in the not loaded html while the selector is inside the loaded html.)
    // let algoBtnClickedPromise = currentTab.click(
    //   "div[data-automation='algorithms']"
    // );
    // 📓📓 now we are making a function which will wait and then click on the selector which we have passed in it
    let algoBtnClickedPromise = waitAndClick(
      "div[data-automation='algorithms']"
    );
    return algoBtnClickedPromise;
  })
  .then(function () {
    console.log("Congrats Algo btn clicked!!!!!!!");
    // same here we have to wait and then click the question link.
    let getAllQuesLinkPromise = currentTab.waitForSelector(
      ".js-track-click.challenge-list-item"
    );
    return getAllQuesLinkPromise;
  })
  .then(function () {
    function getAllQuesLink() {
      // her document refers to the html and querySelectorAll refers to select all the html in that particular array of selcetors.
      // ye saari html lekr aajaega array ki form ma
      let allQuestionArray = document.querySelectorAll(
        ".js-track-click.challenge-list-item"
      );
      // traverse through the whole array of questions and extract the link of a particular question at specific index
      let questionLinkArray = [];
      for (let index = 0; index < allQuestionArray.length; index++) {
        // 📓 Returns element's first attribute(link) whose qualified name is qualifiedName, and null if there is no such attribute otherwise.
        questionLinkArray.push(allQuestionArray[index].getAttribute("href"));
      }
      // returning the linkArray
      return questionLinkArray;
    }
    // .evaluate() takes a fiunction and executes it
    let linkArrPrmoise = currentTab.evaluate(getAllQuesLink);
    return linkArrPrmoise;
  })
  .then(function(linkArray)
  {
    console.log("Links to all function received!!!"); 
    console.log(linkArray);
  })
  .catch(function (err) {
    console.log(err);
  });

function waitAndClick(algoBtnCss) {
  // making a new promise here-> this function is not involve in chaining so we have to make a personal/local promise for it
  let algoClickPromise = new Promise(function (resolve, reject) {
    // waitForselector() is a function which will wait for the selector until the page gets load.
    let waitForCss = currentTab.waitForSelector(algoBtnCss);
    waitForCss
      .then(function () {
        //  waiting is done now we have to click on the algoBTN
        console.log("Algo button is found");
        let clickedPromise = currentTab.click(algoBtnCss);
        return clickedPromise;
      })
      .then(function () {
        console.log("Successfully clicked!!!!");
        resolve();
      })
      .catch(function (err) {
        console.log(err);
        reject();
      });
  });
  return algoClickPromise;
}
