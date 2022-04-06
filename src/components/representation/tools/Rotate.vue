<template>
  <!--<Button icon="fas fa-undo-alt fa-flip-horizontal" class="p-shadow-2" v-tooltip.right="ttp" @click="handleClick" />-->
  <Button icon="fas fa-undo-alt fa-flip-horizontal" class="p-shadow-2" @click="handleClick" />
</template>

<script>
import { ref, computed } from 'vue'
export default {
  props: ['stage'],
  setup(props) {
    const ttp = "Toggle spin rotation"
    const stage = ref(props.stage)

    //console.log(stage.value)

     //stage.value.toggleSpin()

    //const handleClick = () => stage.value.toggleSpin()

    const handleClick = () => {
        stage.value.toggleSpin()
        //console.log(stage.value)
    }

    return { ttp, handleClick }
  }
}
</script>

<style>

</style>