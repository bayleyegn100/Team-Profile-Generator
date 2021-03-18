const Engineer = require("../lib/Engineer");

test("Should set GitHUb account via constructor", () => {
  const testValue = "GitHubName";
  const employee = new Engineer("John", 1, "example@gmail.com", testValue);
  expect(employee.github).toBe(testValue);
});

test("getRole() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const employee = new Engineer("John", 1, "example@gmail.com", "GitHubUser");
  expect(employee.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "GitHubName";
  const employee = new Engineer("John", 1, "example@gmail.com", testValue);
  expect(employee.getGithub()).toBe(testValue);
});