<template>
    <div id="tools" >
        <div>
        <!--<Reload :stage="stage" />
        <Rotate v-if="isShared" :stage="stage" />
        <Center :stage="stage" />
        <Background v-if="!isShared" />
        <FullScreen :stage="stage" />
        <Picture v-if="isShared && !disabled" :stage="stage" />
        <Align v-if="!isShared && isAlignable" />
        <Player v-if="isShared && showPlayer" :stage="stage" />
        <Embed v-if="isShared && !disabled" :isDraft="isDraft" />
        <Measurements v-if="!isShared" />
        <NavigationMode v-if="!isShared" />
        <Camera v-if="!isShared" :stage="stage" />
        <QR v-if="isShared && !disabled" :isDraft="isDraft" />
        <Help :isShared="isShared" />
        <Visit v-if="isShared" :isDraft="isDraft" />
        <ProjectSettings v-if="!isShared" />-->
        <Rotate :stage="stage" />
        <Picture :stage="stage" />
        <!--<Video :stage="stage" />-->
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import useStage from "@/modules/ngl/useStage"
import Rotate from '@/components/representation/tools/Rotate'
import Picture from '@/components/representation/tools/Picture'
import Video from '@/components/representation/tools/Video'
export default {
    components: { Rotate, Picture, Video },
    //props: ['isDraft', 'showPlayer'],
    setup() {
        const { getStage } = useStage()

        const stage = getStage()

        //console.log(stage)

        //const { flags } = useFlags()
        //const { getNumStructures } = structureSettings()
        
        /*const isShared = computed(() => flags.isShared)
        const disabled = computed(() => flags.responsive600)
        const isAlignable = computed(() => getNumStructures() > 1)
        const stage = getStage()
        return { stage, isShared, isAlignable, disabled }*/
        return { stage }
    }
}
</script>

<style>
    #tools { position: absolute; z-index: 3; left: 1%; top: 1%;  width:40px; }
    #tools .p-button.p-button-icon-only { width:auto; width:2.2rem; height:2rem; margin-top:.2rem; }
    @media (max-width: 600px) {
        #tools { left: 0; bottom: 2%; top:auto; width:100%; }
        #tools div { text-align: center; }
        #tools .p-button.p-button-icon-only { margin-right:.2rem; }
    }
</style>