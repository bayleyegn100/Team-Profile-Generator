const Employee = require("./Employee");
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return "Manager";
    }
    getSpecial() {
        return `<li class="list-group-item">Office number: ${this.officeNumber} </li> `
    }

}
module.exports = Manager;