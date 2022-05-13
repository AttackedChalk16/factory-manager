function createWelcomePage(){
  
  const header = document.getElementById("timeDay")
  header.disabled = true
  
      // build the body of the welcome page
      const originaldiv = document.getElementById("initial")

      let welcomeDiv = Object.assign(document.createElement('div'),{id:"welcomeDiv"});
      // let checkDiv = Object.assign(document.createElement('div'),{id:"checkDiv"});

      // New game button
      let btn = document.createElement("a")
      btn.id = "newgame"
      btn.innerText = "New Game"
      btn.className = "newgameButton"
      btn.setAttribute("onclick","newgame()")
      btn.href = "javascript:;"

      // Create checkbox
      // let checkTutorial = document.createElement("input")
      // checkTutorial.type = "checkbox"
      // checkTutorial.id = "doTutorial"

      // Create label
      // let label = document.createElement("label")
      // label.innerHTML = "Do Tutorial"
      // label.style = "font-size: 20px";

      // checkDiv.append(checkTutorial, label);
      welcomeDiv.append(btn); //, checkDiv

      document.body.replaceChild(welcomeDiv, originaldiv);
}

function newgame(){
  let topPadding = document.getElementById("topPadding");

  let progressContainer = Object.assign(document.createElement("div"), {id:"progressContainer"});
  let progressBar = Object.assign(document.createElement("div"), {id:"progressBar"});
  progressContainer.append(progressBar);
  let progressText = Object.assign(document.createElement("p"), {id:"progressText"});
  progressContainer.append(progressText);
  topPadding.append(progressContainer);

  buildfactorypage()
}