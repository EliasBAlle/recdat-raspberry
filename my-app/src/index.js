const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("node:path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1048,
    height: 624,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
if (process.env.NODE_ENV !== "production") {
  require("electron-reloader")(module);
  electron: path.join(__dirname, "../node_modules", ".bin", "electron");
}

// function connectToDatabase() {
//   const sqlite3 = require("sqlite3").verbose();
//   const DB_PATH = "database/assistances.db";

//   return new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       console.error("Error al abrir la base de datos: =======>", err.message);
//     } else {
//       console.log("Conectado a la base de datos SQLite assistances");
//     }
//   });
// }

// function executeSQLQuery(db, query) {
//   db.all(query, [], (err, rows) => {
//     if (err) {
//       console.error(err.message);
//     } else {
//       console.log("Filas retornadas:", rows.length);
//       console.log(executeSQLQuery);
//       //mainWindow.webContents.send('data-from-database', rows);
//     }
//   });
// }

// const db = connectToDatabase();
// const query =
//   "SELECT first_name, second_name AS nombre_completo, first_surname, second_surname AS apellido_completo, id_number AS cedula, phone AS telefono, email AS correo, address AS direccion, photo AS foto, entry_date AS llegada, entry_time AS hora, departure_time AS salida FROM functionary INNER JOIN teaching_assistance";

// executeSQLQuery(db, query);
// console.log(executeSQLQuery(db, query));

// // Escuchar el evento de inicio de la aplicación desde la página HTML
// ipcMain.on("start-app", (event, arg) => {
//   executeSQLQuery(db, query);
// });

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
