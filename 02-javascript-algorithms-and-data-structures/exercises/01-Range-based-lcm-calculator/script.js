console.log('Range-Based LCM Calculator');

const smallestCommons = (arr) => {
  let [a, b] = arr.sort((a, b) => a - b);
  console.log('arr:', arr);

  //  1* calculate gcd

  const gcd = (a, b) => (a % b === 0 ? b : gcd(b, a % b));
  console.log('gcd:', gcd(a, b));

  //  2* calculate lcm

  const lcm = (a, b) => (a * b) / gcd(a, b);
  console.log('lcm:', lcm(a, b));

  //  3* create range array

  let rangeArr = Array.from(
    { length: b - a + 1 },
    (el, index) => (el = a + index),
  );
  console.log('rangeArr:', rangeArr);

  //  4* calculate range lcm

  const rangeLcm = (arr) => {
    if (arr.length === 1) return arr[0];
    let num1 = arr[0];
    let num2 = arr[1];
    let resultLcm = lcm(num1, num2);

    let newArr = [resultLcm, ...arr.slice(2)];
    console.log('range lcm arr:', newArr);
    return rangeLcm(newArr);
  };

  return rangeLcm(rangeArr);
};

console.log('Final result:', smallestCommons([1, 5]));
