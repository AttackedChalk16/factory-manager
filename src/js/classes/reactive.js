// Credit to Siddharth Shyniben for the reactivity skeleton code
// https://dev.to/siddharthshyniben

class Reactive {
    constructor (obj) {
        this.contents = obj;
        this.listeners = new Map();
        this.makeReactive(obj);
    }

    makeReactive(obj) {
        Object.keys(obj).forEach(prop => this.makePropReactive(obj, prop));
    }

    makePropReactive(obj, key) {
        let value = obj[key];

        // Gotta be careful with this here
        const that = this;

        Object.defineProperty(obj, key, {
            get () {
                    return value;
            },
            set (newValue) {
                value = newValue;
                that.notify(key)
            }
        });
    }

    listen(prop, id, handler) {
        if (!this.listeners.has(prop)) this.listeners.set(prop, new Map());

        this.listeners.get(prop).set(id, handler);
    }

    notify(prop) {
        if (!this.listeners.has(prop)) {
            return;
        }

        for (const [listenerId, listener] of this.listeners.get(prop).entries()) {
            // window.gameState.resources.set(key, value);
            // list
            console.log(listenerId)
            console.log(listener)
            listener(this.contents[prop]);
        }
        // this.listeners.get(prop).forEach(listener => listener(this.contents[prop]));
    }
}


class Money {
    constructor() {
        // this.value = 1000.0;
    }

    spend(amount, spendRemaining = false) {
        if (amount > window.gameState.reactiveData.contents.cash) {
            if (spendRemaining) {
                let amountSpent = this.get();
                window.gameState.reactiveData.contents.cash -= amountSpent;
                return amountSpent;
            } else {
                console.log("Not enough cash!");
                return -1;
            }
            
        } else {
            window.gameState.reactiveData.contents.cash -= amount;
            return amount;
        }
    }

    add(amount) {
        window.gameState.reactiveData.contents.cash += amount;
        // this.value += amount;
    }

    get() {
        return window.gameState.reactiveData.contents.cash;
    }
}

class GameDate {
    constructor() {
        // this.value = 1000.0;
    }

    increment() {
        let dateTime = window.gameState.reactiveData.contents.date;
        dateTime.setDate(dateTime.getDate() + 1);
        window.gameState.reactiveData.contents.date = dateTime;
        // if (amount > window.gameState.reactiveData.contents.cash) {
        //     console.log("Not enough cash!");
        // } else {
        //     window.gameState.reactiveData.contents.cash -= amount;
        // }
    }

    get() {
        return window.gameState.reactiveData.contents.date;
    }
}