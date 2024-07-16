class FizzBuzz {
  public fizzBuzz = (num: number) => {
    if (num % 3 == 0 && num % 5 == 0) {
      return "Fizz Buzz";
    }
    if (this.divisibleByThree(3)
    ) {
      return "fizz";
    }
    if (num % 5 == 0) {
      return "Buzz";
    }
    return num;
  };
  public divisibleByThree = (num): any => {
    return num % 3 == 0;
  };
}

const fizzBuzz = new FizzBuzz();
for (let i: number = 0; i < 20; i++) {
  console.log(fizzBuzz.fizzBuzz(i));
}

export default FizzBuzz;
