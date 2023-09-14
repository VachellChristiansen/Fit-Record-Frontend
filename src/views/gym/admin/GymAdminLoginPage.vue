<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="w-3/4 sm:w-1/2 lg:w-1/3 shadow-2xl rounded-lg border-2">
      <div class="w-full h-full p-5 flex flex-col items-center">
        <h2 class="text-3xl text-slate-600 font-bold">Admin</h2>
        <div class="flex items-center w-full mt-10 mb-5 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <input
            class="w-full p-3 border-2 rounded-md"
            type="text"
            placeholder="Username"
            v-model="usernameValue"
          />
        </div>
        <div class="flex items-center w-full mb-10 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
            />
          </svg>
          <input
            class="w-full p-3 border-2 rounded-md"
            type="password"
            placeholder="Password"
            v-model="passwordValue"
          />
        </div>
        <button
          class="w-1/2 shadow-xl border-2 rounded-md p-3 hover:brightness-50"
          @click="handleAdminLogin"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BackendGymLink } from '@/Const.js'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import router from '@/router/index.js'
const route = useRoute()
const usernameValue = ref('')
const passwordValue = ref('')

const handleAdminLogin = async () => {
  const GymLink = new BackendGymLink(route.params.Gym, 'dev')
  const url = GymLink.AdminLoginLink()
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: usernameValue.value, password: passwordValue.value }),
    credentials: 'include'
  }
  try {
    const response = await fetch(url, options)
    const result = await response.json()
    if (result.indicator == 'LoginSuccess') {
      return router.push('../admin')
    }
    if (result.indicator == 'InvalidPassword') {
      alert('Wrong Password')
    }
    if (result.indicator == 'InvalidUsername') {
      alert('Username is not valid')
    }
    usernameValue.value = ''
    passwordValue.value = ''
  } catch (error) {
    console.error(error)
  }
}
</script>
