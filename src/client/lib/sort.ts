/**
 * Comparison method used in .sort() functions
 * 
 * @param a object The first element to compare
 * @param b object the second element to compare
 * @param property string The object property to compare
 */
export function compareAscByProp<T>(a: T, b: T, property: any): number{

    if((<any> a)[property] < (<any> b)[property]){ return -1; }
    if((<any> a)[property] > (<any> b)[property]){ return 1; }
    if((<any> a)[property] === (<any> b)[property]){ return 0;}
}