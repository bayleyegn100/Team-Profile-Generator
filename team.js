// Import modules
const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
        //List of employees that get added as the user adds them
const employees = [];
        //Prompts for employee information
const promptUser = () => {
    inquirer.prompt([
        // common prompts of employee informaion
        {
            type: "list",
            name: "role",
            message: "What's his/her position?",
            choices: ["Manager", "Engineer", "Intern"]
        },
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
        //a prompt to select a role of the employee
    
    ])
    //From this line up to line 90 will takecare the prompts 
    // based on the role of the employees. 
        .then(function (data) {
            switch (data.role) {
                case "Manager":
                    inquirer.prompt([
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
// The prompt under this function will let the user to continue 
// adding employees or not. If the user want to add additional 
// employees this function will takecare of it
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
// this function will add the employees informaion in to card called data. 
function addHtml(employees) {
    let data = "";

    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        const name = employee.getName();
        const role = employee.getRole();
        const id = employee.getId();
        const email = employee.getEmail();
        // based on the role of employees the following cards will be added
        if (role === "Engineer") {
            const gitHub = employee.getGithub();
            data += `<div class="col-sm">
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
            data += `<div class="col-sm">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Intern</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item"><a href = "mailto:${email}">Email Address: ${email}</a></li>
                    <li class="list-group-item">School: ${school}</li>
                </ul>
                </div>
            </div>`;
        } else {
            const officeNumber = employee.getOfficeNumber();
            data += `<div class="col-sm">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Manager</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item"><a href = "mailto:${email}">Email Address: ${email}</a></li>
                    <li class="list-group-item">Office Number: ${officeNumber}</li>
                </ul>
                </div>
            </div>`
        }

    }
    console.log("Team Profile Generated!");
    const HTML = finishHtml(data);
    // writes employes profile in to HTML
    fs.writeFile("./dist/team.html", HTML, function (err) {
        if (err) {
            console.log(err);
        };
    });
}
// a function to finish the HTML by incorporating its body
function finishHtml(body) {
    return ` <!DOCTYPE html>
<html lang="en">
<head>
  <title>Team Profile</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
  <div class="jumbotron">
    <h1>My Employees Profile</h1>      
    </div>    
</div>
<div class="container">
<div class="row">

${body}
</div>
</div>
    </body>
    </html>`;

}
// call back function
function init() {
    promptUser();
}

init();
