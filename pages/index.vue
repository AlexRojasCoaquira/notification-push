<template>
  <div class="w-full p-4">
    <div class="container">
      <h1 class="text-2xl font-bold">
        SUSCRIPCIONES
      </h1>
      <p v-if="msg" class="text-xl text-emerald-700 font-bold">{{msg}}-{{ topicSelected }}</p>
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
      <!-- <span class="block mt-10 w-full">
        {{ token }}
      </span> -->
      <span class="block w-full break-words whitespace-normal text-sm mt-4">
        {{ token }}
      </span>
      <!-- <button type="button" @click="getTokenFirebase">
        Obtener token
      </button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFirebaseMessaging } from '@/composables/usePushNotifications'
  const { getTokenNotification, suscribeToTopic } = useFirebaseMessaging()
  const isPWA = ref(false)
  const token = ref('')
  const topicSelected = ref('')
  const topicList = ref<string[]>([])
  const msg = ref('')
  const getTokenFirebase = async() => {
    const res = await getTokenNotification();
    token.value = res;
  }
  const suscribeTopic = async(topic: string) => {
    console.log('topic', topic)
    let subscribe = '1';
    if(!token.value) return;
    topicSelected.value = topic;
    if(topicList.value.includes(topic)) subscribe = '0'

    const res = await suscribeToTopic(topic, token.value, subscribe);
    if(res) {
      if(subscribe === '0') {
        const topicListNew = topicList.value.filter((t:string) => t !== topic)
        console.log('topicListNew', topicListNew);
        localStorage.setItem('topicList', JSON.stringify(topicListNew))
        topicList.value = topicListNew
      } else {
        topicList.value.push(topic)
      }
      localStorage.setItem('topicList', JSON.stringify(topicList.value))
      msg.value = subscribe === '1'? 'Se ha suscrito con éxito' : 'Se ha cancelado la suscripción'
      setTimeout(() => {
        msg.value=''
      }, 5000);
    }
    // console.log(res);
    // res.value = res
  }
  onMounted(() => {
    const topics = localStorage.getItem('topicList');
    if(topics) topicList.value = JSON.parse(topics)
    getTokenFirebase()
  })
</script>

<style>

</style>