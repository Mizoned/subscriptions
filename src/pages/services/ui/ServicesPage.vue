<script setup lang="ts">
import { ref } from 'vue';

const services = ref([
  {
    name: 'МТС',
    img: 'mts.svg'
  },
  {
    name: 'Яндекс',
    img: 'yandex.svg'
  },
  {
    name: 'Вконтакте',
    img: 'vk.svg'
  },
  {
    name: 'Netflix',
    img: 'netflix.svg'
  },
  {
    name: 'Okko',
    img: 'okko.svg'
  }
]);
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="flex gap-2 justify-content-between">
          <h5>Сервисы</h5>
        </div>
        <Divider />
        <template v-for="service in services" :key="service.name">
          <div class="flex align-items-center gap-4">
            <div class="flex align-items-center justify-content-center flex-shrink-0">
              <img :src="'/img/services/' + service.img" :alt="service.name">
            </div>
            <div class="flex flex-1 gap-4 justify-content-between align-items-center">
              <div class="text-lg font-bold">{{ service.name }}</div>
              <Button label="Скоро" icon="pi pi-clock" disabled severity="contrast" />
            </div>
          </div>
          <Divider />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>