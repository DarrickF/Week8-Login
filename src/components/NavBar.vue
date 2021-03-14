<template>
  <div class="navbar mb-2 shadow-lg bg-coolGray-600 text-content-100">
    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold text-orange-600"> LoginExample </span>
    </div>
    <div class="flex-none flex px-2 mx-2">
      <div class="flex">
        <router-link
          to="/"
          class="btn btn-ghost btn-sm rounded-btn hover:text-content-100 font-bold text-orange-600"
        >
          Home
        </router-link>
        <router-link
          v-if="!isAuthenticated"
          to="/login"
          class="btn btn-ghost btn-sm rounded-btn hover:text-content-100 font-bold text-orange-600"
        >
          Login
        </router-link>
        <div v-else>
          <router-link
            to="/secret"
            class="btn btn-ghost btn-sm rounded-btn hover:text-content-100 font-bold text-orange-600"
          >
            Secret Page
          </router-link>
          <button
            class="btn btn-error btn-sm rounded-btn hover:text-content-100 font-bold text-orange-100"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { isAuthenticated, signOut } from '../helpers/useAuth.js'
const router = useRouter()
const logout = async () => {
  await signOut()
  router.push('/')
}
</script>
