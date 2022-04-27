class Truck {
    constructor({
        truckID
    }) {
        this.truckID = truckID;
        //this.volumeLimit = volLim; // Volume limit of the truck
        //this.weightLimit = weightLim; // Weight limit of the truck
        //this.currentVolume = 0; // Current volume
        this.currentWeight = 0; // Current weight
        this.time = 0; // Time it takes to return from delivery

        // These will keep track of the number of product/resource
        // the player wants when the truck returns.
        this.productWants = new Map(window.gameState.regions[0].productQuantities);
        this.resourceWants = new Map(window.gameState.regions[0].resourceQuantities);
        this.tCONST = 1/15000;
    }

    // Returns a string of the formated time as X hr Y min Z sec
    getTime() {
        var h = Math.floor(this.time / 3600);
        var m = Math.floor(this.time % 3600 / 60);
        var s = Math.floor(this.time % 3600 % 60);
        return (h + " hr " + m + " min " + s + " sec");
    }

    calculateTime() {                       // Constant
        // const 
        let numItemWants = 0;
        for (const [r, q] of this.resourceWants.entries()) {
            numItemWants += q;
        }
        for (const [p, q] of this.productWants.entries()) {
            numItemWants += q;
        }
        let itemLog = Math.log(numItemWants) / Math.log(4);
        let weightLog = Math.log(this.currentWeight);

        let t = parseInt((weightLog * itemLog / 3)); 
        if (t == 0) {
            this.time = 1;
        } else {
            this.time = t; 
        }
    }

    // addWeight(moreWeight) {
    //     if (this.currentWeight + moreWeight <= this.weightLimit) {
    //         this.currentWeight += moreWeight;
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

}