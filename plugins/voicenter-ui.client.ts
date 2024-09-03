import VoicenterUI from '@voicenter-team/voicenter-ui-plus'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VoicenterUI, {
        themeConfig: {
            type: 'local',
            themeName: 'redGreen'
        }
    })
})
