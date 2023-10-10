const functionOne = () => 'ONE';
const functionTwo = () => 'TWO';

export {
    functionOne,
    functionTwo
};

/* using named exports */
function cube(x) {
    return x * x * x;
}

const foo = Math.PI + Math.SQRT2;

const graph = {
    options: {
        color: "white",
        thickness: "2px",
    },
    draw() {
        console.log("From graph draw function");
    },
};

export {cube, foo, graph};

/* using default export 
   if I want to export a single value or have a fallback value for my module, I could use a default export */
export default function cube1(x) {
    return x * x * x;
}

/* using export from 
   example with the following hierarchy:
   childModule.js */

/* returns a list of prime numbers that are smaller than `max` */
export function getPrimes(max) {
    const isPrime = Array.from({length: max}, () => true);
    isPrime[0] = isPrime[1] = false;
    isPrime[2] = true;
    for (let i = 2; i * i < max; i++) {
        if (isPrime[i]) {
            for (let j = i ** 2; j < max; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return [...isPrime.entries()]
        .filter(([, isPrime]) => isPrime)
        .map(([number]) => number);
}

export let myValue = 1;
setTimeout(() => {
    myValue = 2;
}, 500);

/* imported values can only be modified by the exporter
   live binding - the module exporting the identifier may re-assign it and the imported value would change 
                  the module importing it cannot re-assign it 
   I can also observe the new value through the module namespace object */
