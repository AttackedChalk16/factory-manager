function generateResearch() {
    window.gameState.researchTree = new Map([

        ["steel" , new ResearchNode({
            id : "steel",
            name : "Steel Production",
            cost : 2000,
            time : 20, // seconds
            type : "product",
            requiredPrereqNodes : null,
            nextNodes : ["stainlessSteel"]
        })],

        ["stainlessSteel" , new ResearchNode({
            id : "stainlessSteel",
            name : "Stainless Steel Production",
            cost : 2500,
            time : 25,
            type : "product",
            requiredPrereqNodes : ["steel"],
            nextNodes : ["advancedAlloy"]
        })],

        ["advancedAlloy" , new ResearchNode({
            id : "advancedAlloy",
            name : "Advanced Alloy Production",
            cost : 3500,
            time : 35,
            type : "product",
            requiredPrereqNodes : ["stainlessSteel"],
            nextNodes : null
        })],

        // 

        ["machineParts" , new ResearchNode({
            id : "machineParts",
            name : "Machine Parts Production",
            cost : 4000,
            time : 30,
            type : "product",
            requiredPrereqNodes : null,
            nextNodes : ["electricGear"]
        })],

        ["electricGear" , new ResearchNode({
            id : "electricGear",
            name : "Electric Gear Production",
            cost : 6000,
            time : 40,
            type : "product",
            requiredPrereqNodes : ["machineParts"],
            nextNodes : null
        })],



        ["basicOutput" , new ResearchNode({
            id : "basicOutput",
            name : "Basic Output Efficiency",
            cost : 8000,
            time : 50,
            type : "bonusOutput",
            bonus : 0.05,
            requiredPrereqNodes : null,
            nextNodes : ["improvedOutput"]
        })],

        ["improvedOutput" , new ResearchNode({
            id : "improvedOutput",
            name : "Improved Output Efficiency",
            cost : 12000,
            time : 70,
            type : "bonusOutput",
            bonus : 0.05,
            requiredPrereqNodes : ["basicOutput"],
            nextNodes : ["output3"]
        })],

        ["advancedOutput" , new ResearchNode({
            id : "advancedOutput",
            name : "Advanced Output Efficiency",
            cost : 16000,
            time : 90,
            type : "bonusOutput",
            bonus : 0.05,
            requiredPrereqNodes : ["improvedOutput"],
            nextNodes : null
        })],

        ["machine0" , new ResearchNode({
            id : "machine0",
            name : "Basic Machine", // Name of machine unlocked
            cost : 0,
            time : 0,
            type : "machine",
            requiredPrereqNodes : null,
            nextNodes : ["machine3"]
        })],

        // Needed?
        ["machine3" , new ResearchNode({
            id : "machine3",
            name : "Steam Powered Machine", // Name of machine unlocked
            cost : 2600,
            time : 25,
            type : "machine",
            requiredPrereqNodes : null,
            nextNodes : ["machine4"]
        })],

        ["machine4" , new ResearchNode({
            id : "machine4",
            name : "Coal Powered Machine",
            cost : 3200,
            time : 80,
            type : "machine",
            requiredPrereqNodes : ["machine3"],
            nextNodes : ["machine5"]
        })],

        ["machine5" , new ResearchNode({
            id : "machine5",
            name : "Electric Machine",
            cost : 4500,
            time : 120,
            type : "machine",
            requiredPrereqNodes : ["machine4"],
            nextNodes : null
        })]

    ]);

    // window.gameState.researchTree = researchList;
    // console.log( researchList);
    var config = {
        container: "#researchTreant",
        rootOrientation:  'WEST', // NORTH || EAST || WEST || SOUTH
        scrollbar: "fancy",
        // levelSeparation: 30,
        siblingSeparation:   20,
        subTeeSeparation:    60,
        hideRootNode: true,
        
        connectors: {
            type: 'step',
            style: {
                // 'stroke': '#8080FF',
                'arrow-end': 'block-wide-long'
            }
        },
        node: {
            HTMLclass: 'researchNode'
        }
    },

    root = {},

    steel = {
        parent: root,
        text: {
            name: "Steel Production",
            desc: "Enables Steel as a Product",
        },
        // image: "../headshots/2.jpg",
        HTMLid: "steel",
        HTMLclass: "productNode"
        // pseudo: true
    },

    stainlessSteel = {
        parent: steel,
        text:{
            name: "Stainless Steel Production",
            desc: "Enables Stainless Steel as a Product",
        },
        // stackChildren: true,
        // image: "../headshots/1.jpg",
        HTMLid: "stainlessSteel",
        HTMLclass: "productNode"
    },
    advancedAlloy = {
        parent: stainlessSteel,
        // stackChildren: true,
        text:{
            name: "Advanced Alloy Production",
            desc: "Enables Advanced Alloys as Products",
        },
        // image: "../headshots/5.jpg",
        HTMLid: "advancedAlloy",
        HTMLclass: "productNode"
    },

    //
    machineParts = {
        parent: root,
        text:{
            name: "Machine Parts",
            desc: "Enables Machine Parts as a Product"
        },
        // image: "../headshots/6.jpg",
        HTMLid: "machineParts",
        HTMLclass: "productNode"
    },
    electricGear = {
        parent: machineParts,
        text:{
            name: "Electric Gear",
            desc: "Enables Electric Gears as a Product"
        },
        // image: "../headshots/8.jpg",
        HTMLid: "electricGear",
        HTMLclass: "productNode"
    },



    machine0 = {
        parent: root,
        text:{
            name: "Basic Machine",
            desc: "Unlocks Basic Machines"
        },
        HTMLid: "machine0",
        HTMLclass: "machineNode"
    },
    machine3 = {
        parent: machine0,
        text:{
            name: "Steam Powered Machine",
            desc: "Unlocks Steam Powered Machines"
        },
        // image: "../headshots/7.jpg",
        HTMLid: "machine3",
        HTMLclass: "machineNode"
    },
    machine4 = {
        parent: machine3,
        text:{
            name: "Coal Powered Machine",
            desc: "Unlocks Coal Powered Machines"
        },
        // image: "../headshots/7.jpg",
        HTMLid: "machine4",
        HTMLclass: "machineNode"
    },
    machine5 = {
        parent: machine4,
        text:{
            name: "Electric Machine",
            desc: "Unlocks Electric Machines"
        },
        // image: "../headshots/7.jpg",
        HTMLid: "machine5",
        HTMLclass: "machineNode"
    },


    output1 = {
        parent: root,
        text:{
            name: "Basic Output Efficiency",
            desc: "+5% Factory Output Efficiency"
        },
        // image: "../headshots/9.jpg",
        HTMLid: "basicOutput",
        HTMLclass: "bonusNode"
    },
    output2 = {
        parent: output1,
        text:{
            name: "Improved Output Efficiency",
            desc: "+5% Factory Output Efficiency"
        },
        // image: "../headshots/10.jpg",
        HTMLid: "improvedOutput",
        HTMLclass: "bonusNode"
    },
    output3 = {
        parent: output2,
        text:{
            name: "Advanced Output Efficiency",
            desc: "+5% Factory Output Efficiency"
        },
        // image: "../headshots/7.jpg",
        HTMLid: "advancedOutput",
        HTMLclass: "bonusNode"
    }
    // ciso3 = {
    //     parent: cbo,
    //     text:{
    //         name: "Mary Johnson",
    //         desc: "Chief Brand Officer"
    //     },
    // //    image: "../headshots/4.jpg",
    //     HTMLid: "ciso2"
    // },
    // ciso4 = {
    //     parent: cbo,
    //     text:{
    //         name: "Kirk Douglas",
    //         desc: "Chief Business Development Officer"
    //     },
    // //    image: "../headshots/11.jpg",
    //     HTMLid: "ciso2"
    // }

    RESEARCH_TREANT = [
        config,
        root,
        steel,
        stainlessSteel,
        advancedAlloy,
        machineParts,
        electricGear,
        machine0,
        machine3,
        machine4,
        machine5,
        output1,
        output2,
        output3
    ];

    // Store the necessary information for creating the treant
    window.gameState.treantConfig = RESEARCH_TREANT;
    // window.gameState.treant = new Treant( ALTERNATIVE );
}