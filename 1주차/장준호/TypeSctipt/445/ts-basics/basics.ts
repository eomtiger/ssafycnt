// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

let age: number; // Number와 구분 // Number는 JavaScript

age = 12;

let userName: string;

userName = "Max";

let isInstructor: boolean;

isInstructor = true;

// More complex types

let hobbies: string[]; // []를 함께 사용하면 list형인것을 인지.

hobbies = ["Sports", "Cooking"];

type Person = {
  name: string;
  age: number;
};

let person: Person;

// let person: {
//   name: string;
//   age: number;
// };

person = {
  name: "Max",
  age: 32,
};

// person = {
//   isEmployee: true,
// };

let people: Person[];

// Type inference

let course: string | number = "React - The Complete Guide";

course = 12341;

// Fuctions & types

function add(a: number, b: number): number | string {
  return a + b;
}

function print(value: any) {
  console.log(value);
} // void : 항상 함수와 결합하여 사용

// Generic

function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updateArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d");

// updateArray[0].split("");
