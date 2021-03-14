<template>
  <div class="mt-8">
    <p class="text-3xl mx-auto text-center m-8 tracking-wider font-thin">
      Welcome {{ user?.email || 'New User' }}
    </p>
  </div>
</template>

<script setup>
import { user } from '../helpers/useAuth'
</script>
