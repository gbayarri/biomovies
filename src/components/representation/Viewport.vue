<template>
  <div id="stage">
    <!--<div id="viewport" :class="hasBg ? 'bg-viewport': ''">-->
    <div id="viewport"></div>
    <!--<video id="video-test"></video>-->
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import useFlags from '@/modules/common/useFlags'
import useStage from "@/modules/ngl/useStage"
import useComponents from "@/modules/ngl/useComponents"
//import * as NGL from "ngl"
export default {
  props: ["file", "path"],
  setup(props) {

    const { ipcRenderer } = window.require("electron");

    const { setFlagStatus } = useFlags()

    const pdb_path = ref(props.path);
    const pdb_file = ref(props.file);

    //console.log(pdb_file)

    const { createStage } = useStage();
    const { loadFileToStage } = useComponents();

    const blob = new Blob([pdb_file.value], { type: "text/plain" });

    setFlagStatus('stageLoaded', false)

    //const array_promises = [];

    onMounted(() => {
      const stage = createStage("viewport");

        //////////////////////////////7
      // DEFINIR PER AQUÍ ALGUN FLAG QUE NO PERMETI ACTIVAR LES TOOLS FINS QUE TOT ESTIGUI CARREGAT
      // MIRAR stageLoaded A 3DRS
      //////////////////////////////

      /*array_promises.push(loadFileToStage(stage, blob, "pdb", "id"));

      Promise.all(array_promises).then(function (ol) {
        console.log(ol);
      });*/

      Promise.resolve(loadFileToStage(stage, blob, "pdb", "id")).then((ol) => {
        console.log(ol);
        setFlagStatus('stageLoaded', true)
      })
    });

    // RECORD VIDEO

    let mediaRecorder;
    let recordedChunks = [];

    // save data chunks
    const handleDataAvailable = (e) => {
      console.log("video data available");
      recordedChunks.push(e.data);
    };

    // save data
    const handleStop = async (e) => {
      const blob = new Blob(recordedChunks, {
        //type: 'video/webm; codecs=vp9'
        type: 'video/mp4; codecs="avc1.4d002a"',
      });

      var buffer = Buffer.from(await blob.arrayBuffer());

      ipcRenderer.send('video-save', buffer);

      // clean buffer
      recordedChunks = [];

    };

    // create video stream
    const getStream = async (id) => {

      console.log(id)

      const constraints = {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: id,
          },
        },
      };

      // Create a Stream
      var stream = await navigator.mediaDevices.getUserMedia(constraints);

      //console.log(stream);

      // ****************************
      // only for test purposes
      //const videoElement = document.getElementById("video-test");
      // Preview the source in a video element
      // videoElement.srcObject = stream;
      // videoElement.play();
      // ****************************

      // Create the Media Recorder object
      const options = { mimeType: "video/webm; codecs=vp9" };
      //const options = { mimeType: 'video/mp4; codecs="avc1.4d002a"' };
      let medR = new MediaRecorder(stream, options);

      // Register Event Handlers
      medR.ondataavailable = handleDataAvailable;
      medR.onstop = handleStop;

      return medR;
    }

    ipcRenderer.on("start-record-low", async (event, id) => {
      console.log("starting record!!!!")

      mediaRecorder = await getStream(id);

      mediaRecorder.start();
     
    });

    ipcRenderer.on("stop-record-low", async (event) => {
      console.log("stoping record!!!!")

      mediaRecorder.stop();
     
    });

    /*let mediaRecorder;
    let recordedChunks = [];

    let recording = false;

    // request id of current window
    ipcRenderer.send("request-source-id");
    // once id received, get stream
    ipcRenderer.on("source-id", (event, id) => {
      getStream(id);
    });

    // save data chunks
    const handleDataAvailable = (e) => {
      console.log("video data available");
      recordedChunks.push(e.data);
    };

    // save data
    const handleStop = async (e) => {
      const blob = new Blob(recordedChunks, {
        //type: 'video/webm; codecs=vp9'
        type: 'video/mp4; codecs="avc1.4d002a"',
      });

      var buffer = Buffer.from(await blob.arrayBuffer());

      ipcRenderer.send('video-save', buffer);

      // clean buffer
      recordedChunks = [];

    };

    // create video stream
    const getStream = async (id) => {
      const constraints = {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: id,
          },
        },
      };

      // Create a Stream
      var stream = await navigator.mediaDevices.getUserMedia(constraints);

      //console.log(stream);

      // ****************************
      // only for test purposes
      //const videoElement = document.getElementById("video-test");
      // Preview the source in a video element
      // videoElement.srcObject = stream;
      // videoElement.play();
      // ****************************

      // Create the Media Recorder object
      const options = { mimeType: "video/webm; codecs=vp9" };
      //const options = { mimeType: 'video/mp4; codecs="avc1.4d002a"' };
      mediaRecorder = new MediaRecorder(stream, options);

      // Register Event Handlers
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.onstop = handleStop;

      console.log(mediaRecorder);
    }*/


  },
};
</script>

<style>
#stage {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /*background: #f1f1f1; */
}
#viewport {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}
.bg-viewport {
  background-size: 20% auto;
  background-repeat: no-repeat;
  /*background-image: url("~@/assets/img/logo_alpha.png");*/
  background-position: bottom right;
}
#viewport div canvas {
  background: transparent !important;
}

#video-test { width: 200px; height: 200px; z-index:100; background: #000; position: absolute; right:0; top:0}
</style>