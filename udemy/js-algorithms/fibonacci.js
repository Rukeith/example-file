function fibonacci(position) {
  return (position < 3) ? 1 : fibonacci(position - 1) + fibonacci(position - 2);
}
 
fibonacci(6);

