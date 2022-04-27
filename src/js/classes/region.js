class Region {
    constructor() {
        // Map of products and their quantities
        // this.productQuantities = new Map([
        //     ["steel" , 0],
        //     ["stainlessSteel" , 0],
        //     ["advancedAlloy" , 0],
        //     ["machineParts" , 0],
        //     ["electricGear" , 0]
        // ]);
        // Map of resources and their quantities
        // this.resourceQuantities = new Map([
        //     ["iron" , 0],
        //     ["chromium" , 0],
        //     ["nickel" , 0]
        // ]);

        this.productQuantities = new Map();
        this.resourceQuantities = new Map();

        this.reactiveObject = new Object();

        // Create the reactive products/resources
        for (const [resourceId, resourceObject] of window.gameState.resources.entries()) {
            this.resourceQuantities.set(resourceId, 0);

            let resourceString = "" + resourceId;
            this.reactiveObject[resourceString] = this.resourceQuantities.get(resourceId);
        }
        for (const [productId, productObject] of window.gameState.products.entries()) {
            this.productQuantities.set(productId, 0);

            let productString = "" + productId;
            this.reactiveObject[productString] = this.productQuantities.get(productId);
        }
        // for ([product, ])

        // Array of factories
        this.factories = new Array();
        // Set of trucks
        this.trucks = new Set();

        // Make the set of trucks reactive? should probably be split up some other way
        this.reactiveTruckObject = new Object();
        this.reactiveTruckObject["trucks"] = this.trucks

        // Use this for trucks
        this.reactiveTrucks = new Reactive(this.reactiveTruckObject);
        // this.reactiveObject["trucks"] = this.trucks;

        // Use this for products/resources
        this.reactiveData = new Reactive(this.reactiveObject);
    }

    addFactory(factory) {
        this.factories.push(factory);
    }

}