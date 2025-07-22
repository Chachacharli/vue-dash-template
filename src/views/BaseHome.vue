<template>
  <section>
    <h1>Base Homes</h1>
    <DashSwipeContainer
      @swipeLeft="handleSwipeLeft"
      @swipeRight="handleSwipeRight"
      @swipeUp="handleSwipeUp"
      @swipeDown="handleSwipeDown"
      :threshold="100"
    >
      <template #default="{ deltaX, deltaY, progress }">
        <div class="bg-soft-dark-700 min-h-screen min-w-full text-white">
          <h2 class="font-bold">Hazme swipe !!</h2>
        </div>
      </template>
    </DashSwipeContainer>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DashButton from '@/components/buttons/DashButton.vue'
import { useSwipe } from '@/composables/useSwipe'
import DashSwipeContainer from '@/components/containers/DashSwipeContainer.vue'

const target = ref<HTMLElement | null>(null)

// Function to handle swipe left
const handleSwipeLeft = () => {
  console.log('Swiped left!')
}
// Function to handle swipe right
const handleSwipeRight = () => {
  console.log('Swiped right!')
}
// Function to handle swipe up
const handleSwipeUp = () => {
  console.log('Swiped up!')
}
// Function to handle swipe down
const handleSwipeDown = () => {
  console.log('Swiped down!')
}
</script>
