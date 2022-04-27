// function generateChildNodes(currRow, currNode) {
//   if (currNode == null) {
//     return;
//   }


// }

var createdClasses = false;

function highlightPrereqs() {
    let parentIDs = window.gameState.researchTree.get(this.id).requiredPrereqNodes;
    // console.log("parentIDs: " + parentIDs)
  
    for (let parentID of parentIDs) {
      // console.log("individual parentID: " + parentID)
      document.getElementById(parentID).classList.add("highlight");
    }
  }
  
  function resetPrereqs() {
    let parentIDs = window.gameState.researchTree.get(this.id).requiredPrereqNodes;
  
    for (let parentID of parentIDs) {
      document.getElementById(parentID).classList.remove("highlight");
    }
  }
  
  function generateResearchTable() {
    const researchDiv = document.createElement("div");
  
    const researchTable = document.createElement("table");
    researchTable.id = "researchTable";
    researchTable.className = "researchTable";
  
  
    for (const [id, node] of window.gameState.researchTree.entries()) {
      if (node.requiredPrereqNodes != null) {
        continue;
      }
      console.log(id);
      let currNode = node.nextNodes;
      let currRow = researchTable.insertRow(-1);
      let firstCell = currRow.insertCell();
      let firstBtn = Object.assign(document.createElement("button"), {className:"researchBtn", id:id});
      firstBtn.addEventListener("click", (() => (firstBtn.disabled = true)));
  
      firstCell.append(firstBtn);
      firstBtn.innerHTML = window.gameState.researchTree.get(id).name;
  
      let layersDeep = 0;
      // let 
  
      while (currNode != null) {
        console.log("currNode " + currNode);
        const innerTable = document.createElement("table");
        innerTable.className = "researchTable";
        
        let currCell = currRow.insertCell();
  
        for (let nodeID of currNode) {
          console.log("handling node " + nodeID);
          let innerRow = innerTable.insertRow();
          let innerCell = innerRow.insertCell();
  
  
          let btn = Object.assign(document.createElement("button"), {className:"researchBtn", id:nodeID});
          btn.innerHTML = window.gameState.researchTree.get(nodeID).name;
  
          btn.addEventListener("mouseenter", highlightPrereqs);
          btn.addEventListener("mouseleave", resetPrereqs);
          // add some event listener for researching this tech
          // and unlocking the appropriate nodes below?
          btn.addEventListener("click", (() => (btn.disabled = true)));
          innerCell.append(btn);
        }
        currCell.append(innerTable);
        layersDeep++;
        currNode = window.gameState.researchTree.get(currNode[0]).nextNodes;
      }
      
      // let nextNodes = window.gameState.researchTree[node.nextNodes]
      
      // Iterate to the bottom node 
    }
  
    researchDiv.append(researchTable);
    return researchDiv;
  }
  
  function generateResearchPage() {
    let mainPage = document.getElementById("factoryDiv");
    window.gameState.pages.set("main", mainPage);
    // document.getElementById("topPadding").classList.add("hiddenElement");
    
  
    // let researchPage = generateResearchTable();
    let researchPage = Object.assign(document.createElement("div"), {id:"researchDiv"});

    const buttonsDiv = Object.assign(document.createElement("div"), {className: "buttonsArea"});

    let treantDiv = Object.assign(document.createElement("div"), {id:"treantDiv"});
    let outerDiv = Object.assign(document.createElement("div"), {id:"outerTreantDiv"});
    const researchTreant = Object.assign(document.createElement("chart"), {id:"researchTreant"});
    
    
    // button for going back to the main scene
    // The button that goes back to the main scene
    const backBtn = Object.assign(document.createElement('button'),{className:"sideButton", id : "goBackButton"});
    backBtn.innerHTML = "Go Back";
    backBtn.addEventListener("click", goBackMain);
    buttonsDiv.append(backBtn);
    
    treantDiv.append(researchTreant);
    outerDiv.append(treantDiv);
    researchPage.append(outerDiv, buttonsDiv);
  
    // Replace the main page scene with the research scene
    document.body.replaceChild(researchPage, mainPage);

    // if (window.gameState.treant === undefined) {
      window.gameState.treant = new Treant(window.gameState.treantConfig);
    // }
    // This was causing the object object I think?
    // researchPage.append(window.gameState.treant);

    let nodes = document.querySelectorAll(".researchNode");
    let length = nodes.length;
    let zDepth = 1;
    for (let i = 1; i < length+1; i++){
      researchTreant.insertBefore(researchTreant.childNodes[i], researchTreant.firstChild);
    }
    researchTreant.insertBefore(researchTreant.childNodes[length], researchTreant.firstChild);
    // for (let i = 0; i < length; i++) {
    //   console.log(nodes[i].id);
    //   nodes[i].zIndex = zDepth++;
    //   // console.log("Nodes length is " + nodes.length);
    //   // nodes[0].parentNode.insertBefore(nodes[0], nodes[length-i]);
    // }
    // console.log(nodes);
    
    for (let node of nodes) {
      // node.parentNode.insertBefore(node, nodes[0]);
      // console.log(node.id);
        
        // console.log(node.id)
        if (window.gameState.researched.has(node.id) || (window.gameState.researching != null &&
            window.gameState.researching.id == node.id)) {
          node.classList.add("inactiveNode")
        } else {
          node.addEventListener("click", research);
        }


    }


    
    if (!createdClasses) {
      //console.log("Entered the create classes")
      let iDListString = "";
      for (let node of nodes) {
        let nodeString = "#" + node.id;
        let tooltipId = nodeString + "Tooltip";
        // iDListString += (" #" + tooltipId + " { position: relative; display: inline-block; border-bottom: 1px dotted black; }");
        
        // Add on hover styling for this specific research node's tooltip
        //z-index: 1;
        // #nodeID #nodeIDTooltip {}
        iDListString += (nodeString + " " + tooltipId
        + " { visibility: hidden; width: 200px; background-color: #555; color: #fff; text-align: left;"
        + " border-radius: 6px; padding: 5px 0 5px 5px; position: absolute;  bottom: 105%; left: 30%;"
        + " margin-left: -60px; opacity: 0; transition: opacity 0.3s; font-size: 11px; z-index: 999 !important;}\n");

        // adds the arrow to make it look like a dialogue tooltip
        // #nodeID nodeIDTooltip::after {}
        iDListString += (nodeString + " " + tooltipId + "::after"
        + " { content: \"\"; position: absolute; top: 100%; left: 50%; margin-left: 0px; border-width: 5px;"
        + " border-style: solid; border-color: #555 transparent transparent transparent; z-index: 999 !important;}\n");

        // #nodeID:hover nodeIDTooltip {}
        iDListString += (nodeString + ":hover " + tooltipId
        + " { visibility: visible; opacity: 1; transition: opacity 0.3s; position: absolute; z-index: 999 !important; }");

        // iDListString += (tooltipId + " > " + "p"
        // + " { line-height: 1.5; margin-top: 0; margin-bottom: 0; }");
        // nodeString += " "

        // let style = document.createElement('style');
        // style.type = 'text/css';
        // style.innerHTML = '#cssClass { color: #F00; }';
        // document.getElementsByTagName('head')[0].appendChild(style);

        // document.getElementById('someElementId').className = 'cssClass';
      }
      document.body.appendChild(Object.assign(document.createElement("style"), {textContent: iDListString, id:"myStyle"}))
      //console.log(document.getElementById("myStyle"));
      createdClasses = true;
    }
    for (let node of nodes) {
      // let nodeString = node.id;
      let tooltipId = node.id + "Tooltip";
      let toolTipNode = Object.assign(document.createElement("span"), {id:tooltipId});
      // let tooltip = document.createElement("p");

      // console.log(node.id)
      let currNode = window.gameState.researchTree.get(node.id);
      // console.log(currNode);
      // Add the specific text for each tooltip
      let toolTipString = "Research Cost: $" + currNode.cost.toLocaleString('en-US') + "\n";
      let costText = Object.assign(document.createElement("p"), {className: "normalText",innerHTML: toolTipString});
      toolTipString = "Research Time: " + currNode.time + "\n";
      let durationText = Object.assign(document.createElement("p"), {className: "normalText",innerHTML: toolTipString});
      toolTipNode.append(costText, durationText);
      switch(currNode.type) {
        case "product":
            let currProduct = window.gameState.products.get(currNode.id);

            let whiteSpace = Object.assign(document.createElement("p"), {className: "whiteSpace", innerHTML:"ㅤ"})
            toolTipString = "Unlocks " + currProduct.name + ":";
            let productText = Object.assign(document.createElement("p"), {className: "normalText",innerHTML: toolTipString});

            toolTipString = "" + "Components:\n"
            let componentsText = Object.assign(document.createElement("p"), {className: "subHeader",innerHTML: toolTipString});

            toolTipNode.append(whiteSpace, productText, componentsText);
            
            let componentCost = 0.0;
            for (const [component, amount] of currProduct.components.entries()) {
              let componentNode = window.gameState.resources.get(component);
              componentCost += (amount*componentNode.value);
              toolTipString = "- " + componentNode.name + ": " + amount + "\n";
              let currComponent = Object.assign(document.createElement("p"), 
                {className:"componentText",innerHTML: toolTipString});

              toolTipNode.append(currComponent);
            }
            toolTipString = "Sells For: $" + currProduct.value.toLocaleString('en-US');
            let valueText = Object.assign(document.createElement("p"), {className: "subHeader",innerHTML: toolTipString});

            toolTipString = "Profit: $" + (currProduct.value - componentCost).toLocaleString('en-US');
            let profitText = Object.assign(document.createElement("p"), {className: "subHeader",innerHTML: toolTipString});

            toolTipNode.append(valueText, profitText);
            break;
        case "machine":
            let currMachine = window.gameState.machines.get(currNode.id);

            let machineSpace = Object.assign(document.createElement("p"), {className: "whiteSpace", innerHTML:"ㅤ"})
            toolTipString = "Unlocks " + currMachine.machineName + ":";
            let machineText = Object.assign(document.createElement("p"), {className: "normalText",innerHTML: toolTipString});

            toolTipString = "Output Rate: " + currMachine.upgradeLevel.toFixed(1) + "x"
            let outputText = Object.assign(document.createElement("p"), {className: "subHeader",innerHTML: toolTipString});

            toolTipString = "Cost : $" + currMachine.machineCost.toLocaleString('en-US');
            let costText = Object.assign(document.createElement("p"), {className: "subHeader",innerHTML: toolTipString});

            toolTipNode.append(machineSpace, machineText, outputText, costText);
            break;
        default:
            // Bonus Node
            let bonusType = currNode.type.replace("bonus", "");
            let bonusSpacer = Object.assign(document.createElement("p"), {className: "whiteSpace", innerHTML:"ㅤ"})
            toolTipNode.append(bonusSpacer);
            switch(bonusType) {
              case "Output":
                // window.gameState.outputEfficiency += currNode.bonus;
                let currBonus = currNode.bonus * 100;
                toolTipString = "Output efficiency increases the number of products you can make for the same "
                  + "amount of resources:"
                let descText = Object.assign(document.createElement("p"), {className: "subHeader",innerHTML: toolTipString});
                // toolTipString = "total = products x outputEfficiency"
                // let bonusText = Object.assign(document.createElement("p"), {className: "componentText",innerHTML: toolTipString});
                toolTipNode.append(descText);
                break;
              case "Input":
                // window.gameState.inputEfficiency += currNode.bonus;
                break;
              case "Throughput":
                // window.gameState.throughputEfficiency += currNode.bonus;
                break;
            }
            break;
      }
      // toolTipNode.innerHTML = node.id + "";
      // tooltip.innerHTML = toolTipString;
      // toolTipNode.append(tooltip);
      // toolTipNode.innerHTML = toolTipString;

      document.getElementById(node.id).append(toolTipNode);
    }
  
    // Change the background image back to the research image
    document.body.style.backgroundImage = "url('assets/img/researchBackground.jpg')";
  }

  function goBackMain() {
    
    const currPage = document.getElementById("researchDiv");
    // document.getElementById("topPadding").classList.remove("hiddenElement");

    // Set the innerFactory scene in the map to the updated current one
    window.gameState.pages.set("research", currPage);
    // Acquire the main scene from the map
    const mainPage = window.gameState.pages.get("main");
    // const innerFactoryPage = window.gameState.pages.get("innerFactory");
    // window.gameState.pages.set("innerFactory", innerFactoryPage);

    // const factoryDiv = document.getElementById("factoryDiv");

    // Replace the innerFactory scene with the main scene
    document.body.replaceChild(mainPage, currPage);

    // Change the background image back to the main image
    document.body.style.backgroundImage = "url('assets/img/factoryBackground.png')";
}

  function research() {
      console.log(this.id);
      if (window.gameState.researching != null) {
          // Could also add a queue system, where you
          // can add/remove items to be researched
          console.log("Already researching something");
          return;
      } else if (window.gameState.researched.has(this.id)) {
        console.log("Already researched this Node");
        return;
      }
      let thisNode = window.gameState.researchTree.get(this.id);

      //console.log(thisNode.cost); // Cost of the node to research
      

      if (thisNode.requiredPrereqNodes != null) {
          for (let node of thisNode.requiredPrereqNodes) {
              if (!window.gameState.researched.has(node)) {
                  console.log("Lacking required prereq node: " + node);
                  return;
                }
            }
        }

      // Check to see if the player has enough money
      if (spendCash(thisNode.cost) == -1) {
        console.log("Cannot research this node.");
        return;
      }
      

      this.classList.add("inactiveNode");
      this.removeEventListener("click", research);
      
      window.gameState.researching = thisNode;
      window.gameState.researchTimeLeft = thisNode.time;

      console.log("Now researching: " + thisNode.name);
      let progressBar = document.getElementById("progressBar");
      barWidth = 0.0;
      document.getElementById("progressBar").style.width = 0 + "%";

      document.getElementById("progressText").textContent = thisNode.name;

      // (thisNode.time / 100) / 20
      // let stepSize =  100 / (thisNode.time * 10);
      // let speed = updateInterval / 1000;
      // let stepSize = (thisNode.time * speed) / 40;
      //       // function move() {
      //       // if (i == 0) {
      // let time = window.gameState.researching.time;
      // let timeLeft = window.gameState.researchTimeLeft;
      // // i = 1;
      // let bar = document.getElementById("progressBar");
      // // bar.style.width = barWidth + "%";
      // // let width = 100 * ((-1*(timeLeft - time)) / time);
      // // console.log("width outside of interval is: " + barWidth);
      // let count = 0;
      // let id = setInterval(frame, 50);
      // function frame() {
      //     // count++;
      //     if (barWidth <= 100) {
      //         barWidth += stepSize;
      //         // bar.style.width = barWidth + "%";
      //         console.log("width is: " + barWidth);
      //     } else {
      //         // barWidth += stepSize;
      //         bar.style.width = barWidth + "%";
      //         console.log("Done updating")
      //         clearInterval(id);
      //     }
      //     bar.style.width = barWidth + "%";
      //     // console.log("width is: " + width);
      // }
  }

  function completeResearch(node) {
      switch(node.type) {
        case "product":
            break;
        case "machine":
            break;
        default:
            // Bonus Node
            let bonusType = node.type.replace("bonus", "");
            switch(bonusType) {
              case "Output":
                window.gameState.outputEfficiency += node.bonus;
                break;
              case "Input":
                window.gameState.inputEfficiency += node.bonus;
                break;
              case "Throughput":
                window.gameState.throughputEfficiency += node.bonus;
                break;
            }
            break;
      }
  }

  function updateTreant() {

  }

  