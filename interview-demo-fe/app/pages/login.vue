<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p class="text-gray-600">Please sign in to your account</p>
      </div>

      <div class="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="Enter your email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Enter your password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div v-if="error" class="text-red-600 text-sm font-medium mt-1">
            {{ error }}
          </div>

          <div>
            <button
                type="submit"
                :disabled="loading"
                class="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:transform active:scale-95"
            >
              <span v-if="loading">Signing in...</span>
              <span v-else>Sign In</span>
            </button>
          </div>
        </form>

        <div class="mt-6 text-center">
          <a href="#" class="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
            Forgot your password?
          </a>
        </div>
      </div>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <a href="#" class="font-medium text-green-600 hover:text-green-700 transition-colors duration-200">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const login = async () => {
  if (loading.value) return

  loading.value = true
  error.value = ''

  try {
    const res = await $fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { email: email.value, password: password.value }
    })

    const token = useCookie('auth_token')
    token.value = res.token

    await navigateTo('/')
  } catch (err: any) {
    console.error('Login failed', err)
    error.value = err.data?.message || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>
