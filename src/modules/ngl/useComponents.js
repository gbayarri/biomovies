import { computed } from 'vue'

// Stage interactions
export default function useComponents() {

    const loadFileToStage = (stage, blob, ext, id) => {
        
        const extension = (ext === undefined) ? 'pdb' : ext
        //console.log(stage, blob, extension, id)
        return stage.loadFile(blob, { defaultRepresentation: false, ext: extension, name: id })
            .then(function (component) {

                //console.log(component)

                component.addRepresentation( "ball+stick", { sele: "*",  radius: .2 } )
                component.addRepresentation( "cartoon", { sele: "*",  opacity:0.7, color:'sstruc' } )

                stage.autoView()

                // set visibility to false until all structures are loaded
                //component.setVisibility(false)

                return component
            })

    }

    return {
        loadFileToStage
    }

}