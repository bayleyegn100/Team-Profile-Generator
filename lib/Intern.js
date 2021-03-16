const Employee = require("./Employee");
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email)        
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
    getRole() {
        return "Intern";
    }
    getSpecial() {
        return `<li class="list-group-item">School: ${this.school} </li> `
    }

}
module.exports = Intern;