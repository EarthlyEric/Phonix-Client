const {app, BrowserWindow} = require('electron')
const path = require('path')

function createMainWindow () {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    resizable: false,
  })
  mainWindow.loadFile(path.join(__dirname,'/resources/main.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools({mode:'detach'})
}

app.whenReady().then(() => {
  createMainWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
