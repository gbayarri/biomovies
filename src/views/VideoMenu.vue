<template>
  <Button
    :label="recording ? 'Stop' : 'Record'"
    :icon="recording ? 'fa-solid fa-square' : 'fa-solid fa-circle'"
    :class="'p-button-raised mt-4 ' + (recording ? '' : 'p-button-danger')"
    @click="handleClick"
  />
  <div class="mt-3" id="record-clock">00:00:00</div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["type"],
  setup(props) {

    const recording = ref(false);

    const { ipcRenderer } = window.require("electron");

    let timer = 0;
    let timerInterval;

    const handleClick = () => {
      recording.value = !recording.value;

      if (props.type === "low") {
        if (recording.value) {
          timer = 0
          document.querySelector("#record-clock").innerHTML = "00:00:00"

          console.log("start recording video!!");

          ipcRenderer.send("start-record-low");

          timerInterval = setInterval(() => {
            timer++;

            var h = Math.floor((timer % (60 * 60 * 24)) / (60 * 60));
            var m = Math.floor((timer % (60 * 60)) / (60));
            var s = Math.floor((timer % (60)));

            h = h < 10 ? "0" + h : h
            m = m < 10 ? "0" + m : m
            s = s < 10 ? "0" + s : s

            document.querySelector("#record-clock").innerHTML = h + ":" + m + ":" + s
          }, 1000);

          // POSSIBLE SOLUCIÓ PEL MOUSE, CLICO, TIMEOUT PER TREURE MENÚS, OCULTO CURSOR I L'STOP PER TECLAT
          //document.querySelector('#viewport').style.cursor = 'none'

          ipcRenderer.send("hide-menu");

          //mediaRecorder.start();
        } else {
          console.log("stop recording video!!");

          clearInterval(timerInterval);

          ipcRenderer.send("stop-record-low");
          ipcRenderer.send('show-menu');

          //mediaRecorder.stop();
        }
      } else {
        // TODO HIGH RES
      }
    };

    return { recording, handleClick };
  },
};
</script>

<style>
  #record-clock { font-family: Roboto Mono; font-size: 20px; }
</style>