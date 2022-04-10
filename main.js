const puppeteer = require("puppeteer");
const answer = require("./answers");
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
  .then(function (linkArray) {
    console.log("Links to all function received!!!");
    // console.log(linkArray);
    // passing linke to the question(linkArray[i]), and index of the link provided(i)
    let questionWillBeSolvedPromise = questionSolverFun(linkArray[0], 0);
    return questionWillBeSolvedPromise;
  })
  .then(function () {
    console.log("Question is solved!!!");
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

// Question Solver Function Defination
function questionSolverFun(url, index) {
  let solverPromise = new Promise(function (resolve, reject) {
    let fullLink = "https://hackerrank.com" + url;
    // console.log(fullLink);
    let gotoOpenQuestionPage = currentTab.goto(fullLink);
    gotoOpenQuestionPage
      .then(function () {
        console.log("Page is opened");
        // Steps to solve a particular question
        // 1)- click on custom input box button 🔄
        let clickOnCibPromise = currentTab.waitAndClick("input[type='checkbox']");
        return clickOnCibPromise;
      })
      .then(function () {
        // 2)- type the code from answers in CIB🔄
        console.log("Clicked on custom input box button!!!!");
        let typeAnswerAtCibPromise = currentTab.type(
          ".input.text-area.custominput.auto-width",
          answer[index]
        );
        return typeAnswerAtCibPromise;
      })
      .then(function () {
        // 3)- press ctrl at CIB🔄
        console.log("Code is typed successfulyyy!!!!!");
        // down refers to pressing down the ctrl button
        let pressControlpromise = currentTab.keyboard.down("Control");
        return pressControlpromise;
      })
      .then(function () {
        // 3.2)- ctrl+A from CIB🔄
        console.log("Ctrl is pressed");
        let pressControlApromise = currentTab.keyboard.press("a");
        return pressControlApromise;
      })
      .then(function () {
        console.log("Ctrl+A pressed successfully");
        // 4)- ctrl + X ko press kro(here only x because we have already pressed the ctrl before pressing the A so it is still pressed now so we only have to make promise for pressing the x which is similar to ctrl+x)
        let pressControlXpromise = currentTab.keyboard.press("x");
        return pressControlXpromise;
      })
      .then(function () {
        // releasing the ctrl button because it is pressed from late 2 steps i.e ctrl+A and ctrl+x
        console.log("Ctrl+X pressed succesfully");
        // down refers to releasing the ctrl button
        let releaseControlpromise = currentTab.keyboard.up("Control");
        return releaseControlpromise;
      })
      .then(function () {
        console.log("Ctrl is released successfully");
        // 5)- Select the editor
        let editorIsSelectedPromise = currentTab.click(
          ".monaco-editor.no-user-select.vs"
        );
        return editorIsSelectedPromise;
      })
      .then(function () {
        // 6)- ctrl+a in the editor
        // 6.1)- down the ctrl
        console.log("Editor is selected successfully!!!!");
        let pressControlpromise = currentTab.keyboard.down("Control");
        return pressControlpromise;
      })
      .then(function () {
        // 6.2)- ctrl+A in editor🔄
        console.log("Ctrl is pressed");
        let pressControlApromise = currentTab.keyboard.press("a");
        return pressControlApromise;
      })
      .then(function () {
        console.log("Ctrl+A pressed successfully");
        // 7)- ctrl+v to copy the code from the cib in editor
        let pressControlVpromise = currentTab.keyboard.press("v");
        return pressControlVpromise;
      })
      .then(function () {
        console.log("Code is pasted successfuly in the editor!!!!!");
        // 8)- Press the submit button
        let submitButtonPressedPromise = currentTab.click(
          ".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled"
        );
        return submitButtonPressedPromise;
      })
      .then(function () {
        console.log("Code is submitted successfully!!!!!!");
        resolve();
      })
      .catch(function (err) {
        console.log(err);
      });
  });
  return solverPromise;
}
