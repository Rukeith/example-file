function sieveOfEratosthenes(n) {
  const primes = [];
  for (let i = 0; i <= n; i++) {
    primes[i] = true;
  }
  
  primes[0] = false;
  primes[1] = false;
  
  for (let i = 2; i <= Math.sqrt(n); i++) {
    for (j = 2; i * j <= n; j++) {
      primes[i * j] = false;
    }
  }
  
  const result = [];
  for (let i = 0; i < primes.length; i++) {
    if (primes[i]) result.push(i);
  }
  
  return result;
}
 
sieveOfEratosthenes(49);

