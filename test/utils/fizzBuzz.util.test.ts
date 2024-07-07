import FizzBuzz from "../../src/utils/fizzBuzz.util";

describe("dizzByzz test", () => {
  it('shoud return  "Fizz" for numbers divisible by 3', () => {
    const fizzBuzz = new FizzBuzz();
    expect(fizzBuzz.fizzBuzz(3)).toBe("fizz");
    expect(fizzBuzz.fizzBuzz(6)).toBe("fizz");
  });

  it('shoud return  "Buzz" for numbers divisible by 5', () => {
    const fizzBuzz = new FizzBuzz();
    expect(fizzBuzz.fizzBuzz(5)).toBe("Buzz");
    expect(fizzBuzz.fizzBuzz(10)).toBe("Buzz");
  });

  it('shoud return  "FizzBuzz" for numbers divisible by 3 and 5', () => {
    const fizzBuzz = new FizzBuzz();
    expect(fizzBuzz.fizzBuzz(15)).toBe("Fizz Buzz");
    expect(fizzBuzz.fizzBuzz(45)).toBe("Fizz Buzz");
  });

  it("using mocks", () => {
    let fizzBuzz = new FizzBuzz();

    let mockFn = jest.fn(fizzBuzz.divisibleByThree).mockReturnValue(true);
    fizzBuzz.divisibleByThree = mockFn;
    expect(fizzBuzz.fizzBuzz(4)).toBe("Buzz");
  });
});
