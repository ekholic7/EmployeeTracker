const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "estherkwonx3",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View all employees",
        "View all departments",
        "View all managers",
        "View all roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Remove Employee",
        "Update Employee Role",
        "Exit"]

    })
    .then(function (answer) {
      console.log(answer.action);
      switch (answer.action) {
        case "View all employees":
          viewEmployee();
          break;

        case "View all departments":
          departmentView();
          break;

        case "View all managers":
          managerView();
          break;

        case "View all roles":
          viewRole();
          break;

        case "Add Employee":
          employeeAdd();
          break;

        case "Add Department":
          departmentAdd();
          break;

        case "Add Role":
          roleAdd();
          break;

        case "Remove Employee":
          employeeRemove();
          break;

        case "Update Employee Role":
          employeeUpdate();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewEmployee() {
  inquirer
    .prompt({
      name: "viewEmployee",
      type: "input",
      message: "What employee would you like to search for, by Last Name?"
    })
    .then(function (answer) {
      let query = "SELECT first_name, last_name, id FROM employee WHERE ?";
      connection.query(query, { last_name: answer.viewEmployee }, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Id: " + res[i].id);
        }

        runSearch();
      });
    });
}

function departmentView() {
  let query = "SELECT name FROM department";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].name);
    }
    runSearch();
  });
}

function managerView() {
  let query = "SELECT id, first_name, last_name FROM Employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id);
    }

    runSearch();
  });
}

function viewRole() {
    let query = "SELECT id, title, salary FROM role";
    connection.query(query, function (err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("Id: " + res[i].id + " || Title: " + res[i].title + " || Salary: " + res[i].salary);
        }
    runSearch();
    });
  }

function employeeAdd() {
  inquirer
    .prompt({
      name: "employeeAdd",
      type: "input",
      message: ["To ADD an employee, enter Employee First Name, then Last Name."]
    })

    .then(function (answer) {
      console.log(answer)
      let str = answer.employeeAdd;
      let firstAndLastName = str.split(" ");
      console.log(firstAndLastName);
      let query = "INSERT INTO employee (first_name, last_name) VALUES ?";
      connection.query(query, [[firstAndLastName]], function (err, res) {

        runSearch();
      });
    })
}

function departmentAdd() {
  inquirer
    .prompt({
      name: "departmentAdd",
      type: "input",
      message: ["To Add, enter new department name."]
    })

    .then(function (answer) {
      console.log(answer)
      let str = answer.departmentAdd;
      let departmentName = str.split(" ");
      console.log(departmentName);
      let query = "INSERT INTO department (name) VALUES ?";
      connection.query(query, [[departmentName]], function (err, res) {

        runSearch();
      });
    })
}

// title, salary, department id
function roleAdd() {
  inquirer
    .prompt({
      name: "title",
      type: "input",
      message: ["Enter new role title."]
    })
    .then(function (answer) {
      let title = answer.title;

      inquirer
        .prompt({
          name: "salary",
          type: "input",
          message: ["Enter salary."]
        })
        .then(function (answer) {
          let salary = answer.salary;

          inquirer
            .prompt({
              name: "department_id",
              type: "input",
              message: ["Enter new role department id."]
            })
            .then(function (answer) {
              let department_id = answer.department_id;

              console.log(`title: ${title} salary: ${salary} department id: ${department_id}`);

              let query = "INSERT INTO role (title, salary, department_id) VALUES ?";
              connection.query(query, [[[title, salary, department_id]]], function (err, res) {
                if (err) {
                  console.log(err);
                }

                runSearch();
              });
            })
        })
    })

}

function employeeRemove() {
  inquirer
    .prompt({
      name: "employeeRemove",
      type: "input",
      message: "To REMOVE an employee, enter the Employee id.",

    })
    .then(function (answer) {
      console.log(answer);
      let query = "DELETE FROM employee WHERE ?";
      let newId = Number(answer.employeeRemove);
      console.log(newId);
      connection.query(query, { id: newId }, function (err, res) {
        runSearch();

      });
    });
}

function employeeUpdate() {
  console.log('Updating employee');
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "Enter employee id",
    })
    .then(function (answer) {
      let id = answer.id;

      inquirer
        .prompt({
          name: "roleId",
          type: "input",
          message: "Enter role id",
        })
        .then(function (answer) {
          let roleId = answer.roleId;

          let query = "UPDATE employee SET role_id=? WHERE id=?";
          connection.query(query, [roleId, id], function (err, res) {
            if (err) {
              console.log(err);
            }
            runSearch();
          });
        });
    });
}