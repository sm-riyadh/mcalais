const { app, BrowserWindow } = require('electron')

function createWindow() {
  let win = new BrowserWindow({
    show: false,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  win.once('ready-to-show', () => {
    win.show()
  })
  win.setMenu(null)
  win.maximize()
  win.loadURL('http://localhost:3000')
  // win.loadFile('index.html')
}

app.on('ready', createWindow)
