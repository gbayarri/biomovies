<template>
  <div class="grid">
    <div class="col-4 pt-5"><img src="@/assets/icon.png" alt=""></div>
    <div class="col-8 pt-5 text-left"> <h1 class="pt-0 mt-0">{{ app_name }}</h1> Version: {{ app_version }} <br> &copy; Molecular Modeling & Bioinformatics</div>
</div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {

    const app_name = inject('$app_name')
    const app_version = inject('$app_version')

    return { app_name, app_version }

  }
}
</script>

<style>

</style>