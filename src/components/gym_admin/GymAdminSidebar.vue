/* eslint-disable */
<template>
  <div
    class="w-1/5 h-full shadow-2xl rounded-e-2xl p-6 flex flex-col gap-10 justify-start items-center"
  >
    <div class="w-full flex justify-center">
      <img src="@/assets/App_Icon.png" alt="FitRecord" />
    </div>
    <div
      v-if="!(viewProps.activeView === 'Home')"
      @click="selectItem('Home')"
      class="w-full h-10 py-8 rounded-xl flex justify-center items-center font-semibold select-none border-2 hover:cursor-pointer hover:border-[#acacac] hover:shadow-2xl active:shadow-none"
    >
      <p>Home</p>
    </div>
    <div
      v-if="viewProps.activeView === 'Home'"
      @click="selectItem('Home')"
      class="w-full h-10 py-8 rounded-xl flex justify-center items-center font-semibold select-none border-2 border-[#acacac] bg-slate-200 hover:cursor-pointer hover:shadow-2xl active:shadow-none"
    >
      <p>Home</p>
    </div>
    <div
      v-if="!(viewProps.activeView === 'Members')"
      @click="selectItem('Members')"
      class="w-full h-10 py-8 rounded-xl flex justify-center items-center font-semibold select-none border-2 hover:cursor-pointer hover:border-[#acacac] hover:shadow-2xl active:shadow-none"
    >
      <p>Members</p>
    </div>
    <div
      v-if="viewProps.activeView === 'Members'"
      @click="selectItem('Members')"
      class="w-full h-10 py-8 rounded-xl flex justify-center items-center font-semibold select-none border-2 border-[#acacac] bg-slate-200 hover:cursor-pointer hover:shadow-2xl active:shadow-none"
    >
      <p>Members</p>
    </div>
    <div
      v-if="!(viewProps.activeView === 'Workouts')"
      @click="selectItem('Workouts')"
      class="w-full h-10 py-8 rounded-xl flex justify-center items-center font-semibold select-none border-2 hover:cursor-pointer hover:border-[#acacac] hover:shadow-2xl active:shadow-none"
    >
      <p>Workouts</p>
    </div>
    <div
      v-if="viewProps.activeView === 'Workouts'"
      @click="selectItem('Workouts')"
      class="w-full h-10 py-8 rounded-xl flex justify-center items-center font-semibold select-none border-2 border-[#acacac] bg-slate-200 hover:cursor-pointer hover:shadow-2xl active:shadow-none"
    >
      <p>Workouts</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const viewProps = defineProps(['activeView', 'setActiveView'])

const selectItem = (navItem) => {
  viewProps.setActiveView(navItem)
}
</script>
