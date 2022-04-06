import { reactive } from 'vue'
//import { Stage, Selection, DatasourceRegistry, MdsrvDatasource, /*setListingDatasource,*/ setTrajectoryDatasource, TrajectoryPlayer } from 'ngl'
import * as NGL from 'ngl'

let stage = reactive({})
let selection = reactive({})

export default function useStage() {

    const createStage = function (layer) {

        /*DatasourceRegistry.add("file", new MdsrvDatasource( window.location.origin + "/tool-mdsrv/" ))
        DatasourceRegistry.listing = DatasourceRegistry.get( "file" )
        DatasourceRegistry.trajectory = DatasourceRegistry.get( "file" )*/

        // Load MDSRV API as Datasource
        //const mdsrvDatasource = new NGL.MdsrvDatasource( process.env.VUE_APP_MDSRV )
        //NGL.DatasourceRegistry.add("file", mdsrvDatasource)
        //setListingDatasource(mdsrvDatasource)
        //NGL.setTrajectoryDatasource(mdsrvDatasource)
        //console.log(DatasourceRegistry)
        /*NGL.setListingDatasource(mdsrvDatasource)
        NGL.setTrajectoryDatasource(mdsrvDatasource)*/

        stage = new NGL.Stage(layer, { tooltip:false/*, cameraType: 'perspective'*/ })
        //console.log('stage created')
        return stage 
    }
    
    const getStage = function () {
        //console.log('return stage')
        return stage
    }
    
    /*const createSelection = function (sel) {
        selection = new NGL.Selection(sel)
        //console.log('stage created')
        return selection 
    }

    const createTrajectoryPlayer = function (traj, settings) {
        return new NGL.TrajectoryPlayer( traj, {
            step: settings.step,
            timeout:settings.timeout,
            start: settings.range[0],
            end: settings.range[1],
            interpolateType: settings.interpolation,
            mode: settings.loop ? "loop": "once",
            direction: settings.bounce ? "bounce": "forward"
        } ) 
    }

    const createSuperposition = function (str1, str2, sele1, sele2) {
        const c1 = stage.getComponentsByName(str1).list[0]
        const c2 = stage.getComponentsByName(str2).list[0]

        const s1 = c1.structure
        const s2 = c2.structure

        NGL.superpose(s1, s2, true, sele1, sele2)
        c1.updateRepresentations({ position: true })
        c1.autoView()
    }

    const calculateDistance = function (atom1, atom2) {
        const outer = new NGL.Vector3(atom1.x, atom1.y, atom1.z)
        const inner = new NGL.Vector3(atom2.x, atom2.y, atom2.z)
        return parseFloat(outer.distanceTo(inner).toFixed(2))
    }

    const calculateAngle = function (atom1, atom2, atom3) {
        const v1 = new NGL.Vector3(atom1.x - atom2.x, atom1.y - atom2.y, atom1.z - atom2.z)
        const v2 = new NGL.Vector3(atom3.x - atom2.x, atom3.y - atom2.y, atom3.z - atom2.z)

        const r = v1.angleTo(v2)
        const d = (r*180) / Math.PI

        return parseFloat(d.toFixed(1))
    }

    const arrayToVector3 = function (array) {
        return new NGL.Vector3(array[0], array[1], array[2])
    }

    const distanceBasedSelection = function (o, sele, distance) {
        var selection = new NGL.Selection( sele )
        var radius = distance.radius
        // get original selection
        var atomSetOrig = o.structure.getAtomSet( selection )
        // get distance-based selection
        var atomSet = o.structure.getAtomSetWithinSelection( selection, radius )
        // substract original selection from distance-based selection leaving only the pocket
        var outputAS = atomSet.difference(atomSetOrig)
        // expand selection to complete groups
        if(distance.groups) outputAS = o.structure.getAtomSetWithinGroup( outputAS )
        // return atom set
        return outputAS
    }*/
  
    return { 
        stage, 
        selection, 
        createStage, 
        getStage, 
        /*createSelection, 
        createTrajectoryPlayer, 
        createSuperposition, 
        calculateDistance, 
        calculateAngle, 
        arrayToVector3,
        distanceBasedSelection*/
    }
  
  }