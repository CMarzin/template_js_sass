import data from "../data/data.json";

const t = data.test;

let source = document.querySelector('#test');

var content_test = MyApp.templates.test(t);

console.log(content_test);

source.innerHTML = content_test;
