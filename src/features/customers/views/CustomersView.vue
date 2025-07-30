<template>
  <section>
    <CustomerList />
    <FlotatingButton :message="$t('createCustomer')" @click="handleClick" position="bottom-right" />
  </section>
</template>

<script setup lang="ts">
import FlotatingButton from '@/components/buttons/FlotatingButton.vue'
import CustomerList from '../components/CustomerList.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

function handleClick() {
  router.push({ name: 'customerCreate' })
}
</script>
