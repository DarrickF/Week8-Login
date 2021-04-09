<template>
  <section
    class="container flex item-center justify-center text-center bg-blueGray-500 rounded-xl mx-auto mt-24 max-w-md"
  >
    <form @submit.prevent class="flex flex-col w-full p-12 rounded shadow-lg">
      <!---SignUp---->

      <label
        v-if="form == 'signup'"
        for="name"
        class="self-start text-xs font-semibold text-content-200"
        >Name</label
      >
      <input
        v-if="form == 'signup'"
        id="name"
        type="text"
        class="flex items-center h-12 px-4 mt-2 bg-gray-300 rounded focus:outline-none focus:ring-2"
        v-model="name"
      />
      <p class="text-transform: capitalize test-sm text-teal-400 text-left">
        {{ nameError }}
      </p>

      <!------SignIn------>

      <label
        for="username"
        class="self-start mt-3 text-xs font-semibold text-content-200"
        >Email</label
      >
      {{ email }}
      <input
        id="username"
        type="text"
        class="flex items-center h-12 px-4 mt-2 bg-gray-300 rounded focus:outline-none focus:ring-2"
        v-model="email"
      />
      <p class="text-transform: capitalize test-sm text-teal-400 text-left">
        {{ errorEmail }}
      </p>

      <!------Password------->

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
      <p class="text-transform: capitalize test-sm text-teal-400 text-left">
        {{ passwordError }}
      </p>

      <!----Password Validation----->
      <label
        v-if="form == 'signup'"
        for="passwordConfirmation"
        class="self-start mt-3 text-xs font-semibold text-content-200"
        >Confirm Password</label
      >
      <input
        v-if="form == 'signup'"
        id="passwordConfirmation"
        type="password"
        class="flex items-center h-12 px-4 mt-2 bg-gray-300 rounded focus:outline-none focus:ring-2"
        v-model="passwordConfirmation"
      />
      <p class="text-transform: capitalize test-sm text-teal-400 text-left">
        {{ passwordConfirmationError }}
      </p>

      <!------Buttons------>

      <button
        v-if="form == 'login'"
        @click="login"
        class="btn btn-primary mt-4 bg-violet-800 hover:bg-violet-900"
      >
        Login
      </button>
      <button
        v-else
        @click="register"
        class="btn btn-primary mt-4 bg-violet-800 hover:bg-violet-900"
      >
        SignUp
      </button>
      <button @click="google" class="btn btn-primary-content mt-8">
        <img class="w-8" src="../assets/google.svg" alt="Google Logo" />
      </button>
    </form>
  </section>
</template>

<!------Imports------->

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import * as yup from 'yup'
import { signIn, signUp, googlePopup, auth } from '../helpers/useAuth'
import { isError, msg } from '../helpers/useError.js'

const router = useRouter()

//////////////////Login Function//////////////////
const login = async () => {
  try {
    if (emailMeta.valid && passwordMeta.valid) {
      await signIn(email.value, password.value)
      isError.value = false
      router.push('/')
    } else {
      isError.value = true
      msg.value = 'Invalid Values'
    }
  } catch (error) {
    isError.value = true
    msg.value = 'There was an Authentication Error'
    console.log(error)
  }
}

////////////////////Register Function//////////////////
const register = async () => {
  try {
    if (nameMeta.valid && emailMeta.valid && passwordMeta.valid) {
      await signUp(email.value, password.value)
      const user = auth().currentUser
      await user.updateProfile({ displayName: name.value })

      isError.value = false
      router.push('/')
    } else {
      isError.value = true
      msg.value = 'Invalid Values'
    }
  } catch (error) {
    console.log(error)
  }
}

/////////////Google Auth Function////////////////
const google = async () => {
  try {
    await googlePopup()
    isError.value = false

    router.push('/')
  } catch (error) {
    console.log(error)
  }
}

/////////////Field Validation///////////////
const { value: email, errorMessage: errorEmail, meta: emailMeta } = useField(
  'email',
  yup.string().required().email()
)
const {
  value: password,
  errorMessage: passwordError,
  meta: passwordMeta,
} = useField('password', yup.string().required().min(8))

const passwordConfirmationFn = () => {
  return password.value == passwordConfirmation.value
  return true
}

const {
  value: passwordConfirmation,
  errorMessage: passwordConfirmationError,
  meta: passwordConfirmationMeta,
} = useField('passwordConfirmation', passwordConfirmationFn)

const { value: name, errorMessage: nameError, meta: nameMeta } = useField(
  'name',
  yup.string().required()
)

defineProps({
  form: {
    type: String,
    default: 'Login',
  },
})
</script>
