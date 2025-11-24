type CacheEntry<T> = {
  createdAt: number,
  val: T
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T): void {
    const value: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val
    };
    this.#cache.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val;
  }

  #reap(): void {
    const now = Date.now();
    for (const [key, value] of this.#cache) {
      const age = now - value.createdAt;
      if (age >= this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
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
