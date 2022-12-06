// I need a range function that works like python
export function range(
    arrayOrString: string | string[] | number[],
    start: number | undefined = 0,
    stop: number | undefined,
    step: number | undefined = 1
) {
    const arr =
        typeof arrayOrString === "string"
            ? arrayOrString.split("")
            : arrayOrString;

    if (!stop) {
        stop = arrayOrString.length;
    }

    if (step < 0) {
        // Swap stop and start
        const _stop = stop;
        stop = start;
        start = _stop;
    }

    const result = [];

    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(arr[i]);
    }

    if (typeof arrayOrString === "string") {
        return result.join("");
    }

    return result;
}
