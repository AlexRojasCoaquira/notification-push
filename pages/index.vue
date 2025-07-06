<template>
  <div>
    SUSCRIPCIONES
    <div class="">
      <p>PASO 1</p>
      <p>
        Mi token: {{ token }}
      </p>
      <button type="button" @click="getTokenFirebase">
        Obtener token
      </button>
    </div>
    <div class="" v-if="token">
      <p>PASO 2</p>
      <label for="topic">topico</label>
      <input name="topic" type="text" v-model="topic">
      <button type="button" @click="suscribeTopic">Suscribirse</button>
      <p v-if="res">Suscrito con éxitoo</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFirebaseMessaging } from '@/composables/usePushNotifications'
  const { getTokenNotification, suscribeToTopic } = useFirebaseMessaging()
  const token = ref('')
  const topic = ref('')
  const res = ref(null)
  const getTokenFirebase = async() => {
    const res = await getTokenNotification();
    token.value = res;
  }
  const suscribeTopic = async() => {
    const res = await suscribeToTopic(topic.value, token.value);
    console.log(res);
    res.value = res
  }
</script>

<style>

</style>