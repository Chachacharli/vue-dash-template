<template>
  <main
    class="min-h-screen flex flex-col items-center justify-center md:items-stretch md:justify-start md:flex-row bg-gradient-to-br from-purple-400 to-purple-600"
  >
    <!-- Lado izquierdo (decorativo con animación) -->
    <section class="hidden md:flex w-1/2 items-center justify-center p-12 text-white relative overflow-hidden">
      <div class="absolute inset-0 z-0 animated-gradient-bg"></div>
      <div class="z-10 max-w-md text-center animate-fade-in">
        <h1 class="text-4xl font-bold mb-4">{{ $t('loginPage.welcomeMessage') }}</h1>
        <p class="text-lg">{{ $t('loginPage.canSingIn') }}</p>
      </div>
    </section>

    <!-- Lado derecho (formulario) -->
    <section class="flex w-80 md:w-1/2 items-center justify-center p-6 bg-white rounded-3xl md:rounded-none min-h-48 md:min-h-0">
      <div class="md:w-full md:max-w-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
          {{ $t('loginPage.title') }}
        </h2>
        <section name="form-login" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-600">{{ $t('loginPage.usernameOrEmail') }}</label>
            <input
              type="text"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Username or email"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-600">{{ $t('loginPage.password') }}</label>
            <input
              type="password"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Password"
            />
          </div>

          <div class="flex justify-between items-center text-sm text-gray-600">
            <label class="inline-flex items-center">
              <input type="checkbox" class="form-checkbox text-purple-600" />
              <span class="ml-2">{{ $t('loginPage.rememberMe') }}</span>
            </label>
            <a href="#" class="text-purple-600 hover:underline">{{ $t('loginPage.forgotPassword') }}</a>
          </div>

          <button
            class="w-full cursor-pointer py-2 px-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-md hover:opacity-90 transition"
            @click="$router.push({ name: 'home' })"
          >
            {{ $t('loginPage.title') }}
          </button>
        </section>
      </div>
    </section>
  </main>
</template>

<style scoped>


.animated-gradient-bg {
  background: linear-gradient(-45deg, #a855f7, #7e22ce, #6d28d9, #8b5cf6);
  background-size: 400% 400%;
  animation: gradientShift 10s ease infinite;
}


.animate-fade-in {
  animation: fadeInUp 1000ms ease-out forwards;
}

</style>

<script setup lang="ts">
</script>
