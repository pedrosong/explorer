function createCounter() {
    let counter = 0;
    const myFunction = function () {
        counter += 1
        return counter
    };
    return myFunction;
};
const increment = createCounter();
const c1 = increment();
const c2 = increment();
const c3 = increment();
console.log(c1, c2, c3)
console.log(increment)


// let val = 7
// function createAdder(){
//     function addNumbers(a,b){
//         let ret = a +b ;
//         return ret;
//     };
//     return addNumbers;
// }
// let adder = createAdder();
// let sum = adder(val, 8);
// console.log(sum);