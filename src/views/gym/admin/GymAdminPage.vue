<template>
  <div class="w-screen h-screen overflow-hidden flex gap-5">
    <GymAdminSidebar :activeView="activeView" :setActiveView="setActiveView"></GymAdminSidebar>
    <GymAdminContent :activeView="activeView"></GymAdminContent>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GymAdminContent from '@/components/gym_admin/GymAdminContent.vue'
import GymAdminSidebar from '@/components/gym_admin/GymAdminSidebar.vue'

document.title = 'Fit Record - Gym Admin'

const activeView = ref('Home')

const setActiveView = (newView) => {
  activeView.value = newView
}
</script>
