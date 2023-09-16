<template>
  <div class="overflow-x-hidden">
    <div class="w-screen py-5 gap-10 flex justify-center items-center">
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/privacy">Privacy Policy</router-link>
      <router-link to="/Terms" class="border-b-2 border-black">Terms & Conditions</router-link>
    </div>
    <TermsContent />
  </div>
</template>

<script setup>
import TermsContent from '@/components/TermsContent.vue'
</script>
