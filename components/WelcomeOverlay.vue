<template>
    <Transition name="fade">
      <div v-if="showWelcome" class="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div class="text-center max-w-md px-6">
          <div class="relative w-64 h-64 mx-auto mb-6">
            <img src="@/assets/illustrations/welcome-food.svg" alt="Welcome to Gofer" class="w-full h-full object-contain animate-float" />
            <div class="absolute -top-4 -right-4 animate-bounce-slow">
              <Utensils class="text-red-500" size="32" />
            </div>
            <div class="absolute -bottom-4 -left-4 animate-pulse">
              <Pizza class="text-orange-500" size="32" />
            </div>
          </div>
          
          <h1 class="text-3xl font-bold mb-3 text-gray-800">Welcome to <span class="text-red-500">Gofer</span></h1>
          <p class="text-gray-600 mb-8">Your favorite food, delivered fast to your door. Discover the best food vendors in FUNAAB.</p>
          
          <div class="relative">
            <div class="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="h-full bg-red-500 rounded-full transition-all duration-300"
                :style="{ width: `${loadingProgress}%` }"
              ></div>
            </div>
            <div class="mt-2 text-sm text-gray-500">{{ loadingMessage }}</div>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Utensils, Pizza } from 'lucide-vue-next';
  
  const showWelcome = ref(false);
  const loadingProgress = ref(0);
  const loadingMessage = ref('Preparing your delicious experience...');
  
  const loadingMessages = [
    'Preparing your delicious experience...',
    'Finding the best vendors...',
    'Heating up the oven...',
    'Gathering fresh ingredients...',
    'Almost ready to serve...'
  ];
  
  onMounted(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('eleste_has_visited');
    
    if (!hasVisited) {
      showWelcome.value = true;
      
      // Simulate loading progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        loadingProgress.value = currentProgress;
        
        // Update loading message
        if (currentProgress % 20 === 0) {
          const messageIndex = Math.floor(currentProgress / 20);
          if (messageIndex < loadingMessages.length) {
            loadingMessage.value = loadingMessages[messageIndex];
          }
        }
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            showWelcome.value = false;
            // Set flag in localStorage
            localStorage.setItem('eleste_has_visited', 'true');
          }, 500);
        }
      }, 100);
    }
  });
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 2s infinite;
  }
  </style>