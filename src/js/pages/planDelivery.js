// This will be used to keep track of the next truck that is ready.
// It will be -1 if all trucks are in use.
var truckReady = 1;

function createPlanDevlieryPage() {
    // The div that stores everything
    const planDeliveryDiv = Object.assign(document.createElement('div'),{className:"horizontal", id:"planDeliveryDiv"});
    // Get the modals
    let resourceModal = resources();
    let storesModal = stores();
    let seeDelivModal = seeDeliveries();

    // Create the buttons
    const factoriesBtn = Object.assign(document.createElement('button'),{className:"factoriesButton"});
    factoriesBtn.innerHTML = "Factories";
    const storesBtn = Object.assign(document.createElement('button'),{className:"storesButton", id:"storesBtn"});
    storesBtn.innerHTML = "Stores";
    //storesBtn.addEventListener("click", showStoresModal());
    const resourcesBtn = Object.assign(document.createElement('button'),{className:"resourcesButton" , id:"resourcesBtn"});
    resourcesBtn.innerHTML = "Resources";
    //resourcesBtn.addEventListener("click", showResourcesModal());
    // The delivery button
    const deliveryBtn = Object.assign(document.createElement('button'),{className:"sideButton", id:"deliveryBtn", disabled:"true"});
    deliveryBtn.innerHTML = "Deliver";
    deliveryBtn.addEventListener("click", deliver);
    // The delivery
    const seeDelivBtn = Object.assign(document.createElement('button'),{className:"sideButton", id:"seeDelivBtn", disabled:"true"});
    seeDelivBtn.innerHTML = "See Deliveries";
    //seeDelivBtn.addEventListener("click", showSeeDeliveriesModal());
    // The button that goes back to the main scene
    const backBtn = Object.assign(document.createElement('button'),{className:"sideButton", id:"goBackBtn"});
    backBtn.innerHTML = "Go Back";

    // The div that will contain the back button
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "deliveryBtns";

    // Add the buttons to a div
    buttonDiv.append(deliveryBtn, seeDelivBtn, seeDelivModal, backBtn);
    
    // Add everything to the div
    planDeliveryDiv.append(factoriesBtn, storesBtn, storesModal, resourcesBtn, resourceModal, buttonDiv);

    return planDeliveryDiv;
}

function goBackDeliv() {
    
    const planDeliveryPage = document.getElementById("planDeliveryDiv");

    // Set the innerFactory scene in the map to the updated current one
    window.gameState.pages.set("planDelivery", planDeliveryPage);

    // Acquire the main scene from the map
    const mainPage = window.gameState.pages.get("main");

    // Replace the innerFactory scene with the main scene
    document.body.replaceChild(mainPage, planDeliveryPage);

    // Change the background image back to the main image
    document.body.style.backgroundImage = "url('assets/img/factoryBackground.png')";

    // window.clickedElement.machine = undefined;
}

function stores() {
  // Main div for modal
  let modalDiv = Object.assign(document.createElement('dialog'),{className:"w3-modal dispayElement", id:"storesModalDiv"});
  let contentDiv = Object.assign(document.createElement('div'),{className:"w3-modal-content w3-card-4"});
  let textDiv = Object.assign(document.createElement('div'),{style:"padding-top: 30px"});

  let span = Object.assign(document.createElement('span'),{className:"w3-button w3-xlarge w3-hover-red w3-display-topright", innerHTML:"&times;", id:"close1"});
  //span.addEventListener(document.getElementById('storesModalDiv').style.display='none');
  
  let maintext = Object.assign(document.createElement('h3'),{innerHTML:"\nSelect the product(s) you want to sell.\nThen, enter their value(s)."});
  
  textDiv.append(span, maintext);

  let form = Object.assign(document.createElement('form'),{className:"w3-container", action:""});

  let div = Object.assign(document.createElement('div'),{className:"w3-section"});

  // PRODUCT 1
  let label1 = Object.assign(document.createElement('label'),{innerHTML:"<b>Product 1:</b>", style:"margin-right: 10px; font-size: 17px;"});
  let select1 = Object.assign(document.createElement('select'),{ id:"prods1", required:"true", style:"width: 217px; font-size: 17px;"});
  let label_1 = Object.assign(document.createElement('amount'),{innerHTML:"<br><b>Amount: </b>", style:"margin-right: 10px; font-size: 17px;"});
  let input1 = Object.assign(document.createElement('input'),{class:"w3-input w3-border w3-margin-bottom", type:"number", id:"product1", required:"true"});
  input1.min = 0;
  // Add the options
  for (let [productType, quantity] of Object.entries(window.gameState.regions[currentRegion].reactiveData.contents)) {
    if (window.gameState.products.has(productType) && quantity > 0) { // Add it as an option
      let option = document.createElement('option');
      option.innerHTML = window.gameState.products.get(productType).name;
      select1.add(option);
    }
  }
  label1.append(select1);
  
  // PRODUCT 2
  let label2 = Object.assign(document.createElement('label'),{innerHTML:"<br><b>Product 2:</b>", style:"margin-right: 10px; font-size: 17px;"});
  let select2 = Object.assign(document.createElement('select'),{id:"prods2", style:"width: 217px; font-size: 17px;"});
  let label_2 = Object.assign(document.createElement('amount'),{innerHTML:"<br><b>Amount: </b>", style:"margin-right: 10px; font-size: 17px;"});
  let input2 = Object.assign(document.createElement('input'),{class:"w3-input w3-border w3-margin-bottom", type:"number", id:"product2"});
  input2.min = 0;
  // Add the options
  let emptyOption = Object.assign(document.createElement('option'),{text:"N/A"});
  select2.add(emptyOption);
  for (let [productType, quantity] of Object.entries(window.gameState.regions[currentRegion].reactiveData.contents)) {
    if (window.gameState.products.has(productType) && quantity > 0) { // Add it as an option
      let option2 = document.createElement('option');
      option2.innerHTML = window.gameState.products.get(productType).name;
      select2.add(option2);
    }
  }
  select2.addEventListener("change", checkInput);
  label2.append(select2);
  
  // PRODUCT 3
  let label3 = Object.assign(document.createElement('label'),{innerHTML:"<br><b>Product 3:</b>", style:"margin-right: 10px; font-size: 17px;"});
  let select3 = Object.assign(document.createElement('select'),{id:"prods3", style:"width: 217px; font-size: 17px;"});
  let label_3 = Object.assign(document.createElement('amount'),{innerHTML:"<br><b>Amount: </b>", style:"margin-right: 10px; font-size: 17px;"});
  let input3 = Object.assign(document.createElement('input'),{class:"w3-input w3-border w3-margin-bottom", type:"number", id:"product3"});
  input3.min = 0;
  // Add the options
  //let emptyOption = document.createElement('option').innerHTML = ""
  let emptyOption2 = Object.assign(document.createElement('option'),{text:"N/A"});
  select3.add(emptyOption2);
  for (let [productType, quantity] of Object.entries(window.gameState.regions[currentRegion].reactiveData.contents)) {
    if (window.gameState.products.has(productType) && quantity > 0) { // Add it as an option
      let option3 = document.createElement('option');
      option3.innerHTML = window.gameState.products.get(productType).name;
      select3.add(option3);
    }
  }
  select3.addEventListener("change", checkInput);
  label3.append(select3);

  // BUTTONS
  let doneBtn = Object.assign(document.createElement('button'),{id:"doneBtn1", class:"w3-button w3-block w3-green w3-section w3-padding", innerHTML:"Done", type:"button", style:"margin-right: 30px; border: 2px solid #4CAF50; width: 80px; font-size: large;"});
  doneBtn.addEventListener("click", submitProducts);
  let cancelBtn = Object.assign(document.createElement('button'),{id:"cancelBtn", class:"w3-button w3-red w3-block w3-section", innerHTML:"Cancel", id:"cancel1", type:"button", style: "border: 2px solid #f44336; width: 80px; font-size: large;"});
  //cancelBtn.addEventListener(document.getElementById('cancelBtn').style.display='none');

  // Put everything together
  let d1a = Object.assign(document.createElement('div'),{className:"modalLabel"});
  let d1b = Object.assign(document.createElement('div'),{className:"modalAmount"});
  d1a.append(label1, select1);
  d1b.append(label_1, input1);
  let d2a = Object.assign(document.createElement('div'),{className:"modalLabel"});
  let d2b = Object.assign(document.createElement('div'),{className:"modalAmount"});
  d2a.append(label2, select2);
  d2b.append(label_2, input2);
  let d3a = Object.assign(document.createElement('div'),{className:"modalLabel"});
  let d3b = Object.assign(document.createElement('div'),{className:"modalAmount"});
  d3a.append(label3, select3);
  d3b.append(label_3, input3);

  let btnDiv = Object.assign(document.createElement('div'),{style:"text-alight: left; margin-top: 50px; margin-bottom: 30px;"});
  btnDiv.append(doneBtn, cancelBtn);

  div.append(d1a, d1b, d2a, d2b, d3a, d3b, btnDiv);
  form.append(div);
  contentDiv.append(textDiv, form);
  modalDiv.append(contentDiv);

  return modalDiv;

  /* 
  1<div id="id01" class="w3-modal">
    2<div class="w3-modal-content w3-card-4">

      3<div class="w3-center">
        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
        <h3><br>Select the product(s) you want to sell.<br>Then, enter their values.</h3>
      3</div>

      4<form class="w3-container" action="">
        5<div class="w3-section">
        
          <label><b>Product 1:</b>
          	<select id="prods1">
            	<option value="0"></option>
  			    </select>
  		    </label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" name="prod1" required>
          <label><b>Product 2:</b>
          	<select id="prods2">
            	<option value="0"></option>
  			    </select>
  		    </label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" name="prod2">
          <label><b>Product 3:</b>
          	<select id="prods3">
            	<option value="0"></option>
  			    </select>
  		    </label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" name="prod3">
          <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Done</button>
          <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red w3-block w3-section">Cancel</button>
        
        5</div>
      4</form>
    2</div>
  1</div>
    */
}

function submitProducts() {
  // Make sure form is correctly filled out
  let isGood = checkInput();
  if (!isGood) {
    alert("Please fill out require text boxes. Hover over them to check which you are missing.");
    return;
  }

  if (truckReady == -1) {
    return;
  }

  // Variable for the total weight
  var total = 0;
  // Get the product 1 name and quantity
  let product1 = document.getElementById("prods1");
  let prod1Num;
  if (product1.options[product1.selectedIndex].text != "N/A") {
    let prod1Name = product1.options[product1.selectedIndex].text;
    prod1Num = parseInt(document.getElementById("product1").value);
    //console.log(prod1Name + " " + prod1Num);

    // Remove spaces
    var newProd1Name = prod1Name.replace(/\s+/g, '');
    // Fix first character
    newProd1Name = newProd1Name.charAt(0).toLowerCase() + newProd1Name.slice(1);

    // Fix the limit
    if (prod1Num > window.gameState.regions[currentRegion].reactiveData.contents[newProd1Name]) {
      alert("Enter a valid product value.");
      return;
    }    

    // Add it to the list of wants
    window.gameState.regions[currentRegion].trucks.forEach(function(truck) {
      if (truck.truckID == truckReady) {
        //console.log(newProd1Name);
        truck.productWants.set(newProd1Name, prod1Num);
      }
    });
    //console.log("wants.get(): " + window.gameState.regions[currentRegion].trucks.values().next().value.productWants.get(newProd1Name));
    
    // Add it to the weight
    for(let p of window.gameState.products.values()) {
      if(newProd1Name == p.id) {
        total += (prod1Num * p.weight);
        console.log("total of product 1 = " + prod1Num + " * " + p.weight);
      }
    }
  }

  // Check if product 2 was selected. If so, add it to the list of wants
  let product2 = document.getElementById("prods2");
  let prod2Num;
  if (product2.options[product2.selectedIndex].text != "N/A") {
    let prod2Name = product2.options[product2.selectedIndex].text;
    prod2Num = parseInt(document.getElementById("product2").value);
    // Remove spaces
    var newProd2Name = prod2Name.replace(/\s+/g, '');
    // Fix first character
    newProd2Name = newProd2Name.charAt(0).toLowerCase() + newProd2Name.slice(1);

    // Fix limit
    if (prod2Num > window.gameState.regions[currentRegion].reactiveData.contents[newProd2Name]) {
      alert("Enter a valid product value.");
      return;
    }

    // Add it to the list of wants
    window.gameState.regions[currentRegion].trucks.forEach(function(truck) {
      if (truck.truckID == truckReady) {
        truck.productWants.set(newProd2Name, prod2Num);
      }
    });
    // Add it to the weight
    for(let p of window.gameState.products.values()) {
      if(newProd2Name == p.id) {
        total += (prod2Num * p.weight);
        console.log("total of product 2 = " + prod2Num + " * " + p.weight);
        console.log("New total = " + total);
      }
    }
  }

  // Check if product 3 was selected. If so, add it to the list of wants
  let product3 = document.getElementById("prods3");
  let prod3Num;
  if (product3.options[product3.selectedIndex].text != "N/A") {
    let prod3Name = product3.options[product3.selectedIndex].text;
    prod3Num = parseInt(document.getElementById("product3").value);
    // Remove spaces
    var newProd3Name = prod3Name.replace(/\s+/g, '');
    // Fix first character
    newProd3Name = newProd3Name.charAt(0).toLowerCase() + newProd3Name.slice(1);

    // Fix limit
    if (prod3Num > window.gameState.regions[currentRegion].reactiveData.contents[newProd3Name]) {
      alert("Enter a valid product value.");
      return;
    }

    // Add it to the list of wants
    window.gameState.regions[currentRegion].trucks.forEach(function(truck) {
      if (truck.truckID == truckReady) {
        truck.productWants.set(newProd3Name, prod3Num);
      }
    });
    // Add it to the weight
    for(let p of window.gameState.products.values()) {
      if(newProd3Name == p.id) {
        total += (prod3Num * p.weight);
        console.log("total of product 3 = " + prod3Num + " * " + p.weight);
        console.log("New total = " + total);
      }
    }
  }

  // Save the weight to truck
  if (truckReady != -1) {
    window.gameState.regions[currentRegion].trucks.forEach(function(truck) {
      if (truck.truckID == truckReady) {
        truck.currentWeight += total;
        console.log("currentWeight: " + truck.currentWeight);
      }
    });
  } else {
    return;
  }

  // Check if the Deliver button needs to be enabled
  if (document.getElementById("deliveryBtn").disabled = true) {
    document.getElementById("deliveryBtn").disabled = false;
  }
  // Close the modal
  closeModal();

}

function checkInput() {
  var select2 = document.getElementById("prods2");
  var select3 = document.getElementById("prods3");
  var option2 = select2.options[select2.selectedIndex].text;
  var option3 = select3.options[select3.selectedIndex].text;

  // Check if input2 needs to be required
  if(option2 != "N/A") {
    document.getElementById("product2").required = true;
  } else {
    document.getElementById("product2").required = false;
  }

  // Check if input3 needs to be required
  if(option3 != "N/A") {
    document.getElementById("product3").required = true;
  } else {
    document.getElementById("product3").required = false;
  }


  if ((document.getElementById("product2").required == true && parseInt(document.getElementById("product2").length) == 0) || (document.getElementById("product3").required == true && parseInt(document.getElementById("product3").length) == 0)) {
    return false;
  } else {
    return true;
  }
}

function resources() {
  let br = Object.assign(document.createElement('div'),{innerHTML:"<br>"});
  // Main div for modal
  let modalDiv = Object.assign(document.createElement('dialog'),{className:"w3-modal dispayElement", id:"resourcesModalDiv"});
  let contentDiv = Object.assign(document.createElement('div'),{className:"w3-modal-content w3-card-4"});
  let textDiv = Object.assign(document.createElement('div'),{style:"padding-top: 30px"});

  let span = Object.assign(document.createElement('span'),{className:"w3-button w3-xlarge w3-hover-red w3-display-topright", innerHTML:"&times;", id:"close2"});
  //span.addEventListener(document.getElementById('storesModalDiv').style.display='none');
  
  let maintext = Object.assign(document.createElement('h3'),{innerHTML:"\nSelect the resource(s) you want to buy.\nThen, enter their value(s)."});
  
  textDiv.append(span, maintext);

  let form = Object.assign(document.createElement('form'),{className:"w3-container", action:""});

  let div = Object.assign(document.createElement('div'),{className:"w3-section"});

  // RESOURCE 1
  let label1 = Object.assign(document.createElement('label'),{innerHTML:"<b>Resource 1:</b>", style:"margin-right: 10px; font-size: 17px;"});
  let select1 = Object.assign(document.createElement('select'),{id:"res1", required:"true", style:"width: 207px; font-size: 17px;"});
  
  // Add the options
  for (let [resourceType, quantity] of Object.entries(window.gameState.regions[currentRegion].reactiveData.contents)) {
    // console.log("Iterating over reactiveData: " + resourceType)
    // console.log("Quantity: " + quantity)
    if (!window.gameState.products.has(resourceType)) { // Add it as an option
      let option = document.createElement('option');
      console.log(window.gameState.resources.get(resourceType));
      console.log(resourceType);
      option.innerHTML = window.gameState.resources.get(resourceType).name;
      select1.append(option);
    }
  }
  label1.append(select1);
  let label1_ = Object.assign(document.createElement('amount'),{innerHTML:"<br><b>Amount: </b>", style:"margin-right: 10px; font-size: 17px;"});
  let label2_ = Object.assign(document.createElement('amount'),{innerHTML:"<br><b>Amount: </b>", style:"margin-right: 10px; font-size: 17px;"});
  let label3_ = Object.assign(document.createElement('amount'),{innerHTML:"<br><b>Amount: </b>", style:"margin-right: 10px; font-size: 17px;"});
  let input1 = Object.assign(document.createElement('input'),{class:"w3-input w3-border w3-margin-bottom", type:"number", id:"resource1", required:"true"});
  input1.min = 0;

  // RESOURCE 2
  let label2 = Object.assign(document.createElement('label'),{innerHTML:"<br><b>Resource 2:</b>", style:"margin-right: 10px; font-size: 17px;"});
  let select2 = Object.assign(document.createElement('select'),{id:"res2", style:"width: 207px; font-size: 17px;"});
  // Add the options
  let emptyOption = Object.assign(document.createElement('option'),{text:"N/A"});
  select2.append(emptyOption);
  for (let [resourceType, quantity] of Object.entries(window.gameState.regions[currentRegion].reactiveData.contents)) {
    if (!window.gameState.products.has(resourceType)) { // Add it as an option
      let option2 = document.createElement('option');
      option2.innerHTML = window.gameState.resources.get(resourceType).name;
      select2.append(option2);
    }
  }
  select2.addEventListener("change", checkInputResource);
  label2.append(select2);
  let input2 = Object.assign(document.createElement('input'),{class:"w3-input w3-border w3-margin-bottom", type:"number", id:"resource2"});
  input2.min = 0;

  // RESOURCE 3
  let label3 = Object.assign(document.createElement('label'),{innerHTML:"<br><b>Resource 3:</b>", style:"margin-right: 10px; font-size: 17px;"});
  let select3 = Object.assign(document.createElement('select'),{id:"res3", style:"width: 207px; font-size: 17px;"});
  // Add the options
  let emptyOption2 = Object.assign(document.createElement('option'),{text:"N/A"});
  select3.append(emptyOption2);
  for (let [resourceType, quantity] of Object.entries(window.gameState.regions[currentRegion].reactiveData.contents)) {
    if (!window.gameState.products.has(resourceType)) { // Add it as an option
      let option3 = document.createElement('option');
      option3.innerHTML = window.gameState.resources.get(resourceType).name;
      select3.append(option3);
    }
  }
  select3.addEventListener("change", checkInputResource);
  label3.append(select3);
  let input3 = Object.assign(document.createElement('input'),{class:"w3-input w3-border w3-margin-bottom", type:"number", id:"resource3"});
  input3.min = 0;

  // BUTTONS
  let doneBtn = Object.assign(document.createElement('button'),{id:"doneBtn2", class:"w3-button w3-block w3-green w3-section w3-padding", innerHTML:"Done", type:"button", style:"margin-right: 30px; border: 2px solid #4CAF50; width: 80px; font-size: large;"});
  doneBtn.addEventListener("click", submitResources);
  let cancelBtn = Object.assign(document.createElement('button'),{id:"cancelBtn2", class:"w3-button w3-red w3-block w3-section", innerHTML:"Cancel", id:"cancel2", type:"button", style: "border: 2px solid #f44336; width: 80px; font-size: large;"});
  //cancelBtn.addEventListener(document.getElementById('cancelBtn').style.display='none');

  // Put everything together
  let d1a = Object.assign(document.createElement('div'),{className:"modalLabel"});
  let d1b = Object.assign(document.createElement('div'),{className:"modalAmount"});
  d1a.append(label1, select1);
  d1b.append(label1_, input1);
  let d2a = Object.assign(document.createElement('div'),{className:"modalLabel"});
  let d2b = Object.assign(document.createElement('div'),{className:"modalAmount"});
  d2a.append(label2, select2);
  d2b.append(label2_, input2);
  let d3a = Object.assign(document.createElement('div'),{className:"modalLabel"});
  let d3b = Object.assign(document.createElement('div'),{className:"modalAmount"});
  d3a.append(label3, select3);
  d3b.append(label3_, input3);

  let btnDiv = Object.assign(document.createElement('div'),{style:"text-alight: left; margin-top: 50px; margin-bottom: 30px;"});
  btnDiv.append(doneBtn, cancelBtn);

  div.append(d1a, d1b, d2a, d2b, d3a, d3b, btnDiv);

  form.append(div);
  contentDiv.append(textDiv, form);
  modalDiv.append(contentDiv);

  return modalDiv;

    /*
  <div id="id01" class="w3-modal">
    <div class="w3-modal-content w3-card-4">

      <div class="w3-center"><br>
        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
        <h3>Select the product(s) you want to sell.</h3>
        <h3>Then, enter their values.</h3>
      </div>

      <form class="w3-container" action="">
        <div class="w3-section">
        
          <label><b>Product 1:</b>
          	<select id="prods1">
            	<option value="0"></option>
    			<option value="1">Steel</option>
    			<option value="2">Stainless Steel</option>
  			</select>
  		  </label>
            
          <input class="w3-input w3-border w3-margin-bottom" type="text" name="prod1" required>
          
          <label><b>Product 2:</b>
          	<select id="prods2">
            	<option value="0"></option>
    			<option value="1">Steel</option>
    			<option value="2">Stainless Steel</option>
  			</select>
  		  </label>
          
          <input class="w3-input w3-border w3-margin-bottom" type="text" name="prod2" required>
          
          <label><b>Product 3:</b>
          	<select id="prods3">
            	<option value="0"></option>
    			<option value="1">Steel</option>
    			<option value="2">Stainless Steel</option>
  			</select>
  		  </label>
          
          <input class="w3-input w3-border w3-margin-bottom" type="text" name="prod3" required>
          
          <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Done</button>
          
          <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red w3-block w3-section">Cancel</button>
        </div>
      </form>

    </div>
  </div>
    */
}

function submitResources() {
  // Make sure data is correctly input
  let isGood = checkInputResource();
  if (!isGood) {
    alert("Please fill out require text boxes. Hover over them to check which you are missing.");
    return;
  }

  if (truckReady == -1) {
    return;
  }

  // Variable for the total weight
  var total = 0;
  // Get the resource 1 name and quantity
  let resource1 = document.getElementById("res1");
  let res1Num;
  if (resource1.options[resource1.selectedIndex].text != "N/A") {
    let res1Name = resource1.options[resource1.selectedIndex].text;
    res1Num = parseInt(document.getElementById("resource1").value);
    // Remove spaces
    var newRes1Name = res1Name.replace(/\s+/g, '');
    // Fix first character
    newRes1Name = newRes1Name.charAt(0).toLowerCase() + newRes1Name.slice(1);

    // Fix the limit
    var cost1 = window.gameState.resources.get(newRes1Name).value;
    if (res1Num * cost1 > getCash()) {
      alert("Enter a valid resource value.");
      return;
    }  

    // Add it to the list of wants
    window.gameState.regions[currentRegion].trucks.forEach(function(truck) {
      if (truck.truckID == truckReady) {
        truck.resourceWants.set(newRes1Name, res1Num);
      }
    });
    // Add it to the weight
    for(let r of window.gameState.resources.values()) {
      if(newRes1Name == r.id) {
        total += (res1Num * r.weight);
        console.log("resource total = " + total);
      }
    }
  }

  // Check if resource 2 was selected. If so, add it to the list of wants
  let res2Num;
  let resource2 = document.getElementById("res2");
  if (resource2.options[resource2.selectedIndex].text != "N/A") {
    let res2Name = resource2.options[resource2.selectedIndex].text;
    res2Num = parseInt(document.getElementById("resource2").value);
    // Remove spaces
    var newRes2Name = res2Name.replace(/\s+/g, '');
    // Fix first character
    newRes2Name = newRes2Name.charAt(0).toLowerCase() + newRes2Name.slice(1);

    // Fix the limit
    var cost2 = window.gameState.resources.get(newRes2Name).value;
    if ((res2Num * cost2) + (res1Num * cost1) > getCash()) {
      alert("Enter a valid resource value.");
      return;
    }  

    // Add it to the list of wants
    window.gameState.regions[currentRegion].trucks.forEach(function(truck) {
      if (truck.truckID == truckReady) {
        truck.resourceWants.set(newRes2Name, res2Num);
      }
    });
    // Add it to the weight
    for(let r of window.gameState.resources.values()) {
      if(newRes2Name == r.id) {
        total += (res2Num * r.weight);
        console.log("Added resource 2: " + newRes2Name + " " + r.weight)
        console.log("New total = " + total);
      }
    }
  }

  // Check if resource 3 was selected. If so, add it to the list of wants
  let resource3 = document.getElementById("res3");
  let res3Num;
  if (resource3.options[resource3.selectedIndex].text != "N/A") {
    let res3Name = resource3.options[resource3.selectedIndex].text;
    res3Num = parseInt(document.getElementById("resource3").value);
    // Remove spaces
    var newRes3Name = res3Name.replace(/\s+/g, '');
    // Fix first character
    newRes3Name = newRes3Name.charAt(0).toLowerCase() + newRes3Name.slice(1);

    // Fix the limit
    var cost3 = window.gameState.resources.get(newRes3Name).value;
    if ((res3Num * cost3) + (res2Num * cost2) + (res1Num * cost1) > getCash()) {
      alert("Enter a valid resource value.");
      return;
    }  

    // Add it to the list of wants
    window.gameState.regions[currentRegion].trucks.forEach(function(truck) {
      if (truck.truckID == truckReady) {
        truck.resourceWants.set(newRes3Name, res3Num);
      }
    });
    // Add it to the weight
    for(let r of window.gameState.resources.values()) {
      if(newRes3Name == r.id) {
        total += (res3Num * r.weight);
        console.log("Added resource 3: " + newRes3Name + " " + r.weight)
        console.log("New total = " + total);
      }
    }
  }

  // Save the weight to truck
  if (truckReady != -1) {
    window.gameState.regions[currentRegion].trucks.forEach(function(truck) {
      if (truck.truckID == truckReady) {
        truck.currentWeight += total;
        console.log("currentWeight: " + truck.currentWeight);
      }
    });
  } else {
    return;
  }
  // Check if the Deliver button needs to be enabled
  if (document.getElementById("deliveryBtn").disabled = true) {
    document.getElementById("deliveryBtn").disabled = false;
  }

  // Close modal
  closeModal();
}

function checkInputResource() {
  var select2 = document.getElementById("res2");
  var select3 = document.getElementById("res3");
  var option2 = select2.options[select2.selectedIndex].text;
  var option3 = select3.options[select3.selectedIndex].text;

  // Check if input2 needs to be required
  if(option2 != "N/A") {
    document.getElementById("resource2").required = true;
  } else {
    document.getElementById("resource2").required = false;
  }

  // Check if input3 needs to be required
  if(option3 != "N/A") {
    document.getElementById("resource3").required = true;
  } else {
    document.getElementById("resource3").required = false;
  }

  if ((document.getElementById("resource2").required == true && parseInt(document.getElementById("resource2").length) == 0) || (document.getElementById("resource3").required == true && parseInt(document.getElementById("resource3").length) == 0)) {
    return false;
  } else {
    return true;
  }
}

function seeDeliveries() {
  // Main div for modal
  let modalDiv = Object.assign(document.createElement('dialog'),{className:"w3-modal dispayElement", id:"deliveriesModalDiv"});
  let contentDiv = Object.assign(document.createElement('div'),{className:"w3-modal-content w3-card-4", style:"max-width:350px"});

  // TOP TEXT
  let textDiv = Object.assign(document.createElement('div'),{ });
  let span = Object.assign(document.createElement('span'),{className:"w3-button w3-xlarge w3-hover-red w3-display-topright", innerHTML:"&times;", title:"Close Modal", id:"close3"});
  //span.addEventListener(document.getElementById('deliveriesModalDiv').style.display='none');
  let text = Object.assign(document.createElement('h3'),{innerHTML:"Time Left", style:"font-size: xx-large; padding-top: 20px;"});
  textDiv.append(span, text);

  // FORM
  let form = Object.assign(document.createElement('form'),{className:"w3-container", action:""});
  let div = Object.assign(document.createElement('div'),{className:"w3-section"});

  window.gameState.regions[currentRegion].trucks.forEach(function(t) {
    // Truck ID label
    let tLabel = Object.assign(document.createElement('label'),{className:"w3-margin-bottom", style:"margin-right: 150px; font-size: 20px;"});
    tLabel.innerHTML = "<b>Truck " + t.truckID + ":</b>";
    // Time left info
    let tParagraph = Object.assign(document.createElement('p'),{style:"margin-left: 40px; font-size: 20px;"});
    tParagraph.innerHTML = t.getTime();
    tParagraph.id = "tr" + t.truckID + "Time";
    // Cancel button
    //let cancelBtn = Object.assign(document.createElement('button'),{style:"margin-left: 40px;", className:"w3-button w3-red", innerHTML:"Cancel"});
    //cancelBtn.addEventListener("click", cancelDelivery);
    // onclick="document.getElementById('deliveriesModalDiv').style.display='none'"
    div.append(tLabel, tParagraph);
  });

  // Put everything together
  form.append(div);
  contentDiv.append(textDiv, form);
  modalDiv.append(contentDiv);

  return modalDiv;

    /* 
    <div id="id01" class="w3-modal">
    <div class="w3-modal-content w3-card-4" style="max-width:250px">

      <div class="w3-center"><br>
        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
        <h3>Time Left</h3>
      </div>

      <form class="w3-container" action="">
        <div class="w3-section">
          <label class="w3-margin-bottom"><b>Truck 1:</b></label>
          <p style="margin-left: 40px;">1 hr 50 min 10 sec</p>
          <button style="margin-left: 40px;" onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
           <br><br>
          <label class="w3-margin-bottom"><b>Truck 2:</b></label>
          <p style="margin-left: 40px;">1 hr 50 min 10 sec</p>
          <button style="margin-left: 40px;" onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
          <br><br>
          <label class="w3-margin-bottom"><b>Truck 3:</b></label>
          <p style="margin-left: 40px;">1 hr 50 min 10 sec</p>
          <button style="margin-left: 40px;" onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
        </div>
      </form>

    </div>
  </div>
    */
}

function cancelDelivery() {

}

function deliver() {
  // Calculate the time necessary to deliver the products and/or resources
  if (truckReady != -1) {
    window.gameState.regions[currentRegion].trucks.forEach(function(truck) {
      
      if (truck.truckID == truckReady) {
        truck.calculateTime();
        console.log("Weight: " + truck.currentWeight + " Time in sec: " + truck.time);
        document.getElementById("deliveryBtn").disabled = true;
        document.getElementById("seeDelivBtn").disabled = false;

        // Products
        for(let [p, q] of truck.productWants.entries()) {
          let pString = p + "";
          window.gameState.regions[currentRegion].reactiveData.contents[pString] -= q;
        }
        // Remove money to player
        for(let [r, q] of truck.resourceWants.entries()) {
          spendCash(q * window.gameState.resources.get(r).value);
        }

        alert("Truck #" + truckReady + " is out for delivery!");
          
      }
        if (truckReady == 3) {
          truckReady = -1;
        } else {
          // Make it available
          var prevTruck = truckReady;
          truckReady = truck.truckID;
          // Check the the number has changed
          if (truckReady == prevTruck) {
            truckReady = -1;
          }
        }
    });

    // Print out the list of wants
    // window.gameState.regions[currentRegion].trucks.forEach(function(truck) {
    //   for (let [key, value] of truck.productWants) {
    //     console.log(key + " , " + value);
    //     }
    // });
    // window.gameState.regions[currentRegion].trucks.forEach(function(truck) {
    //   for (let [key, value] of truck.resourceWants) {
    //     console.log(key + " , " + value);
    //     }
    // });
    //console.log("truckReady: " + truckReady);
  } else {
    alert("All trucks are currently in use!");
  }



    /* DO NOT ADD THIS YET
    <div id="id01" class="w3-modal">
    <div class="w3-modal-content w3-card-4" style="max-width:400px">

      <div class="w3-center"><br>
        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
        <h3>Are you sure you want<br>to start the delivery?</h3>
      </div>

      <form class="w3-container" action="">
        <div class="w3-section w3-center">
     
          <button style="margin-right: 30px" onclick="" type="button" class="w3-button w3-green">Yes</button>
          <button onclick="" type="button" class="w3-button w3-red">No</button>
       
        </div>
      </form>

    </div>
  </div>
    */
}

function closeModal() {
  document.getElementById("storesModalDiv").close();
  document.getElementById("resourcesModalDiv").close();
  document.getElementById("storesModalDiv").style.display = "none";
  document.getElementById("resourcesModalDiv").style.display = "none";
}
