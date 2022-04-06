<template>
  <!--<Button icon="fas fa-camera-retro" class="p-shadow-2" v-tooltip.right="ttp" @click="handleClick"  />-->
  <Button icon="fas fa-camera-retro" class="p-shadow-2" @click="handleClick" />
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

    const handleClick = () => {
      console.log("take picture!!");

      var canvas = document.querySelector("#stage #viewport canvas");

      let count = 0;

      var intervalID = setInterval(() => {
        count++;

        // el resize encara no va!!!
        // amb això amplio la mida del canvas, però hauria de fer zoom sobre
        // l'stage i després tornar a original com fa NGL
        // jugar amb les matrius, buf...
        var inMemCanvas = document.createElement("canvas");
        var inMemCtx = inMemCanvas.getContext("2d");
        inMemCanvas.width = canvas.width * 2;
        inMemCanvas.height = canvas.height * 2;
        inMemCtx.drawImage(canvas, 0, 0);

        inMemCanvas.toBlob(function (blob) {
          //canvas.toBlob(function (blob) {
          var fileName = `new-image-${count}.png`;
          let reader = new FileReader();
          reader.onload = function () {
            if (reader.readyState == 2) {
              var buffer = new Buffer(reader.result);
              ipcRenderer.send("image-save", fileName, buffer);
              console.log(
                `Saving ${JSON.stringify({ fileName, size: blob.size })}`
              );
            }
          };
          reader.readAsArrayBuffer(blob);
        });

        if (count == 5) clearInterval(intervalID);
      }, 1000);
    };

    const ttp = "Take a picture of the representation";

    return { ttp, handleClick };
  },
};
</script>

<style>
</style>