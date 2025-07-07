<template>
  <div class="w-full p-4">
    <div class="container">
      <h1 class="text-2xl font-bold">
        ADMINISTRADOR
      </h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <div class="">
          <form @submit.prevent="sendNotificacion" class="w-full">
            <div class="flex gap-4">
              <p class="text-gray-800 font-semibold">Tipo de envío:</p>
              <label class="inline-flex items-center gap-2 cursor-pointer">
                <input
                  v-model="typeSend"
                  type="radio"
                  name="tipoEnvio"
                  value="topic"
                  class="text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span class="text-sm text-gray-700">Por tópicos</span>
              </label>
              <label class="inline-flex items-center gap-2 cursor-pointer">
                <input
                  v-model="typeSend"
                  type="radio"
                  name="tipoEnvio"
                  value="token"
                  class="text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span class="text-sm text-gray-700">Por token(directo)</span>
              </label>
            </div>
            <div class="block" v-if="typeSend === 'token'">
              <label class="block mb-2 text-sm font-medium text-gray-700">Token</label>
              <input
                v-model="token"
                type="text"
                class="w-full block px-4 py-2 mb-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="block" v-if="typeSend === 'topic'">
              <label class="block mb-2 text-sm font-medium text-gray-700">Tópico</label>
              <select v-model="topic" class="w-full block px-4 py-2 mb-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="Noticias">Noticias</option>
                <option value="Deportes">Deportes</option>
                <option value="Teatros">Teatros</option>
                <option value="Festivales">Festivales</option>
                <option value="Blogs">Blogs</option>
                <option value="Noticias">Noticias</option>
                <option value="Ferias">Ferias</option>
                <option value="Conciertos">Conciertos</option>
                <option value="Entretenimiento">Entretenimiento</option>
              </select>
            </div>
            <div class="block">
              <label class="block mb-2 text-sm font-medium text-gray-700">Titulo</label>
              <input
                v-model="form.title"
                type="text"
                class="w-full block px-4 py-2 mb-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="block">
              <label class="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                v-model="form.body"
                rows="3"
                placeholder="Escribe aquí"
                class="w-100-m w-full resize-none block mb-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="flex gap-4">
              <div class="w-full">
                <label class="block mb-2 text-sm font-medium text-gray-700">Url imagen</label>
                <input
                  v-model="form.image"
                  type="text"
                  placeholder="Escribe aquí"
                  class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <img :src="form.image" class="object-fit mt-3 w-24" alt="">
            </div>
            <button type="submit" class="w-40 rounded-2xl text-white text-xl bg-amber-600 px-3 py-2 mt-5">Enviar</button>
            <button type="button" class="ml-2 w-40 rounded-2xl text-white text-xl bg-green-600 px-3 py-2 mt-5" @click="autocomplete">Autocompletar</button>
            <button type="button" class="ml-2 w-40 rounded-2xl text-white text-xl bg-blue-600 px-3 py-2 mt-5" @click="cleanForm">Limpiar</button>
          </form>
        </div>
        <div class="w-full h-full border border-gray-900">
          Analítica - Firebase analitics
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFirebaseMessaging } from '@/composables/usePushNotifications'
  const {
    sendPushNotification,
    listenForMessages
   } = useFirebaseMessaging();
  const topic = ref('Noticias')
  const token = ref('')
  const typeSend = ref('topic')
  const defaultForm = {
    title: 'IMAGINE DRAGON',
    image: 'https://d189tumsugqfi4.cloudfront.net/_909x569_crop_center-center_80_none/APPROVED_MOJO_ImagineDragons_1920x1080px.jpg',
    body: 'Esta es una notificación de prueba enviada desde el servicio de notificaciones.'
  }
  let form = reactive({
    title: '',
    image: '',
    body: '',
  })
  const sendNotification = () => {

  }
  const autocomplete = () => {
    Object.assign(form, defaultForm);
  }
  const cleanForm = () => {
    Object.assign(form, {
      title: '',
      image: '',
      body: '',
    })
  };
  const sendNotificacion = async () => {
    try {
      const payload = {
        ...form,
        topic: topic.value
      }
      const res = await sendPushNotification(payload);
      console.log('res', res);
    } catch (error) {
      console.log('res', error);
    }
  }
  onMounted(() => { //llamarlo en la raíz de preferencia
    listenForMessages()
  })
</script>

<style>

</style>