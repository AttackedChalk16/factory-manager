/**
 * Adds rows/columns to the given HTMLDivElement
 * @param {HTMLTableElement} node 
 * @param {number} capacity 
 */
function generateMachineTable(node, capacity) {
    // Find a <table> element with id="myTable":
    let table = node;
    let factoryNum = window.clickedElement.id.replace("factory", "") - 1;
    // replace when region system added
    let factory = window.gameState.regions[currentRegion].factories[factoryNum];
    
    // let table = document.getElementById("machineTable");

    // For now assume a max of ~8 machines, in two columns
    for (let i = capacity; i >= 1; i--) {
        let row = table.insertRow(0);
        
        let cell1 = row.insertCell(0);
        cell1.id = "cell" + (i - 1);
        let cell2 = row.insertCell(1);
        cell2.id = "cell" + (i + 3);

        let btn1 = Object.assign(document.createElement('button'),{className:"machineButton", id:"machine"+i});
        // btn1.addEventListener("click", accessFactoryMachine);
        btn1.machineIndex = i - 1;
        btn1.addEventListener("click", selectMachines);
        // if (window.gameState.regions[currentRegion].factories[factoryNum].machines[i] != undefined) {
        //     // Set the background/image to that of the appropriate machine
        //     btn1.setAttribute(backgroundImage, url("basicMachine.png"));
        // }
        cell1.appendChild(btn1);
        // console.log("The machine in cell" + (i-1) + " is a: " + factory.machines[i-1]);
        if (factory.machines[i-1] != null) {
            // console.log("trying to recreate machine select in slot: " + (i-1));
            // console.log(cell1.id);
            addMachineOptions(cell1, factory.machines[i-1], cell1);
        }

        

        let btn2 = Object.assign(document.createElement('button'),{className:"machineButton", id:"machine"+(i+4)});
        btn2.machineIndex = i + 3;
        btn2.addEventListener("click", selectMachines);
        cell2.appendChild(btn2);

        if (factory.machines[i+3] != null) {
            // console.log("trying to recreate machine select in slot: " + (i+3));
            // console.log(cell2.id);
            addMachineOptions(cell2, factory.machines[i+3], cell2);
        }

        btn1.innerHTML = "Machine " + i;
        btn2.innerHTML = "Machine " + (i+4);
    }

    // Disable all the machines higher than 1 + current number of machines in this factory
    // Idea is to only allow adding the next highest id machine, rather than in any order
    let numMachines = window.gameState.regions[currentRegion].factories[factoryNum].productionStats.numMachines;
    // for (let machine of window.gameState.regions[currentRegion].factories[factoryNum].machines) {
    //     if (machine !== null) {
    //         numMachines++;
    //     }
    // }
    // let numMachines = window.gameState.regions[currentRegion].factories[factoryNum].machines.length;
    // console.log(numMachines);
    for (let i = 2; i <= 8; i++) {
        table.querySelector("#machine" + (i)).disabled = true
        if (window.gameState.regions[currentRegion].factories[factoryNum].machines[i-1] != null) {
            // console.log(i)
            table.querySelector("#machine" + (i)).disabled = false;
        }
        if (window.gameState.regions[currentRegion].factories[factoryNum].machines[i-2] != null) {
            // console.log(i)
            table.querySelector("#machine" + (i)).disabled = false;
        }
    }
    // for (let i = capacity*2; i > numMachines + 1; i--) {
    //     table.querySelector("#machine" + (i)).disabled = true;
    // }
    // if (window.gameState.regions[currentRegion].factories[factoryNum].machines.length > 0)
}

function removeMachineOptions(machine) {
    let tableEntry = document.getElementById("cell" + machine.machineIndex);
    // console.log(tableEntry);

    let machineSelect = document.getElementById("machineSelect" + machine.machineIndex)
    let customMachineSelect = document.getElementById("custom-machineSelect" + machine.machineIndex)
    // console.log(machineSelect);

    // console.log(machineSelect.value);
    if (machineSelect.value === "none") {
        tableEntry.removeChild(machineSelect);
        tableEntry.removeChild(customMachineSelect);
    }
    // tableEntry.removeChild(document.getElementById("blueprintSelect"));
}

function addMachineOptions(machine, selectedMachine, nonDocumentElement = null) {
    // console.log(machine, prevMachine);

    let tableEntry;
    let machineDropdown;
    let dropdownId;
    // If recreating machine page for an existing machine in that slot
    if (selectedMachine != null) {
        // console.log("selectedMachine is not null, it is: " + selectedMachine);
        let machineName = window.gameState.machines.get(selectedMachine).machineName;
        // console.log("The selectedMachine's name is: " + machineName);
        tableEntry = machine;
        dropdownId = (machine.id).replace("cell", "");
        dropdownId = "machineSelect" + dropdownId;
        machineDropdown = Object.assign(document.createElement("select"),{className:"machineDropdown", id:dropdownId});
        // machineDropdown.value = machineName;
        machineDropdown.disabled = true;
        // // let customMachineDropdown = new CustomSelect({
        // //     elem: machineDropdown
        // // });
        // console.log("custom-" + dropdownId);
        // machineDropdownCustom = document.getElementById("custom-" + dropdownId);
        // machineDropdownCustom.classList.add("inactiveNode");
        // // machineDropdownCustom.close();
    } else {
        tableEntry = document.getElementById("cell" + machine.machineIndex);
        machineDropdown = Object.assign(document.createElement("select"),{className:"machineDropdown", id:("machineSelect" + machine.machineIndex)});
    }
    

    // ADD EVENT LISTENER
    machineDropdown.addEventListener("change", machineSelectListener)

    // Should have method here to create the list of options dynamically
    // based on the user's research and perhaps available cash

    // Create an option with nothing
    let noOption = document.createElement("option");
    noOption.text = " ";
    noOption.value = "none"

    machineDropdown.append(noOption);
    generateMachineList(machineDropdown);
    if (selectedMachine != null) {
        machineDropdown.value = selectedMachine;
    }

    // Add the elements in the dropdown into the table entry
    // tableEntry.append(machineDropdown, blueprintDropdown);
    
    tableEntry.append(machineDropdown);
    if (nonDocumentElement != null) {
        
        // console.log(machine);
        // (selectId.replace("machineSelect", ""));
        let machineString = machine.id.replace("cell", "")
        // console.log("creating a machineSelect with index " + machineString + " and a nonDocument element")
        var customMachineDropdown = new CustomSelect({
            elem: "machineSelect" + machineString
        }, machineDropdown);
    } else {
        // console.log("creating a machineSelect with index " + machine.machineIndex)
        // console.log(machine);
        var customMachineDropdown = new CustomSelect({
            elem: "machineSelect" + machine.machineIndex
        });
    }
    
    
}

function generateMachineList(selectElement) {
    for(let item of window.gameState.researched) {
        let itemNode = window.gameState.researchTree.get(item);
        if (itemNode.type === "machine") {
            let currMachine = window.gameState.machines.get(item);
            let machineOption = document.createElement("option");

            machineOption.value = itemNode.id;
            machineOption.text = currMachine.machineName;
            
            selectElement.append(machineOption);
        }
        
    }
}
function generateProductList(selectElement) {
    // console.log("entered generateProductList");
    for(let item of window.gameState.researched) {
        // console.log(item)
        let itemNode = window.gameState.researchTree.get(item);
        if (itemNode.type === "product") {
            let currProduct = window.gameState.products.get(item);
            // console.log("id: " + itemNode.id);
            let productOption = Object.assign(document.createElement("option"), {id : "" + itemNode.id});

            productOption.value = itemNode.id;
            productOption.text = currProduct.name;
            
            selectElement.append(productOption);
        }

        // selectElement.append(productOption);
    }
}

function selectMachines() {
    // The first time an element is selected, create the clickedElement variable
    // document.getElementById("Machines").disabled = false;
    let prev = window.clickedElement.machine;
    let CustomSelect = this.parentNode.querySelector("#custom-machineSelect" + this.machineIndex);

    // console.log("entered selectMachine")
    // console.log("curr:" + this + " prev:" + prev)

    let prevMachineSelect = null;
    if (prev != undefined) {
        prevMachineSelect = prev.parentNode.querySelector("#machineSelect" + prev.machineIndex);
        // console.log(prevMachineSelect);
        prevMachineSelect.disabled = true;
        prev.parentNode.querySelector("#custom-machineSelect" + prev.machineIndex).classList.add("inactiveNode");
    }
    // console.log("prevMachineSelect is: " + prevMachineSelect);

    // Check if this slot has a select element storing the machine
    let machineSelect = this.parentNode.querySelector("#machineSelect" + this.machineIndex);

    if (prev === this) {
        // console.log("prev === machine");
        removeMachineOptions(this);
    // Not strict equality checking, because this should evaluate for both null and undefined
    } else if (prev != undefined) {
        // console.log("prev not undefined and not curr")
        removeMachineOptions(prev);
    }

    if (machineSelect === null) { // && machineSelect.value === "none"
        // console.log(machineSelect + " is null so going into addMachineOptions on " + this)
        addMachineOptions(this, null);
    } else {
        // console.log("machineSelect is not null, so enabling/disabling it");
        
        if (prev === this) {
            machineSelect.disabled = true;
            CustomSelect.classList.add("inactiveNode");
        } else {
            machineSelect.disabled = false;
            // console.log(CustomSelect)
            CustomSelect.classList.remove("inactiveNode");
        }
    }
    
    if (prev === undefined) {
      window.clickedElement.machine = this;

      // Use box shadow
      this.classList.add("selectedElement");
    //   this.style.border = "thick solid #FF0000";

    // When changing the selected element
    } else if (prev !== this) {
      if (prev != undefined) {
        // window.clickedElement.machine.style.border = "";
        window.clickedElement.machine.classList.remove("selectedElement");
      }
      window.clickedElement.machine = this;
    //   this.style.border = "thick solid #FF0000";
      this.classList.add("selectedElement");
    // If you click on the same element twice, deselect it
    } else {
        window.clickedElement.machine = undefined;
    //   this.style.border = "";
        this.classList.remove("selectedElement")
    }
    
}

function machineSelectListener() {
    let factoryNum = window.clickedElement.id.replace("factory", "") - 1;

    // console.log("Entered machineSelectListener");

    // console.log(this.value);
    let selectId = this.id;

    let machineNum = (selectId.replace("machineSelect", ""));
    let newMachine = this.value;
    let prevMachine = window.gameState.regions[currentRegion].factories[factoryNum].machines[machineNum];
    if (prevMachine == newMachine) {
        return;
    }

    if (newMachine == "none") {
        if (prevMachine != null) {
            addCash((window.gameState.machines.get(prevMachine).machineCost)/2);
            window.gameState.regions[currentRegion].factories[factoryNum].addMachine(newMachine, machineNum);
        }
        return;
    }
    if (spendCash(window.gameState.machines.get(newMachine).machineCost, false) == -1) {
        this.value = "none";
        return;
    }

    if (machineNum < 7) {
        // Unlock the next button (machine)
        let unlockedMachine = machineNum;
        // +2 or +=2 add it as a string, need ++ twice to actually increment
        unlockedMachine++;
        unlockedMachine++;
        unlockedMachine = "machine" + unlockedMachine;

        let nextHigher = document.getElementById(unlockedMachine);
        nextHigher.disabled = false;
    }

    
    // if (enough cash)
    // The type of the machine -> check values in window.gameState.machines
    
    window.gameState.regions[currentRegion].factories[factoryNum].addMachine(newMachine, machineNum);

    // Include some resources in the cost of building the machine
    // for (const [key, value] of window.gameState.regions[currentRegion].factories[factoryNum].productType.components.entries()) {
    //     // Initialize each component of the product to the factory's resources map
    //     // console.log("adding " +10*value + " of " + key);
    //     let resourceString = "" + key;
    //     // console.log(window.gameState.regions[currentRegion].reactiveData.contents[resourceString])
    //     window.gameState.regions[currentRegion].reactiveData.contents[resourceString] += 10*value;
    // }
}

function setFactoryProduct() {
    // Get the select element
    let newProduct = document.getElementById("productSelect");
    // get the selected option's product id
    newProduct = newProduct.options[newProduct.selectedIndex].id;
    // get the corresponding product from the product id
    newProduct = window.gameState.products.get(newProduct);

    // console.log(newProduct);

    let factoryNum = window.clickedElement.id.replace("factory", "") - 1;

    //console.log("Setting factory " + factoryNum + "'s productType to: " + newProduct.name);

    window.gameState.regions[currentRegion].factories[factoryNum].setProductType(newProduct);

    let newFactoryInfo = createFactoryInfo();
    const oldFactoryInfo = document.getElementById("factoryInfo");
    const innerFactoryPage = document.getElementById("innerFactoryDiv");
    innerFactoryPage.replaceChild(newFactoryInfo, oldFactoryInfo);
    document.getElementById("custom-productSelect").remove();
    var customProductselect = new CustomSelect({
        elem: "productSelect"
    });
}

function accessFactoryMachine() {
    let factoryString = window.clickedElement.id;

    // console.log(factoryString);

    let machineIndex = this.id.replace("machine", "") - 1;

    let factoryNum = factoryString.replace("factory", "") - 1;
    //console.log("Factory number is: " + factoryNum);
    //console.log("Machine index is: " + machineIndex);


    //console.log(window.gameState.regions[currentRegion].factories[factoryNum]);

    //console.log(window.gameState.regions[currentRegion].factories[factoryNum].machines[machineIndex]);
    if (window.gameState.regions[currentRegion].factories[factoryNum].machines[machineIndex] != undefined) {
        // Set the background/image to that of the appropriate machine
    }
}

function createFactoryInfo() {
    let factoryNum = window.clickedElement.id.replace("factory", "") - 1;
    // Replace when region system added
    let region = window.gameState.regions[currentRegion];
    let factory = window.gameState.regions[currentRegion].factories[factoryNum];
    // console.log(window.gameState.regions[currentRegion].factories[factoryNum])

    let factoryInfo = Object.assign(document.createElement("div"), {id:"factoryInfo", className:"infoArea"});
    const productHeader = Object.assign(document.createElement("h2"), {id:"productHeader"})
    productHeader.innerHTML = "Product:"
    const productNumHeader = Object.assign(document.createElement("h3"), {id:"productCount"});

    // Change when multiple regions added
    let productString = window.gameState.regions[currentRegion].factories[factoryNum].productType.id + "";

    productNumHeader.innerHTML = window.gameState.regions[currentRegion].factories[factoryNum].productType.name + ":\t\t\t" + 
        window.gameState.regions[currentRegion].reactiveData.contents[productString].toFixed(2);

    window.gameState.regions[currentRegion].reactiveData.listen(productString,  (productString+"InnerFactoryCount"),
        (change) => {
            let productElement = document.getElementById("productCount");
            if (productElement != null) {
                let countString = window.gameState.regions[currentRegion].factories[factoryNum].productType.name;
                countString = countString + ":\t\t\t" + change.toFixed(2);

                if ((window.clickedElement.id.replace("factory", "") -1) == factoryNum) {
                    productElement.innerHTML = countString;
                }
            } else {
                window.gameState.regions[currentRegion].reactiveData.removeListener(productString,  (productString+"InnerFactoryCount"))
            }
        });

    const resourceHeader = Object.assign(document.createElement("h2"), {id:"resourceHeader"});
    resourceHeader.innerHTML = "Resources:"
    factoryInfo.append(productHeader, productNumHeader, resourceHeader);
    
    for(const [resource, amount] of window.gameState.regions[currentRegion].factories[factoryNum].resources.entries()) {
        const resourceNumHeader = Object.assign(document.createElement("h3"), {id:resource + "Count"});
        let resourceString = "" + resource;
        //console.log("Resource String is " + resourceString);
        // CHANGE WHEN MULTIPLE REGIONS ADDED
        resourceNumHeader.innerHTML = window.gameState.resources.get(resourceString).name + ":\t\t\t" 
            + window.gameState.regions[currentRegion].reactiveData.contents[resourceString].toFixed(2);
        window.gameState.regions[currentRegion].reactiveData.listen(resourceString, (resourceString+"InnerFactoryCount"), 
            (change) => {
                let resourceElement = document.getElementById(resourceString + "Count");
                // If the resource element is not found, remove it as a listener
                if (resourceElement != null) {
                    let countString = window.gameState.resources.get(resourceString).name;
                    countString = countString + ":\t\t\t" + change.toFixed(2);
                    resourceElement.innerHTML = countString;
                } else {
                    window.gameState.regions[currentRegion].reactiveData.removeListener(resourceString, (resourceString+"InnerFactoryCount"));
                }
            });
        factoryInfo.append(resourceNumHeader);
    }

    return factoryInfo;
}

function createInnerFactoryPage() {
    let factoryNum = window.clickedElement.id.replace("factory", "") - 1;
    // Replace when region system added
    let factory = window.gameState.regions[currentRegion].factories[factoryNum];

    // document.getElementById("topPadding").classList.add("hiddenElement");

    let factoryInfo = createFactoryInfo();
    // let factoryInfo = Object.assign(document.createElement("div"), {id:"factoryInfo", className:"sideButton"});
    // const productHeader = Object.assign(document.createElement("h3"), {id:"productCount"});
    // factoryInfo.append(productHeader);
    // productHeader.innerHTML = factory.productType.name + ":\t" + factory.products;
    // for(const [resource, amount] of factory.resources.entries()) {
    //     const resourceHeader = Object.assign(document.createElement("h3"), {id:resource + "Count"});
    //     resourceHeader.innerHTML = window.gameState.resources.get(resource).name + ":\t" + amount;
    //     factoryInfo.append(resourceHeader);
    // }

    // The div that will contain the side buttons
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttonsArea";

    // Create the buttons
    const productSelect = Object.assign(document.createElement('select'),{className:"sideButton", id : "productSelect", style:"width: 155px;"});   /* Dongxin edited 2.17*/
    generateProductList(productSelect);
    // Replace when region system added
    // console.log("The productType Object is: " + window.gameState.regions[currentRegion].factories[factoryNum].productType);
    // console.log("The productType name is: " + window.gameState.regions[currentRegion].factories[factoryNum].productType.name);
    // console.log("The productType id is : " +window.gameState.regions[currentRegion].factories[factoryNum].productType.id);
    productSelect.value = window.gameState.regions[currentRegion].factories[factoryNum].productType.id;

    //console.log(window.gameState.regions[currentRegion].factories[factoryNum].productType.name)
    productSelect.addEventListener("change", setFactoryProduct);

    // The div that stores all the above, and is saved/loaded
    const innerFactoryDiv = Object.assign(document.createElement('div'),{id:"innerFactoryDiv"});

    // The table that will store the machines in the factory
    const newTable = document.createElement("table");
    newTable.id = "machineTable";
    // Add 4 rows of 2 machines, WIP
    generateMachineTable(newTable, 4)

    // The button that goes back to the main scene
    const backBtn = Object.assign(document.createElement('button'),{className:"sideButton", id : "goBackButton"});
    backBtn.innerHTML = "Go Back";
    // Add the machine table, and all the side buttons to the div
    buttonsDiv.append(backBtn);
    
    innerFactoryDiv.append(factoryInfo, productSelect, newTable, buttonsDiv);

    let customSelectNodes = innerFactoryDiv.querySelectorAll(".js-Dropdown");
    for (let selectNode of customSelectNodes) {
        selectNode.classList.add("inactiveNode");
    }
    return innerFactoryDiv;
}

function goBack() {
    // document.getElementById("topPadding").classList.remove("hiddenElement");
    const innerFactoryPage = document.getElementById("innerFactoryDiv");

    // Set the innerFactory scene in the map to the updated current one
    window.gameState.pages.set("innerFactory", innerFactoryPage);
    // Acquire the main scene from the map
    const mainPage = window.gameState.pages.get("main");
    // const innerFactoryPage = window.gameState.pages.get("innerFactory");
    // window.gameState.pages.set("innerFactory", innerFactoryPage);

    // const factoryDiv = document.getElementById("factoryDiv");

    // Replace the innerFactory scene with the main scene
    document.body.replaceChild(mainPage, innerFactoryPage);

    // Change the background image back to the main image
    document.body.style.backgroundImage = "url('assets/img/factoryBackground.png')";

    window.clickedElement.machine = undefined;
}

function selectMachine() {
  
}