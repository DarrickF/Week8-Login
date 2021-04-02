<template>
  <section
    class="container flex item-center justify-center text-center bg-blueGray-500 rounded-xl mx-auto mt-24 max-w-md"
  >
    <form @submit.prevent class="flex flex-col w-full p-12 rounded shadow-lg">
      <label
        for="username"
        class="self-start text-xs font-semibold text-content-200"
        >Email</label
      >
      <input
        id="username"
        type="text"
        class="flex items-center h-12 px-4 mt-2 bg-gray-300 rounded focus:outline-none focus:ring-2"
        v-model="email"
      />
      <label
        for="password"
        class="self-start mt-3 text-xs font-semibold text-content-200"
        >Password</label
      >
      <input
        id="password"
        type="password"
        class="flex items-center h-12 px-4 mt-2 bg-gray-300 rounded focus:outline-none focus:ring-2"
        v-model="password"
      />
      <button
        @click="login"
        class="btn btn-primary mt-4 bg-violet-800 hover:bg-violet-900"
      >
        Register
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signUp } from '../helpers/useAuth'
const router = useRouter()
const login = async () => {
  try {
    await signUp(email.value, password.value)
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
const email = ref('')
const password = ref('')
</script>
