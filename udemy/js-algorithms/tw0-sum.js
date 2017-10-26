function twoSum(numArray, sum) {
  const pairs = [],  hashTable = [];
 
  for (let i = 0; i < numArray.length; i++) {
    const currNum = numArray[i];
    const counterpart = sum - currNum;
    if (hashTable.indexOf(counterpart) !== -1) {
      pairs.push([ currNum, counterpart ]);
    }
    hashTable.push(currNum);
  }
  
  return pairs;
}
 
twoSum([1, 6, 4, 5, 3, 3], 7);
