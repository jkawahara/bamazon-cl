// *** REQUIRED MODULES: mysql, inquirer, console.table
var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console.table');

// *** DECLARE GLOBAL VARIABLES / FUNCTIONS
// Create connection to MySQL bamazon DB with connection options: defining host, port, user, password, database
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});

// Display menu: View Product Sales by Department, Create New Department
function viewSupervisor() {
  console.log('\nWelcome to Bamazon Supervisor View\n');
  inquirer.prompt([
    {
      type: 'list',
      name: 'menuSuper',
      message: 'Menu of Options',
      choices: ['View Product Sales by Department', 'Create New Department']
    }
  ])
  .then(answer => {
    // If menu option then display
    switch (answer.menuSuper) {
      case 'View Product Sales by Department':
        return displayProductsByDept();
      case 'Create New Department':
        return createNewDept();
    }
  });
}

// Display department_id, department_name, over_head_costs, product_sales, total_profit
function displayProductsByDept() {
  // Query department_id, department_name, over_head_costs, product_sales
  // GROUP BY department_id requires SUM of over_head_costs, product_sales, product_sales - over_head_costs
  // Create alias for temporary column total_profit = over_head_costs - product_sales
  connection.query('SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales), SUM(product_sales-over_head_costs) AS total_profit FROM departments LEFT JOIN products ON departments.department_name=products.department_name GROUP BY department_id', function(err, results) {
    if (err) throw err;
    console.log(
      '\nWelcome to Bamazon Supervisor View' +
      '\n-Product Sales by Department-' + '\n'
      );

    // Log query results in table
    console.table(results);
    
    // Call to display supervisor view
    viewSupervisor();
  });
}

// Create new department_id
function createNewDept() {
  console.log(
    '\nWelcome to Bamazon Supervisor View' +
    '\n-Add New Department-' + '\n'
    );
  
  // Prompt to supervisor for department_name, over_head_costs
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the department_name you would like to add?'
    },
    {
      type: 'input',
      name: 'overHeadCosts',
      message: 'How much are the over_head_costs?',
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log('\n\nYou didn\'t enter a number. Try again.\n');
        return false;
      }
    }
  ])
  .then(answer => {
    connection.query(
      'INSERT INTO departments SET ?',
      {
        department_name: answer.departmentName,
        over_head_costs: answer.overHeadCosts
      },
      function(err, results) {
      if (err) throw err;
    })
    console.log(`\n(${answer.departmentName}) added as new department`);
    viewSupervisor();
  });
}

// When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

// The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.
// If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.

// *** CONTROLLER

// Connect to MySQL bamazon DB
connection.connect(function(err) {
  if (err) throw err; 

  // Call to display supervisor view
  viewSupervisor();

});