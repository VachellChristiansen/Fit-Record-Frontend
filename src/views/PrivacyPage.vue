<template>
  <div class="overflow-x-hidden">
    <div class="w-screen py-5 gap-10 flex justify-center items-center">
      <router-link to="/admin">Admin</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/privacy" class="border-b-2 border-black">Privacy Policy</router-link>
    </div>
    <PrivacyContent />
  </div>
</template>

<script setup>
import PrivacyContent from '@/components/PrivacyContent.vue'
</script>
