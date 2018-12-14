# bamazon-cl
# Getting Started - Bamazon Command-Line
### 1. Why / Background
  * This is Berkeley Coding Boot Camp (BCBC) week 6 homework assignment.
    * The BCBC curriculum generally focuses on JavaScript along with HTML/CSS, using the MERN (MongoDB, Express, React, Node) software stack, to teach web development skills across the client and server. 
  * The Bamazon is a command-line node application:
    * Takes in orders from customers and depletes stock from the store's inventory
    * Provides manager and supervisor views
    * TBD (Bonus) This app also tracks product sales across store's departments and then provides a summary of the highest-grossing departments in the store
 ### 2. What / Objectives / User Stories
  * This project development, from design through deployment of the application, used Node.js and MySQL as the primary web development technology on the server side along with npm:
    * The following npm packages were used:
      * inquirer: collection of common interactive command-line user interfaces
      * mysql: node.js driver for mysql
      * console.table: prints an array of objects as a table in console
  * User Stories, by categorization:
    * Bamazon DB Schema defining products and departments tables
    * Main Controller to establish connection to database
    * Customer viewing and ordering products
    * Manager viewing products, low inventory and adding products, inventory
    * Supervisor viewing product sales and creating departments
 ### 3. How / Design Description
  * The scope of the project fit well into [Agile methodology with Scrum and Kanban frameworks](https://en.wikipedia.org/wiki/Agile_software_development). Due to limited scope and non-group assignment, GitHub's built-in tools were not used to support project execution:
    * [Projects](https://github.com/jkawahara/bamazon-cl/projects) Kanban board for documenting user stories and overall progress
    * [Issues](https://github.com/jkawahara/bamazon-cl/issues) Issue tracking for user stories, features and bug report
  * Functionality - refer to TBD of application user flow:
    * Design Description
      * Bamazon DB Schema defines the following tables with fields:
        * products table
          * item_id (primary key), product_name, department_name, price, stock_quantity, product_sales
        * departments table
          * department_id (primary key), department_name, over_head_costs
      * General design of views
        * Require modules and packages: mysql, inquirer, console.table
        * Establish connection to MySQL bamazon database
        * Relevant functions: mysql.createConnection(), connection.connect()
      * Customer View displays item_id, product_name and price
        * Prompt customer for item_id and number of units to order
          * If insufficient inventory, log and end order
          * If sufficient inventory, update stock_quantity, log cost, update product_sales
        * Relevant functions: viewCustomer(), promptCustomerMsg1(), promptCustomerMsg2(), checkInventory(), reduceInventory(), updateSales()
        * Relevant modules: bamazonCustomer.js
      * Manager View
        * Display menu of options for manager:
          * View Products for Sale: Display item_id, product_name, price, stock_quantity for all item_ids
          * View Low Inventory: Display item_id, product_name, price, stock_quantity for stock_quantity less than 5
          * Add to Inventory: Add stock_quantity for any existing item_id
          * Add New Product: Add new item_id
        * Relevant functions: viewManager(), displayProducts(), displayLowInventory(), addInventory(), addNewProduct()
        * Relevant modules: bamazonManager.js
      * Supervisor View
        * Display menu of options for supervisor:
          * View Product Sales by Department: Display department_id, department_name, over_head_costs, product_sales, total_profit
          * Create New Department: Create new department_id
        * Relevant functions: viewSupervisor(), displayProductsByDept(), createNewDept()
        * Relevant modules: bamazonSupervisor.js
   * Prerequisites for Development:
    * MacBook Air (Intel Core i7, 2.2 GHz, 1 Processor, 2 Cores, 8GB)
    * 64 bit operating system 
    * git version 2.18.0
    * Visual Studio Code Version 1.29.1
    * [GitHub bamazon-cl](https://github.com/jkawahara/bamazon-cl)
    * Chrome Version 70.0.3538.110 (Official Build) (64-bit)
   * Built With:
    * [Node.js](https://nodejs.org/docs/latest/api/documentation.html)
    * [npm](https://www.npmjs.com/)
      * [inquirer](https://www.npmjs.com/package/inquirer)
      * [prompt](https://www.npmjs.com/package/prompt)
   * Installing:
    * For further development or use of this application, clone or download application files from GitHub, which is organized into the following directory structure:
      * /bamazon-cl (application root directory level)
        * /node_modules (ignored by git) - generated first time npm install executes
        * .gitignore
        * bamazon.sql
        * bamazonCustomer.js
        * bamazonManager.js
        * bamazonSupervisor.js
        * LICENSE
        * package-lock.json - generated each time npm install executes
        * package.json - includes dependencies: inquirer
        * README.md
    * Once the application files are ready per the above structure, go to the application root directory level and enter the following in the termminal to install required node packages. This executes by referring to the included dependencies in package.json and creates required node packages in /node_modules and package-lock.json:
      * npm install
   * Running the tests:
    * Unit testing & integration testing was informally executed
   * Deployment:
    * N/A as this is a command-line application
 ## Versioning
  * For the versions available, see the tags on this repository.
 ## Authors
  * John Kawahara.
  * N/A- See also the list of contributors who participated in this project.
 ## License
  * This project is licensed under the [MIT License](LICENSE).
 ## Acknowledgments
  * Thanks to BCBC program personnel, especially our instructor, David Hallinan, along with our TAs Hannah Bowers and Glo Austin, for their guidance and support.