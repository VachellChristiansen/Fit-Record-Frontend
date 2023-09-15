<template>
  <div class="overflow-x-hidden">
    <div class="w-screen py-5 gap-10 flex justify-center">
      <router-link to="/admin">Admin</router-link>
      <router-link to="/about" class="border-b-2 border-black">About</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/privacy">Privacy Policy</router-link>
    </div>
    <AboutContent />
  </div>
</template>

<script setup>
import AboutContent from '@/components/AboutContent.vue'
</script>
