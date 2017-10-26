function bubbleSort(array) {
    for (let i = array.length; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    
    return array;
}
 
bubbleSort([6000, 34, 203, 3, 746, 200, 984, 198, 764, 9, 1]);
