<template>
  <v-app>

    <core-drawer />

    <core-view />

    <core-cta />
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    components: {
      CoreCta: () => import('@/components/core/Cta'),
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreView: () => import('@/components/core/View')
    },
    data () {
      return {
      //
      }
    }
  }
</script>
