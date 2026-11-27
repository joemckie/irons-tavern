import { mapWithConcurrency } from "./map-with-concurrency";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });

  return { promise, resolve };
}

async function flushPromises() {
  for (let i = 0; i < 10; i++) {
    await Promise.resolve();
  }
}

describe("mapWithConcurrency", () => {
  it("never runs more than limit at once", async () => {
    const pending = Array.from({ length: 7 }, () => deferred<number>());
    let inFlight = 0;
    let maxInFlight = 0;
    let started = 0;

    const result = mapWithConcurrency([0, 1, 2, 3, 4, 5, 6], 3, async (i) => {
      started++;
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);

      const value = await pending[i].promise;

      inFlight--;

      return value;
    });

    await flushPromises();
    expect(started).toBe(3);

    pending[1].resolve(1);
    await flushPromises();
    expect(started).toBe(4);

    pending.forEach(({ resolve }, i) => resolve(i));

    await expect(result).resolves.toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(maxInFlight).toBe(3);
  });

  it("preserves input order", async () => {
    const delays = [30, 5, 20, 1, 10];

    const result = await mapWithConcurrency(delays, 2, async (delay) => {
      await new Promise((resolve) => setTimeout(resolve, delay));

      return delay * 2;
    });

    expect(result).toEqual([60, 10, 40, 2, 20]);
  });

  it("returns an empty array for no items", async () => {
    await expect(mapWithConcurrency([], 10, () => Promise.resolve(1))).resolves.toEqual([]);
  });
});
