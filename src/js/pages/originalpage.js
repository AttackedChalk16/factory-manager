// Add by Dongxin 3/7

// Array of strings for the tutorial mode
const tutorialLines = [
  "Hello! My name is Mr. Murphy! I am here to help you become a successful entrepreneur! (Click here to continue)",
  "I see you are given a startup fund and free factory! Why not build it? (Click here to continue)",
  "Click on the 'Build Factory' button! (Then click here to continue)",
  "Good! Now, to make resources, every factory needs at least one machine. (Click here to continue)",
  "Please note that side buttons on the right could not be selected till a factory is selected. (Click here to continue)",
  "Now the side button 'Machines' has been activated for you in this tutorial. (Click here to continue)",
  "In the real game, all the rest would be opened for you. (Click here to continue)",
  "Now click on the 'Machines' button and you would be switched to another window.",
];

// Next factory variable - is --1 if all factories have been unlocked
var nextFactory = 1;

function setHeader(){
  const header = document.getElementById("timeDay")

  // <h3>8:00am</h3>
  //   <h3>January 1st</h3>
  //   <h3 id="money">Money: $1,000</h3>
  //   <h3 id="numProducts">Products: 0</h3>
  // let h3_time = document.createElement("h3");
  let h3_date = document.createElement("h3");
  let h3_money = document.createElement("h3");
  // let h3_prodct = document.createElement("h3");
  // h3_time.innerHTML = "8:00am"
  h3_date.innerHTML = "January, 1st";
  window.gameState.reactiveData.listen('date', 
    (change) => {
      let day = change.getDate();
      if (day > 3 && day < 21) {
        day += "th";
      } else {
        switch((day%10)) {
          case 1: day+="st"; break;
          case 2: day+="nd"; break;
          case 3: day+="rd"; break;
          default: day+="th"; break;
        }
      }
      
      document.getElementById("dateTime").innerHTML = change.toLocaleString('default', { month: 'long' }) + ", " + day;
    })
      h3_money.innerHTML = "Money: $" + getCash().toLocaleString('en-US');
  window.gameState.reactiveData.listen('cash', 
    (change) => document.getElementById("money").innerHTML = "Money: $" + change.toLocaleString('en-US'));
  // h3_prodct.innerHTML = "Products: 0"

  h3_date.id = "dateTime";
  h3_money.id = "money";
  // h3_prodct.id = "numProducts";

  header.append(h3_date,h3_money);
}

var tutorialMode = false;
// Takes in a boolean
function buildfactorypage(isTutorial) {
    tutorialMode = isTutorial;
  
    // create the gameState
    initializeGameState()
    // set the header after clicking on new game
    setHeader();
    startInterval();

    // build the body of the factory page
    const originaldiv = document.getElementById("welcomeDiv")

    let FactoryDiv = Object.assign(document.createElement('div'),{ id:"factoryDiv"});
    
    // <div style="width:calc(100% - 25vmin);">
    let outerDiv = document.createElement("div")
    outerDiv.style.cssText = "width:calc(100% - 10vw); height:100vh"

    // <div class="horizontal">
    let innerDiv = document.createElement("div")
    innerDiv.id = "factoryContainer"
    
    // <button id="factory1" class="emptyFactory" onclick="buildFactory()">. . .</button>
    // <button id="factory2" class="emptyFactory">. . .</button>
    //    <button id="factory3" class="emptyFactory">. . .</button>
    let f1btn = document.createElement("button")
    let f2btn = document.createElement("button")
    let f3btn = document.createElement("button")
    f1btn.id = "factory1"
    f2btn.id = "factory2"
    f3btn.id = "factory3"

    f1btn.className = "emptyFactory"
    f2btn.className = "emptyFactory"
    f3btn.className = "emptyFactory"


    if (isTutorial == true) {
      f1btn.innerText = "..."
    } else {
      f1btn.innerText = "Free Factory"
    }

    f2btn.innerText = "$50,000"
    f3btn.innerText = "$100,000"
    
    f1btn.addEventListener("click",buildFactory)
    f2btn.addEventListener("click",buildFactory)
    f3btn.addEventListener("click",buildFactory)
    
    innerDiv.append(f1btn,f2btn,f3btn)

    // <!-- This is the progess bar to level up/unlock new features -->
    //     <!-- THERE ARE ISSUES WITH IT -->
    //     <div id="xpProgress" class="wholeProgressBar" style="padding-left: 15.6vmin;"></div>
    let div2_div1_X = document.createElement("div")
    div2_div1_X.id = "xpProgress"
    div2_div1_X.className = "wholeProgressBar"
    div2_div1_X.style.cssText = "padding-left: 15.6vmin;"

    // <div id="xpProgressBar" class="xpBar"></div>
    let div2_div1_X_xpProgressBar = document.createElement("div")
    div2_div1_X_xpProgressBar.id = "xpProgressBar"
    div2_div1_X_xpProgressBar.className = "xpBar"

    div2_div1_X.append(div2_div1_X_xpProgressBar)


    // <div class="buttonsArea">
    let SideBtnDiv = document.createElement("div")
    SideBtnDiv.className = "buttonsArea"
    // <button onclick="manageDelivery()" class="sideButton" id = Deliveries>Manage Deliveries</button>
    //   <button onclick="editSupplies()" class="sideButton" id = Supplies>Supplies</button>
    //   <button onclick="editMachines()" class="sideButton" id = Machines>Machines</button>
    //   <button onclick="editPersonnel()" class="sideButton" id = Personnel>Personnel</button>
    //   <button onclick="buildItems()" class="sideButton" id = Build>Build Items</button>
    //   <button onclick="generateResearchPage()" class="sideButton" id = "research">Research</button>
    let DeliveriesBTN = document.createElement("button")
    let SuppliesBTN = document.createElement("button")
    let MachinesBTN = document.createElement("button")
    //let PersonnelBTN = document.createElement("button")
    //let BuildBTN = document.createElement("button")
    let researchBTN = document.createElement("button")
    let MapBTN = document.createElement("button")

    DeliveriesBTN.id = "Deliveries"
    SuppliesBTN.id = "Supplies"
    MachinesBTN.id = "Machines"
    //PersonnelBTN.id = "Personnel"
    //BuildBTN.id = "Build"
    researchBTN.id = "research"
    MapBTN.id = "Map"

    DeliveriesBTN.className = "sideButton"
    SuppliesBTN.className = "sideButton"
    MachinesBTN.className = "sideButton"
    //PersonnelBTN.className = "sideButton"
    //BuildBTN.className = "sideButton"
    researchBTN.className = "sideButton"
    MapBTN.className = "sideButton"

    DeliveriesBTN.setAttribute("onclick","manageDelivery()")
    SuppliesBTN.addEventListener("click",showSuppliesModal);
    MachinesBTN.setAttribute("onclick","editMachines()")
    //PersonnelBTN.setAttribute("onclick","editPersonnel()")
    //BuildBTN.setAttribute("onclick","buildItems()")
    researchBTN.setAttribute("onclick","generateResearchPage()")
    MapBTN.setAttribute("onclick","seeMap()")

    DeliveriesBTN.innerText = "Manage Deliveries"
    SuppliesBTN.innerText = "Supplies"
    MachinesBTN.innerText = "Machines"
    //PersonnelBTN.innerText = "Personnel"
    //BuildBTN.innerText = "Build Items"
    researchBTN.innerText = "Research"
    MapBTN.innerText = "Map"

    // The machines button needs to be disabled either way
    MachinesBTN.disabled = true

    if(isTutorial == true) {
      // <!-- This has the welcoming message -->
      // <div style="padding-left: 15.6vmin;">
      // <form style="padding: 3.8vmin 0px 9.5vmin 0px">
      // <fieldset id="messageBox" onclick="guideMessage()" class="fieldset" style="background-color: ghostwhite;">
      //   Hello! My name is Mr. Murphy! I am here to help you become a successful entrepreneur! (Click here to continue)
      // </fieldset>
      let messageDiv = document.createElement("div")
      messageDiv.style.cssText = "padding-left: 15.6vmin;"

      let messageForm = document.createElement("form")
      messageForm.style.cssText = "padding: 3.8vmin 0px 9.5vmin 0px"

      let messageFeildset = document.createElement("fieldset")
      messageFeildset.id = "messageBox"
      messageFeildset.setAttribute("onclick","guideMessage()")
      messageFeildset.className = "fieldset"
      messageFeildset.style.cssText = "background-color: ghostwhite;"
      messageFeildset.innerText = tutorialLines[0]
      messageForm.append(messageFeildset)
      messageDiv.append(messageForm)

      // Disable the right buttons
      DeliveriesBTN.disabled = true
      SuppliesBTN.disabled = true
      // PersonnelBTN.disabled = true // issue
      // BuildBTN.disabled = true  // issue
      MapBTN.disabled = true

      // div2_div1.append(div2_div1_div1, div2_div1_welcome,div2_div1_X)
      outerDiv.append(innerDiv, messageDiv)
    } else {
      // div2_div1.append(div2_div1_div1, div2_div1_welcome,div2_div1_X)
      outerDiv.append(innerDiv)
    }

    //SideBtnDiv.append(DeliveriesBTN,SuppliesBTN,MachinesBTN,PersonnelBTN,BuildBTN,researchBTN,MapBTN)
    SideBtnDiv.append(DeliveriesBTN,SuppliesBTN,MachinesBTN,researchBTN,MapBTN)

    // Add event listeners for Supplies
    // document.getElementById("Supplies").addEventListener("click", showSuppliesModal);

    let suppliesModal = supplies()
    // console.log(document.getElementById("supplies_money"))

    // console.log(document.getElementById("supplies_money"))
    FactoryDiv.append(outerDiv,suppliesModal, SideBtnDiv)
    
    // document.body.replaceChild(FactoryDiv, originaldiv);
    document.body.replaceChild(FactoryDiv, welcomeDiv);
    document.body.style.backgroundImage = "url('assets/img/factoryBackground.png')";




    //console.log("check")
    //console.log(document.getElementById("supplies_money"))

  //   window.gameState.reactiveData.listen('cash', 
  // (change) => document.getElementById("supplies_money").innerHTML = "$" + change.toLocaleString('en-US'));
    
}

function supplies(){

  let modalDiv = document.createElement('dialog')
  modalDiv.id = "suppliesModalDiv"
  modalDiv.className = "w3-modal dispayElement "

  let backgoundDiv = document.createElement('div')
  backgoundDiv.id = "backgoundsuppliesModalDiv"
  // backgoundDiv.className = "suppliesbackground"
  backgoundDiv.className = "w3-modal-content w3-card-4 suppliesbackground"

  let factoryListDiv = document.createElement('div')
  factoryListDiv.id = "structuresuppliesModalDiv"
  factoryListDiv.className = "infodisplay"

  let factoryCardDiv = document.createElement('div')
  factoryCardDiv.id = "cardsuppliesModalDiv"
  factoryCardDiv.className = "topbar"

  // let factoryImg = document.createElement('img')
  // factoryImg.className = "factoryImg"
  // factoryImg.src =  "1.png"
  // factoryImg.width = 300
  // factoryImg.height = 300

  let closedia = Object.assign(document.createElement('span'),{className:"w3-button w3-xlarge w3-hover-red w3-display-topright closebtn", innerHTML:"&times;", id:"closedia"});
  // factoryCardDiv.append(factoryImg,closedia)
  factoryCardDiv.append(closedia)


  let factoryinfoDiv = document.createElement('div')
  factoryinfoDiv.id = "infosuppliesModalDiv"
  factoryinfoDiv.className = "info"
  // let factorytitle = document.createElement('h1')
  // factorytitle.innerText = "Defualt"


// checkbox
  // let br = document.createElement("br")

  let infodiv = Object.assign(document.createElement('table'),{className:"wrapinfodiv"});
  let machinediv = Object.assign(document.createElement('div'),{className:"infodiv"});
  let blueprintdiv = Object.assign(document.createElement('div'),{className:"infodiv"});
  let productdiv = Object.assign(document.createElement('div'),{className:"infodiv"});
  let resourcediv = Object.assign(document.createElement('div'),{className:"infodiv"});
  let factoriesdiv = Object.assign(document.createElement('div'),{className:"infodiv"});

  // // machinediv
  // for(i of window.gameState.machines){
  //   let id = "supplies_" + i[0]
  //   let machinedivelement = Object.assign(document.createElement('Label'))
  //   machinedivelement.id = id
  //   machinediv.append(machinedivelement)
  // }

  // // blueprintdiv
  // for ( i of window.gameState.products){
  //   let id = "supplies_" + i[0] + "_blueprint"
  //   let blueprintdivelement = Object.assign(document.createElement('Label'))
  //   blueprintdivelement.id = id
  //   blueprintdiv.append(blueprintdivelement)
  // }

  // productdiv
  let producttitle = Object.assign(document.createElement('h4'),{innerHTML:"Product"})
  productdiv.append(producttitle)
  for( i of window.gameState.products){
    let id = "supplies_" + i[0] + "_products"
    let productdivelement = Object.assign(document.createElement('h6'),{className:"label"})
    productdivelement.id = id
    productdiv.append(productdivelement)
  }

  // resourcediv
  let resourcetitle =  Object.assign(document.createElement('h4'),{innerHTML:"Resource"})
  resourcediv.append(resourcetitle)
  for(i of window.gameState.resources)
  {
    let id = "supplies_" + i[0] + "_resources"
    let resourcedivelement = Object.assign(document.createElement('h6'),{className:"label"})
    resourcedivelement.id = id
    resourcediv.append(resourcedivelement)
  }

  // factory status
  let factorytitle =  Object.assign(document.createElement('h4'),{innerHTML:"Factory Status"})

  let freefactorydiv = Object.assign(document.createElement('div'),{className:"factorystatus"}) 
  let fiftydiv = Object.assign(document.createElement('div'),{className:"factorystatus"}) 
  let hundreddiv = Object.assign(document.createElement('div'),{className:"factorystatus"})
  factoriesdiv.append(factorytitle,freefactorydiv,fiftydiv,hundreddiv)

  let freefactorycheck = Object.assign(document.createElement('input'),{id:"freecheck",type:"checkbox"})
  let fiftydivcheck = Object.assign(document.createElement('input'),{id:"fiftycheck",type:"checkbox"})
  let hundredcheck = Object.assign(document.createElement('input'),{id:"hundredcheck",type:"checkbox"})
  let freefactorylabel = Object.assign(document.createElement('label'),{innerHTML:"Free Factory"})
  let fiftydivlabel = Object.assign(document.createElement('label'),{innerHTML:"$50,000"})
  let hundredlabel = Object.assign(document.createElement('label'),{innerHTML:"$100,000"})
  freefactorydiv.append(freefactorycheck,freefactorylabel)
  fiftydiv.append(fiftydivcheck,fiftydivlabel)
  hundreddiv.append(hundredcheck,hundredlabel)

  freefactorycheck.disabled = true
  fiftydivcheck.disabled = true
  hundredcheck.disabled = true

  // infodiv.append(machinediv,blueprintdiv,productdiv,resourcediv)
  infodiv.append(productdiv,factoriesdiv,resourcediv)


  // factoryinfoDiv.append(factorytitle,infodiv)
  factoryinfoDiv.append(infodiv)


  let btnlistDiv = document.createElement('div')
  btnlistDiv.className = "skill-list"
  btnlistDiv.id = "skillsuppliesModalDiv"

  let btn1 = Object.assign(document.createElement('div'),{className:"moneydiv"});

  // Object.assign(document.createElement('div'),{className:"moneydiv", id:""});

  let btn1h3 = Object.assign(document.createElement('h3'),{id:"supplies_money"});

  // let btn1span = Object.assign(document.createElement('span'),{id:"supplies_money"});
  // btn1span.innerHTML = "Money: $" + getCash().toLocaleString('en-US');
  // window.gameState.reactiveData.listen('cash', (change) => {
  //     console.log("Called the second listen for supplies_money");
  //     let supplies_money = document.getElementById("supplies_money");
  //     if (supplies_money != undefined) {
  //       document.getElementById("supplies_money").innerHTML = "Money: $" + change.toLocaleString('en-US')
  //     }
  //   }
  // );

  // btn1h3.innerHTML = "Money"

  // btn1.append(btn1h3,btn1span)
  btn1.append(btn1h3)

  btnlistDiv.append(btn1)
  factoryListDiv.append(factoryCardDiv,factoryinfoDiv,btnlistDiv)
  backgoundDiv.append(factoryListDiv)
  modalDiv.append(backgoundDiv)

  return modalDiv
}

function buildFactory(){
    // document.getElementById("Machines").disabled=false
    
    // Placeholder for tutorial
    // let iron = new Resource({
    //   name : "Iron",
    //   weight: 7874, // Kg/m^3
    //   volume: 1
    // })

    // steelComponents = new Map();
    // steelComponents.set(iron, 3);

    // let steel = new Product({
    //   name: "Steel",
    //   components: steelComponents,
    //   weight: 7850, // Kg/m^3, though the exact unit is for debate
    //   volume: 1 // 1 cubic meter
    // });

    // I think this is creating endless numbers of factories

    if(this.id == "factory1") {
      let newFactory = new Factory({
        // Have new factories start with steel as default product
        productType : window.gameState.products.get("steel"),
        size : 8,
        regionIndex : 0,
        index : (window.gameState.regions[currentRegion].factories.length), // Rewrite this when region system added
        cost : 0
      });
      window.gameState.regions[currentRegion].factories.push(newFactory);

      //console.log("BEFORE adding truck");
      let truck1 = new Truck({ 
        truckID : 1
      }); // Create new truck
      window.gameState.regions[currentRegion].trucks.add(truck1); // Add truck to the set
      //console.log("AFTER adding truck");

      if (tutorialMode == true) {
        document.getElementById("messageBox").disabled = false;
      }

      var b = document.getElementById(this.id);
      b.className = "builtFactory";
      b.innerHTML = "Factory 1";

      event.target.removeEventListener("click", buildFactory);
      event.target.addEventListener('click', selectFactory);

    } else if (this.id == "factory2") {
      if (getCash() < 50000) {
        alert("You do not have enough money to unlock this factory.");
        return;
      } else {
        let newFactory = new Factory({
          // Have new factories start with steel as default product
          productType : window.gameState.products.get("steel"),
          size : 8,
          regionIndex : 0,
          index : (window.gameState.regions[currentRegion].factories.length), // Rewrite this when region system added
          cost : 50000
        });
        spendCash(50000);
        window.gameState.regions[currentRegion].factories.push(newFactory);

        let truck2 = new Truck({ truckID : 2 }); // Create new truck
        window.gameState.regions[currentRegion].trucks.add(truck2); // Add truck to the set

        var b = document.getElementById(this.id);
        b.className = "builtFactory";
        b.innerHTML = "Factory 2";
        event.target.removeEventListener("click", buildFactory);
        event.target.addEventListener('click', selectFactory);
      }
    } else if (this.id == "factory3") {
      if (getCash() < 100000) {
        alert("You do not have enough money to unlock this factory.");
        return;
      } else {
        let newFactory = new Factory({
          // Have new factories start with steel as default product
          productType : window.gameState.products.get("steel"),
          size : 8,
          regionIndex : 0,
          index : (window.gameState.regions[currentRegion].factories.length), // Rewrite this when region system added
          cost : 100000
        });
        spendCash(100000);
        window.gameState.regions[currentRegion].factories.push(newFactory);

        let truck3 = new Truck({ truckID : 3 }); // Create new truck
        window.gameState.regions[currentRegion].trucks.add(truck3); // Add truck to the set

        var b = document.getElementById(this.id);
        b.className = "builtFactory";
        b.innerHTML = "Factory 3";
        event.target.removeEventListener("click", buildFactory);
        event.target.addEventListener('click', selectFactory);
      }
    }

    // Add factory to region
    //window.gameState.regions[currentRegion].addFactory(newFactory);

    //var b = document.getElementById("factory1");

    //var b = document.getElementById(this.id);
    //b.className = "builtFactory"
    //b.innerHTML = "Factory " + nextFactory.toString();
    //nextFactory++;
    //event.target.addEventListener('click', selectFactory);
  }

  function selectFactory() {
    // The first time an element is selected, create the clickedElement variable
    document.getElementById("Machines").disabled = false;
    if (typeof clickedElement === 'undefined') {
      window.clickedElement = event.target;

      // Use box shadow
      // event.target.style.border = "thick solid #FF0000";
      this.classList.add("selectedElement");
    // When changing the selected element
    } else if (clickedElement !== event.target) {
      if (clickedElement != null) {
        // clickedElement.style.border = "";
        clickedElement.classList.remove("selectedElement");
      }
      clickedElement = event.target;
      // event.target.style.border = "thick solid #FF0000";
      this.classList.add("selectedElement");
    // If you click on the same element twice, deselect it
    } else {
      clickedElement = null;
      // event.target.style.border = "";
      this.classList.remove("selectedElement");
      document.getElementById("Machines").disabled = true;
    }
    
  }

  var line = 1;
  function guideMessage() {
    if (line == 8){
      messageFeildset.disabled = true
    }

    var x = document.getElementById("messageBox");

    x.innerHTML = tutorialLines[line];

    if (line == 2) {
      var b = document.getElementById("factory1");
      b.innerHTML = "Build Factory";
      x.disabled = true;
    }

    line++;
  }

  function editMachines() {
    // Create the main scene in the map
    window.gameState.pages.set("main", document.getElementById("factoryDiv"));

    // Create the inner factory scene
    const innerFactoryPage = createInnerFactoryPage();

    // Set the inner factory scene in the map
    window.gameState.pages.set("innerFactory", innerFactoryPage);

    // Replace the main scene with the inner factory scene
    const factoryDiv = document.getElementById("factoryDiv");
    // window.gameState.pages.get("innerFactory")
    document.body.replaceChild(innerFactoryPage, factoryDiv);
    var customProductselect = new CustomSelect({
      elem: "productSelect"
    });
    //document.getElementById("researchButton").addEventListener("click", researchProducts); // This element does not exist
    document.getElementById("goBackButton").addEventListener("click", goBack);
  
    // Change the background to the inner factory image
    document.body.style.backgroundImage = "url('assets/img/machines.jpg')";
  }

  function manageDelivery() {
    // Create the main scene in the map
    window.gameState.pages.set("main", document.getElementById("factoryDiv"));

    // Create the plan delivery scene
    const planDeliveryPage = createPlanDevlieryPage();

    // Set the inner factory scene in the map
    window.gameState.pages.set("planDelivery", planDeliveryPage);

    // Replace the main scene with the plan delivery scene
    const factoryDiv = document.getElementById("factoryDiv");

    // window.gameState.pages.get("planDelivery")

    document.body.replaceChild(planDeliveryPage, factoryDiv);
    // Add event listeners
    document.getElementById("storesBtn").addEventListener("click", showStoresModal);
    document.getElementById("resourcesBtn").addEventListener("click", showResourcesModal);
    document.getElementById("seeDelivBtn").addEventListener("click", showSeeDeliveriesModal);
    document.getElementById("close1").addEventListener("click", close);
    document.getElementById("close2").addEventListener("click", close);
    document.getElementById("cancel1").addEventListener("click", close);
    document.getElementById("cancel2").addEventListener("click", close);
    document.getElementById("close3").addEventListener("click", close);
    document.getElementById("goBackBtn").addEventListener("click", goBackDeliv);

    // Change the background to the inner factory image
    document.body.style.backgroundImage = "url('assets/img/planDeliveryBackground.png')";

  }

  function closedialog(){
    document.getElementById("suppliesModalDiv").close()
    document.getElementById("suppliesModalDiv").style.display = "none";
  }

  function seeMap() {
    // Create the main scene in the map
    window.gameState.pages.set("main", document.getElementById("factoryDiv"));

    // Create the map scene
    // The div that stores everything
    let map = Object.assign(document.createElement('div'),{id:"mapDiv"});
    let goBackBtn = Object.assign(document.createElement('button'),{className:"regionButton", id:"backBtn", innterHTML:"Go Back", style:"margin-top: 140px;"});
    goBackBtn.addEventListener("click", goBackMap);
    map.append(goBackBtn);
    const mapPage = map;

    // Set the inner factory scene in the map
    window.gameState.pages.set("map", mapPage);

    // Replace the main scene with the map scene
    const mapDiv = document.getElementById("factoryDiv");

    document.body.replaceChild(mapPage, mapDiv);

    // Change the background to the inner factory image
    document.body.style.backgroundImage = "url('assets/img/mapBackground.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  function goBackMap() {
    const mapPage = document.getElementById("mapDiv");
    window.gameState.pages.set("map", mapPage);

    // Acquire the main scene from the map
    const mainPage = window.gameState.pages.get("main");

    // Replace the innerFactory scene with the main scene
    document.body.replaceChild(mainPage, mapPage);

    // Change the background image back to the main image
    document.body.style.backgroundImage = "url('assets/img/factoryBackground.png')";
}

  function close() {
    document.getElementById("storesModalDiv").close();
    document.getElementById("resourcesModalDiv").close();
    document.getElementById("deliveriesModalDiv").close();
    // document.getElementById("suppliesModalDiv").close()
    document.getElementById("storesModalDiv").style.display = "none";
    document.getElementById("resourcesModalDiv").style.display = "none";
    document.getElementById("deliveriesModalDiv").style.display = "none";
    // document.getElementById("suppliesModalDiv").style.display = "none";
  }

  function showStoresModal() {
    //console.log("In showStoresModal");
    document.getElementById("storesModalDiv").close();
    document.getElementById("storesModalDiv").showModal();
    document.getElementById("storesModalDiv").style.display = "inline";
    document.getElementById("storesModalDiv").style.zIndex = "1";
    return false;
  }
  
  function showResourcesModal() {
    //console.log("In showResourcesModal");
    document.getElementById("resourcesModalDiv").close();
    document.getElementById("resourcesModalDiv").showModal(); 
    document.getElementById("resourcesModalDiv").style.display = "inline";
    document.getElementById("resourcesModalDiv").style.zIndex = "1";
    return false;
  }
  
  function showSeeDeliveriesModal() {
    //console.log("In showSeeDeliveriesModal");
    document.getElementById("deliveriesModalDiv").close();
    document.getElementById("deliveriesModalDiv").showModal();
    document.getElementById("deliveriesModalDiv").style.display = "inline";
    document.getElementById("deliveriesModalDiv").style.zIndex = "1";
    return false;
  }

  function showSuppliesModal() {
    //console.log("In showSuppliesModal");
    document.getElementById("suppliesModalDiv").close()
    document.getElementById("suppliesModalDiv").style.display = "none";
    document.getElementById("suppliesModalDiv").showModal();
    document.getElementById("suppliesModalDiv").style.display = "inline";
    document.getElementById("suppliesModalDiv").style.zIndex = "1";
    document.getElementById("closedia").addEventListener("click", closedialog);
    document.getElementById("supplies_money").innerHTML = "Money: $" + getCash().toLocaleString('en-US');

    // for(i of window.gameState.machines){
    //   if(window.gameState.researched.has(i[0])){
    //     document.getElementById("supplies_" + i[0]).innerHTML = i[1].machineName + ": " + "Avaliable"
    //   }else{
    //     document.getElementById("supplies_" + i[0]).innerHTML = i[1].machineName + ": " + "Not Avaliable"
    //   }
    // }

    // // avaliable blueprint:
    // for (let i of window.gameState.products){
    //   if (window.gameState.researched.has(i[0])){
    //     document.getElementById("supplies_" + i[0] + "_blueprint").innerHTML = "<br>" + i[0] + ": " + "Avaliable"
    //   }
    //   else{
    //     document.getElementById("supplies_" + i[0] + "_blueprint").innerHTML = "<br>" + i[0] + ": " + "Not Avaliable"
    //   }
    // }

    // product:
    for (i of window.gameState.products){
      document.getElementById("supplies_" + i[0] + "_products").innerHTML =i[1].name+": "+ window.gameState.regions[currentRegion].reactiveData.contents[i[0]] +"<br>"
    }

    // resource:
    for(i of window.gameState.resources){
      if (!window.gameState.products.has(i[0])){
        document.getElementById("supplies_" + i[0] + "_resources").innerHTML = i[1].name + ": "+  window.gameState.regions[currentRegion].reactiveData.contents[i[0]]  +"<br>"
      }
    }

    // factory
    if (window.gameState.regions[currentRegion].factories.length == 0){
      document.getElementById("freecheck").disabled = true
      document.getElementById("fiftycheck").disabled = true
      document.getElementById("hundredcheck").disabled = true
    }
    else{
      for(i of window.gameState.regions[currentRegion].factories){
        if (i.cost == 0){
          document.getElementById("freecheck").disabled = false
          document.getElementById("freecheck").checked = true
        }
        else if(i.cost == 50000){
          document.getElementById("fiftycheck").disabled = false
          document.getElementById("fiftycheck").checked = true
        }
        else if(i.cost == 100000){
          document.getElementById("hundredcheck").disabled = false
          document.getElementById("hundredcheck").checked = true
        }
      }
    }
    return false;
  }
