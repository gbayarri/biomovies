const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const dotenv = require('dotenv').config();
const mydb = require("./database")
const menu = require('./menu')
const { getVideoSources } = require('./render')
const { openFile, saveFile, saveImage, saveVideo } = require('./fs-module')

// ************************
//const shared = require('./shared-vars')
//console.log(`main: ${shared.variableToShare}`)
// ************************

let win

createWindow = () => {

    win = new BrowserWindow(
        {
            width: 1200,
            height: 768,
            // hide for maximizing
            show: false,
            icon: "./assets/icon.png",
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        }
    )
    // maximize window
    //win.maximize();
    win.show(); 
    
    // load vue server in dev mode and dist/index.html in production
    const url = process.env.DEBUG ? process.env.DEV_URL : `file://${__dirname}/dist-vue/index.html`   
    win.loadURL(url)

    // if dev mode, open console automatically
    if(process.env.DEBUG) win.webContents.openDevTools()

    //mydb.create_db()

}

app.whenReady().then(createWindow)

app.on('ready', () => {
    mydb.create_db()

    ipcMain.on('item-send', (e, d) => {
        mydb.item_all()
    })

    // open new pdb
    ipcMain.on('file-open', (event, message) => {
        console.log("opening file")
        //const win = BrowserWindow.getFocusedWindow()
        openFile(win)
    })

    // save screenshot
    ipcMain.on('image-save', (event, path, buffer) => {
        //const win = BrowserWindow.getFocusedWindow()
        saveImage(win, path, buffer)
    })

    //console.log(getVideoSources())
    
    //win.webContents.send('source-id', getVideoSources())

    // hide main menu for recording video
    ipcMain.on('hide-menu', async(event) => {
        
        //const win = BrowserWindow.getFocusedWindow()
        win.setMenu(null)
    
    })

    // show main menu for recording video
    ipcMain.on('show-menu', async(event) => {
        
        //const win = BrowserWindow.getFocusedWindow()
        win.setMenu(menu)
    
    })

    // window source id
    ipcMain.on('request-source-id', async(event) => {
        
        const id = await getVideoSources()

        //console.log(id)

        //const win = BrowserWindow.getFocusedWindow()
        //console.log(win)

        win.webContents.send('source-id', id);

        //console.log(id)
    
    })

    // save video
    ipcMain.on('video-save', async(event, buffer) => {
        
        //const win = BrowserWindow.getFocusedWindow()
        saveVideo(win, buffer)
        
    })

    // start recording low-res video
    ipcMain.on('start-record-low', async(event) => {
        
        const id = await getVideoSources()

        //const win = BrowserWindow.getFocusedWindow()
        win.webContents.send('start-record-low', id);

        //console.log(id)
    
    })

    // start recording low-res video
    ipcMain.on('stop-record-low', async(event) => {
        
        //const win = BrowserWindow.getFocusedWindow()
        win.webContents.send('stop-record-low');

        //console.log(id)
    
    })

})

Menu.setApplicationMenu(menu)

