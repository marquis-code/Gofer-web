<template>
  <div class="relative w-full overflow-hidden">
    <!-- Animated loader while fetching vendors -->
    <div v-if="isLoading" class="min-h-[60vh] flex items-center justify-center">
      <div class="relative">
        <div class="w-20 h-20 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="animate-float">
            <Utensils class="text-rose-500" size="28" />
          </div>
        </div>
      </div>
      <div class="ml-6">
        <h3 class="text-2xl font-bold bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent animate-pulse">
          Discovering Delicious Vendors
        </h3>
        <div class="mt-2 flex space-x-1">
          <div class="h-2 w-2 rounded-full bg-rose-500 animate-bounce" style="animation-delay: 0s"></div>
          <div class="h-2 w-2 rounded-full bg-rose-400 animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="h-2 w-2 rounded-full bg-rose-300 animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
      </div>
    </div>

    <template v-else>
      <!-- IMMERSIVE VENDOR CAROUSEL -->
      <section class="relative">
        <!-- Carousel title with animated underline -->
        <!-- <div class="container mx-auto px-4 py-6">
          <div class="relative inline-block">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
              Featured Vendors
            </h2>
            <div class="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500 w-full animate-width-expand"></div>
          </div>
        </div> -->

        <!-- Main immersive carousel -->
        <div class="relative h-[500px] md:h-[600px] overflow-hidden">
          <!-- Full-screen background images -->
          <div 
            v-for="(vendor, index) in vendors" 
            :key="`bg-${vendor._id}`"
            class="absolute inset-0 w-full h-full transition-opacity duration-1000"
            :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
          >
            <div class="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"></div>
            <div 
              class="absolute inset-0 bg-cover bg-center z-0 transform transition-transform duration-[2s]"
              :style="{
                backgroundImage: `url(${vendor.displayImage || getRandomImage(vendor)})`,
                transform: currentSlide === index ? 'scale(1.1)' : 'scale(1)'
              }"
            ></div>
          </div>

          <!-- Carousel content -->
          <div 
            class="relative z-20 h-full"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
          >
            <div class="container mx-auto h-full px-4 flex items-center">
              <div 
                class="swiper-wrapper w-full flex transition-transform duration-700 ease-out"
                :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
              >
                <div 
                  v-for="(vendor, index) in vendors" 
                  :key="vendor._id"
                  class="swiper-slide w-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between"
                >
                  <!-- Vendor info with staggered animations -->
                  <div 
                    class="w-full md:w-1/2 text-white p-6 rounded-2xl backdrop-blur-md bg-black/30 border border-white/10"
                    :class="{'animate-slide-up': currentSlide === index}"
                  >
                    <div class="flex items-center mb-4">
                      <div class="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center mr-4 shadow-lg animate-pulse-slow">
                        <Utensils class="text-white" size="24" />
                      </div>
                      <div>
                        <h2 class="text-3xl md:text-4xl font-bold">{{ vendor.restaurantName }}</h2>
                        <div 
                          v-if="vendor.category" 
                          class="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mt-2 backdrop-blur-sm"
                        >
                          {{ vendor.category }}
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex flex-wrap gap-2 mb-6 animate-fade-in" style="animation-delay: 0.3s">
                      <span 
                        v-for="tag in getRandomTags(vendor)" 
                        :key="tag" 
                        class="px-3 py-1 bg-gradient-to-r from-rose-500/70 to-amber-500/70 rounded-full text-sm font-medium shadow-md backdrop-blur-sm"
                      >
                        {{ tag }}
                      </span>
                    </div>
                    
                    <p class="text-white/90 mb-6 animate-fade-in" style="animation-delay: 0.5s">
                      Experience the finest culinary delights from {{ vendor.restaurantName }}. 
                      Known for exceptional quality and taste that will leave you craving for more.
                    </p>
                    
                    <div class="flex items-center space-x-4 mb-6 animate-fade-in" style="animation-delay: 0.7s">
                      <div class="flex items-center">
                        <Star class="text-amber-400 mr-1" size="18" fill="currentColor" />
                        <span class="font-medium">{{ (4 + Math.random()).toFixed(1) }}</span>
                      </div>
                      <div class="w-1 h-1 bg-white/50 rounded-full"></div>
                      <div class="flex items-center">
                        <Clock class="mr-1 text-white/80" size="16" />
                        <span>{{ Math.floor(15 + Math.random() * 30) }} min</span>
                      </div>
                      <div class="w-1 h-1 bg-white/50 rounded-full"></div>
                      <div class="flex items-center">
                        <MapPin class="mr-1 text-white/80" size="16" />
                        <span>{{ Math.floor(1 + Math.random() * 5) }}.{{ Math.floor(1 + Math.random() * 9) }} km</span>
                      </div>
                    </div>
                    
                    <button 
                      v-if="vendor.isStoreOpen !== false"
                      @click="router.push(`/${vendor.slug || vendor._id}`)" 
                      class="group relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-rose-500/30 animate-fade-in"
                      style="animation-delay: 0.9s"
                    >
                      <span class="relative z-10 flex items-center">
                        <ShoppingBag size="20" class="mr-2 group-hover:animate-bounce-once" />
                        Order Now
                        <ChevronRight size="20" class="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <span class="absolute inset-0 bg-gradient-to-r from-amber-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                  </div>
                  
                  <!-- Vendor image with floating animation -->
                  <div 
                    class="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0"
                    :class="{'animate-slide-left': currentSlide === index}"
                    style="animation-delay: 0.4s"
                  >
                    <div class="relative">
                      <!-- Decorative elements -->
                      <div class="absolute -top-6 -right-6 w-16 h-16 bg-rose-500 rounded-full opacity-70 animate-float" style="animation-delay: 0.2s"></div>
                      <div class="absolute -bottom-4 -left-4 w-12 h-12 bg-amber-500 rounded-full opacity-70 animate-float" style="animation-delay: 0.7s"></div>
                      
                      <!-- Vendor image with hover effects -->
                      <div class="relative overflow-hidden rounded-2xl shadow-2xl group">
                        <img 
                          :src="vendor.displayImage || getRandomImage(vendor)" 
                          :alt="vendor.restaurantName" 
                          class="w-auto h-[250px] md:h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        <!-- Overlay with special offers -->
                        <div 
                          v-if="Math.random() > 0.5"
                          class="absolute top-4 right-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transform rotate-3 animate-pulse-slow"
                        >
                          {{ Math.floor(10 + Math.random() * 30) }}% OFF
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced navigation with swipe indicators -->
          <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-2">
            <button 
              @click="prevSlide" 
              class="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-3 text-white transition-all duration-300 hover:scale-110 focus:outline-none"
              :class="{'opacity-50 cursor-not-allowed': currentSlide === 0}"
              :disabled="currentSlide === 0"
            >
              <ChevronLeft size="24" />
            </button>
            
            <div class="flex space-x-2">
              <div 
                v-for="(_, index) in vendors" 
                :key="`dot-${index}`"
                @click="goToSlide(index)"
                class="cursor-pointer transition-all duration-300"
              >
                <div 
                  class="h-3 rounded-full transition-all duration-500"
                  :class="[
                    currentSlide === index 
                      ? 'w-10 bg-gradient-to-r from-rose-500 to-amber-500' 
                      : 'w-3 bg-white/30 hover:bg-white/50'
                  ]"
                ></div>
              </div>
            </div>
            
            <button 
              @click="nextSlide" 
              class="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-3 text-white transition-all duration-300 hover:scale-110 focus:outline-none"
              :class="{'opacity-50 cursor-not-allowed': currentSlide === vendors.length - 1}"
              :disabled="currentSlide === vendors.length - 1"
            >
              <ChevronRight size="24" />
            </button>
          </div>
          
          <!-- Swipe indicator animation -->
          <div 
            class="absolute inset-x-0 bottom-24 flex justify-center z-30 pointer-events-none"
            :class="{'opacity-100': isSwipeIndicatorVisible, 'opacity-0': !isSwipeIndicatorVisible}"
          >
            <div class="px-6 py-3 bg-black/60 backdrop-blur-md rounded-full text-white flex items-center space-x-3 transition-opacity duration-300">
              <ArrowLeft size="20" class="animate-slide-right-short" />
              <span>Swipe to navigate</span>
              <ArrowRight size="20" class="animate-slide-left-short" />
            </div>
          </div>
        </div>
      </section>

      <!-- IMPROVED TOP SALES SECTION WITH CAROUSEL FOR MOBILE -->
      <section class="relative py-16 overflow-hidden">
        <!-- Parallax background -->
        <div 
          class="absolute inset-0 bg-cover bg-center"
          :style="{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200)',
            transform: `translateY(${scrollY * 0.2}px)`
          }"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        
        <!-- Section content -->
        <div class="container mx-auto px-4 relative z-10">
          <!-- Section header with animated elements -->
          <div class="text-center mb-12">
            <div class="inline-block relative">
              <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Top Sales</h2>
              <div class="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-rose-500 to-amber-500 animate-width-expand"></div>
            </div>
            <p class="text-white/80 max-w-2xl mx-auto mt-4">
              Discover incredible deals from our top vendors. Limited-time offers you can't resist!
            </p>
          </div>
          
          <!-- Desktop view: Grid layout with proper spacing -->
          <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="(vendor, index) in topSalesVendors" 
              :key="`sale-desktop-${vendor._id}`"
              class="group relative overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-500 hover:-translate-y-2"
            >
              <!-- Sale card with hover effects -->
              <div class="relative h-[350px] overflow-hidden">
                <!-- Background image -->
                <div 
                  class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  :style="{backgroundImage: `url(${vendor.displayImage || getRandomImage(vendor)})`}"
                ></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                <!-- Sale content -->
                <div class="absolute inset-0 flex flex-col justify-between p-6">
                  <div class="flex justify-between items-start">
                    <div class="bg-rose-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transform -rotate-2">
                      {{ Math.floor(20 + Math.random() * 40) }}% OFF
                    </div>
                    <div class="bg-white/20 backdrop-blur-md p-2 rounded-full">
                      <Heart :fill="index % 2 === 0 ? 'currentColor' : 'none'" class="text-rose-500" size="24" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="text-2xl font-bold text-white mb-2">{{ vendor.restaurantName }}</h3>
                    <p class="text-white/80 mb-4 line-clamp-2">
                      Special offer on our most popular items. Limited time only!
                    </p>
                    
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <div class="flex">
                          <Star fill="currentColor" class="text-amber-400" size="16" />
                          <Star fill="currentColor" class="text-amber-400" size="16" />
                          <Star fill="currentColor" class="text-amber-400" size="16" />
                          <Star fill="currentColor" class="text-amber-400" size="16" />
                          <Star :fill="index % 2 === 0 ? 'currentColor' : 'none'" class="text-amber-400" size="16" />
                        </div>
                        <span class="text-white/90 text-sm">{{ (4 + Math.random()).toFixed(1) }}</span>
                      </div>
                      
                      <div class="flex items-center space-x-1">
                        <span class="text-white/70 line-through text-sm">
                          ${{ (20 + Math.random() * 15).toFixed(2) }}
                        </span>
                        <span class="text-white font-bold text-lg">
                          ${{ (10 + Math.random() * 10).toFixed(2) }}
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      @click="router.push(`/${vendor.slug || vendor._id}`)"
                      class="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/30 group-hover:scale-105"
                    >
                      <span class="flex items-center justify-center">
                        <ShoppingCart size="18" class="mr-2" />
                        Order Now
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Animated time remaining badge -->
              <div class="absolute top-6 right-6 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Clock size="14" class="mr-1" />
                <span>Ends in {{ Math.floor(1 + Math.random() * 23) }}h {{ Math.floor(Math.random() * 59) }}m</span>
              </div>
            </div>
          </div>
          
          <!-- Mobile view: Swipeable carousel -->
          <div class="md:hidden relative">
            <div 
              class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
              @touchstart="handleSalesTouchStart"
              @touchmove="handleSalesTouchMove"
              @touchend="handleSalesTouchEnd"
              ref="salesCarouselRef"
            >
              <div 
                v-for="(vendor, index) in topSalesVendors" 
                :key="`sale-mobile-${vendor._id}`"
                class="snap-center flex-shrink-0 w-[85%] mr-4 last:mr-0"
              >
                <!-- Sale card with hover effects -->
                <div class="relative h-[400px] overflow-hidden rounded-2xl shadow-xl">
                  <!-- Background image -->
                  <div 
                    class="absolute inset-0 bg-cover bg-center"
                    :style="{backgroundImage: `url(${vendor.displayImage || getRandomImage(vendor)})`}"
                  ></div>
                  <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  
                  <!-- Sale content -->
                  <div class="absolute inset-0 flex flex-col justify-between p-6">
                    <div class="flex justify-between items-start">
                      <div class="bg-rose-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transform -rotate-2">
                        {{ Math.floor(20 + Math.random() * 40) }}% OFF
                      </div>
                      <div class="bg-white/20 backdrop-blur-md p-2 rounded-full">
                        <Heart :fill="index % 2 === 0 ? 'currentColor' : 'none'" class="text-rose-500" size="24" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 class="text-2xl font-bold text-white mb-2">{{ vendor.restaurantName }}</h3>
                      <p class="text-white/80 mb-4">
                        Special offer on our most popular items. Limited time only!
                      </p>
                      
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                          <div class="flex">
                            <Star fill="currentColor" class="text-amber-400" size="16" />
                            <Star fill="currentColor" class="text-amber-400" size="16" />
                            <Star fill="currentColor" class="text-amber-400" size="16" />
                            <Star fill="currentColor" class="text-amber-400" size="16" />
                            <Star :fill="index % 2 === 0 ? 'currentColor' : 'none'" class="text-amber-400" size="16" />
                          </div>
                          <span class="text-white/90 text-sm">{{ (4 + Math.random()).toFixed(1) }}</span>
                        </div>
                        
                        <div class="flex items-center space-x-1">
                          <span class="text-white/70 line-through text-sm">
                            ${{ (20 + Math.random() * 15).toFixed(2) }}
                          </span>
                          <span class="text-white font-bold text-lg">
                            ${{ (10 + Math.random() * 10).toFixed(2) }}
                          </span>
                        </div>
                      </div>
                      
                      <button 
                        @click="router.push(`/${vendor.slug || vendor._id}`)"
                        class="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold transition-all duration-300"
                      >
                        <span class="flex items-center justify-center">
                          <ShoppingCart size="18" class="mr-2" />
                          Order Now
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Animated time remaining badge -->
                <div class="absolute top-6 right-6 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <Clock size="14" class="mr-1" />
                  <span>Ends in {{ Math.floor(1 + Math.random() * 23) }}h {{ Math.floor(Math.random() * 59) }}m</span>
                </div>
              </div>
            </div>
            
            <!-- Mobile carousel indicators -->
            <div class="flex justify-center mt-6 space-x-2">
              <div 
                v-for="(_, index) in topSalesVendors" 
                :key="`sales-dot-${index}`"
                class="h-2 rounded-full transition-all duration-300"
                :class="[
                  currentSalesSlide === index 
                    ? 'w-8 bg-gradient-to-r from-rose-500 to-amber-500' 
                    : 'w-2 bg-white/30'
                ]"
              ></div>
            </div>
            
            <!-- Mobile swipe indicator -->
            <div 
              class="absolute inset-x-0 bottom-16 flex justify-center z-30 pointer-events-none"
              :class="{'opacity-100': isSalesSwipeIndicatorVisible, 'opacity-0': !isSalesSwipeIndicatorVisible}"
            >
              <div class="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white flex items-center space-x-2 text-sm transition-opacity duration-300">
                <ArrowLeft size="16" class="animate-slide-right-short" />
                <span>Swipe for more deals</span>
                <ArrowRight size="16" class="animate-slide-left-short" />
              </div>
            </div>
          </div>
          
          <!-- View all button -->
          <div class="mt-12 text-center">
            <button class="group relative overflow-hidden px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white font-bold transition-all duration-300 hover:bg-white/20">
              <span class="flex items-center justify-center">
                View All Deals
                <ArrowRight size="20" class="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  Utensils, 
  Star, 
  Clock, 
  MapPin,
  Heart,
  ShoppingCart,
  ArrowLeft,
  ArrowRight
} from 'lucide-vue-next';

// Router for navigation
const router = useRouter();

// Sample data (replace with your actual data fetching)
const isLoading = ref(false);
const vendors = ref<any[]>([]);
const currentSlide = ref(0);
const scrollY = ref(0);
const isSwipeIndicatorVisible = ref(false);

// Sales carousel state
const currentSalesSlide = ref(0);
const isSalesSwipeIndicatorVisible = ref(false);
const salesCarouselRef = ref<HTMLElement | null>(null);

// Touch handling for swipe
const touchStartX = ref(0);
const touchEndX = ref(0);
const salesTouchStartX = ref(0);
const salesTouchEndX = ref(0);

// Sample images for vendors without display images
const sampleImages = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1555939594581-2d1ec7ab7445?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=500&fit=crop'
];

// Sample tags for vendors
const foodTags = [
  'Fast Delivery', 'Top Rated', 'Healthy Options', 'Spicy', 'Vegetarian',
  'Vegan', 'Gluten-Free', 'Local Favorite', 'New', 'Trending', 'Breakfast',
  'Lunch', 'Dinner', 'Desserts', 'Drinks', 'Snacks', 'Family Meals'
];

// Computed property for top sales vendors
const topSalesVendors = computed(() => {
  // Return a subset of vendors with sales
  return vendors.value.slice(0, 6);
});

// Mock data loading function (replace with your actual data fetching)
const loadVendors = async () => {
  isLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data
    vendors.value = [
      {
        _id: '1',
        restaurantName: 'Adic Bakery and Confectionery',
        category: 'Bakery & Desserts',
        slug: 'adic-bakery',
        isStoreOpen: true,
        displayImage: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=500&fit=crop'
      },
      {
        _id: '2',
        restaurantName: 'Spice Garden',
        category: 'Indian Cuisine',
        slug: 'spice-garden',
        isStoreOpen: true
      },
      {
        _id: '3',
        restaurantName: 'Pasta Paradise',
        category: 'Italian',
        slug: 'pasta-paradise',
        isStoreOpen: true
      },
      {
        _id: '4',
        restaurantName: 'Sushi Master',
        category: 'Japanese',
        slug: 'sushi-master',
        isStoreOpen: true
      },
      {
        _id: '5',
        restaurantName: 'Burger Bliss',
        category: 'Fast Food',
        slug: 'burger-bliss',
        isStoreOpen: true
      },
      {
        _id: '6',
        restaurantName: 'Green Leaf Salads',
        category: 'Healthy',
        slug: 'green-leaf',
        isStoreOpen: true
      },
      {
        _id: '7',
        restaurantName: 'Taco Fiesta',
        category: 'Mexican',
        slug: 'taco-fiesta',
        isStoreOpen: true
      },
      {
        _id: '8',
        restaurantName: 'Pizza Heaven',
        category: 'Italian',
        slug: 'pizza-heaven',
        isStoreOpen: true
      }
    ];
  } catch (error) {
    console.error('Error loading vendors:', error);
  } finally {
    isLoading.value = false;
    
    // Show swipe indicators after a delay
    setTimeout(() => {
      isSwipeIndicatorVisible.value = true;
      isSalesSwipeIndicatorVisible.value = true;
      
      // Hide them after a few seconds
      setTimeout(() => {
        isSwipeIndicatorVisible.value = false;
        isSalesSwipeIndicatorVisible.value = false;
      }, 4000);
    }, 2000);
  }
};

// Get a random image for vendors without display images
const getRandomImage = (vendor: any) => {
  // Use a deterministic approach based on vendor ID to always get the same image
  const index = vendor._id.charCodeAt(0) % sampleImages.length;
  return sampleImages[index];
};

// Get random tags for each vendor
const getRandomTags = (vendor: any) => {
  const numTags = 2 + Math.floor(Math.random() * 2); // 2-3 tags
  const tags: string[] = [];
  
  // Use vendor ID to create deterministic tags
  const seed = vendor._id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  
  for (let i = 0; i < numTags; i++) {
    const index = (seed + i) % foodTags.length;
    tags.push(foodTags[index]);
  }
  
  return tags;
};

// Carousel navigation functions
const nextSlide = () => {
  if (currentSlide.value < vendors.value.length - 1) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

// Touch event handlers for main carousel swipe functionality
const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX;
};

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  const touchDiff = touchStartX.value - touchEndX.value;
  
  // Detect swipe (with a threshold of 50px)
  if (Math.abs(touchDiff) > 50) {
    if (touchDiff > 0) {
      // Swipe left, go to next slide
      nextSlide();
    } else {
      // Swipe right, go to previous slide
      prevSlide();
    }
  }
  
  // Reset touch values
  touchStartX.value = 0;
  touchEndX.value = 0;
};

// Touch event handlers for sales carousel swipe functionality
const handleSalesTouchStart = (e: TouchEvent) => {
  salesTouchStartX.value = e.touches[0].clientX;
};

const handleSalesTouchMove = (e: TouchEvent) => {
  salesTouchEndX.value = e.touches[0].clientX;
};

const handleSalesTouchEnd = () => {
  const touchDiff = salesTouchStartX.value - salesTouchEndX.value;
  
  // Detect swipe (with a threshold of 50px)
  if (Math.abs(touchDiff) > 50) {
    if (touchDiff > 0 && currentSalesSlide.value < topSalesVendors.value.length - 1) {
      // Swipe left, go to next slide
      currentSalesSlide.value++;
      scrollToSalesCard(currentSalesSlide.value);
    } else if (touchDiff < 0 && currentSalesSlide.value > 0) {
      // Swipe right, go to previous slide
      currentSalesSlide.value--;
      scrollToSalesCard(currentSalesSlide.value);
    }
  }
  
  // Reset touch values
  salesTouchStartX.value = 0;
  salesTouchEndX.value = 0;
};

// Function to scroll to a specific sales card
const scrollToSalesCard = (index: number) => {
  if (salesCarouselRef.value) {
    const cards = salesCarouselRef.value.querySelectorAll('.snap-center');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }
};

// Monitor sales carousel scroll position to update current slide indicator
const updateSalesSlideIndicator = () => {
  if (salesCarouselRef.value) {
    const scrollLeft = salesCarouselRef.value.scrollLeft;
    const cardWidth = salesCarouselRef.value.clientWidth * 0.85; // 85% width of container
    const newIndex = Math.round(scrollLeft / cardWidth);
    
    if (newIndex >= 0 && newIndex < topSalesVendors.value.length) {
      currentSalesSlide.value = newIndex;
    }
  }
};

// Parallax effect functions
const handleScroll = () => {
  scrollY.value = window.scrollY;
};

// Lifecycle hooks
const loadVendorsHook = () => {
  loadVendors();
};

const handleScrollHook = () => {
  window.addEventListener('scroll', handleScroll);
};

const updateSalesSlideIndicatorHook = () => {
  if (salesCarouselRef.value) {
    salesCarouselRef.value.addEventListener('scroll', updateSalesSlideIndicator);
  }
};

const cleanupHooks = () => {
  window.removeEventListener('scroll', handleScroll);
  
  // Clean up sales carousel scroll event listener
  if (salesCarouselRef.value) {
    salesCarouselRef.value.removeEventListener('scroll', updateSalesSlideIndicator);
  }
};

const autoplayIntervalHook = () => {
  const interval = setInterval(() => {
    if (currentSlide.value < vendors.value.length - 1) {
      currentSlide.value++;
    } else {
      currentSlide.value = 0;
    }
  }, 6000);

  return interval;
};

onMounted(() => {
  loadVendorsHook();
  handleScrollHook();
  updateSalesSlideIndicatorHook();
  const interval = autoplayIntervalHook();
  onUnmounted(() => {
    cleanupHooks();
    clearInterval(interval);
  });
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 1s ease-out forwards;
  opacity: 0;
}

.animate-slide-left {
  animation: slideLeft 1s ease-out forwards;
  opacity: 0;
}

.animate-slide-right {
  animation: slideRight 1s ease-out forwards;
  opacity: 0;
}

.animate-slide-right-short {
  animation: slideRightShort 1.5s ease-in-out infinite;
}

.animate-slide-left-short {
  animation: slideLeftShort 1.5s ease-in-out infinite;
}

.animate-width-expand {
  animation: widthExpand 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  transform-origin: left;
  transform: scaleX(0);
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 3s ease-in-out infinite;
}

.animate-bounce-once {
  animation: bounceOnce 0.6s ease-in-out;
}

/* Hide scrollbar but keep functionality */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideRightShort {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
}

@keyframes slideLeftShort {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-5px);
  }
}

@keyframes widthExpand {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulseSlow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
}

@keyframes bounceOnce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.swiper-slide {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (max-width: 768px) {
  .animate-slide-left, .animate-slide-right {
    animation-delay: 0.3s !important;
  }
}
</style>