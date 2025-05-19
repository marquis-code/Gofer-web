<template>
  <div class="vendor-experience relative overflow-hidden">
    <!-- Animated Background -->
    <div class="animated-bg absolute inset-0 -z-10"></div>
    
    <!-- Floating Food Icons Background -->
    <div class="food-icons-container absolute inset-0 pointer-events-none -z-5">
      <div v-for="i in 15" :key="`food-bg-${i}`" class="food-icon-float" :style="`--delay: ${i * 0.7}s; --duration: ${5 + i % 5}s`">
        <component :is="foodIcons[i % foodIcons.length]" :size="10 + (i % 15)" :class="foodIconColors[i % foodIconColors.length]" />
      </div>
    </div>
    
    <!-- Header with Search -->
    <header class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-lg px-4 py-3 mb-4">
      <div class="flex items-center justify-between mb-3">
        <h1 class="text-2xl font-bold text-gradient">FoodFinder</h1>
        <div class="flex space-x-2">
          <button @click="toggleTheme" class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <Sun v-if="isDarkMode" size="20" />
            <Moon v-else size="20" />
          </button>
          <button class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <Bell size="20" />
          </button>
        </div>
      </div>
      
      <!-- Search with animated border -->
      <div class="search-container relative mb-4">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="text-gray-400 dark:text-gray-600" size="18" />
        </div>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Find your favorite food..." 
          class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
          @input="handleSearch"
          @focus="isSearchFocused = true"
          @blur="isSearchFocused = false"
        />
        <div class="search-border"></div>
      </div>
      
      <!-- Category Pills -->
      <div class="category-scroller overflow-x-auto pb-2 -mx-4 px-4">
        <div class="flex space-x-2">
          <button 
            v-for="(category, index) in allCategories" 
            :key="category"
            @click="toggleCategoryFilter(category)"
            class="category-pill whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
            :class="[
              selectedCategories.includes(category) 
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="px-4 pb-20">
      <!-- Status Bar -->
      <div class="status-bar flex items-center justify-between mb-6">
        <div class="flex items-center">
          <span class="pulse-dot"></span>
          <span class="text-sm font-medium ml-2 text-gray-700 dark:text-gray-300">
            {{ isLoading ? 'Searching for vendors...' : `${filteredVendors.length} vendors found` }}
          </span>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="toggleView('grid')" class="p-1.5 rounded" :class="{'bg-red-100 dark:bg-red-900/30 text-red-500': viewMode === 'grid'}">
            <Grid size="18" />
          </button>
          <button @click="toggleView('swiper')" class="p-1.5 rounded" :class="{'bg-red-100 dark:bg-red-900/30 text-red-500': viewMode === 'swiper'}">
            <Layers size="18" />
          </button>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container flex flex-col items-center justify-center py-20">
        <div class="loading-spinner">
          <div class="spinner-food">
            <Pizza size="24" class="text-red-500" />
          </div>
        </div>
        <p class="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">Discovering delicious options...</p>
      </div>
      
      <!-- Swiper View (Default for Mobile) -->
      <div v-else-if="viewMode === 'swiper' || isMobile" class="vendor-swiper-container">
        <!-- Swiper Navigation -->
        <div class="swiper-navigation flex justify-between items-center mb-4">
          <button 
            @click="prevVendor" 
            class="swipe-btn prev-btn"
            :class="{'opacity-50 cursor-not-allowed': currentVendorIndex === 0}"
            :disabled="currentVendorIndex === 0"
          >
            <ChevronLeft size="24" />
          </button>
          
          <div class="swiper-pagination flex space-x-1">
            <div 
              v-for="(_, i) in Math.min(5, filteredVendors.length)" 
              :key="i"
              class="pagination-dot"
              :class="{
                'active': i === currentVendorIndex % 5,
                'before-active': i === (currentVendorIndex - 1) % 5 && i >= 0,
                'after-active': i === (currentVendorIndex + 1) % 5 && i < 5
              }"
            ></div>
          </div>
          
          <button 
            @click="nextVendor" 
            class="swipe-btn next-btn"
            :class="{'opacity-50 cursor-not-allowed': currentVendorIndex === filteredVendors.length - 1}"
            :disabled="currentVendorIndex === filteredVendors.length - 1"
          >
            <ChevronRight size="24" />
          </button>
        </div>
        
        <!-- Swiper Cards -->
        <div 
          class="vendor-swiper relative h-[500px] overflow-hidden"
          ref="swiperContainer"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
        >
          <div 
            v-for="(vendor, index) in filteredVendors" 
            :key="vendor._id"
            class="vendor-card-swiper absolute inset-0 transition-all duration-500"
            :class="getCardPosition(index)"
            :style="getCardStyle(index)"
            @click="index === currentVendorIndex ? handleSelectedVendor(vendor) : setCurrentVendor(index)"
          >
            <!-- Card Content -->
            <div class="card-content h-full rounded-2xl overflow-hidden shadow-2xl relative bg-white dark:bg-gray-800 flex flex-col transform transition-all duration-500">
              <!-- Card Image -->
              <div class="relative h-48 overflow-hidden">
                <img 
                  :src="vendor.displayImage || getRandomFoodImage(vendor)" 
                  :alt="vendor.restaurantName" 
                  class="w-full h-full object-cover transition-transform duration-700" 
                />
                
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                <!-- Status Badge -->
                <div class="absolute top-4 right-4 z-10">
                  <div v-if="isVendorOpen(vendor)" class="status-badge open">
                    <CheckCircle size="14" class="mr-1" />
                    Open
                  </div>
                  <div v-else class="status-badge closed">
                    <Clock size="14" class="mr-1" />
                    Closed
                  </div>
                </div>
                
                <!-- Favorite Button -->
                <button 
                  class="absolute top-4 left-4 z-10 favorite-btn"
                  :class="{'is-favorite': favoriteVendors[vendor._id]}"
                  @click.stop="toggleFavorite(vendor._id)"
                >
                  <Heart size="20" />
                </button>
                
                <!-- Restaurant Info -->
                <div class="absolute bottom-0 left-0 w-full p-4 z-10">
                  <h3 class="font-bold text-xl text-white">
                    {{ vendor.restaurantName }}
                  </h3>
                  <div class="flex items-center mt-1">
                    <span class="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full mr-2">
                      {{ vendor.category }}
                    </span>
                    <div class="flex items-center text-white text-xs">
                      <MapPin size="12" class="mr-1" />
                      <span class="truncate max-w-[150px]">{{ formatLocation(vendor.locationName) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Card Details -->
              <div class="p-4 flex-grow flex flex-col">
                <!-- Description -->
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ getVendorDescription(vendor) }}</p>
                
                <!-- Hours -->
                <div class="text-sm mb-4">
                  <div class="flex items-center">
                    <Clock size="14" class="mr-1 text-gray-500" />
                    <span v-if="isVendorOpen(vendor)" class="text-green-600 dark:text-green-400 font-medium">
                      Open until {{ getClosingTime(vendor) }}
                    </span>
                    <span v-else class="text-red-600 dark:text-red-400">
                      {{ getNextOpeningInfo(vendor) }}
                    </span>
                  </div>
                </div>
                
                <!-- Rating -->
                <div class="flex items-center mb-4">
                  <div class="flex">
                    <Star v-for="i in 5" :key="i" size="16" 
                      :class="i <= getRandomRating(vendor) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'" />
                  </div>
                  <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">{{ getRandomReviews(vendor) }} reviews</span>
                </div>
                
                <!-- Popular Items -->
                <div class="mb-4">
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Items:</h4>
                  <div class="flex space-x-2 overflow-x-auto pb-2">
                    <div v-for="(item, i) in getPopularItems(vendor)" :key="i" 
                      class="popular-item px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {{ item }}
                    </div>
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="mt-auto flex justify-between items-center">
                  <button 
                    class="view-menu-btn flex items-center text-sm font-medium"
                    @click.stop="$emit('select-vendor', vendor)"
                  >
                    <Utensils size="16" class="mr-1" />
                    View Menu
                  </button>
                  
                  <button 
                    class="order-btn"
                    :class="isVendorOpen(vendor) ? 'enabled' : 'disabled'"
                    :disabled="!isVendorOpen(vendor)"
                    @click.stop="isVendorOpen(vendor) ? handleOrder(vendor) : null"
                  >
                    <ShoppingBag size="16" class="mr-1" />
                    {{ isVendorOpen(vendor) ? 'Order Now' : 'Closed' }}
                  </button>
                </div>
              </div>
              
              <!-- Swipe Indicator -->
              <div class="swipe-indicator">
                <ArrowLeftRight size="20" />
                <span>Swipe</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredVendors.length === 0" class="empty-state flex flex-col items-center justify-center py-10">
          <div class="empty-plate">
            <Utensils size="40" class="text-gray-300 dark:text-gray-700" />
          </div>
          <h3 class="mt-4 text-xl font-bold text-gray-700 dark:text-gray-300">No vendors found</h3>
          <p class="mt-2 text-gray-500 dark:text-gray-500 text-center">
            We couldn't find any vendors matching your criteria.
          </p>
          <button @click="resetFilters" class="mt-4 px-4 py-2 bg-red-500 text-white rounded-full">
            Reset Filters
          </button>
        </div>
      </div>
      
      <!-- Grid View (For Desktop) -->
      <div v-else-if="viewMode === 'grid' && !isMobile" class="vendor-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Grid Cards (Simplified) -->
        <div 
          v-for="(vendor, index) in filteredVendors" 
          :key="vendor._id"
          class="vendor-card-grid rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 cursor-pointer"
          @click="handleSelectedVendor(vendor)"
        >
          <!-- Card Content (Simplified) -->
          <div class="relative h-40">
            <img 
              :src="vendor.displayImage || getRandomFoodImage(vendor)" 
              :alt="vendor.restaurantName" 
              class="w-full h-full object-cover" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div class="absolute top-3 right-3">
              <div v-if="isVendorOpen(vendor)" class="status-badge open">Open</div>
              <div v-else class="status-badge closed">Closed</div>
            </div>
            
            <div class="absolute bottom-3 left-3">
              <h3 class="font-bold text-lg text-white">{{ vendor.restaurantName }}</h3>
              <div class="flex items-center mt-1">
                <span class="text-xs px-2 py-1 bg-white/20 text-white rounded-full">
                  {{ vendor.category }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="p-3">
            <div class="flex justify-between items-center">
              <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock size="14" class="mr-1" />
                <span v-if="isVendorOpen(vendor)" class="text-green-600 dark:text-green-400">
                  Open
                </span>
                <span v-else class="text-red-600 dark:text-red-400">
                  Closed
                </span>
              </div>
              
              <button 
                class="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
                @click.stop="toggleFavorite(vendor._id)"
              >
                <Heart size="16" :class="favoriteVendors[vendor._id] ? 'text-red-500 fill-red-500' : 'text-gray-400'" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 shadow-lg rounded-t-3xl z-50">
      <div class="flex justify-around items-center h-16">
        <button class="nav-btn active">
          <Home size="20" />
          <span>Home</span>
        </button>
        <button class="nav-btn">
          <Search size="20" />
          <span>Search</span>
        </button>
        <button class="nav-btn-center">
          <div class="nav-btn-circle">
            <Utensils size="24" />
          </div>
        </button>
        <button class="nav-btn">
          <Heart size="20" />
          <span>Favorites</span>
        </button>
        <button class="nav-btn">
          <User size="20" />
          <span>Profile</span>
        </button>
      </div>
    </nav>
    
    <!-- Vendor Closed Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isCloseModalOpen" class="modal-overlay" @click="isCloseModalOpen = false">
          <div class="modal-container" @click.stop>
            <div class="modal-icon">
              <Clock size="40" class="text-red-500" />
            </div>
            
            <h3 class="modal-title">Restaurant Closed</h3>
            <p class="modal-text">
              Sorry, this restaurant is currently closed. Please check back later for availability.
            </p>
            
            <div class="modal-actions">
              <button @click="isCloseModalOpen = false" class="modal-btn-secondary">
                Close
              </button>
              <button @click="showAllOpenVendors" class="modal-btn-primary">
                <CheckCircle size="18" class="mr-2" />
                Show Open Vendors
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted, watch } from 'vue';
import { useFormattedString } from '@/composables/core/useFormatVendorName';
import { 
  ChevronRight, 
  ChevronLeft,
  ChevronUp,
  Search, 
  Heart, 
  CheckCircle, 
  Star, 
  Pizza, 
  Coffee, 
  Clock,
  Utensils,
  Soup,
  Sparkles,
  MapPin,
  ArrowLeftRight,
  Salad,
  Home,
  User,
  Grid,
  Layers,
  Bell,
  Sun,
  Moon,
  ShoppingBag
} from 'lucide-vue-next';
import { useFetchVendors } from '@/composables/modules/vendor/useFetchVendors';

const router = useRouter();
const isCloseModalOpen = ref(false);
const { formatString } = useFormattedString();
const selectedVendor = ref(null);
const isSearchFocused = ref(false);
const swiperContainer = ref(null);
const isMobile = ref(window.innerWidth < 768);
const isDarkMode = ref(false);
const viewMode = ref('swiper'); // 'swiper' or 'grid'
const currentVendorIndex = ref(0);

// Swipe functionality
const touchStartX = ref(0);
const touchEndX = ref(0);
const swipeThreshold = 50;

// Define the working hours interface
interface WorkingHour {
  _id: string;
  day: string;
  isActive: boolean;
  openingTime: string;
  closingTime: string;
}

// Define the vendor interface based on the backend structure
interface Vendor {
  _id: string;
  restaurantName: string;
  email: string;
  phoneNumber: string;
  locationName: string;
  address: string;
  category: string;
  isStoreOpen: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  workingHours?: WorkingHour[];
  displayImage?: string;
  packSettings?: {
    limit: number;
    price: number;
    _id: string;
  };
  slug?: string;
}

const { vendors, loading: isLoading } = useFetchVendors();

const searchQuery = ref('');
const isSearching = ref(false);
const searchTimeout = ref<number | null>(null);
const favoriteVendors = reactive<Record<string, boolean>>({});
const currentDay = ref('');
const currentTime = ref('');
const selectedCategories = ref<string[]>([]);

// Food icons for animations
const foodIcons = [Pizza, Coffee, Utensils, Soup, Salad];
const foodIconColors = [
  'text-red-400',
  'text-amber-400',
  'text-green-400',
  'text-purple-400',
  'text-orange-400'
];

// Sample food images for vendors without display images
const foodImages = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
];

// Get a random food image based on vendor ID for consistency
const getRandomFoodImage = (vendor) => {
  const index = vendor._id.charCodeAt(0) % foodImages.length;
  return `${foodImages[index]}?w=500&h=300&fit=crop`;
};

// All available categories
const allCategories = computed(() => {
  const categories = new Set<string>();
  vendors.value?.forEach((vendor: Vendor) => {
    if (vendor.category) {
      categories.add(vendor.category);
    }
  });
  return Array.from(categories);
});

// Toggle category filter
const toggleCategoryFilter = (category: string) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== category);
  } else {
    selectedCategories.value.push(category);
  }
  currentVendorIndex.value = 0; // Reset to first vendor when filtering
};

// Filtered vendors based on selected categories and search
const filteredVendors = computed(() => {
  let filtered = vendors.value || [];
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((vendor: Vendor) => 
      vendor.restaurantName.toLowerCase().includes(query) ||
      vendor.category.toLowerCase().includes(query) ||
      vendor.locationName.toLowerCase().includes(query) ||
      vendor.address?.toLowerCase().includes(query)
    );
  }
  
  // Apply category filter
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter((vendor: Vendor) => 
      selectedCategories.value.includes(vendor.category)
    );
  }
  
  return filtered;
});

// Initialize
onMounted(() => {
  updateCurrentDateTime();
  // Update time every minute
  setInterval(updateCurrentDateTime, 60000);
  
  // Check for mobile
  window.addEventListener('resize', handleResize);
  
  // Initialize with random favorites for demo
  if (vendors.value?.length) {
    vendors.value.forEach((vendor: Vendor) => {
      if (Math.random() > 0.7) { // 30% chance to be favorited
        favoriteVendors[vendor._id] = true;
      }
    });
  }
  
  // Check for dark mode preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
});

// Handle resize for mobile detection
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) {
    viewMode.value = 'swiper';
  }
};

// Toggle theme
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Toggle view mode
const toggleView = (mode) => {
  viewMode.value = mode;
};

// Function to update current date and time
const updateCurrentDateTime = () => {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentDay.value = days[now.getDay()];
  
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  currentTime.value = `${hours}:${minutes}`;
};

// Check if vendor is currently open based on working hours
const isVendorOpen = (vendor: Vendor): boolean => {
  if (!vendor.workingHours || vendor.workingHours.length === 0) {
    return vendor.isStoreOpen; // Fallback to the isStoreOpen flag if no working hours
  }
  
  const todayHours = vendor.workingHours.find(hour => hour.day === currentDay.value);
  
  if (!todayHours || !todayHours.isActive) {
    return false; // Closed if today is not active
  }
  
  // Compare current time with opening and closing times
  return isTimeInRange(currentTime.value, todayHours.openingTime, todayHours.closingTime);
};

// Check if a time is within a range
const isTimeInRange = (time: string, start: string, end: string): boolean => {
  // Convert times to comparable format (minutes since midnight)
  const timeMinutes = convertTimeToMinutes(time);
  const startMinutes = convertTimeToMinutes(start);
  const endMinutes = convertTimeToMinutes(end);
  
  return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
};

// Convert time string (HH:MM) to minutes since midnight
const convertTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Get closing time for a vendor
const getClosingTime = (vendor: Vendor): string => {
  if (!vendor.workingHours || vendor.workingHours.length === 0) {
    return 'Unknown';
  }
  
  const todayHours = vendor.workingHours.find(hour => hour.day === currentDay.value);
  
  if (!todayHours || !todayHours.isActive) {
    return 'Closed today';
  }
  
  return formatTime(todayHours.closingTime);
};

// Format time for display (convert 24h to 12h format)
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Get next opening information for a closed vendor
const getNextOpeningInfo = (vendor: Vendor): string => {
  if (!vendor.workingHours || vendor.workingHours.length === 0) {
    return 'Opening hours unavailable';
  }
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayIndex = days.indexOf(currentDay.value);
  
  // Check if vendor opens later today
  const todayHours = vendor.workingHours.find(hour => hour.day === currentDay.value);
  if (todayHours && todayHours.isActive) {
    const openingMinutes = convertTimeToMinutes(todayHours.openingTime);
    const currentMinutes = convertTimeToMinutes(currentTime.value);
    
    if (currentMinutes < openingMinutes) {
      return `Opens today at ${formatTime(todayHours.openingTime)}`;
    }
  }
  
  // Check next 7 days
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (currentDayIndex + i) % 7;
    const nextDay = days[nextDayIndex];
    const nextDayHours = vendor.workingHours.find(hour => hour.day === nextDay);
    
    if (nextDayHours && nextDayHours.isActive) {
      if (i === 1) {
        return `Opens tomorrow at ${formatTime(nextDayHours.openingTime)}`;
      } else {
        return `Opens ${nextDay} at ${formatTime(nextDayHours.openingTime)}`;
      }
    }
  }
  
  return 'No upcoming opening hours';
};

// Helper function to get a description for a vendor
const getVendorDescription = (vendor: Vendor): string => {
  return `${vendor.category.charAt(0).toUpperCase() + vendor.category.slice(1)} restaurant offering delicious meals at ${vendor.locationName}. Perfect for ${Math.random() > 0.5 ? 'lunch' : 'dinner'}.`;
};

// Helper function to format location
const formatLocation = (location: string): string => {
  return location.length > 20 ? location.substring(0, 20) + '...' : location;
};

// Handle search
const handleSearch = () => {
  isSearching.value = true;
  
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  
  searchTimeout.value = window.setTimeout(() => {
    // Simulate API call delay
    setTimeout(() => {
      isSearching.value = false;
      currentVendorIndex.value = 0; // Reset to first vendor when searching
    }, 800);
  }, 300);
};

// Toggle favorite
const toggleFavorite = (vendorId: string) => {
  favoriteVendors[vendorId] = !favoriteVendors[vendorId];
};

// Handle vendor selection
const handleSelectedVendor = (vendor: Vendor) => {
  selectedVendor.value = vendor;
  
  if(!isVendorOpen(vendor)){
    isCloseModalOpen.value = true;
  } else {
    localStorage.setItem('selected-vendor', JSON.stringify(vendor));
    const formatted = formatString(vendor.restaurantName);
    router.push(`/${formatted}`);
  }
};

// Handle order
const handleOrder = (vendor: Vendor) => {
  localStorage.setItem('selected-vendor', JSON.stringify(vendor));
  const formatted = formatString(vendor.restaurantName);
  router.push(`/${vendor.slug || formatted}`);
};

// Show all open vendors
const showAllOpenVendors = () => {
  isCloseModalOpen.value = false;
  selectedCategories.value = [];
  searchQuery.value = '';
  
  // Find first open vendor
  const openVendors = vendors.value.filter((vendor: Vendor) => isVendorOpen(vendor));
  if (openVendors.length > 0) {
    const openVendorIndex = vendors.value.findIndex(v => v._id === openVendors[0]._id);
    if (openVendorIndex !== -1) {
      currentVendorIndex.value = openVendorIndex;
    }
  }
};

// Reset filters
const resetFilters = () => {
  selectedCategories.value = [];
  searchQuery.value = '';
  currentVendorIndex.value = 0;
};

// Touch event handlers for swipe
const touchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX;
};

const touchMove = (e) => {
  // Optional: add visual feedback during swipe
};

const touchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipeGesture();
};

// Handle swipe gesture
const handleSwipeGesture = () => {
  const swipeDistance = touchEndX.value - touchStartX.value;
  
  if (swipeDistance > swipeThreshold) {
    // Swiped right
    prevVendor();
  } else if (swipeDistance < -swipeThreshold) {
    // Swiped left
    nextVendor();
  }
};

// Navigation for swiper
const nextVendor = () => {
  if (currentVendorIndex.value < filteredVendors.value.length - 1) {
    currentVendorIndex.value++;
  }
};

const prevVendor = () => {
  if (currentVendorIndex.value > 0) {
    currentVendorIndex.value--;
  }
};

// Set current vendor
const setCurrentVendor = (index) => {
  currentVendorIndex.value = index;
};

// Get card position class based on index
const getCardPosition = (index) => {
  if (index === currentVendorIndex.value) {
    return 'current';
  } else if (index === currentVendorIndex.value - 1) {
    return 'prev';
  } else if (index === currentVendorIndex.value + 1) {
    return 'next';
  } else if (index < currentVendorIndex.value) {
    return 'far-left';
  } else {
    return 'far-right';
  }
};

// Get card style based on position
const getCardStyle = (index) => {
  const diff = index - currentVendorIndex.value;
  
  if (diff === 0) {
    return {
      transform: 'translateX(0) scale(1) rotateY(0)',
      zIndex: 30,
      opacity: 1
    };
  } else if (diff === -1) {
    return {
      transform: 'translateX(-85%) scale(0.9) rotateY(5deg)',
      zIndex: 20,
      opacity: 0.7
    };
  } else if (diff === 1) {
    return {
      transform: 'translateX(85%) scale(0.9) rotateY(-5deg)',
      zIndex: 20,
      opacity: 0.7
    };
  } else if (diff < -1) {
    return {
      transform: `translateX(-120%) scale(0.8) rotateY(10deg)`,
      zIndex: 10,
      opacity: 0
    };
  } else {
    return {
      transform: `translateX(120%) scale(0.8) rotateY(-10deg)`,
      zIndex: 10,
      opacity: 0
    };
  }
};

// Random data generators for UI enhancement
const getRandomRating = (vendor) => {
  // Generate a consistent random rating between 3.5 and 5 based on vendor ID
  const hash = vendor._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Math.min(5, 3.5 + (hash % 15) / 10);
};

const getRandomReviews = (vendor) => {
  // Generate a consistent random number of reviews based on vendor ID
  const hash = vendor._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 10 + (hash % 490);
};

const getPopularItems = (vendor) => {
  const items = [
    'Chicken Burger', 'Veggie Pizza', 'Beef Tacos', 'Caesar Salad', 
    'Sushi Platter', 'Pad Thai', 'Butter Chicken', 'Fish & Chips',
    'Margherita Pizza', 'Beef Burger', 'Falafel Wrap', 'Ramen',
    'Steak', 'Pasta Carbonara', 'Fried Rice', 'Burrito'
  ];
  
  // Generate 2-4 consistent random items based on vendor ID
  const hash = vendor._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const count = 2 + (hash % 3);
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const index = (hash + i * 7) % items.length;
    result.push(items[index]);
  }
  
  return result;
};
</script>

<style scoped>
/* Base Styles */
:root {
  --primary: #ef4444;
  --primary-dark: #dc2626;
  --primary-light: #fecaca;
  --secondary: #f97316;
  --text: #1f2937;
  --text-light: #6b7280;
  --bg: #ffffff;
  --bg-dark: #f3f4f6;
}


.vendor-experience {
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
}

/* Animated Background */
.animated-bg {
  background: linear-gradient(135deg, #fee2e2 0%, #fff7ed 100%);
  opacity: 0.5;
}

.dark .animated-bg {
  background: linear-gradient(135deg, #7f1d1d 0%, #7c2d12 100%);
  opacity: 0.1;
}

/* Food Icons Float */
.food-icon-float {
  position: absolute;
  animation: float calc(var(--duration, 5s)) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  opacity: 0.1;
}

/* Text Gradient */
.text-gradient {
  background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

/* Search Container */
.search-container {
  position: relative;
  overflow: hidden;
}

.search-border {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--primary));
  background-size: 200% 100%;
  animation: gradientMove 2s linear infinite;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.search-container:focus-within .search-border {
  transform: scaleX(1);
}

/* Category Pills */
.category-scroller {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-scroller::-webkit-scrollbar {
  display: none;
}

.category-pill {
  position: relative;
  overflow: hidden;
}

.category-pill::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: 0.5s;
}

.category-pill:hover::after {
  left: 100%;
}

/* Status Bar */
.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary);
  position: relative;
}

.pulse-dot::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--primary);
  animation: pulse 2s infinite;
}

/* Loading Spinner */
.loading-container {
  min-height: 200px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--primary);
  border-bottom-color: var(--secondary);
  animation: spin 1.5s linear infinite;
  position: relative;
}

.spinner-food {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: bounce 2s ease infinite;
}

/* Vendor Swiper */
.vendor-swiper-container {
  position: relative;
  padding-bottom: 60px;
}

.swiper-navigation {
  position: relative;
  z-index: 40;
}

.swipe-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.dark .swipe-btn {
  background-color: var(--bg-dark);
  color: var(--primary);
}

.swipe-btn:hover {
  transform: scale(1.1);
  background-color: var(--primary);
  color: white;
}

.swiper-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #e5e7eb;
  transition: all 0.3s ease;
}

.dark .pagination-dot {
  background-color: #4b5563;
}

.pagination-dot.active {
  width: 24px;
  border-radius: 4px;
  background-color: var(--primary);
}

.pagination-dot.before-active,
.pagination-dot.after-active {
  background-color: var(--primary-light);
}

/* Vendor Card Swiper */
.vendor-card-swiper {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform, opacity;
}

.vendor-card-swiper.current {
  z-index: 30;
}

.vendor-card-swiper.prev,
.vendor-card-swiper.next {
  z-index: 20;
}

.vendor-card-swiper.far-left,
.vendor-card-swiper.far-right {
  z-index: 10;
}

.card-content {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.current .card-content {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Status Badge */
.status-badge {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.open {
  background-color: #10b981;
  color: white;
  animation: pulse 2s infinite;
}

.status-badge.closed {
  background-color: #ef4444;
  color: white;
  position: relative;
  overflow: hidden;
}

.status-badge.closed::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shimmer 2s infinite;
}

/* Favorite Button */
.favorite-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.favorite-btn.is-favorite {
  color: #ef4444;
  fill: #ef4444;
  animation: heartBeat 0.3s ease-in-out;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

/* Popular Items */
.popular-item {
  white-space: nowrap;
  animation: fadeIn 0.5s ease-in-out;
}

/* Action Buttons */
.view-menu-btn {
  color: var(--primary);
  transition: all 0.3s ease;
}

.view-menu-btn:hover {
  transform: translateX(4px);
}

.order-btn {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.order-btn.enabled {
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: white;
  box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.4);
}

.order-btn.disabled {
  background-color: #e5e7eb;
  color: #9ca3af;
}

.dark .order-btn.disabled {
  background-color: #374151;
  color: #6b7280;
}

.order-btn.enabled:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.3);
}

/* Swipe Indicator */
.swipe-indicator {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  color: #9ca3af;
  font-size: 0.75rem;
  opacity: 0.7;
  animation: fadeInOut 3s infinite;
}

.swipe-indicator span {
  margin-left: 4px;
}

/* Empty State */
.empty-state {
  min-height: 300px;
}

.empty-plate {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 3s ease-in-out infinite;
}

.dark .empty-plate {
  background-color: #1f2937;
}

/* Bottom Navigation */
.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 0.75rem;
  transition: all 0.3s ease;
}

.nav-btn.active {
  color: var(--primary);
}

.nav-btn-center {
  position: relative;
  margin-top: -30px;
}

.nav-btn-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.3);
  transition: all 0.3s ease;
}

.nav-btn-circle:hover {
  transform: scale(1.1);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.modal-container {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 28rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dark .modal-container {
  background-color: #1f2937;
  color: white;
}

.modal-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -60px auto 20px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  position: relative;
}

.dark .modal-icon {
  background-color: #111827;
}

.modal-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--primary);
  animation: pulse 2s infinite;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
}

.modal-text {
  text-align: center;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.dark .modal-text {
  color: #9ca3af;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.modal-btn-secondary {
  padding: 0.75rem 1.5rem;
  background-color: #f3f4f6;
  color: #1f2937;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.dark .modal-btn-secondary {
  background-color: #374151;
  color: #f9fafb;
}

.modal-btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.modal-btn-secondary:hover,
.modal-btn-primary:hover {
  transform: translateY(-2px);
}

/* Animations */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes gradientMove {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 0%;
  }
}

@keyframes modalPop {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>