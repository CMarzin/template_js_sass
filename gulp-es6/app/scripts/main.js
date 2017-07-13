import Person from "./person";

let person = new Person("Ram", "Kulkarni");
console.log('kjnkj');

document.getElementById("nameSpan").innerHTML = person.getFirstName() + " " + person.getLastName();
