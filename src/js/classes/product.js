class Product {
    constructor({
        productName, // Product name (string)
        manufacturingCost, // Cost to manufacturing (double)
        productQuality, // Product quality (int)
        requiredMachine, // Required machine to produce this product (Machine)
    }) {
        this.productName = productName;
        this.manufacturingCost = manufacturingCost;
        this.productQuality = productQuality;
        this.requiredMachine = requiredMachine;
    }

    // Accessor functions
    getProductName() { return this.productName; }
    getManufacturingCost() { return this.manufacturingCost; }
    getProductQuality() { return this.productQuality; }
    getRequiredMachine() { return this.requiredMachine; }

    // Accessor functions
    setProductName(productName) { this.productName = productName; }
    setManufacturingCost(manufacturingCost) { this.manufacturingCost = manufacturingCost; }
    setProductQuality(productQuality) { this.productQuality = productQuality; }
    setRequiredMachine(requiredMachine) { this.requiredMachine = requiredMachine; }
    
    // Output: 
    clone() {
        // TO-DO
        m = new Machine( "", 0.0, 0, 0, 0, false, false, new Product(), 0, 0)
        return new Product("", 0.0, 0, m);
    }
}