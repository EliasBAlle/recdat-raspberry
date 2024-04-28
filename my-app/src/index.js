const { app, BrowserWindow, ipcMain } = require("electron");
const sqlite3 = require("sqlite3").verbose();
const path = require("node:path");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1048,
    height: 624,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

if (process.env.NODE_ENV !== "production") {
  require("electron-reloader")(module);
  electron: path.join(__dirname, "../node_modules", ".bin", "electron");
}

//========================= >>>TODO EL METODO A LA CONEXION<<< =========================//
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


const databaseManager = new DatabaseManager();


module.exports = databaseManager;

//========================= >>>TODA LA LOGICA DE FUNCIONES A LA BD<<< =========================//

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

const db = databaseManager.getDatabase();

// document.querySelector('button').addEventListener('click', event =>{
//     console.log('doing submit...')
//     const inputUserN = document.getElementById('username').value();
//     const inputPassW = document.getElementById('password').value();

//     let query = `SELECT * from user where username=${inputUserN} and password=${inputPassW}`;
    
//     const resultset = executeSQLQuery(db, query)
//     console.log(resultset)
// })