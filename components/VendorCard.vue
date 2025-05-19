<template>
  <div 
    :data-vendor-id="vendor._id"
    class="vendor-card bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 relative"
    :class="[
      {'vendor-closed': !isVendorOpen},
      {'animate-slide-up': true},
      {'animate-pulse-subtle': isSuggested}
    ]"
    :style="`--delay: ${0.2 + index * 0.1}s`"
    @click="$emit('select-vendor', vendor)"
    ref="cardRef"
  >
    <!-- Vendor Image with Overlay -->
    <div class="relative overflow-hidden group cursor-pointer">
      <img 
        :src="vendor.displayImage || getRandomFoodImage(vendor)" 
        :alt="vendor.restaurantName" 
        class="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      
      <!-- Parallax effect on hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300 parallax-bg"></div>
      
      <!-- Floating food icons -->
      <div class="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div v-for="i in 5" :key="i" class="absolute food-particle" :style="`--index: ${i}`">
          <component :is="foodIcons[i % foodIcons.length]" size="16" :class="foodIconColors[i % foodIconColors.length]" />
        </div>
      </div>
      
      <!-- Action buttons -->
      <div class="absolute top-3 right-3 flex space-x-2 z-10">
        <button 
          class="bg-white rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          @click.stop="toggleFavorite"
        >
          <Heart 
            size="18" 
            class="heart-icon transition-colors duration-300"
            :class="favorite ? 'text-red-500 fill-red-500' : 'text-gray-600'" 
          />
        </button>
      </div>
      
      <!-- Restaurant name and category on image -->
      <div class="absolute bottom-0 left-0 w-full p-4 z-10">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-bold text-lg text-white drop-shadow-md group-hover:text-red-100 transition-colors duration-300 transform group-hover:translate-x-1">
              {{ vendor.restaurantName }}
            </h3>
            <div class="flex items-center mt-1">
              <span class="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full mr-2 transform transition-all duration-300 group-hover:scale-105 group-hover:bg-white/30">
                {{ vendor.category }}
              </span>
              <div class="flex items-center text-white text-xs">
                <MapPin size="12" class="mr-1" />
                <span class="truncate max-w-[100px]">{{ formatLocation(vendor.locationName) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Open/Closed Status with enhanced animation -->
          <div>
            <div v-if="isVendorOpen" class="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center status-pulse">
              <CheckCircle size="12" class="mr-1" />
              Open
            </div>
            <div v-else class="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center closed-badge">
              <Clock size="12" class="mr-1" />
              Closed
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Vendor Details -->
    <div class="p-4 relative overflow-hidden">
      <!-- Animated background pattern -->
      <div class="absolute inset-0 bg-pattern opacity-5"></div>
      
      <!-- Description -->
      <p class="text-sm text-gray-600 mb-3 relative z-10">{{ getVendorDescription(vendor) }}</p>
      
      <!-- Hours -->
      <div class="text-sm mb-4 relative z-10">
        <div class="flex items-center">
          <Clock size="14" class="mr-1 text-gray-500" />
          <span v-if="isVendorOpen" class="text-green-600 font-medium">
            Open until {{ getClosingTime(vendor) }}
          </span>
          <span v-else class="text-red-600">
            {{ getNextOpeningInfo(vendor) }}
          </span>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex justify-between items-center relative z-10">
        <button 
          class="text-sm text-red-600 hover:text-red-700 font-medium flex items-center group"
          @click.stop="$emit('select-vendor', vendor)"
        >
          View Menu
          <ChevronRight size="16" class="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        
        <button 
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center order-button"
          :class="isVendorOpen ? 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg' : 'bg-gray-200 text-gray-500 cursor-not-allowed'"
          :disabled="!isVendorOpen"
          @click.stop="isVendorOpen ? $emit('order', vendor) : null"
        >
          <ShoppingBag size="16" class="mr-1" />
          {{ isVendorOpen ? 'Order Now' : 'Closed' }}
        </button>
      </div>
    </div>
    
    <!-- Overlay for closed vendors with enhanced animation -->
    <div 
      v-if="!isVendorOpen" 
      class="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 transition-opacity duration-300"
      @click.stop="$emit('select-vendor', vendor)"
    >
      <div class="bg-white/90 p-4 rounded-xl shadow-lg text-center transform transition-transform duration-300 closed-message">
        <Clock size="28" class="mx-auto mb-2 text-red-500 animate-spin-slow" />
        <p class="font-bold text-red-600 text-lg">Currently Closed</p>
        <p class="text-sm text-gray-600">{{ getNextOpeningInfo(vendor) }}</p>
      </div>
    </div>
    
    <!-- 3D flip effect overlay (hidden by default) -->
    <div class="card-back absolute inset-0 bg-white rounded-xl p-4 flex flex-col justify-between transform rotateY-180 backface-hidden opacity-0">
      <div class="text-center">
        <h3 class="font-bold text-xl mb-2">{{ vendor.restaurantName }}</h3>
        <div class="w-16 h-1 bg-red-500 mx-auto mb-4"></div>
      </div>
      
      <div class="space-y-3">
        <div class="flex items-center">
          <MapPin size="16" class="text-red-500 mr-2" />
          <p class="text-sm text-gray-700">{{ vendor.address }}</p>
        </div>
        <div class="flex items-center">
          <Phone size="16" class="text-red-500 mr-2" />
          <p class="text-sm text-gray-700">{{ vendor.phoneNumber || 'No phone number' }}</p>
        </div>
        <div class="flex items-center">
          <Mail size="16" class="text-red-500 mr-2" />
          <p class="text-sm text-gray-700 truncate">{{ vendor.email || 'No email' }}</p>
        </div>
      </div>
      
      <button 
        class="mt-4 w-full py-2 bg-red-500 text-white rounded-lg flex items-center justify-center"
        @click.stop="$emit('select-vendor', vendor)"
      >
        <Utensils size="16" class="mr-2" />
        View Full Details
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ChevronRight, Heart, CheckCircle, Clock, ShoppingBag, MapPin, Pizza, Coffee, Utensils, Soup, Salad, Phone, Mail } from 'lucide-vue-next';
import { useSwipe } from '@vueuse/core';

// Props
const props = defineProps({
  vendor: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  },
  isVendorOpen: {
    type: Boolean,
    required: true
  },
  favorite: {
    type: Boolean,
    default: false
  },
  getClosingTime: {
    type: Function,
    required: true
  },
  getNextOpeningInfo: {
    type: Function,
    required: true
  },
  getVendorDescription: {
    type: Function,
    required: true
  },
  formatLocation: {
    type: Function,
    required: true
  },
  isSuggested: {
    type: Boolean,
    default: false
  }
});

// Emit events
const emit = defineEmits(['toggle-favorite', 'select-vendor', 'order', 'swipe-left', 'swipe-right']);

// Food icons for floating particles
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

// Card ref for swipe functionality
const cardRef = ref(null);
const isFlipped = ref(false);

// Toggle favorite with animation
const toggleFavorite = () => {
  emit('toggle-favorite', props.vendor._id);
  
  // Add heart animation
  const heartEl = document.querySelector(`[data-vendor-id="${props.vendor._id}"] .heart-icon`);
  if (heartEl) {
    heartEl.classList.add('animate-heart-pop');
    setTimeout(() => {
      heartEl.classList.remove('animate-heart-pop');
    }, 600);
  }
};

// Flip card effect
const flipCard = () => {
  isFlipped.value = !isFlipped.value;
  const card = cardRef.value;
  if (card) {
    if (isFlipped.value) {
      card.classList.add('is-flipped');
    } else {
      card.classList.remove('is-flipped');
    }
  }
};

// Setup swipe functionality
const { isSwiping, direction } = useSwipe(cardRef.value, {
  threshold: 30,
  onSwipe(e) {
    if (direction.value === 'left') {
      emit('swipe-left', props.vendor);
      animateSwipe('left');
    } else if (direction.value === 'right') {
      emit('swipe-right', props.vendor);
      animateSwipe('right');
    }
  }
});

// Animate swipe effect
const animateSwipe = (direction) => {
  if (!cardRef.value) return;
  
  const card = cardRef.value;
  card.style.transition = 'transform 0.5s ease-out';
  card.style.transform = direction === 'left' 
    ? 'translateX(-120%) rotate(-5deg)' 
    : 'translateX(120%) rotate(5deg)';
  
  setTimeout(() => {
    card.style.transition = 'none';
    card.style.transform = '';
  }, 500);
};

// Setup parallax effect on card hover
const setupParallax = () => {
  if (!cardRef.value) return;
  
  const card = cardRef.value;
  const parallaxBg = card.querySelector('.parallax-bg');
  
  card.addEventListener('mousemove', (e) => {
    if (!parallaxBg) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = x / rect.width;
    const yPercent = y / rect.height;
    
    const moveX = (xPercent - 0.5) * 10;
    const moveY = (yPercent - 0.5) * 10;
    
    parallaxBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    if (!parallaxBg) return;
    parallaxBg.style.transform = 'translate(0, 0)';
  });
};

// Initialize food particles
const initFoodParticles = () => {
  if (!cardRef.value) return;
  
  const particles = cardRef.value.querySelectorAll('.food-particle');
  particles.forEach((particle, i) => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = i * 0.2;
    
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.animationDelay = `${delay}s`;
  });
};

onMounted(() => {
  // Initialize parallax effect
  setupParallax();
  
  // Initialize floating food particles
  initFoodParticles();
});

onUnmounted(() => {
  // Clean up event listeners if needed
});
</script>

<style scoped>
.vendor-card {
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-style: preserve-3d;
  perspective: 1000px;
}

.vendor-card:hover {
  transform: translateY(-5px);
}

.vendor-closed {
  filter: grayscale(30%);
}

.vendor-closed:hover {
  filter: grayscale(10%);
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
  animation-delay: var(--delay, 0s);
}

.animate-pulse-subtle {
  animation: pulseShadow 3s infinite;
}

.status-pulse {
  animation: statusPulse 2s infinite;
}

.closed-badge {
  position: relative;
  overflow: hidden;
}

.closed-badge::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shimmer 2s infinite;
}

.closed-message {
  animation: floatUpDown 3s ease-in-out infinite;
}

.order-button {
  position: relative;
  overflow: hidden;
}

.order-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: buttonShimmer 3s infinite;
}

.food-particle {
  position: absolute;
  animation: floatAround 5s ease-in-out infinite;
  animation-delay: calc(var(--index) * 0.5s);
}

.animate-heart-pop {
  animation: heartPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.animate-spin-slow {
  animation: spinSlow 6s linear infinite;
}

.bg-pattern {
  background-image: radial-gradient(circle, #f0f0f0 1px, transparent 1px);
  background-size: 20px 20px;
}

.is-flipped .card-back {
  opacity: 1;
  transform: rotateY(0deg);
}

.is-flipped > :not(.card-back) {
  opacity: 0;
}

.card-back {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotateY-180 {
  transform: rotateY(180deg);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseShadow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
  50% {
    box-shadow: 0 0 10px 0 rgba(239, 68, 68, 0.3);
  }
}

@keyframes statusPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
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

@keyframes buttonShimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

@keyframes floatUpDown {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes floatAround {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, -10px) rotate(90deg);
  }
  50% {
    transform: translate(0, -20px) rotate(180deg);
  }
  75% {
    transform: translate(-10px, -10px) rotate(270deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

@keyframes heartPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes spinSlow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>