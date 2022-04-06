<template>
  <div class="home">
    <img alt="Main logo" src="@/assets/logo.png" id="main-logo" />
    <SpeedDial
      :model="items"
      :radius="80"
      direction="up"
      :transitionDelay="150"
      type="semi-circle"
      :tooltipOptions="{ position: 'top' }"
    />
  </div>
</template>

<script>
import { inject, ref } from "vue"
export default {
  setup() {

    const $router = inject('$router')
    const app_name = inject('$app_name')

    const { ipcRenderer } = window.require("electron");

    // get initial pdb 
    ipcRenderer.on("file-open", (event, file, path) => {
      // guardar el pdb en memòria en una variable?
      // O POTSER MILLOR PASSAR NOMÉS EL PATH EN EL CAS QUE SIGUI IN PDB I OBRIR-LO AL VIEWPORT!!!!
      // EN UN FUTUR GUARDAR-HO EN UNA NOVA CARPETA AMB TOT EL PROJECTE

      $router.push({ name: 'Representation', params: { file: file, path: path } }) 
    });

    // get name of open file and put it into title
    ipcRenderer.on("file-path", (event, msg) => {
      document.title = `${app_name} - ${msg}`;
    });

    const items = ref([
      {
        label: "Need help?",
        icon: "fa-solid fa-circle-question",
        command: () => {
          // open help
          // window.location.href = "https://vuejs.org/";
        },
      },
      {
        label: "Create new project",
        icon: "fa-solid fa-folder-plus",
        command: () => {
          ipcRenderer.send("file-open");
        },
      },
      {
        label: "Open existing project",
        icon: "fa-solid fa-folder-open",
        command: () => {},
      },
    ]);

    return { items };
  },
};
</script>

<style>
#main-logo {
  width: 30%;
  max-width: 488px;
  margin-top: 100px;
}
</style>
