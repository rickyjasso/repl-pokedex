export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, val) {
        const value = {
            createdAt: Date.now(),
            val: val
        };
        this.#cache.set(key, value);
    }
    get(key) {
        return this.#cache.get(key)?.val;
    }
    #reap() {
        const now = Date.now();
        for (const [key, value] of this.#cache) {
            const age = now - value.createdAt;
            if (age >= this.#interval) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        const id = setInterval(() => {
            this.#reap();
        }, this.#interval);
        this.#reapIntervalId = id;
    }
    stopReapLoop() {
        if (this.#reapIntervalId === undefined) {
            return;
        }
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
