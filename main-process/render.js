const { desktopCapturer, BrowserWindow } = require('electron');

module.exports.getVideoSources = async () => {

    const inputSources = await desktopCapturer.getSources({
        types: ['window']
    });

    /*for (const source of inputSources) {
        // RETORNAR LA QUE TINGUI 'biomovies - ' AL NAME??
        console.log(source.name)
    }*/

    return inputSources[0].id

}