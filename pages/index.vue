<!-- <template>
  <div class="min-h-screen overflow-hidden bg-white">
    <WelcomeOverlay />
    <div class="relative z-10 min-h-screen flex flex-col">

      <header class="py-6 px-6 md:px-10 bg-white shadow-sm">
        <div class="container mx-auto flex justify-between items-center">
          <div class="flex items-center">
            <img src="@/assets/img/Gofer-logo-coloured.png" alt="Gofer" class="h-10 animate-bounce-subtle" />
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/login" class="text-gray-700 hover:text-primary transition-colors">
              Already have an account?
            </NuxtLink>
          </div>
        </div>
      </header>

      <div class="container mx-auto px-4 pb-10">
      <FoodBannerCarousel />
     </div>


      <main class="container mx-auto px-4 pb-10">
      <VendorsInFunaab />
    </main>
      
      <div class="py-8 px-6 bg-gray-50">
        <div class="container mx-auto">
          <div class="max-w-4xl mx-auto overflow-hidden">
            <div class="animate-marquee whitespace-nowrap">
              <div v-for="i in 5" :key="i" class="inline-block mx-4 px-6 py-4 bg-white rounded-lg shadow-md">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path></svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-gray-600 text-sm">"The food arrived hot and fresh. Great service!"</p>
                    <p class="text-gray-800 font-medium text-sm mt-1">Student, {{ ['FUTA', 'OAU', 'UI', 'UNILAG', 'UNIBEN'][i-1] }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchVendors } from '@/composables/modules/vendor/useFetchVendors'
import { ArrowRight, Info, Utensils, Clock, BadgePercent, Pizza,  } from 'lucide-vue-next';
const { vendors, loading } = useFetchVendors()
import { useUser } from "@/composables/auth/user"
const { user } = useUser()

const isAuthenticated = computed(() => Object.keys(user.value).length === 0 && user.value.constructor === Object)

</script>

<style scoped>
.animate-bounce-subtle {
  animation: bounce-subtle 3s infinite;
}

.animate-slide-up {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> -->

<!-- <template>
  <div class="min-h-screen overflow-hidden bg-white">
    <WelcomeOverlay />
    <div class="relative z-10 min-h-screen flex flex-col">

      <header class="py-6 px-6 md:px-10 bg-white shadow-sm">
        <div class="container mx-auto flex justify-between items-center">
          <div class="flex items-center">
            <img src="@/assets/img/Gofer-logo-coloured.png" alt="Gofer" class="h-10 animate-bounce-subtle" />
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/login" class="text-gray-700 hover:text-primary transition-colors">
              Already have an account?
            </NuxtLink>
          </div>
        </div>
      </header>

      <div class="container mx-auto px-4 pb-10">
      <FoodBannerCarousel />
     </div>


      <main class="container mx-auto px-4 pb-10">
      <VendorsInFunaab />
    </main>
      
      <div class="py-8 px-6 bg-gray-50">
        <div class="container mx-auto">
          <div class="max-w-4xl mx-auto overflow-hidden">
            <div class="animate-marquee whitespace-nowrap">
              <div v-for="i in 5" :key="i" class="inline-block mx-4 px-6 py-4 bg-white rounded-lg shadow-md">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path></svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-gray-600 text-sm">"The food arrived hot and fresh. Great service!"</p>
                    <p class="text-gray-800 font-medium text-sm mt-1">Student, {{ ['FUTA', 'OAU', 'UI', 'UNILAG', 'UNIBEN'][i-1] }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template> -->

<template>
        <header class="py-6 px-6 md:px-10 bg-white shadow-sm">
        <div class="container mx-auto flex justify-between items-center">
          <div class="flex items-center">
            <img src="@/assets/img/erranders.png" alt="Gofer" class="h-10 animate-bounce-subtle" />
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/login" class="text-gray-700 hover:text-primary transition-colors">
              Already have an account?
            </NuxtLink>
          </div>
        </div>
      </header>

<!-- 
      <div class="container mx-auto px-4 pb-10">
      <FoodBannerCarousel />
     </div>


      <main class="container mx-auto px-4 pb-10">
      <CollegeVendors />
    </main> -->
  <div class="overflow-hidden">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center">
      <!-- Background with animated gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div 
          v-for="i in 5" 
          :key="i"
          class="absolute bg-primary/5 rounded-full blur-xl animate-float"
          :style="{
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 20 + 15}s`
          }"
        ></div>
      </div>

      <div class="container mx-auto px-4 py-12 relative z-10">
        <div class="flex flex-col lg:flex-row items-center">
          <div class="lg:w-1/2 mb-12 lg:mb-0"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Campus Food Delivery, <span class="text-gray-800">By Students, For Students</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-600 mb-8">
              Order from your favorite campus vendors and nearby restaurants. 
              Fellow students deliver it right to your dorm or study spot.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="btn-primary">
                <span>Get Started</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </button>
              <button class="btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M12 17V3"></path><path d="m6 11 6 6 6-6"></path><path d="M19 21H5"></path></svg>
                <span>Download App</span>
              </button>
            </div>
            <div class="mt-8 flex items-center">
              <div class="flex -space-x-2">
                <img src="@/assets/img/avatar1.png" alt="User" class="w-10 h-10 rounded-full border-2 border-white">
                <img src="@/assets/img/avatar2.png" alt="User" class="w-10 h-10 rounded-full border-2 border-white">
                <img src="@/assets/img/avatar3.png" alt="User" class="w-10 h-10 rounded-full border-2 border-white">
                <img src="@/assets/img/avatar4.png" alt="User" class="w-10 h-10 rounded-full border-2 border-white">
              </div>
              <p class="ml-4 text-sm text-gray-600">Joined by <span class="font-semibold">2,000+</span> students on campus</p>
            </div>
          </div>
          <div class="lg:w-1/2 relative"
            v-motion
            :initial="{ opacity: 0, x: 100 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 400, duration: 800 } }">
            <div class="relative">
              <div class="absolute inset-0 bg-primary/20 rounded-3xl blur-xl transform rotate-6"></div>
              <img 
                src="@/assets/img/erranderClient.png" 
                alt="Gofer App" 
                class="relative z-10 mx-auto h-[600px] rounded-3xl shadow-2xl border border-gray-200"
              >
              <!-- Floating elements -->
              <div class="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg transform -rotate-6 animate-float z-20">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2Z"></path><path d="M21.18 10.2c.25-.53.4-1.12.47-1.72"></path><path d="M3.63 10.2c-.25-.53-.4-1.12-.47-1.72"></path><path d="M12 2v8"></path><path d="m2 12 8-2"></path><path d="m22 12-8-2"></path></svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-xs font-medium">Average delivery time</p>
                    <p class="text-sm font-bold">18 minutes</p>
                  </div>
                </div>
              </div>
              <div class="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg transform rotate-6 animate-float animation-delay-1000 z-20">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path></svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-xs font-medium">Trusted by</p>
                    <p class="text-sm font-bold">95% of campus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FoodBannerCarousel />

    <CollegeVendors />

    <!-- How It Works Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">How Gofer Works</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your favorite food delivered to your dorm, library, or anywhere on campus in just a few simple steps.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl p-6 shadow-lg relative"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-3">1. Choose Your Food</h3>
            <p class="text-gray-600">
              Browse through a variety of campus vendors and nearby restaurants. Select your favorite meals and add them to your cart.
            </p>
            <div class="absolute top-4 right-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg relative"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-3">2. Place Your Order</h3>
            <p class="text-gray-600">
              Confirm your order details, specify your campus location, and complete your payment securely through the app.
            </p>
            <div class="absolute top-4 right-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg relative"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800 } }">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-3">3. Get It Delivered</h3>
            <p class="text-gray-600">
              A fellow student will pick up your order and deliver it directly to your specified location. Track the delivery in real-time.
            </p>
            <div class="absolute top-4 right-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</div>
          </div>
        </div>

        <div class="mt-16 text-center">
          <button class="btn-primary">
            <span>Start Ordering Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose Gofer?</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We're not just another food delivery app. We're built specifically for university life.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col md:flex-row gap-6 items-start"
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 200, duration: 800 } }">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v-4h2a2 2 0 0 0 0-4Z"></path><path d="M12 8v4"></path><circle cx="12" cy="12" r="10"></circle></svg>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Campus-Specific Locations</h3>
              <p class="text-gray-600">
                We know your campus inside and out. Specify delivery to your dorm, library, student center, or any campus landmark.
              </p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-6 items-start"
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 300, duration: 800 } }">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Student-to-Student Service</h3>
              <p class="text-gray-600">
                Support your fellow students who earn money as Gofer delivery partners while fitting deliveries around their class schedules.
              </p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-6 items-start"
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 400, duration: 800 } }">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Student-Friendly Pricing</h3>
              <p class="text-gray-600">
                Enjoy lower delivery fees, student discounts, and special meal deals exclusively available to university students.
              </p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-6 items-start"
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 500, duration: 800 } }">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path></svg>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Safe & Secure</h3>
              <p class="text-gray-600">
                All Gofer delivery partners are verified students. Track your order in real-time and rate your experience after delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Vendors Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Popular Campus Vendors</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            From campus cafeterias to local favorites, we've got all your cravings covered.
          </p>
        </div>
        <!-- <FoodBannerCarousel /> -->
        <!-- <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div 
            v-for="i in 6" 
            :key="i"
            class="bg-white rounded-xl p-6 shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 800 } }">
            <div class="w-16 h-16 rounded-full bg-gray-200 mb-4 overflow-hidden">
            </div>
            <h3 class="text-lg font-bold text-center">Vendor {{ i }}</h3>
            <p class="text-sm text-gray-500 text-center">Campus Favorite</p>
          </div>
        </div> -->

        <div class="mt-12 text-center">
          <button class="btn-secondary">
            <span>View All Vendors</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">What Students Are Saying</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied students who use Gofer for their campus food delivery needs.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="bg-white rounded-xl p-6 shadow-lg"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 200, duration: 800 } }">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 flex">
                <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="i <= testimonial.rating ? 'fill-current' : ''"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <p class="ml-2 text-sm text-gray-600">{{ testimonial.rating }}.0 / 5.0</p>
            </div>
            <p class="text-gray-600 mb-6">{{ testimonial.text }}</p>
            <div class="flex items-center">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="w-10 h-10 rounded-full">
              <div class="ml-3">
                <h4 class="font-bold">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Become a Gofer Section -->
    <section class="py-20 bg-primary text-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row items-center">
          <div class="lg:w-1/2 mb-12 lg:mb-0"
            v-motion
            :initial="{ opacity: 0, x: -100 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">Become a Gofer Delivery Partner</h2>
            <p class="text-lg opacity-90 mb-8">
              Earn money between classes by delivering food to fellow students. 
              Set your own hours and work when it fits your schedule.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-center">
                <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
                <span>Flexible hours that work around your class schedule</span>
              </li>
              <li class="flex items-center">
                <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
                <span>Earn competitive pay plus tips</span>
              </li>
              <li class="flex items-center">
                <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
                <span>No vehicle required - walk or bike around campus</span>
              </li>
              <li class="flex items-center">
                <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
                <span>Weekly payments directly to your account</span>
              </li>
            </ul>
            <button class="bg-white text-primary font-medium px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center">
              <span>Apply to Deliver</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
          <div class="lg:w-1/2 lg:pl-12"
            v-motion
            :initial="{ opacity: 0, x: 100 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }">
            <div class="relative">
              <div class="absolute inset-0 bg-white/20 rounded-3xl blur-xl transform -rotate-6"></div>
              <!-- <img 
                src="/placeholder.svg?height=400&width=600" 
                alt="Gofer Delivery Partner" 
                class="relative z-10 w-full rounded-3xl shadow-2xl"
              > -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Download App Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="bg-gray-50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-1/2 h-full bg-primary/10 rounded-l-full blur-3xl transform translate-x-1/2"></div>
          
          <div class="flex flex-col lg:flex-row items-center relative z-10">
            <div class="lg:w-1/2 mb-12 lg:mb-0"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
              <h2 class="text-3xl md:text-4xl font-bold mb-6">Get the Gofer App</h2>
              <p class="text-lg text-gray-600 mb-8">
                Download the Gofer app to order food, track deliveries, and earn rewards with every purchase.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <button class="bg-black text-white px-6 py-3 rounded-xl flex items-center hover:bg-gray-800 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg>
                  <div class="text-left">
                    <p class="text-xs">Download on the</p>
                    <p class="text-lg font-semibold">App Store</p>
                  </div>
                </button>
                <button class="bg-black text-white px-6 py-3 rounded-xl flex items-center hover:bg-gray-800 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><polygon points="3 2 3 22 21 12 3 2"></polygon></svg>
                  <div class="text-left">
                    <p class="text-xs">GET IT ON</p>
                    <p class="text-lg font-semibold">Google Play</p>
                  </div>
                </button>
              </div>
            </div>
            <div class="lg:w-1/2 flex justify-center"
              v-motion
              :initial="{ opacity: 0, scale: 0.8 }"
              :enter="{ opacity: 1, scale: 1, transition: { duration: 800 } }">
              <!-- <img 
                src="/placeholder.svg?height=500&width=300" 
                alt="Gofer App Screenshot" 
                class="max-w-xs rounded-3xl shadow-2xl border border-gray-200"
              > -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </div>

        <div class="max-w-3xl mx-auto">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="mb-4"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }">
            <button 
              class="flex justify-between items-center w-full p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              @click="toggleFaq(index)"
            >
              <h3 class="text-lg font-bold text-left">{{ faq.question }}</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                :class="{ 'transform rotate-180': faq.isOpen }"
                class="transition-transform duration-300"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div 
              v-if="faq.isOpen"
              class="bg-white px-6 pb-6 rounded-b-xl shadow-md -mt-1"
            >
              <p class="text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary text-white">
      <div class="container mx-auto px-4 text-center"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Join thousands of students who are already enjoying the convenience of campus food delivery.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white text-primary font-medium px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
            <span>Download the App</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M12 17V3"></path><path d="m6 11 6 6 6-6"></path><path d="M19 21H5"></path></svg>
          </button>
          <button class="bg-primary border-2 border-white text-white font-medium px-8 py-3 rounded-full hover:bg-primary/80 transition-colors duration-300 flex items-center justify-center">
            <span>Become a Gofer</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-2xl font-bold mb-4">Gofer</h3>
            <p class="text-gray-400 mb-4">
              Campus food delivery, by students, for students.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="font-bold text-lg mb-4">Company</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-bold text-lg mb-4">Support</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-bold text-lg mb-4">Get in Touch</h4>
            <ul class="space-y-2">
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-gray-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span class="text-gray-400">(123) 456-7890</span>
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-gray-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><path d="m22 6-10 7L2 6"></path></svg>
                <span class="text-gray-400">support@gofer.com</span>
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-gray-400"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span class="text-gray-400">University Campus, Building 4</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {{ new Date().getFullYear() }} Gofer. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Terms</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useFetchVendors } from '@/composables/modules/vendor/useFetchVendors'
import { ArrowRight, Info, Utensils, Clock, BadgePercent, Pizza,  } from 'lucide-vue-next';
const { vendors, loading } = useFetchVendors()
import { useUser } from "@/composables/auth/user"
const { user } = useUser()

const isAuthenticated = computed(() => Object.keys(user.value).length === 0 && user.value.constructor === Object)

// Testimonials data
const testimonials = [
  {
    rating: 5,
    text: "Gofer has been a lifesaver during finals week! I can study in the library and have food delivered right to my table without losing my spot.",
    name: "Alex Johnson",
    role: "Computer Science Major",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    rating: 5,
    text: "I love being a Gofer delivery partner! I make deliveries between classes and earn enough to cover my textbooks and weekend activities.",
    name: "Samantha Lee",
    role: "Business Major",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    rating: 4,
    text: "The app is super easy to use and I love that I can track my delivery in real-time. Plus, the student discounts are awesome!",
    name: "Marcus Williams",
    role: "Engineering Major",
    avatar: "/placeholder.svg?height=40&width=40"
  }
]

// FAQ data
const faqs = reactive([
  {
    question: "How does Gofer work?",
    answer: "Gofer connects hungry students with fellow student delivery partners. You place an order through our app, a student delivery partner picks it up from the vendor, and delivers it to your specified campus location.",
    isOpen: false
  },
  {
    question: "How much does delivery cost?",
    answer: "Delivery fees start at $2.99 and vary based on distance and demand. We also offer a Gofer+ subscription that gives you free delivery on orders over $15.",
    isOpen: false
  },
  {
    question: "How do I become a delivery partner?",
    answer: "To become a Gofer delivery partner, you must be an enrolled student with a valid student ID. Simply sign up in the app, complete a brief orientation, and you can start delivering!",
    isOpen: false
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, Apple Pay, Google Pay, and campus meal plan dollars at participating locations.",
    isOpen: false
  },
  {
    question: "Is there a minimum order amount?",
    answer: "The minimum order amount varies by vendor, but typically starts at $10. Some vendors may have higher minimums during peak hours.",
    isOpen: false
  }
])

// Toggle FAQ
const toggleFaq = (index: number) => {
  faqs[index].isOpen = !faqs[index].isOpen
}
</script>

<style scoped>
/* Custom styles */
/* .btn-primary {
  @apply bg-primary text-white font-medium px-6 py-3 rounded-full hover:bg-primary/90 transition-colors duration-300 flex items-center;
}

.btn-secondary {
  @apply bg-white border-2 border-primary text-primary font-medium px-6 py-3 rounded-full hover:bg-primary/10 transition-colors duration-300 flex items-center;
} */

.text-primary {
  color: #034091;
}

.bg-primary {
  background-color: #034091;
}

.border-primary {
  border-color: #034091;
}

.from-primary {
  --tw-gradient-from: #034091;
}

.to-primary {
  --tw-gradient-to: #034091;
}

/* Animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-15px) translateX(15px);
  }
  50% {
    transform: translateY(0) translateX(30px);
  }
  75% {
    transform: translateY(15px) translateX(15px);
  }
}

.animate-float {
  animation: float 20s ease-in-out infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animate-bounce-subtle {
  animation: bounce-subtle 3s infinite;
}

.animate-slide-up {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>