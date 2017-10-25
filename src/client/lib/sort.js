/**
 * Comparison method used in .sort() functions
 * 
 * @param a object The first element to compare
 * @param b object the second element to compare
 * @param propertyName string The object property to compare
 */
export function compareAscByProp(a, b, propertyName){
    if(a[propertyName] < b[propertyName]){ return -1; }
    if(a[propertyName] > b[propertyName]){ return 1; }
    if(a[propertyName] === b[propertyName]){ return 0;}
}