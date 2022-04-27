// GameState will be used to store the state of the game,
// such that information and progress will be maintained,
// and the user can change pages without loss of data
class GameState {
    constructor() {
        this.factories = new Array();
        // Store the names completed researches
        this.researched = new Set();
        // this.cash = 1000;
        this.date = new GameDate();
        this.cash = new Money();
        this.reactiveData = new Reactive({
            cash : 500000,
            date: new Date("January 1, 2021 12:00:00")
        });
        this.researching = null;
        this.researchTimeLeft = null;

        this.outputEfficiency = 1.0;
        this.inputEfficiency = 1.0;
        this.throughputEfficiency = 1.0;

        // Stores the scenes like the main view, inner factory, etc
        this.pages = new Map();

        // Number of regions
        this.regions = new Array();

        /* ---- Should not be saved to server ---- */
        
        // Map of all researchNodes
        this.researchTree = null;
        // Store the names of all researches
        this.research = new Set();

        // Map of all machines
        this.machines = null;

        // Map of all products
        this.products = null;
        
        // Map of Resources
        this.resources = null;

        // Current researchNode being researched (for the setInterval function)
        this.currNode = null;
        this.timeLeft = 0;
        /* End of things that should not be saved to server */
    }

    addResearchedNode(id) {
        window.gameState.researched.add(id);
        console.log("added " + id + " to the researched set");
    }
    
    addResearchNode(id) {
        window.gameState.research.add(id);
        console.log("added " + id + " to the research set");
    }

}

// Since products are resources
function copyProductsToResources() {
    for (const [key, value] of window.gameState.products.entries()) {
        window.gameState.resources.set(key, value);
    }
}

function initializeGameState() {
    if (window.gameState === undefined) {
        console.log("Created a new GameState");
        window.gameState = new GameState();
    } else {
        console.log("Loading gameState");
    }

    generateResearch();
    generateMachines();
    // These two should maybe be merged, because products
    // are resources
    generateResources();
    generateProducts();
    copyProductsToResources();
    // Add steel as a starting product:
    window.gameState.researched.add("steel");
    // Add basic machines as a starting machine
    window.gameState.researched.add("machine0");
    // console.log(window.gameState.researchTree);
    // console.log(window.gameState.machines);

    window.gameState.regions.push(new Region());
}

// window.onload = initializeGameState();

function spendCash(amount) {
    return window.gameState.cash.spend(amount);
}

function addCash(amount) {
    window.gameState.cash.add(amount);
}

function getCash() {
    return window.gameState.cash.get();
}

function incrementDate() {
    window.gameState.date.increment();
}