<template>
  <section>
    <h1>Base Homes</h1>
    <div ref="target" class="w-full h-64 bg-soft-dark-700 flex items-center justify-center">
      <div>
        <p>deltaX: {{ deltaX }}</p>
        <p>deltaY: {{ deltaY }}</p>
        <p>direction: {{ direction }}</p>
        <p>progress: {{ progress }}</p>
      </div>
    </div>
  </section>
  <input @change="" type="text">
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDrag } from '@/composables/useDrag'

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

const { deltaX, deltaY, direction, progress } = useDrag(target, {
  onDragLeft: handleSwipeLeft,
  onDragRight: handleSwipeRight,
  onDragUp: handleSwipeUp,
  onDragDown: handleSwipeDown,
})

</script>
