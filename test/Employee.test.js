const Employee = require("../lib/Employee");

test("Should instantiate Employee instance", () => {
  const employee = new Employee();
  expect(typeof(employee)).toBe("object");
});

test("Should set name via constructor arguments", () => {
  const name = "Debasu";
  const employee = new Employee(name);
  expect(employee.name).toBe(name);
});

test("Should set id via constructor argument", () => {
  const testValue = 234;
  const employee = new Employee("Foo", testValue);
  expect(employee.id).toBe(testValue);
});

test("Should set email via constructor argument", () => {
  const testValue = "example@gmail.com";
  const employee = new Employee("John", 1, testValue);
  expect(employee.email).toBe(testValue);
});

test("Should get name via getName()", () => {
  const testValue = "Debasu";
  const employee = new Employee(testValue);
  expect(employee.getName()).toBe(testValue);
});

test("Can get id via getId()", () => {
  const testValue = 234;
  const employee = new Employee("Foo", testValue);
  expect(employee.getId()).toBe(testValue);
});

test("Should get email via getEmail()", () => {
  const testValue = "example@gmail.com";
  const employee = new Employee("John", 1, testValue);
  expect(employee.getEmail()).toBe(testValue);
});

test("getRole() should return \"Employee\"", () => {
  const testValue = "Employee";
  const employee = new Employee("Alice", 1, "example@gmail.com");
  expect(employee.getRole()).toBe(testValue);
});
