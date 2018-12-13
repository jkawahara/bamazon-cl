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

// Display item_id, product_name, price
function viewCustomer() {
  connection.query('SELECT item_id, product_name, price FROM products', function(err, results) {
    if (err) throw err;
    console.log(
      '\nWelcome to Bamazon Customer View' +
      '\n-Products Listing-' + '\n'
      );

    // Log query results in table using console.table package
    console.table(results);
    
    // Call to prompt customer message 1 for item_id to order
    promptCustomerMsg1();
  }); 
}

// First, prompt customer for item_id to order
function promptCustomerMsg1() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'itemID',
      message: 'Which product would you like to buy? Enter item_id of product: ',
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log('\nYou didn\'t enter a number. Try again');
        return false;
      }
    }
  ])
  .then(answer => {    
    // Call to prompt customer message 2 for number of units to order
    promptCustomerMsg2(answer.itemID);
  });
}

// Second, prompt customer for number of units to order
function promptCustomerMsg2(itemID) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'units',
      message: 'How many units would you like to buy? Enter number of units: ',
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log('\nYou didn\'t enter a number. Try again');
        
        return false;
      }
    }
  ])
  .then(answer => {
    checkInventory(itemID, answer.units);

  });
}

function checkInventory(itemID, units) {
  connection.query(`SELECT product_name, price, stock_quantity FROM products WHERE item_id='${itemID}'`, function(err, results) {
    if (err) throw err;
    
    // If sufficient inventory level then complete order
    if (results[0].stock_quantity < units) {
      console.log(`Insufficient quanitity! There are only (${results[0].stock_quantity}) ${results[0].product_name}s remaining. Please enter a smaller number of units.`);
      promptCustomerMsg1();
    } else {
      // Call to reduce stock_quantity and calculate orderCost
      var orderCost = reduceInventory(itemID, units, results[0].price, results[0].stock_quantity);
      console.log(
        `\nYour order for (${units}) ${results[0].product_name}s comes out to $${orderCost}.` +
        '\nThank you.\n'
        );
    }
    promptCustomerMsg1();
  })
}

function reduceInventory(itemID, units, price, stock_quantity) {
  var updatedStock = stock_quantity - units;
  connection.query(`UPDATE products SET stock_quantity='${updatedStock}' WHERE item_id='${itemID}'`, function(err) {
    if (err) throw err;
  })
  return price * units;
}

// *** MAIN CONTROLLER

// Connect to MySQL bamazon DB
connection.connect(function(err) {
  if (err) throw err; 
  
  // Call to display customer view
  viewCustomer();

});
