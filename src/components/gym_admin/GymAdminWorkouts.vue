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
      <h4 class="text-2xl font-semibold">Search Workout</h4>
      <input
        class="w-full border-2 p-3 rounded-md"
        type="text"
        placeholder="Search Workout"
        v-model="search"
      />
    </div>
    <div
      class="col-span-5 row-span-4 shadow-xl border-2 rounded-lg p-6 flex flex-col gap-6 justify-start overflow-y-auto"
    >
      <div v-for="(item, index) of workoutsShown" :key="index">
        <div class="w-full p-6 rounded-md border-2 hover:border-[#acacac] select-none">
          <div class="flex justify-between">
            <div class="flex flex-col justify-center">
              <p class="text-2xl font-bold">{{ item['Name'] }}</p>
            </div>
            <div
              v-if="!workoutsState[`${item.Type}_${item.Id}`]"
              @click="handleAddWorkout(`${item.Type}_${item.Id}`)"
              class="border-2 p-6 rounded-md hover:cursor-pointer hover:border-[#acacac]"
            >
              Add Workout
            </div>
            <div
              v-if="workoutsState[`${item.Type}_${item.Id}`]"
              @click="handleDeleteWorkout(`${item.Type}_${item.Id}`)"
              class="border-2 p-6 rounded-md hover:cursor-pointer hover:border-[#acacac]"
            >
              Delete Workout
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
import { BackendDataLink, BackendGymLink } from '@/Const.js'

const route = useRoute()
const router = useRouter()
const gym = ref(route.params.Gym)

const workoutsList = ref('')
const workoutsShown = ref('')
const workoutsState = ref('')
const search = ref('')

const getWorkoutsList = async () => {
  const DataLink = new BackendDataLink('production')
  const dataUrl = DataLink.DataWorkoutsLink()
  const dataOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const GymLink = new BackendGymLink(route.params.Gym, 'production')
  const gymUrl = GymLink.AdminWorkoutsListLink()
  const gymOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: document.cookie.split('=')[1] })
  }

  try {
    const dataResponse = await fetch(dataUrl, dataOptions)
    const gymResponse = await fetch(gymUrl, gymOptions)
    if (dataResponse.status != 200 || gymResponse.status != 200) {
      return router.push(`/gym/${route.params.Gym}/admin/login`)
    }
    const gymResult = await gymResponse.json()
    const dataResult = await dataResponse.json()

    workoutsList.value = dataResult['data']
    workoutsShown.value = dataResult['data']

    const dataId = dataResult.dataid

    for (let data in gymResult.data) {
      dataId[gymResult.data[data]] = true
    }

    workoutsState.value = dataId
    handleSearchChange()
  } catch (error) {
    console.error(error)
  }
}

const handleSearchChange = () => {
  const lowercaseSearch = search.value.toLowerCase()
  const result = []
  for (let data of workoutsList.value) {
    if (data.Name.toLowerCase().includes(lowercaseSearch)) {
      result.push(data)
    }
  }
  workoutsShown.value = result
}

const handleAddWorkout = async (id) => {
  const Link = new BackendGymLink(route.params.Gym, 'production')
  const url = Link.AdminAddWorkoutLink()
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: document.cookie.split('=')[1],
      id: id
    })
  }
  try {
    const response = await fetch(url, options)
    if (response.status != 200) {
      return router.push(`/gym/${route.params.Gym}/admin/login`)
    }
    const result = await response.json()
    console.log(result.message)
    getWorkoutsList()
  } catch (error) {
    console.error(error)
  }
}

const handleDeleteWorkout = async (id) => {
  const Link = new BackendGymLink(route.params.Gym, 'production')
  const url = Link.AdminRemoveWorkoutLink(id)
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: document.cookie.split('=')[1]
    })
  }
  try {
    const response = await fetch(url, options)
    if (response.status != 200) {
      return router.push(`/gym/${route.params.Gym}/admin/login`)
    }
    const result = await response.json()
    console.log(result.message)
    getWorkoutsList()
  } catch (error) {
    console.error(error)
  }
}

watch(search, handleSearchChange)

onMounted(() => {
  getWorkoutsList()
})
</script>
