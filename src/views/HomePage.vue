<template>
  <div class="w-screen py-5 gap-10 flex justify-center items-center">
    <router-link to="/admin">Admin</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/contact">Contact</router-link>
  </div>
  <HomeContent />
</template>

<script setup>
import HomeContent from '@/components/HomeContent.vue'
</script>
