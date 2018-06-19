export function propertyComparator<T, P>(
    aObj: any,
    bObj: any,
    order: string,
    propertyName: string,
    isStringComparison: boolean
): number {
    if (isStringComparison) {
        return "asc" === order
            ? stringComparatorAsc(aObj[propertyName], bObj[propertyName])
            : stringComparatorDesc(aObj[propertyName], bObj[propertyName]);
    }
    return "asc" === order
        ? comparatorAsc<P>(aObj[propertyName], bObj[propertyName])
        : comparatorDesc<P>(aObj[propertyName], bObj[propertyName]);
}

function comparatorAsc<P>(a: P, b: P): number {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

function comparatorDesc<P>(a: P, b: P): number {
    if (a > b) {
        return -1;
    }
    if (a < b) {
        return 1;
    }
    return 0;
}

function stringComparatorAsc(a: string, b: string): number {
    if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
    }
    return 0;
}

function stringComparatorDesc(a: string, b: string): number {
    if (a.toLowerCase() > b.toLowerCase()) {
        return -1;
    }
    if (a.toLowerCase() < b.toLowerCase()) {
        return 1;
    }
    return 0;
}
