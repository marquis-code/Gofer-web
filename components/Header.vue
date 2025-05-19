<template>
    <header class="sticky top-0 z-50 bg-white shadow-sm py-3 px-4">
      <div class="container mx-auto flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <img src="@/assets/img/Gofer-logo-coloured.png" alt="eleste" class="h-8 mr-6" />
          
          <!-- Location Selector -->
          <div class="hidden md:flex items-center space-x-2 cursor-pointer">
            <MapPin class="text-red-500" size="20" />
            <div>
              <p class="text-xs text-gray-500">Select Locations</p>
              <div class="flex items-center">
                <span class="font-medium">FUNAAB</span>
                <ChevronDown size="20" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Search Bar -->
        <div class="relative hidden md:block w-1/3">
          <div class="relative">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search food or vendor" 
              class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              @focus="isSearchFocused = true"
              @blur="handleSearchBlur"
            />
            <Search 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              :class="{'text-red-500 animate-pulse': isSearching}"
              size="20" 
            />
          </div>
          
          <!-- Search Results Dropdown -->
          <div 
            v-if="isSearchFocused && searchQuery" 
            class="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
          >
            <div v-if="filteredVendors.length > 0">
              <div class="p-3 border-b border-gray-100">
                <h3 class="font-medium text-gray-700">Search Results</h3>
              </div>
              <div v-for="vendor in filteredVendors" :key="vendor.id" class="p-3 hover:bg-gray-50 cursor-pointer flex items-center">
                <img :src="vendor.image" :alt="vendor.name" class="w-12 h-12 rounded-md object-cover mr-3" />
                <div>
                  <p class="font-medium">{{ vendor.name }}</p>
                  <p class="text-sm text-gray-500">{{ vendor.description }}</p>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="p-4 text-center">
                <img src="/illustrations/no-results.svg" alt="No results" class="w-32 h-32 mx-auto mb-3 animate-bounce" />
                <p class="text-gray-500 mb-4">No results found for "{{ searchQuery }}"</p>
                <h3 class="font-medium text-lg mb-3">You may also like</h3>
                <div class="grid grid-cols-2 gap-3">
                  <div v-for="vendor in suggestedVendors" :key="vendor.id" class="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <img :src="vendor.image" :alt="vendor.name" class="w-full h-24 object-cover rounded-md mb-2" />
                    <p class="font-medium text-sm">{{ vendor.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- User Profile & Cart -->
        <div class="flex items-center space-x-4">
          <div class="hidden md:flex items-center cursor-pointer">
            <img src="@/assets/img/meal.jpg" alt="User" class="w-8 h-8 rounded-full mr-2" />
            <div class="flex items-center">
              <span class="font-medium">Hi abah marquis</span>
              <ChevronDown size="20" />
            </div>
          </div>
          <div class="flex items-center cursor-pointer">
            <ShoppingCart size="24" />
            <span class="ml-1">Cart</span>
          </div>
          <!-- Mobile Menu Button -->
          <button class="md:hidden">
            <Menu size="24" />
          </button>
        </div>
      </div>
      
      <!-- Mobile Search Bar -->
      <div class="mt-3 px-4 md:hidden">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search food or vendor" 
            class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            @focus="isSearchFocused = true"
            @blur="handleSearchBlur"
          />
          <Search 
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            :class="{'text-red-500 animate-pulse': isSearching}"
            size="20" 
          />
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { MapPin, Search, ChevronDown, ShoppingCart, Menu } from 'lucide-vue-next';
  import { useVendors } from '~/composables/useVendors';
  
  const { vendors } = useVendors();
  const searchQuery = ref('');
  const isSearchFocused = ref(false);
  const isSearching = ref(false);
  
  // Simulate search delay
  watch(searchQuery, () => {
    if (searchQuery.value) {
      isSearching.value = true;
      setTimeout(() => {
        isSearching.value = false;
      }, 800);
    }
  });
  
  const filteredVendors = computed(() => {
    if (!searchQuery.value) return [];
    return vendors.value.filter(vendor => 
      vendor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    ).slice(0, 5);
  });
  
  const suggestedVendors = computed(() => {
    return vendors.value.filter(vendor => vendor.promoted).slice(0, 4);
  });
  
  const handleSearchBlur = () => {
    // Small delay to allow clicking on search results
    setTimeout(() => {
      isSearchFocused.value = false;
    }, 200);
  };
  </script>