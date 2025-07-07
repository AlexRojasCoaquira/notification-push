<template>
    <Header></Header>
    <NuxtPage />
</template>
<script setup lang="ts">
  import { useFirebaseMessaging } from '../composables/usePushNotifications';
  const {listenForMessages} = useFirebaseMessaging()
  onMounted(() => { //llamarlo en la raíz de preferencia
    listenForMessages()
  })
</script>