function generateResources() {
    window.gameState.resources = new Map([

        ["iron" , new Resource({
            id : "iron",
            name : "Iron",
            weight: 7874, // Kg/m^3
            volume: 1,
            value: 50
        })],

        ["chromium" , new Resource({
            id : "chromium",
            name : "Chromium",
            weight: 7150, // Kg/m^3
            volume: 1,
            value: 130
        })],

        ["nickel" , new Resource({
            id : "nickel",
            name : "Nickel",
            weight: 8908, // Kg/m^3
            volume: 1,
            value: 70
        })],

    ]);

}