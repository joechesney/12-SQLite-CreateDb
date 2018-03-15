const { Database } = require('sqlite3').verbose();
const db = new Database('employees.sqlite', () => console.log('Connected!'));
const errorHandler = (err) => {
  if (err) { // If there is an error obj, it will be console logged
    console.log(`Msg: ${err}`);
  };
};
db.run("CREATE TABLE IF NOT EXISTS employees (id INT, firstName TEXT, lastName TEXT)");

db.run("INSERT INTO employees (id, first, last) VALUES (1, 'Michael', 'Scott')");
// db.run("INSERT INTO employees VALUES (2, 'Jim', 'Halpert')", errorHandler);

const employeeArray = [
  { id: 3, firstName: 'Dwight', lastName: 'Schrute' },
  { id: 4, firstName: 'Andy', lastName: 'Bernard' },
  { id: 5, firstName: 'Pam', lastName: 'Beesly' }
];
// employeeArray.forEach((obj) => {
//   // Using ES6 string templating, we can create an insert statement for each object
//   db.run(`INSERT INTO employees VALUES (${obj.id}, '${obj.firstName}', '${obj.lastName}')`);
// });

// db.all("SELECT * FROM employees", (err, allRows) => {
//   // allRows is an array containing each row from the query
//   allRows.forEach(each => {
//     console.log(each.id, each.first + ' ' + each.last);
//   });
// });



// db.all("SELECT * FROM employees", (err, allRows) => {
//   errorHandler(err); // We can also check for errors here

//   // <-- Do something with results from database -->
// });

db.close(err => {
  errorHandler(err); // Use custom error handling function
  console.log('Database closed'); // Will only log on successful close
})