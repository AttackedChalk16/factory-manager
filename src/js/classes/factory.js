class Resource {
    constructor({
        id, // id of resource
        name, // Resource Name
        weight, // Weight of one unit
        volume, // Volume of space one unit takes up
        value
    }) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.volume = volume;
        this.value = value;
    }
}

// A product can also be a resource, e.g. (R)iron->steel->car
// More advanced products require intermediary resource-products, but
// sell for higher margins?
class Product extends Resource {
    constructor({
        // Add the properties of a product
        id, // id of resource
        name, // Product name, e.g. "Textiles"
        components, // The resources that make up the product: resourceName -> number
        weight,
        volume,
        value,
    }) {
        super({id, name, weight, volume, value});

        this.components = components;
    }
}

class Factory {
    constructor({
        productType, // Product that the factory manufactures
        size, // Number of machines that can be stored in the factory
        regionIndex, // Index of the region containing this factory
        index, // Index of the factory in the array
        cost // Cost of the factory to make
    }) {
        this.productType = productType;
        this.size = size;
        this.regionIndex = regionIndex;
        this.index = index
        this.cost = cost;

        // Expandable machine storage
        this.machines = new Array();
        for (let i = 0; i < size; i++) {
            // Add null values for all the slots, so they can be accessed later
            this.machines.push(null);
        }

        this.productionStats = new Object();
        this.productionStats.numMachines = 0;
        this.productionStats.levelSum = 0;
        this.productionStats.averageOutput = 0.0;

        // let starterMachine = new Machine({
        //     machineName : "Basic Machine" , // Machine name (string)
        //     machineCost : 500.00, // Cost to buy machine (double)
        //     updgradeLevel : 1, // Holds the level the machine is at (int)
        //     squareNumber : 0, // This holds the placement of the machine in the factory (int)
        //     hasBlueprint : false, // Does the machine have a blueprint? (boolean)
        //     isProducing : false, // Is the machine producing? (boolean)
        //     currentProduct : null , // Holds what product the machine is producing (Product)
        //     maxItems : 10 , // Holds the max number of items the machine can hold (int)
        //     operatorCount : 1
        // })

        // this.machines.push(starterMachine);
        // this.machines = new Array();

        // Resource storage of a factory
        this.resources = new Map();
        this.reactiveObject = new Object();
        for (const [key, value] of this.productType.components.entries()) {
        // }
        // for ([key, value] of Object.entries(this.productType.components)) {
            // Initialize each component of the product to the factory's resources map
            this.resources.set(key, 0.0);
            // this.reactiveObject.key = this.resources.get(key);
            let resourceString = "" + key;
            // this.reactiveObject[resourceString] = this.resources.get(key);
        }
        // console.log(this.reactiveObject);
        // Could perhaps define resource capacity

        // this.products = new Map();
        // this.products.set(this.productType, 0);
        // Stores number of products
        this.products = 0.0;
        this.reactiveObject.products = this.products;

        this.reactiveData = new Reactive(this.reactiveObject);
    }

    // Accessor functions
    getProductType() { return this.productType; }
    getSize() { return this.size; }
    getMachines() { return this.machines; }
    getResources() { return this.resources; }
    getProducts() { return this.products; }
    getCost() { return this.cost; }

    // Mutator functions
    // Set the product the factory is producing,should be used in conjunction with other mutators
    setProductType(productType) { 
        if (productType == this.productType) {
            return;
        }
        // If the product is different, maybe sell all the remaining products/resources?
        // this.reactiveObject = new Object();
        this.productType = productType;

        // Clear the map, maybe save the resources it has somehow
        this.resources = new Map();
        for (const [key, value] of this.productType.components.entries()) {
            // Initialize each component of the product to the factory's resources map
            let resourceString = "" + key;
            this.resources.set(key, 0.0);
            // this.reactiveObject[resourceString] = this.resources.get(key);
        }
        let productString = productType.id + "";
        this.products = window.gameState.regions[this.regionIndex].reactiveData.contents[productString];
        // this.reactiveObject.products = this.products;
        // this.reactiveData = new Reactive(this.reactiveObject);
    }

    // Set the capacity of machines in the factory
    setSize(size) { this.size = size; }

    // Set the number of machines in the factory
    setMachines(machines) { this.machines = machines; }

    // resources is a map of product name : amount
    setResources(resources) { this.resources = resources; }

    // Set the number of products in the factory
    setProducts(products) { this.products = products; }

    // Set the cost of the factory
    setCost(cost) { this.cost = cost; }


    // Add the inputted number of machines
    // addMachine(numToAdd) { this.machines += numToAdd; }
    addMachine(machineId, index) {
        // this.machines[index] = machineId;
        let prevMachine = null;
        let machineToAdd = window.gameState.machines.get(machineId);

        
        // Selling an existing machine
        if (machineId == "none") {
            this.productionStats.numMachines--;
            prevMachine = window.gameState.machines.get(this.machines[index]);
            this.productionStats.levelSum -= prevMachine.upgradeLevel;
            // Reset slot to null after selling
            this.machines[index] = null;
        } else {
            // Adding a machine where previously there was none
            // console.log(this.productionStats);
            if (this.machines[index] == null) {
                this.productionStats.numMachines++;
            // Replacing an existing machine
            } else {
                prevMachine = window.gameState.machines.get(this.machines[index]);
                this.productionStats.levelSum -= prevMachine.upgradeLevel;
            }
            // console.log(this.productionStats);
            // console.log(machineToAdd)
            // console.log(machineToAdd.upgradeLevel);
            this.machines[index] = machineId;
            this.productionStats.levelSum += machineToAdd.upgradeLevel;
        }
        // console.log(this.productionStats);

        // if (this.machines[index] == null) {
        //     this.productionStats.numMachines++;
        // } else {
        //     this.productionStats.levelSum -= window.gameState.machines.get(machineId).upgradeLevel;
        // }

        // if (machineId != "none") {
        //     this.productionStats.levelSum += machineToAdd.upgradeLevel;
        // } else {
        //     this.productionStats.numMachines--;
        //     // add cash for selling machine
        // }
        // Upgrade level for now? Can replace later if we have more detailed
        // per machine stats
        
        // Recalculate average
        // console.log(this.reactiveObject);
        this.productionStats.averageOutput = this.productionStats.levelSum / this.productionStats.numMachines;
    }

    produce() {
        // Machines normally consume 1xAmount required of each component,
        // with higher throughput efficiency, they could consume more to
        // produce more in each unit of time
        let throughputEfficiency = window.gameState.throughputEfficiency;

        // Machines normally consume 1xAmount required of each component
        // to produce one unit of product, with higher input efficiency,
        // they could take less inputs to produce same amount of outputs
        let inputEfficiency = window.gameState.inputEfficiency;

        // Machines normally produce 1 unit of product per unit of time,
        // with higher output efficiency, they produce more products
        // with no additional consumption of inputs
        let outputEfficiency = window.gameState.outputEfficiency;

        // Production formula
        // Provided you have sufficient resources:
        // production = 1 * (outputEfficiency) * (throughputEfficiency)
        // required inputs = (1 - inputEfficiency) * (throughputEfficiency)

        // Check if you have all the required resources

        // Ideally, can produce as many products as you have machines
        let possibleProduct = throughputEfficiency * this.productionStats.numMachines * this.productionStats.averageOutput;


        for (const [key, value] of this.productType.components.entries()) {

            // Products that can be produced is limited by the most constrained resource
            // i.e. 8 units of iron is the constraining factor for production when you have
            // sufficient units of other resource types
            // Could also have fractional production -> remove the Math.floor()
            // if (this.resources.get(key) == 0) {
            let resourceString = "" + key;
            // console.log(window.gameState.regions);
            if (window.gameState.regions[this.regionIndex].reactiveData.contents[resourceString] == 0.0) {
                // console.log("Resource " + key + " has " + value + " remaining");
                possibleProduct = 0.0;
                break;
            }
            possibleProduct = Math.min(possibleProduct, 
                Math.floor(window.gameState.regions[this.regionIndex].reactiveData.contents[resourceString] / value));

            // if (this.resources[key] < value) {
            //     // fail to produce the product due to insufficient resources
            // }
        }
        // let 
        // possibleProduct = Math.min(possibleProduct, this.productionStats.this.productionStats.averageOutput);

        for (const [key, value] of this.productType.components.entries()) {
            let resourceString = "" + key;
            // Subtract the amount of a resource required to produce from the resources
            window.gameState.regions[this.regionIndex].reactiveData.contents[resourceString] -= (inputEfficiency * possibleProduct * value);
        }

        // Produce the number of products possible from the resources and number of machines
        let productString = this.productType.id + "";
        window.gameState.regions[this.regionIndex].reactiveData.contents[productString] += (outputEfficiency * possibleProduct);
        return (outputEfficiency * possibleProduct);
    }
}

// Not needed?
// class TextileFactory extends Factory {

// }