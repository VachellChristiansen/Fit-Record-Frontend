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
      <h4 class="text-2xl font-semibold">Search Members</h4>
      <input
        class="w-full border-2 p-3 rounded-md"
        type="text"
        placeholder="Search Members"
        v-model="search"
      />
    </div>
    <div
      class="col-span-5 row-span-4 shadow-xl border-2 rounded-lg p-6 flex flex-col gap-6 justify-start overflow-y-auto"
    >
      <div v-for="(item, index) of membersShown" :key="index">
        <div
          v-if="!membersState[index]"
          class="w-full p-6 rounded-md border-2 hover:border-[#acacac] select-none"
        >
          <div class="flex justify-between">
            <div class="flex flex-col justify-center">
              <p class="text-2xl font-bold">{{ item['Name'] }}</p>
              <p class="text-lg">{{ item['Email'] }}</p>
            </div>
            <div class="flex gap-5">
              <div
                @click="handleMembersState(index)"
                class="border-2 p-6 rounded-md hover:cursor-pointer flex justify-center items-center hover:border-[#acacac]"
              >
                Edit Membership
              </div>
              <div class="border-2 p-6 rounded-md hover:cursor-default">
                <p>
                  Expired At: {{ new Date(item['Expired']._seconds * 1000).getDate() }} -
                  {{ new Date(item['Expired']._seconds * 1000).getMonth() + 1 }} -
                  {{ new Date(item['Expired']._seconds * 1000).getFullYear() }}
                </p>
                <p>
                  {{
                    Math.ceil(
                      (new Date(item['Expired']._seconds * 1000).setHours(0, 0, 0, 0) -
                        new Date().setHours(0, 0, 0, 0)) /
                        (24 * 60 * 60 * 1000)
                    )
                  }}
                  Days Left
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="membersState[index]"
          class="w-full p-6 rounded-md border-2 hover:border-[#acacac] select-none"
        >
          <div class="flex justify-between">
            <div class="flex flex-col justify-center">
              <p class="text-2xl font-bold">{{ item['Name'] }}</p>
              <p class="text-lg">{{ item['Email'] }}</p>
            </div>
            <div class="flex gap-5">
              <div
                @click="handleMembersState(index)"
                class="border-2 p-6 rounded-md hover:cursor-pointer flex justify-center items-center hover:border-[#ff7474]"
              >
                Cancel
              </div>
              <div class="border-2 p-6 rounded-md hover:cursor-default">
                <p>
                  Expired At: {{ new Date(item['Expired']._seconds * 1000).getDate() }} -
                  {{ new Date(item['Expired']._seconds * 1000).getMonth() + 1 }} -
                  {{ new Date(item['Expired']._seconds * 1000).getFullYear() }}
                </p>
                <p>
                  {{
                    Math.ceil(
                      (new Date(item['Expired']._seconds * 1000).setHours(0, 0, 0, 0) -
                        new Date().setHours(0, 0, 0, 0)) /
                        (24 * 60 * 60 * 1000)
                    )
                  }}
                  Days Left
                </p>
              </div>
            </div>
          </div>
          <div class="py-6 flex flex-col items-start">
            <label for="Expiry" class="font-bold">Set Expiry Date</label>
            <input
              id="Expiry"
              class="my-2 p-2 border-2 rounded-md"
              type="datetime-local"
              v-model="membersExpiry[index]"
            />
            <div class="flex gap-5">
              <div
                @click="handleEditMember(index)"
                class="border-2 p-4 text-white bg-[#66e362] rounded-md hover:border-[#66e362] hover:shadow-2xl hover:cursor-pointer"
              >
                OK
              </div>
              <div
                @click="handleRemoveMember(index)"
                class="border-2 p-4 text-white bg-[#ff7474] rounded-md hover:border-[#ff7474] hover:shadow-2xl hover:cursor-pointer"
              >
                Remove Membership
              </div>
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

const membersList = ref('')
const membersShown = ref('')
const membersState = ref('')
const membersExpiry = ref('')
const search = ref('')

const getMembersList = async () => {
  const GymLink = new BackendGymLink(route.params.Gym)
  const url = GymLink.AdminMembersListLink()
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
    membersList.value = result['data']
    membersShown.value = result['data']
    membersState.value = Array(result['data'].length).fill(false)
    membersExpiry.value = Array(result['data'].length).fill(0)
  } catch (error) {
    console.error(error)
  }
}

const handleSearchChange = () => {
  const lowercaseSearch = search.value.toLowerCase()
  const result = []
  for (let data of membersList.value) {
    if (
      data.Name.toLowerCase().includes(lowercaseSearch) ||
      data.Email.toLowerCase().includes(lowercaseSearch)
    ) {
      result.push(data)
    }
  }
  membersShown.value = result
}

const handleMembersState = (index) => {
  membersState.value[index] = !membersState.value[index]
}

const handleEditMember = async (index) => {
  if (membersExpiry.value[index] === 0) {
    alert('Fill the Expiry Date')
    return
  }
  const GymLink = new BackendGymLink(route.params.Gym)
  const url = GymLink.AdminEditMemberLink()
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      expiry: membersExpiry.value[index],
      user: membersShown.value[index],
      token: document.cookie.split('=')[1]
    })
  }
  try {
    const response = await fetch(url, options)
    const result = await response.json()
    window.confirm(result['message'])
    getMembersList()
  } catch (error) {
    console.error(error)
  }
}

const handleRemoveMember = async (index) => {
  window.confirm(
    `Are you sure you want to remove ${membersShown.value[index]['Name']}'s Membership?`
  )

  const GymLink = new BackendGymLink(route.params.Gym)
  const url = GymLink.AdminRemoveMemberLink(membersShown.value[index]['Email'])
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: document.cookie.split('=')[1] })
  }
  try {
    const response = await fetch(url, options)
    const result = await response.json()
    window.confirm(result['message'])
    getMembersList()
  } catch (error) {
    console.error(error)
  }
}

watch(search, handleSearchChange)

onMounted(() => {
  getMembersList()
})
</script>
