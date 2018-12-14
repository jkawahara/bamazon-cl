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

// Display menu: View Products for Sale, View Low Inventory, Add to Inventory, Add New Product
function viewManager() {
  console.log('\nWelcome to Bamazon Manager View\n');
  inquirer.prompt([
    {
      type: 'list',
      name: 'menuMngr',
      message: 'Menu of Options',
      choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }
  ])
  .then(answer => {
    // If menu option then display
    switch (answer.menuMngr) {
      case 'View Products for Sale':
        return displayProducts();
      case 'View Low Inventory':
        return displayLowInventory();
      case 'Add to Inventory':
        return addInventory();
      case 'Add New Product':
        return addNewProduct();
    }
  });
}

// Display item_id, product_name, price, stock_quantity for all item_ids
function displayProducts() {
  connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', function(err, results) {
    if (err) throw err;
    console.log(
      '\nWelcome to Bamazon Manager View' +
      '\n-Products for Sale-' + '\n'
      );

    // Log query results in table using console.table package
    console.table(results);
    
    // Call to display manager view
    viewManager();
  }); 
}

// Display item_id, product_name, price, stock_quantity for stock_quantity less than 5
function displayLowInventory() {
  connection.query('SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity<5', function(err, results) {
    if (err) throw err;
    console.log(
      '\nWelcome to Bamazon Manager View' +
      '\n-Low Inventory (< 5)-' + '\n'
      );
    
    // If no stock_quantity below 5
    if (results.length === 0) {
      console.log('\nThere are no item_ids with stock_quantity below 5.\n');
    } else {
      // Log query results in table using console.table package
    console.table(results);  
    }
    
    // Call to display manager view
    viewManager();
  }); 
}

// Add stock_quantity for any existing item_id
function addInventory() {
  console.log(
    '\nWelcome to Bamazon Manager View' +
    '\n-Add to Inventory-' + '\n'
    );
  
  // Check low inventory items 
  connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', function(err, results) {
  if (err) throw err;
    
    // Prompt to manager for item_id and stock_quantity
    inquirer.prompt([
      {
        type: 'input',
        name: 'itemID',
        message: 'Which item_id would you like to add stock_quantity?',
        validate: function(value) {
          for (var i = 0; i < results.length; i++) {           
            if (isNaN(value) === false && parseInt(value) === results[i].item_id) {
              return true;
            }
          }
          console.log('\n\nYou entered an item_id that is not listed. Try again.\n');
          return false;
        }
      },
      {
        type: 'input',
        name: 'stockQuantity',
        message: 'How much stock_quantity would you like to add?',
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
      connection.query(`UPDATE products SET stock_quantity=stock_quantity+${answer.stockQuantity} WHERE item_id=${answer.itemID}`, function(err, results) {
        if (err) throw err;
      })
      console.log(`\n(${answer.stockQuantity}) stock_quantity added to item_id ${answer.itemID}`);
      viewManager();
    });
  });
}

// Add new item_id current item_id
function addNewProduct() {

}

// *** CONTROLLER

// Connect to MySQL bamazon DB
connection.connect(function(err) {
  if (err) throw err; 
  
  // Call to display manager view
  viewManager();

});