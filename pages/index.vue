<template>
  <div class="w-full p-4">
    <div class="container">
      <h1 class="text-2xl font-bold">
        SUSCRIPCIONES
      </h1>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 my-5">
        <Card title="Noticias" @suscribe="suscribeTopic('Noticias')" :isSuscribe="topicList.includes('Noticias')" />
        <Card title="Deportes" @suscribe="suscribeTopic('Deportes')" :isSuscribe="topicList.includes('Deportes')"/>
        <Card title="Teatros" @suscribe="suscribeTopic('Teatros')" :isSuscribe="topicList.includes('Teatros')"/>
        <Card title="Festivales" @suscribe="suscribeTopic('Festivales')" :isSuscribe="topicList.includes('Festivales')"/>
        <Card title="Blogs" @suscribe="suscribeTopic('Blogs')" :isSuscribe="topicList.includes('Blogs')"/>
        <Card title="Ferias" @suscribe="suscribeTopic('Ferias')" :isSuscribe="topicList.includes('Ferias')"/>
        <Card title="Conciertos" @suscribe="suscribeTopic('Conciertos')" :isSuscribe="topicList.includes('Conciertos')" />
        <Card title="Entretenimiento" @suscribe="suscribeTopic('Entretenimiento')" :isSuscribe="topicList.includes('Entretenimiento')" />
      </div>
      <p>
        Mi token: {{ token }}
      </p>
      <button type="button" @click="getTokenFirebase">
        Obtener token
      </button>
      <div class="" v-if="token">
        <!-- <p>PASO 2</p>
        <label for="topic">topico</label>
        <input name="topic" type="text" v-model="topic"> -->
        <button type="button" @click="suscribeTopic">Suscribirse</button>
        <p v-if="msg">{{msg}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFirebaseMessaging } from '@/composables/usePushNotifications'
  const { getTokenNotification, suscribeToTopic } = useFirebaseMessaging()
  const token = ref('')
  const topic = ref('')
  const topicList = ref<string[]>([])
  const msg = ref('')
  const getTokenFirebase = async() => {
    const res = await getTokenNotification();
    token.value = res;
  }
  const suscribeTopic = async(topic: string) => {
    console.log('topic', topic)
    if(topicList.value.includes(topic) || !token.value) return;
    const res = await suscribeToTopic(topic, token.value);
    if(res) {
      topicList.value.push(topic)
      localStorage.setItem('topicList', JSON.stringify(topicList.value))
      msg.value = 'Se ha suscrito con éxito'
    }
    // console.log(res);
    // res.value = res
  }
  onMounted(() => {
    getTokenFirebase()
  })
</script>

<style>

</style>