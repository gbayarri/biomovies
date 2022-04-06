<template>
  <!--<Tools v-if="stageLoaded && !disableComponents" />-->
  <Tools v-if="stageLoaded" />

  <!--<Viewport v-if="loadViewport" v-show="!disableComponents" :project_id="project_id" />-->
  <Viewport :path="pdb_path" :file="pdb_file" />
</template>

<script>
import { ref, computed } from "vue"
import useFlags from '@/modules/common/useFlags'
import Viewport from "@/components/representation/Viewport"
import Tools from "@/components/representation/Tools"
export default {
  components: { Viewport, Tools },
  props: ["file", "path"],
  setup(props) {

    const { flags } = useFlags()

    const pdb_path = ref(props.path);
    const pdb_file = ref(props.file);

    const stageLoaded = computed(() => flags.stageLoaded)

    return { 
      pdb_path, pdb_file,
      stageLoaded
    }

  },
};
</script>

<style>

</style>