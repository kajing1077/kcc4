var inputName = document.querySelector("#name");
var inputAge = document.querySelector("#age");
var inputForm = document.querySelector("form");
var hello = document.querySelector("hello");
var Person = /** @class */ (function () {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  Person.prototype.hello = function () {
    return "Hello, my name is "
      .concat(this.name, ", I am ")
      .concat(this.age, " years old.");
  };
  return Person;
})();
inputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var person = new Person(inputName.value, inputAge.valueAsNumber);
  hello.innerText = person.hello();
});
