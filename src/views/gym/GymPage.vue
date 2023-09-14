<template>
  <div class="w-full flex justify-center items-center">
    <h1 class="text-2xl font-bold">{{ Gym }} Gym</h1>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const Gym = route.params.Gym
</script>
