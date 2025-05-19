<template>
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm py-4">
        <div class="container mx-auto px-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center">
            <!-- <img src="/images/Gofer-logo.svg" alt="Gofer Logo" class="h-10" /> -->
          </NuxtLink>
          
          <div class="flex items-center space-x-4">
            <div class="relative hidden md:block">
              <div class="flex items-center border rounded-md px-3 py-2 bg-gray-50">
                <MapPin class="h-5 w-5 text-gray-500 mr-2" />
                <span class="text-gray-700">Select Locations</span>
                <ChevronDown class="h-4 w-4 text-gray-500 ml-2" />
              </div>
            </div>
            
            <div class="relative hidden md:block flex-1 mx-4">
              <div class="flex items-center border rounded-md px-3 py-2 bg-gray-50">
                <Search class="h-5 w-5 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search food or vendor" 
                  class="bg-transparent outline-none w-full"
                />
              </div>
            </div>
            
            <NuxtLink to="/login" class="flex items-center text-gray-700 hover:text-primary transition-colors">
              <User class="h-5 w-5 mr-1" />
              <span>Sign in</span>
            </NuxtLink>
            
            <NuxtLink to="/cart" class="flex items-center text-gray-700 hover:text-primary transition-colors">
              <ShoppingCart class="h-5 w-5 mr-1" />
              <span>Cart</span>
            </NuxtLink>
          </div>
        </div>
      </header>
      
      <!-- Main Content -->
      <main class="flex-1">
        <slot />
      </main>
      
      <!-- Footer -->
      <footer class="py-4 text-center text-sm text-gray-500">
        <div class="container mx-auto px-4">
          <div class="flex justify-center space-x-6 mb-2">
            <NuxtLink to="/cthostel" class="hover:text-primary transition-colors">CTHostel</NuxtLink>
            <NuxtLink to="/invest" class="hover:text-primary transition-colors">Invest</NuxtLink>
            <NuxtLink to="/partner" class="hover:text-primary transition-colors">Partner</NuxtLink>
          </div>
          <p>© {{ new Date().getFullYear() }} Gofer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  import { MapPin, ChevronDown, Search, User, ShoppingCart } from 'lucide-vue-next';
  </script>
  
  <style scoped>
  .text-primary {
    color: #a02724;
  }
  </style>