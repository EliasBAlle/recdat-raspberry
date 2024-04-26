



//====================================================================================================
const sqlite3 = require("sqlite3").verbose();

class DatabaseManager {
  constructor() {
    if (!DatabaseManager.instance) {
      this._db = this._connectToDatabase();
      DatabaseManager.instance = this;
    }

    return DatabaseManager.instance;
  }

  _connectToDatabase() {
    const DB_PATH = "database/assistances.db";
    return new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error("Error al abrir la base de datos: =======>", err.message);
      } else {
        console.log("Conectado a la base de datos SQLite: "+ DB_PATH);
      }
    });
  }

  getDatabase() {
    return this._db;
  }
}

// Crear una instancia única del gestor de la base de datos
const databaseManager = new DatabaseManager();

// Exportar la instancia única para su uso en otras partes del código
module.exports = databaseManager;

//===================================================================================
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