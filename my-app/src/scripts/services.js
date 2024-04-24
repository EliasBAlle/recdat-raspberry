

function executeSQLQuery(db, query) {
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Filas retornadas:", rows.length);
      console.log(executeSQLQuery);
    }
  });
}

function setQuery(query){
    this.query = query;
}

const db = databaseManager.getDatabase();

executeSQLQuery(db, query);
console.log(executeSQLQuery(db, query));

document.querySelector('button').addEventListener('click', event =>{
    console.log('doing submit...')
    const inputUserN = document.getElementById('username').value();
    const inputPassW = document.getElementById('password').value();

    let query = `SELECT * from user where username=${inputUserN} and password=${inputPassW}`;
    
    const resultset = executeSQLQuery(db, query)
    console.log(resultset)
})
