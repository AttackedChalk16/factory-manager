// This will hold all the timing stuff
const updateInterval = 500; // milliseconds
const gameSpeed = 1.0;
var barWidth = 0;
var interValStarted = false;

function startInterval() {
    window.setInterval(update, updateInterval);
}

var timeElapsed = 0;
var previousCash = 0;
// Add all the timing things in here.
// If you want to test something: console.log()
function update() {
    previousCash = getCash();
    timeElapsed++;
    // Change the date every 10 sec
    if (timeElapsed % 10 == 0) {
        incrementDate();
    }
    // addCash(1)
    // spendCash(10000)
    // window.gameState.reactiveData.contents.cash++;
    // window.gameState.cash.gain(1);
    // console.log(timeElapsed);
    // Update the item being researched, if time remaining reaches 0
    // set the node as researched -> also update any ui if needed
    if (window.gameState.researchTimeLeft != null) {
        if (!interValStarted) {
            interValStarted = true;
            startResarchInterval();
        }

        if (window.gameState.researchTimeLeft <= 0) {
            window.gameState.researched.add(window.gameState.researching.id);
            console.log("Finished researching: " + window.gameState.researching.name);

            completeResearch(window.gameState.researching);
            

            document.getElementById("progressText").textContent += ": Finished Researching";

            let innerFactoryDiv = document.getElementById("innerFactoryDiv");
            if (innerFactoryDiv != null) {
                let factoryNum = window.clickedElement.id.replace("factory", "") - 1;

                // Recreate the product select with the newly unlocked product
                if (window.gameState.researching.type == "product") {
                    let newProductSelect = Object.assign(document.createElement('select'),
                        {className:"sideButton", id : "productSelect", style:"width: 155px;"});
                    generateProductList(newProductSelect);
                    
                    let productSelect = document.getElementById("productSelect");
                    let customProductSelect = document.getElementById("custom-productSelect")

                    innerFactoryDiv.removeChild(customProductSelect);
                    innerFactoryDiv.replaceChild(newProductSelect, productSelect);

                    newProductSelect.addEventListener("change", setFactoryProduct);
                    newProductSelect.value = window.gameState.regions[currentRegion].factories[factoryNum].productType.id;
                    var customProductselect = new CustomSelect({
                        elem: "productSelect"
                    });
                }

                if (window.gameState.researching.type == "machine") {
                    let factory = window.gameState.regions[currentRegion].factories[factoryNum];
                    let clickedMachine = window.clickedElement.machine;

                    for (let i = 0; i < 8; i++) {
                        // table.querySelector("#machine" + (i)).disabled = true
                        if (factory.machines[i] != null) {
                            let currCell = document.getElementById("cell" + (i));
                            // console.log(i)
                            let currSelect = document.getElementById("machineSelect" + (i));
                            let currCustomSelect = document.getElementById("custom-machineSelect" + (i));

                            // console.log("remove machineSelect" + i);
                            // console.log(currSelect);
                            // console.log(currCustomSelect);
                            currCell.removeChild(currCustomSelect);
                            currCell.removeChild(currSelect);

                            addMachineOptions(currCell, factory.machines[i], currCell);
                            
                            if (clickedMachine.machineIndex != i) {
                                document.getElementById("custom-machineSelect" + (i)).classList.add("inactiveNode");
                            }
                        }
                    }
                    // console.log(clickedMachine.machineIndex);
                    // clickedMachine.parentNode.querySelector("#machineSelect" + clickedMachine.machineIndex)
                    //     .classList.remove("inactiveNode");
                }
            }

            window.gameState.researching = null;

            window.gameState.researchTimeLeft = null
            interValStarted = false;
            
            // barWidth = 0.0;
        } else {
            // let stepSize = 5.0 / window.gameState.researching.time;
            // // function move() {
            // // if (i == 0) {
            // let time = window.gameState.researching.time;
            // let timeLeft = window.gameState.researchTimeLeft;
            // // i = 1;
            // let bar = document.getElementById("progressBar");
            // // bar.style.width = barWidth + "%";
            // // let width = 100 * ((-1*(timeLeft - time)) / time);
            // // console.log("width outside of interval is: " + barWidth);
            // let count = 0;
            // let id = setInterval(frame, updateInterval/30);
            // function frame() {
            //     count++;
            //     if (count < 20) {
            //         barWidth += stepSize;
            //         // bar.style.width = barWidth + "%";
            //         console.log("width is: " + barWidth);
            //     } else {
            //         barWidth += stepSize;
            //         bar.style.width = barWidth + "%";
            //         console.log("Done updating")
            //         clearInterval(id);
            //     }
            //     bar.style.width = barWidth + "%";
            //     // console.log("width is: " + width);
            // }
            window.gameState.researchTimeLeft--;
        }
        
    }
    
    // When updating machine in each machineSelect
    // do querySelectorAll to mass update them?

    // Have factories produce
    // replace when region system added
    for (let region of window.gameState.regions) {
        for (let factory of region.factories) {
            if (factory.productionStats.numMachines > 0) {
                let numProduced = factory.produce();
                //console.log("Factory " + (factory.index+1) + " produced: " + numProduced + " " + factory.productType.name);
            }
        }
    }

    // Go through the regions and their trucks to update the time
    for (let region of window.gameState.regions) {
        for (let truck of region.trucks) {
            if (truck.time != 0) {
                // Decrement time
                truck.time -= 1;

                // Show the truck ID and time remaining
                let truckTime = document.getElementById("tr" + truck.truckID + "Time");
                // Update the time
                if (truckTime != null) {
                    truckTime.innerHTML = truck.getTime();
                }

                if (truck.time == 0) { // If the timer is out
                    alert("Truck #" + truck.truckID + " has returned!");
                    // Remove the products to the player's inventory
                    // Add money from player
                    for(let [p, q] of truck.productWants.entries()) {
                        let pString = p + "";
                        //console.log("Previous # of products: " + region.reactiveData.contents[pString]);
                        // region.reactiveData.contents[pString] -= q;
                        //console.log("New # of" + pString + ": " + region.reactiveData.contents[pString]);
                        var cost = window.gameState.products.get(pString).value;
                        addCash(q * cost);
                    }
                    // Add the resources to the player's inventory
                    // Remove money to player
                    for(let [r, q] of truck.resourceWants.entries()) {
                        let rString = r + "";
                        //console.log("Previous # of resources: " + region.reactiveData.contents[rString]);
                        region.reactiveData.contents[rString] += q;
                        //console.log("New # of " + rString + ": " + region.reactiveData.contents[rString]);
                        var cost = window.gameState.resources.get(rString).value
                        // spendCash(q * cost);
                        
                    }
                    truck.productWants = new Map();
                    truck.resourceWants = new Map();
                    // Reset the current weight
                    truck.currentWeight = 0;
                    truckReady = truck.truckID;
                }
            }
        }
    }

    // Add winning condition
    if ((getCash() == 1000000) && (Math.abs(getCash() - previousCash) == 10000)) {
        // Add a popup
        var txt;
        alert("Congratulations! You have won the game!\nYou can continue playing this game or start a new one."
            + "\nFor your convenience, you can delete the game in the options.");
    }

    // Update the previous cash
    previousCash = getCash();
}


function startResarchInterval() {
    let speed = 1000 / updateInterval;
    // How many seconds it will take to research the node
    let timeToResearch = window.gameState.researching.time / speed;
    // Stepsize should be 100 * (seconds/20)

    // Magic number 124?
    let stepSize = 124 / (timeToResearch * 20);
    // let stepSize = (window.gameState.researching.time * speed) / 40;
    let time = window.gameState.researching.time;
    let timeLeft = window.gameState.researchTimeLeft;
    // i = 1;
    let bar = document.getElementById("progressBar");
    // bar.style.width = barWidth + "%";
    // let width = 100 * ((-1*(timeLeft - time)) / time);
    // console.log("width outside of interval is: " + barWidth);
    let count = 0;
    let id = setInterval(frame, 50);
    function frame() {
        // count++;
        if (barWidth <= 100) {
            barWidth += stepSize;
            // bar.style.width = barWidth + "%";
            // console.log("width is: " + barWidth);
        } else {
            // barWidth += stepSize;
            bar.style.width = 100 + "%";
            // console.log("Done updating")
            clearInterval(id);
        }
        bar.style.width = barWidth + "%";
    }
}

// Function called when a node in the research tree is clicked?
function researchClicked(e) {
    window.gameState.researching = window.gameState.researchTree.get(e.id);
    window.gameState.researchTimeLeft = researching.time;
}