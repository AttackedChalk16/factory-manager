function generateProducts() {
    window.gameState.products = new Map([

        ["steel" , new Product({
            id : "steel",
            name: "Steel",
            components: new Map([["iron", 3]]),
            weight: 7850, // Kg/m^3, though the exact unit is for debate
            volume: 1, //1 cubic meter
            value: 200
        })],

        ["stainlessSteel" , new Product({
            id : "stainlessSteel",
            name: "Stainless Steel",
            components: new Map([["steel", 3], ["chromium", 0.3]]),
            weight: 8000,
            volume: 1,
            value: 720
        })],

        ["advancedAlloy" , new Product({
            id : "advancedAlloy",
            name: "Advanced Alloy",
            components: new Map([["stainlessSteel", 3], ["chromium", 0.3], ["nickel", 0.3]]),
            weight: 8500,
            volume: 1,
            value: 2350
        })],

        ["machineParts" , new Product({
            id : "machineParts",
            name: "Machine Parts",
            components: new Map([["steel", 3]]),
            weight: 7500,
            volume: 1,
            value: 680
        })],

        ["electricGear" , new Product({
            id : "electricGear",
            name: "Electric Gear",
            components: new Map([["stainlessSteel", 2], ["machineParts", 1]]),
            weight: 7800,
            volume: 1,
            value: 2235
        })]

    ]);

}