const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("Should set office number via constructor argument", () => {
  const testValue = 234;
  const employee = new Manager("John", 1, "example@mail.com", testValue);
  expect(employee.officeNumber).toBe(testValue);
});

test("getRole() should return \"Manager\"", () => {
  const testValue = "Manager";
  const employee = new Manager("John", 1, "example@mail.com", 100);
  expect(employee.getRole()).toBe(testValue);
});

test("Should get office number via getOffice()", () => {
  const testValue = 234;
  const employee = new Manager("John", 1, "example@mail.com", testValue);
  expect(employee.getOfficeNumber()).toBe(testValue);
});