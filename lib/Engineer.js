const Employee = require("./Employee");
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)        
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return "Engineer";
    }
    getSpecial() {
        return `<a href="${this.github}" class="github-link">Github: </a>`
    }

}
module.exports = Engineer;