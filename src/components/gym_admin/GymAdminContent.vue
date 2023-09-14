/* eslint-disable */
<template>
  <div v-if="props.activeView === 'Home'" class="w-full h-full">
    <GymAdminUsers />
  </div>
  <div v-if="props.activeView === 'Members'" class="w-full h-full">
    <GymAdminMembers />
  </div>
  <div v-if="props.activeView === 'Workouts'" class="w-full h-full">
    <GymAdminWorkouts />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['activeView'])

import GymAdminUsers from './GymAdminUsers.vue'
import GymAdminMembers from './GymAdminMembers.vue'
import GymAdminWorkouts from './GymAdminWorkouts.vue'
</script>
