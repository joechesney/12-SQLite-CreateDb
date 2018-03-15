const { Database } = require('sqlite3').verbose();
const db = new Database('office.sqlite', () => {
  console.log('Connected!');
  makeTable();
});
const errorHandler = (err) => {
  if (err) { // If there is an error obj, it will be console logged
    console.log(`Msg: ${err}`);
  };
};

let array = [
  { id: 0, firstName: 'Fred', lastName: 'Smith', jobTitle: 'Cashier', address: '500 Somewhere Lane' },
  { id: 1, firstName: 'Jim', lastName: 'Boe', jobTitle: 'Sales', address: '5456 Somewhere Lane' },
  { id: 2, firstName: 'Andy', lastName: 'Dwyer', jobTitle: 'Phones', address: '245 Somewhere Lane' },
  { id: 3, firstName: 'Bill', lastName: 'Beans', jobTitle: 'Customer Service', address: '47 Somewhere Lane' },
  { id: 4, firstName: 'Montez', lastName: 'Garcia', jobTitle: 'Stock', address: '136314 Somewhere Lane' },
  { id: 5, firstName: 'Alice', lastName: 'Murphy', jobTitle: 'Manager', address: '2474 Somewhere Lane' }
];
const makeTable = () =>{
  db.serialize( ()=>{
    db.run("DROP TABLE IF EXISTS employees");
    console.log('1');
    db.run("CREATE TABLE IF NOT EXISTS employees (id INT, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT)");
    console.log('2');
    array.forEach(person=>{
      db.run(
        `INSERT INTO employees VALUES(
          ${person.id},
          "${person.firstName}", 
          "${person.lastName}", 
          "${person.jobTitle}", 
          "${person.address}"
        )`, 
          errorHandler
      );
    });
    db.all("SELECT * FROM employees", (err, allRows) => {
      errorHandler(err);
      allRows.forEach(each => {
        console.log(each.id, each.firstName, each.lastName);
      });
    });
    
    db.all("SELECT employees.jobTitle FROM employees", (err, allRows) => {
      allRows.forEach(each => {
        console.log(each.jobTitle);
      });
    });
  });
  
}






// Didnt need this. Arwa never ever uses it 
// db.close(err => {
//   errorHandler(err); // Use custom error handling function
//   console.log('Database closed'); // Will only log on successful close
// });