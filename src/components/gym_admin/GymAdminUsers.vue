<template>
  <div class="w-full h-full p-5 grid grid-rows-5 grid-cols-5 gap-5">
    <div
      class="col-span-2 row-span-1 shadow-xl border-2 rounded-lg flex flex-col justify-center items-center"
    >
      <h2 class="text-2xl font-semibold">Admin Panel</h2>
      <h2 class="text-md font-medium">{{ gym }}</h2>
      <h2 class="text-xl font-bold">Fit Record</h2>
    </div>
    <div
      class="col-span-3 row-span-1 px-6 shadow-xl border-2 rounded-lg flex flex-col justify-center items-start gap-3"
    >
      <h4 class="text-2xl font-semibold">Search User</h4>
      <input
        class="w-full border-2 p-3 rounded-md"
        type="text"
        placeholder="Search User"
        v-model="search"
      />
    </div>
    <div
      class="col-span-5 row-span-4 shadow-xl border-2 rounded-lg p-6 flex flex-col gap-6 justify-start overflow-y-auto"
    >
      <div v-for="(item, index) of usersShown" :key="index">
        <div
          v-if="!usersState[index]"
          class="w-full p-6 rounded-md border-2 hover:border-[#acacac] select-none"
        >
          <div class="flex justify-between">
            <div class="flex flex-col justify-center">
              <p class="text-2xl font-bold">{{ item['Name'] }}</p>
              <p class="text-lg">{{ item['Email'] }}</p>
            </div>
            <div
              @click="handleUserState(index)"
              class="border-2 p-6 rounded-md hover:cursor-pointer hover:border-[#acacac]"
            >
              Make Member
            </div>
          </div>
        </div>
        <div
          v-if="usersState[index]"
          class="w-full p-6 rounded-md border-2 hover:border-[#acacac] select-none"
        >
          <div class="flex justify-between">
            <div class="flex flex-col justify-center">
              <p class="text-2xl font-bold">{{ item['Name'] }}</p>
              <p class="text-lg">{{ item['Email'] }}</p>
            </div>
            <div
              @click="handleUserState(index)"
              class="border-2 p-6 rounded-md hover:cursor-pointer hover:border-[#ff7474]"
            >
              Cancel
            </div>
          </div>
          <div class="py-6 flex flex-col items-start">
            <label for="Expiry" class="font-bold">Set Expiry Date</label>
            <input
              id="Expiry"
              class="my-2 p-2 border-2 rounded-md"
              type="datetime-local"
              v-model="usersExpiry[index]"
            />
            <div
              @click="handleMakeMember(index)"
              class="border-2 p-4 text-white bg-[#66e362] rounded-md hover:border-[#66e362] hover:shadow-2xl hover:cursor-pointer"
            >
              OK
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BackendGymLink } from '@/Const.js'

const route = useRoute()
const router = useRouter()
const gym = ref(route.params.Gym)

const usersList = ref('')
const usersShown = ref('')
const usersState = ref('')
const usersExpiry = ref('')
const search = ref('')

const getUsersList = async () => {
  const GymLink = new BackendGymLink(route.params.Gym, 'dev')
  const url = GymLink.AdminUsersListLink()
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: document.cookie.split('=')[1] })
  }
  try {
    const response = await fetch(url, options)
    const result = await response.json()
    if (response.status != 200) {
      return router.push(`/gym/${route.params.Gym}/admin/login`)
    }
    usersList.value = result['data']
    usersShown.value = result['data']
    usersState.value = Array(result['data'].length).fill(false)
    usersExpiry.value = Array(result['data'].length).fill(0)
  } catch (error) {
    console.error(error)
  }
}

const handleSearchChange = () => {
  const lowercaseSearch = search.value.toLowerCase()
  const result = []
  for (let data of usersList.value) {
    if (
      data.Name.toLowerCase().includes(lowercaseSearch) ||
      data.Email.toLowerCase().includes(lowercaseSearch)
    ) {
      result.push(data)
    }
  }
  usersShown.value = result
}

const handleUserState = (index) => {
  if (usersState.value[index]) {
    usersExpiry.value[index] = 0
  }
  usersState.value[index] = !usersState.value[index]
}

const handleMakeMember = async (index) => {
  if (usersExpiry.value[index] === 0) {
    alert('Fill the Expiry Date')
    return
  }
  const GymLink = new BackendGymLink(route.params.Gym, 'dev')
  const url = GymLink.AdminMakeMemberLink()
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      expiry: usersExpiry.value[index],
      user: usersShown.value[index],
      token: document.cookie.split('=')[1]
    })
  }

  try {
    const response = await fetch(url, options)
    const result = await response.json()
    window.confirm(result['message'])

    usersState.value = Array(usersState.value.length).fill(false)
    usersExpiry.value = Array(usersExpiry.value.length).fill(0)
  } catch (error) {
    console.error(error)
  }
}

watch(search, handleSearchChange)

onMounted(() => {
  getUsersList()
})
</script>
