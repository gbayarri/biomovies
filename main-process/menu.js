const { Menu, shell, BrowserWindow, app, remote, dialog } = require('electron')
const { openFile, saveFile } = require('./fs-module')

// ************************
const shared = require('./shared-vars')
/*console.log(`menu: ${shared.variableToShare}`)
shared.variableToShare = "shared modified!!"*/
// ************************

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New project',
                accelerator: 'CommandOrControl+Shift+N',
                click() {
                    console.log("create new project")
                    const win = BrowserWindow.getFocusedWindow()
                    openFile(win)
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Open project',
                accelerator: 'CommandOrControl+Shift+O',
                click() {
                    console.log("open existing project")
                    /*const win = BrowserWindow.getFocusedWindow()
                    openFile(win)*/
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Save project',
                accelerator: 'CommandOrControl+Shift+S',
                click() {
                    console.log("Save current project")
                    /*const win = BrowserWindow.getFocusedWindow()
                    win.webContents.send('editor-channel', 'file-save')*/
                }
            },
            {
                label: 'Create LowRes Video',
                accelerator: 'CommandOrControl+Shift+V',
                click() {
                    const primaryWin = BrowserWindow.getFocusedWindow().id
                    if(shared.projectStarted) {
                        // ONLY IF PROJECT STARTED
                        console.log("Open video modal")
                        let aboutwin = new BrowserWindow(
                            { 
                                width: 300, 
                                height: 150, 
                                /*frame:false,*/ 
                                resizable: false, 
                                parent: BrowserWindow.fromId(primaryWin), 
                                modal: true,
                                webPreferences: {
                                    nodeIntegration: true,
                                    contextIsolation: false
                                }
                            })
                        //aboutwin.loadFile("about.html")
                        // WILL NOT WORK IN PROD, SEE:
                        // https://stackoverflow.com/questions/53990214/how-to-fix-blank-page-if-i-am-using-vue-router-with-electron-js
                        const url = process.env.DEBUG ? process.env.DEV_URL : `file://${__dirname}/dist-vue/index.html`   
                        aboutwin.loadURL(`${url}/video/low`)
                        // ************************
                        aboutwin.setMenu(null)
                        // ************************
                    } else {
                        console.log("warning, no project started")
                        dialog.showMessageBox({
                            title: 'Warning',
                            buttons: ['Ok'],
                            type: 'warning',
                            message: 'For creating a video you must open an existing project or create a new one.',
                        });
                    }
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'quit',
                accelerator: 'CommandOrControl+Q'
            }           
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Documentation',
                click() {
                    //console.log("help")
                    shell.openExternal('https://www.electronjs.org/docs/latest/api/menu#class-menu')
                }
            },
            {
                label: 'About biomovies',
                click() {
                    const primaryWin = BrowserWindow.getFocusedWindow().id
                    let aboutwin = new BrowserWindow({ width: 300, height: 150, /*frame:false,*/ resizable: false, parent: BrowserWindow.fromId(primaryWin), modal: true })
                    //aboutwin.loadFile("about.html")
                    // WILL NOT WORK IN PROD, SEE:
                    // https://stackoverflow.com/questions/53990214/how-to-fix-blank-page-if-i-am-using-vue-router-with-electron-js
                    const url = process.env.DEBUG ? process.env.DEV_URL : `file://${__dirname}/dist-vue/index.html`   
                    aboutwin.loadURL(`${url}/about`)
                    aboutwin.setMenu(null)
                }
            }
        ]
    }
]

// this menu only in debug mode
if (process.env.DEBUG) {
    template.push(
        {
            label: 'Debugging',
            submenu: [
                {
                    role: 'toggledevtools'
                },
                {
                    role: 'reload'
                }
            ]
        }
    )
}

// this menu only in linux
/*if (process.platform == 'linux') { // darwin, win32
    template.push(
        {
            label: 'Linux',
            submenu: [
                {
                    label: 'About linux',
                    click() {
                        //console.log("help")
                        shell.openExternal('https://www.linux.org/')
                    }
                }
            ]
        }
    )
}*/

const menu = Menu.buildFromTemplate(template)

module.exports = menu