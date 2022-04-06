const { dialog } = require('electron')
const fs  = require('fs')
const path = require('path');
const shared = require('./shared-vars')

module.exports.openFile = (win) => {
    const option = {
        title: 'Open file',
        filters: [
            {
                name: 'file',
                extensions: ['pdb']
            }
        ]
    }

    const paths = dialog.showOpenDialogSync(win, option)

    if(paths && paths.length > 0) {
        console.log(`opening ${paths[0]}`)

        const content = fs.readFileSync(paths[0]).toString()
        
        // send file path (not content for now)
        //win.webContents.send('file-open', content, paths[0])
        win.webContents.send('file-open', content, paths[0])
        // send file name
        win.webContents.send('file-path', path.basename(paths[0]))

        shared.projectStarted = true
    }
}

module.exports.saveFile = (win, data) => {
    const option = {
        title: 'Save file',
        filters: [
            {
                name: 'file',
                extensions: ['txt']
            }
        ]
    }

    const path = dialog.showSaveDialogSync(win, option)

    fs.writeFileSync(path, data)

    console.log(`saving ${path}`)
}

module.exports.saveImage = (win, name, data) => {
    const option = {
        title: 'Save file',
        defaultPath: name,
        filters: [
            {
                name: 'file',
                extensions: ['png']
            }
        ]
    }

    //const path = dialog.showSaveDialogSync(win, option)
    const path = `${__dirname}/../videos/highres/${name}`

    fs.writeFileSync(path, data)

    console.log(`saving ${path}`)
}


module.exports.saveVideo = (win, data) => {
    const option = {
        title: 'Save video',
        defaultPath: 'video.mp4',
        filters: [
            {
                name: 'video',
                extensions: ['mp4']
            }
        ]
    }

    //console.log(data)

    const path = dialog.showSaveDialogSync(win, option)

    //fs.writeFileSync(path, data)
    
    if (path) {
        fs.writeFile(path, data, () => console.log('video saved successfully!'));
      }
    
    console.log(`saving ${path}`)
}