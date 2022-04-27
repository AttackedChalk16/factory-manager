// Stores information for a Machine
class Machine {
    // CREATE NEW CONSTRUCTOR THAT INITIALIZES THINGS
    constructor({
        machineName, // Machine name (string)
        machineCost, // Cost to buy machine (double)
        upgradeLevel, // Holds the level the machine is at (int)
        squareNumber, // This holds the placement of the machine in the factory (int)
        hasBlueprint, // Does the machine have a blueprint? (boolean)
        isProducing, // Is the machine producing? (boolean)
        currentProduct, // Holds what product the machine is producing (Product)
        maxItems, // Holds the max number of items the machine can hold (int)
        operatorCount, 
    }) {
        this.machineName = machineName;
        this.machineCost = machineCost;
        this.upgradeLevel = upgradeLevel;
        this.squareNumber = squareNumber;
        // Holds the blueprints the user can select (array of Product)
        this.usableBlueprints = new Array(); 
        this.hasBlueprint = hasBlueprint;
        this.isProducing = isProducing;
        this.currentProduct = currentProduct;
        this.maxItems = maxItems; 
        this.operatorCount = operatorCount;
    }

    // Accessor functions
    getMachineName() { return this.machineName; }
    getMachineCost() { return this.machineCost; }
    getUpgradeLevel() { return this.upgradeLevel; }
    getSquareNumber() { return this.squareNumber; }
    getUsableBlueprints() { return this.usableBlueprints; }
    getHasBlueprint() { return this.hasBlueprint; }
    getIsProducing() { return this.isProducing; }
    getCurrentProduct() { return this.currentProduct; }
    getMaxItems() { return this.maxItems; }
    getOperatorCount() { return this.operatorCount; }

    // Accessor functions
    setMachineName(machineName) { this.machineName = machineName; }
    setMachineCost(machineCost) { this.machineCost = machineCost; }
    setUpgradeLevel(upgradeLevel) { this.upgradeLevel = upgradeLevel; }
    setSquareNumber(squareNumber) { this.squareNumber = squareNumber; }
    setUsableBlueprints() { this.usableBlueprints = usableBlueprints; }
    setHasBlueprint(hasBlueprint) { this.hasBlueprint = hasBlueprint; }
    setIsProducing(isProducing) { this.isProducing = isProducing; }
    setCurrentProduct(currentProduct) { this.currentProduct = currentProduct; }
    setMaxItems(maxItems) { this.maxItems = maxItems; }
    setOperatorCount(operatorCount) { this.operatorCount = operatorCount; }

    // Output: Calculates and returns the production rate
    getProductionRate() {
        // TO-DO
        return 0.0;
    }
}