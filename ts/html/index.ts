const inputName = document.querySelector("#name") as HTMLInputElement;
const inputAge = document.querySelector("#age") as HTMLInputElement;
const inputForm = document.querySelector("form")!;
const hello = document.querySelector("hello") as HTMLDivElement;

interface PersonInterface {
  name: string;
  age: number;
}

class Person implements PersonInterface {
  constructor(public name: string, public age: number) {}

  hello() {
    return `Hello, my name is ${this.name}, I am ${this.age} years old.`;
  }
}

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const person = new Person(inputName.value, inputAge.valueAsNumber);

  hello.innerText = person.hello();

  inputForm.reset();
});
