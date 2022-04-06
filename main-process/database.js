const db = require('electron-db');
const path = require('path')
const { ipcMain, BrowserWindow } = require("electron");
const location = path.join(`${__dirname}/../db`, '')

ipcMain.on('item-save', (e, arg) => {
    this.item_save(arg)
})

ipcMain.on('item-update', (e, id, name) => {
    this.item_update(id, name)
})

ipcMain.on('item-delete', (e, arg) => {
    this.item_delete(parseInt(arg))
})

module.exports.create_db = () => {
    db.createTable('items', location, (succ, msg) => {
        console.log("Success: " + succ);
        console.log("Message: " + msg);
    })
}

module.exports.item_save = (name) => {

    let obj = new Object()
    obj.name = name

    db.insertTableContent('items', location, obj, (succ, msg) => {
        console.log("Success: " + succ);
        console.log("Message: " + msg);
    })
}

module.exports.item_all = () => {
    db.getAll('items', location, (succ, data) => {
        const win = BrowserWindow.getFocusedWindow()
        win.webContents.send('item-all', data)
    })
}

module.exports.item_get = (id) => {
    db.getRows('items', location, {id:id}, (succ, data) => {
        console.log(data);
    })
}

module.exports.item_update = (id, name) => {
    let where = { id: id}
    let set = { name: name}
    db.updateRow('items', location, where, set, (succ, data) => {
        console.log(succ, data);
    })
}

module.exports.item_delete = (id) => {
    db.deleteRow('items', location, { id:id }, (succ, data) => {
        console.log(succ, data);
    })
}