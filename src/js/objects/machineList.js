function generateMachines() {
    window.gameState.machines = new Map([

        ["machine0" , new Machine({
            machineName : "Basic Machine", // Machine name (string)
            machineCost : 1000, // Cost to buy machine (double). Should be 0 for this one.
            upgradeLevel : 1.0, // Holds the level the machine is at (int)
            squareNumber : null, // This holds the placement of the machine in the factory (int)
            hasBlueprint : false, // Does the machine have a blueprint? (boolean)
            isProducing : false, // Is the machine producing? (boolean)
            currentProduct : null, // Holds what product the machine is producing (Product)
            maxItems : 20, // Holds the max number of items the machine can hold (int)
            operatorCount : 7
        })],

        ["machine1" , new Machine({
            machineName : "Steel Machine", // Machine name (string)
            machineCost : 1500, // Cost to buy machine (double)
            upgradeLevel : 1.0, // Holds the level the machine is at (int)
            squareNumber : null, // This holds the placement of the machine in the factory (int)
            hasBlueprint : false, // Does the machine have a blueprint? (boolean)
            isProducing : false, // Is the machine producing? (boolean)
            currentProduct : null, // Holds what product the machine is producing (Product)
            maxItems : 20, // Holds the max number of items the machine can hold (int)
            operatorCount : 8
        })],

        ["machine2" , new Machine({
            machineName : "Stainless Steel Machine",
            machineCost : 2000,
            upgradeLevel : 1.0,
            squareNumber : null,
            hasBlueprint : false,
            isProducing : false,
            currentProduct : null,
            maxItems : 20,
            operatorCount : 9
        })],

        // Needed?
        ["machine3" , new Machine({
            machineName : "Steam Powered Machine",
            machineCost : 1600,
            upgradeLevel : 1.5,
            squareNumber : null,
            hasBlueprint : false,
            isProducing : false,
            currentProduct : null,
            maxItems : 25,
            operatorCount : 9
        })],

        ["machine4" , new Machine({
            machineName : "Coal Powered Machine",
            machineCost : 2400,
            upgradeLevel : 2.0,
            squareNumber : null,
            hasBlueprint : false,
            isProducing : false,
            currentProduct : null,
            maxItems : 30,
            operatorCount : 10
        })],

        ["machine5" , new Machine({
            machineName : "Electric Machine",
            machineCost : 3400,
            upgradeLevel : 2.5,
            squareNumber : null,
            hasBlueprint : false,
            isProducing : false,
            currentProduct : null,
            maxItems : 40,
            operatorCount : 15
        })]

    ]);

    // window.gameState.researchTree = researchList;
    // console.log( researchList);
}