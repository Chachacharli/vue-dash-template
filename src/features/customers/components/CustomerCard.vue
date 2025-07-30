<template>
  <article class="group cursor-pointer" @click="handlerRedirect">
    <DashCard type="simple-card" class="group-hover:bg-gray-50 dark:group-hover:bg-dark-700">
      <template #header>
        <div class="flex items-center justify-between flex-row-reverse">
          <h2 class="text-lg font-semibold">
            {{ props.name }}
          </h2>
          <div>
            <img class="max-w-24" :src="props.avatarURL" alt="" />
          </div>
        </div>
      </template>

      <template #footer>
        <div role="group" class="flex items-end justify-end mt-2">
          <button>
            <vue-feather
              type="arrow-right"
              class="w-5 h-5 text-gray-500 dark:text-white transition-transform group-hover:scale-110 group-hover:text-gray-700 dark:group-hover:text-gray-300"
            />
          </button>
        </div>
      </template>
    </DashCard>
  </article>
</template>

<script setup lang="ts">
import DashCard from '@/components/cards/DashCard.vue'
import { useRouter, useRoute } from 'vue-router'
import type { Customers } from '@/types/customers/customers'

const props = defineProps<Customers>()
const router = useRouter()
const route = useRoute()

const handlerRedirect = () => {
  router.push({ name: 'customer', params: { id: props.id, name: props.name } })
}
</script>
