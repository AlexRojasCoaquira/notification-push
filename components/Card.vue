<template>
  <div
    :class="[
      'w-full mx-auto p-6 rounded-2xl shadow-lg text-white',
      gradientClass
    ]">
    <h2 class="text-lg font-bold mb-4 text-center">{{ title }}</h2>
    <div class="flex justify-center">
      <button
        class="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold shadow hover:bg-indigo-50 transition"
        @click="$emit('suscribe')"
      >
        <template v-if="isSuscribe">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
                    a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341
                    C7.67 6.165 6 8.388 6 11v3.159c0
                    .538-.214 1.055-.595 1.436L4 17h5m6
                    0v1a3 3 0 11-6 0v-1m6 0H9" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 13l2 2l4 -4" />
          </svg>
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </template>
        {{isSuscribe ? 'Desuscribirme' : 'Suscribirme'}}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string,
  isSuscribe: boolean
}>()
const gradientMap: Record<string, string> = {
  Noticias: 'bg-gradient-to-br from-blue-500 to-blue-700',
  Deportes: 'bg-gradient-to-br from-green-500 to-emerald-600',
  Teatros: 'bg-gradient-to-br from-purple-600 to-fuchsia-500',
  Festivales: 'bg-gradient-to-br from-yellow-400 to-orange-500',
  Blogs: 'bg-gradient-to-br from-pink-500 to-rose-500',
  Ferias: 'bg-gradient-to-br from-cyan-500 to-teal-600',
  Conciertos: 'bg-gradient-to-br from-red-500 to-pink-600',
  Entretenimiento: 'bg-gradient-to-br from-indigo-500 to-violet-600'
};

const gradientClass = computed(() => {
  return gradientMap[props.title] || 'bg-gradient-to-br from-gray-400 to-gray-600';
});
</script>

<style>

</style>