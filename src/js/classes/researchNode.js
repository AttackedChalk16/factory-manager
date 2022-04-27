class ResearchNode {
    constructor({
        id, // unique identifier for the node
        name, // The name of this node (string)
        cost, // How much this node costs to reserach (double)
        time, // How much time is needed to research (int/double?)
        type, // Holds what kind of object it unlocks once researched: "machine", "product", "bonus",...
        bonus = null, // The Amount of the bonus (double)
        requiredPrereqNodes, // Holds the prerequisite nodes needed to be researched before this one (Array of Strings)
        nextNodes, // Holds the next nodes unlocked after this is researched (Array of Strings)
    }) {
        this.id = id;
        this.cost = cost;
        this.name = name;
        this.time = time;
        this.type = type;
        this.bonus = bonus;
        this.requiredPrereqNodes = requiredPrereqNodes;
        this.nextNodes = nextNodes;
    }

    // Accessor functions
    getID() { return this.id; }
    getName() { return this.name; }
    getCost() { return this.cost; }
    getTime() { return this.time; }
    getType() { return this.type; }
    getRequiredPrereqNodes() { return this.requiredPrereqNodes; }
    getNextNodes() { return this.nextNodes; }

    // Accessor functions
    setID(id) { this.id = id; }
    setName(name) { this.name = name; }
    setCost(cost) { this.cost = cost; }
    setTime(time) { this.time = time; }
    setType(type) { this.type = type; }
    setRequiredPrereqNodes(requiredPrereqNodes) { this.requiredPrereqNodes = requiredPrereqNodes; }
    setNextNodes(nextNodes) { this.nextNodes = nextNodes; }

}