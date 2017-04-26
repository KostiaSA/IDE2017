
// https://github.com/ceolter/ag-grid/blob/master/src/ts/functions.ts

export function defaultComparator(valueA: any, valueB: any): number {
    let valueAMissing = valueA === null || valueA === undefined;
    let valueBMissing = valueB === null || valueB === undefined;
    if (valueAMissing && valueBMissing) {
        return 0;
    }
    if (valueAMissing) {
        return -1;
    }
    if (valueBMissing) {
        return 1;
    }

    if (typeof valueA === "string") {
        try {
            // using local compare also allows chinese comparisons
            return valueA.localeCompare(valueB);
        } catch (e) {
            // if something wrong with localeCompare, eg not supported
            // by browser, then just continue without using it
        }
    }

    if (valueA < valueB) {
        return -1;
    } else if (valueA > valueB) {
        return 1;
    } else {
        return 0;
    }
}