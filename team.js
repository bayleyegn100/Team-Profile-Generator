
const inquirer = require("inquirer");
const fs = require("fs");

// const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const employees = [];

const promptUser = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Name:",
            name: "name"
        },
        {
            type: "input",
            message: "Enter employee ID: ",
            name: "id"
        },
        {
            type: "input",
            message: "Email:",
            name: "email"
        },
        {
            type: "list",
            name: "role",
            message: "What's his/her position?",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ])
        .then(function (data) {
            switch (data.role) {
                case "Manager":
                    inquirer.prompt([
                        // {
                        //     type: "input",
                        //     message: "Enter employee ID: ",
                        //     name: "id"
                        // },
                        {
                            type: "input",
                            message: "Enter office number: ",
                            name: "office"
                        }
                    ])
                        .then(function (res) {
                            const officeNum = res.office;
                            const manager = new Manager(data.name, data.id, data.email, officeNum, "Manager");
                            employees.push(manager);
                        }).then(function () {
                            addNext()
                        });
                    break;
                case "Engineer":
                    inquirer.prompt([
                        // {
                        //     type: "input",
                        //     message: "Enter employee ID: ",
                        //     name: "id"
                        // },
                        {
                            type: "input",
                            message: "Enter github username: ",
                            name: "github"
                        }
                    ])
                        .then(function (res) {
                            const githubName = res.github;
                            const engineer = new Engineer(data.name, data.id, data.email, githubName, "Engineer");
                            employees.push(engineer);
                        }).then(function () {
                            addNext()
                        });
                    break;
                case "Intern":
                    inquirer.prompt([
                        // {
                        //     type: "input",
                        //     message: "Enter employee ID: ",
                        //     name: "id"
                        // },
                        {
                            type: "input",
                            message: "Enter school: ",
                            name: "school"
                        }
                    ])
                        .then(function (res) {
                            const internSchool = res.school;
                            const intern = new Intern(data.name, data.id, data.email, internSchool, "Intern");
                            employees.push(intern);
                        }).then(function () {
                            addNext()
                        });
                    break;
            }
        })
      
};

const addNext = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "add",
            message: "Would you like to add another employe?",
            choices: ["Yes", "No"]
        }
    ])
        .then(function (res) {
            if (res.add === "Yes") {
                promptUser();
            } else {
                console.log("Done");
                addHtml(employees);
            }
        });
};

function addHtml(employees) {
    // return new Promise(function (resolve, reject) {
        let data = "";

    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        const name = employee.getName();
        const role = employee.getRole();
        const id = employee.getId();
        const email = employee.getEmail();
        if (role === "Engineer") {
            const gitHub = employee.getGithub();
            data += `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Engineer</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item"><a href = "mailto:${email}">Email Address: ${email}</a></li>
                    <li class="list-group-item"><a href = "https://github.com/${gitHub}">GitHub: ${gitHub}</a></li>
                </ul>
                </div>
            </div>`;
        } else if (role === "Intern") {
            const school = employee.getSchool();
            data += `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Intern</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address: ${email}</li>
                    <li class="list-group-item">School: ${school}</li>
                </ul>
                </div>
            </div>`;
        } else {
            const officePhone = employee.getOfficeNumber();
            data += `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Manager</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address: ${email}</li>
                    <li class="list-group-item">Office Phone: ${officePhone}</li>
                </ul>
                </div>
            </div>`
        }
    
    }
    console.log("adding team employees");
    // console.log(data);
    const HTML = finishHtml(data);
    fs.writeFile("./dist/team.html", HTML, function (err) {
        if (err) {
            console.log(err);
        };
    });
}

function finishHtml(body) {
    return ` <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
${body}
    </body>
    </html>`;

}
function init() {
    promptUser();
}

init();
