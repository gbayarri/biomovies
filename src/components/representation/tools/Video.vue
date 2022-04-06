<template>
  <!--<Button icon="fas fa-camera-retro" class="p-shadow-2" v-tooltip.right="ttp" @click="handleClick"  />-->
  <Button icon="fa-solid fa-video" class="p-shadow-2" @click="handleClick" />
</template>

<script>
import { ref, computed } from "vue";
//import globals from '@/globals'
//import structureStorage from '@/modules/structure/structureStorage'
//import useModals from '@/modules/common/useModals'
export default {
  props: ["stage"],
  setup(props) {
    const stage = ref(props.stage);

    const { ipcRenderer } = window.require("electron");

    let mediaRecorder;
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
    };

    const handleClick = () => {
      recording = !recording;

      if (recording) {
        console.log("start recording video!!");
        // POSSIBLE SOLUCIÓ PEL MOUSE, CLICO, TIMEOUT PER TREURE MENÚS, OCULTO CURSOR I L'STOP PER TECLAT
        //document.querySelector('#viewport').style.cursor = 'none'

        ipcRenderer.send('hide-menu');

        mediaRecorder.start();
      } else {
        console.log("stop recording video!!");

        ipcRenderer.send('show-menu');

        mediaRecorder.stop();
      }
    };

    const ttp = "Take a picture of the representation";

    return { ttp, handleClick };
  },
};
</script>

<style>
</style>