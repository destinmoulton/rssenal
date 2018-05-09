interface GenericObject<P> {
    [index: string]: P;
}

export function propertyComparator<T, P>(
    aObj: any,
    bObj: any,
    order: string,
    propertyName: string
): number {
    return "asc" === order
        ? comparatorAsc<P>(aObj[propertyName], bObj[propertyName])
        : comparatorDesc<P>(aObj[propertyName], bObj[propertyName]);
}

export function comparatorAsc<P>(a: P, b: P): number {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

export function comparatorDesc<P>(a: P, b: P): number {
    if (a > b) {
        return -1;
    }
    if (a < b) {
        return 1;
    }
    return 0;
}
