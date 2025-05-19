<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <!-- Animated background elements -->
      <div class="fixed inset-0 z-0 overflow-hidden opacity-20">
        <div v-for="i in 5" :key="i" 
             class="absolute rounded-full bg-gradient-to-r from-orange-300 to-orange-500"
             :style="{
               width: `${Math.random() * 300 + 100}px`,
               height: `${Math.random() * 300 + 100}px`,
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
               opacity: Math.random() * 0.5 + 0.1,
               animationDelay: `${Math.random() * 5}s`,
               animationDuration: `${Math.random() * 20 + 15}s`
             }"
             :class="`floating-bubble bubble-${i}`">
        </div>
      </div>
  
      <div class="max-w-7xl mx-auto relative z-10">
        <header class="mb-12">
          <h1 class="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
            <span class="inline-block animate-slide-in-right" style="animation-delay: 0.1s">Plans</span>
          </h1>
          <p class="text-gray-600 animate-slide-in-right" style="animation-delay: 0.2s">
            Choose the perfect plan to grow your business
          </p>
        </header>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-container">
          <!-- Promotional Banner -->
          <div 
            class="promo-card bg-gradient-to-br from-[#FEE8DD] to-[#FFDAC8] rounded-2xl p-8 relative overflow-hidden shadow-lg animate-slide-in-up"
            style="animation-delay: 0.3s"
            @mouseenter="animatePromoCard"
            @mouseleave="resetPromoCard"
            ref="promoCard"
          >
            <div class="relative z-10">
              <div class="text-[#F47B4D] mb-6 transform transition-transform duration-500 promo-icon">
                <ShoppingBag size="48" />
              </div>
              <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                Promote your brand on Gofer for a token!
              </h2>
              <p class="text-gray-700 text-lg mb-6">Reach more audience, make more sales.</p>
              
              <button 
                class="bg-white text-[#F47B4D] px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center group"
                @click="showPromoInfo = true"
              >
                Learn more
                <ArrowRight class="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" size="18" />
              </button>
            </div>
            
            <!-- Animated background pattern -->
            <div class="absolute right-0 bottom-0 opacity-40 promo-pattern">
              <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M280 20C220 60 180 140 200 240C220 340 120 380 20 280" 
                      stroke="#F47B4D" stroke-width="40" stroke-linecap="round" 
                      class="animate-draw-path" />
              </svg>
            </div>
            
            <!-- Floating elements -->
            <div class="absolute top-10 right-10 animate-float-slow opacity-30">
              <CircleDot size="24" class="text-[#F47B4D]" />
            </div>
            <div class="absolute bottom-20 left-10 animate-float opacity-30">
              <CircleDot size="16" class="text-[#F47B4D]" />
            </div>
          </div>
  
          <!-- Plan Cards -->
          <div 
            v-for="(plan, index) in plans" 
            :key="plan.id"
            class="plan-card bg-white rounded-2xl overflow-hidden transition-all duration-500 relative group"
            :class="{'animate-slide-in-up': true, 'hover:shadow-2xl': true, 'active-plan': isSubscribed(plan.id)}"
            :style="{
              'animation-delay': `${0.4 + index * 0.1}s`,
              'transform-style': 'preserve-3d',
            }"
            @mouseenter="animatePlanCard($event, index)"
            @mouseleave="resetPlanCard($event)"
            ref="planCards"
          >
            <!-- Glow effect on hover -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10">
              <div class="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-300 blur-xl transform scale-105"></div>
            </div>
            
            <!-- Popular badge -->
            <div v-if="plan.isPopular" class="absolute -right-12 top-8 rotate-45 z-20">
              <div class="bg-[#F47B4D] text-white text-xs font-bold px-12 py-2 shadow-md">
                Popular
              </div>
            </div>
            
            <!-- Card content -->
            <div class="p-8 relative z-10">
              <div class="flex items-start justify-between mb-6">
                <h3 class="text-sm font-bold text-gray-500 tracking-wider">{{ plan.name }}</h3>
                <div v-if="isSubscribed(plan.id)" 
                     class="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                  Active
                </div>
              </div>
              
              <div class="flex items-baseline mb-8">
                <span class="text-4xl font-bold text-gray-800 price-text">₦{{ formatNumber(plan.price) }}</span>
                <span class="text-gray-500 ml-2">/ {{ plan.interval === 'week' ? 'Week' : 'Month' }}</span>
              </div>
  
              <ul class="space-y-5 mb-8">
                <li v-for="(feature, idx) in plan.features" :key="idx" 
                    class="flex items-start feature-item"
                    :style="{ 'animation-delay': `${idx * 0.1}s` }">
                  <div class="text-[#F47B4D] mr-3 mt-0.5 feature-icon">
                    <CheckCircle size="20" />
                  </div>
                  <span class="text-gray-700">{{ feature }}</span>
                </li>
              </ul>
            </div>
            
            <!-- Card footer with action button -->
            <div class="px-8 pb-8 pt-4 relative z-10">
              <button 
                @click="openModal(plan.id)" 
                class="w-full py-4 rounded-md font-medium transition-all duration-500 relative overflow-hidden shadow-md"
                :class="isSubscribed(plan.id) ? 
                  'bg-white text-[#F47B4D] border-2 border-[#F47B4D]' : 
                  'bg-[#F47B4D] text-white hover:bg-[#E06A3C]'"
              >
                <span class="relative z-10 flex items-center justify-center">
                  <Loader2 v-if="isLoading && selectedPlan === plan.id" class="animate-spin mr-2" size="18" />
                  <span v-if="isSubscribed(plan.id)">Manage Plan</span>
                  <span v-else>Choose Plan</span>
                </span>
                
                <!-- Button hover effect -->
                <div class="absolute inset-0 w-full h-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                     :class="isSubscribed(plan.id) ? 'bg-[#F47B4D]' : 'bg-[#E06A3C]'"></div>
              </button>
            </div>
            
            <!-- Decorative elements -->
            <div class="absolute top-0 left-0 w-full h-1" 
                 :class="plan.isPopular ? 'bg-[#F47B4D]' : 'bg-gray-200'"></div>
            
            <div class="absolute bottom-0 right-0 p-4 opacity-10">
              <ShoppingBag size="64" class="text-[#F47B4D]" />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Confirmation Modal -->
      <Teleport to="body">
        <Transition name="modal-fancy">
          <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" 
                 @click="closeModal"
                 :class="{'animate-fade-in': showModal}"></div>
            
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden modal-card">
              <!-- Modal header with decorative element -->
              <div class="h-2 bg-[#F47B4D] w-full"></div>
              
              <div class="p-8">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="text-2xl font-bold text-gray-800">Confirm Subscription</h3>
                  <button @click="closeModal" 
                          class="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
                    <X size="20" />
                  </button>
                </div>
                
                <p class="text-gray-600 mb-8 text-lg">
                  Are you sure you want to {{ isSubscribed(selectedPlan) ? 'manage' : 'subscribe to' }} the {{ selectedPlan ? getPlanName(selectedPlan) : '' }} plan?
                </p>
                
                <div class="bg-gray-50 p-6 rounded-md mb-8 border border-gray-100">
                  <div class="flex justify-between mb-4">
                    <span class="text-gray-600">Plan:</span>
                    <span class="font-medium">{{ selectedPlan ? getPlanName(selectedPlan) : '' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Price:</span>
                    <span class="font-medium">
                      {{ selectedPlan ? `₦${formatNumber(getPlanPrice(selectedPlan))} / ${getPlanInterval(selectedPlan)}` : '' }}
                    </span>
                  </div>
                </div>
                
                <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button 
                    @click="closeModal" 
                    class="py-3 border-2 border-gray-300 text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-50 sm:flex-1 font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    @click="confirmSubscription" 
                    class="py-3 bg-[#F47B4D] text-white rounded-md transition-all duration-300 hover:bg-[#E06A3C] sm:flex-1 flex justify-center items-center font-medium relative overflow-hidden"
                  >
                    <div class="relative z-10 flex items-center">
                      <Loader2 v-if="isLoading" class="animate-spin mr-2" size="18" />
                      <span>Confirm</span>
                    </div>
                    
                    <!-- Button hover effect -->
                    <div class="absolute inset-0 w-full h-full bg-[#E06A3C] scale-x-0 hover:scale-x-100 origin-left transition-transform duration-500"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
  
      <!-- Promo Info Modal -->
      <Teleport to="body">
        <Transition name="modal-fancy">
          <div v-if="showPromoInfo" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" 
                 @click="showPromoInfo = false"
                 :class="{'animate-fade-in': showPromoInfo}"></div>
            
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden modal-card">
              <div class="h-2 bg-[#F47B4D] w-full"></div>
              
              <div class="p-8">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="text-2xl font-bold text-gray-800">Promotion Details</h3>
                  <button @click="showPromoInfo = false" 
                          class="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
                    <X size="20" />
                  </button>
                </div>
                
                <div class="mb-6 text-[#F47B4D]">
                  <ShoppingBag size="48" />
                </div>
                
                <p class="text-gray-600 mb-4">
                  Promote your restaurant on Gofer and reach thousands of potential customers every day.
                </p>
                
                <ul class="space-y-3 mb-6">
                  <li v-for="(benefit, idx) in promoBenefits" :key="idx" class="flex items-start">
                    <div class="text-[#F47B4D] mr-3 mt-0.5">
                      <CheckCircle size="18" />
                    </div>
                    <span class="text-gray-700">{{ benefit }}</span>
                  </li>
                </ul>
                
                <button 
                  @click="showPromoInfo = false" 
                  class="w-full py-3 bg-[#F47B4D] text-white rounded-md transition-all duration-300 hover:bg-[#E06A3C] font-medium"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
  
      <!-- Success Toast -->
      <Transition name="toast-fancy">
        <div 
          v-if="showToast" 
          class="fixed bottom-6 right-6 bg-white text-gray-800 px-6 py-4 rounded-md shadow-2xl flex items-center space-x-3 z-50 toast-card"
        >
          <div class="bg-green-100 p-2 rounded-full">
            <CheckCircle size="20" class="text-green-600" />
          </div>
          <div>
            <p class="font-medium">Success!</p>
            <p class="text-gray-600 text-sm">{{ toastMessage }}</p>
          </div>
          <button @click="showToast = false" class="ml-4 text-gray-400 hover:text-gray-600">
            <X size="16" />
          </button>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { ShoppingBag, CheckCircle, X, Loader2, ArrowRight, CircleDot } from 'lucide-vue-next'
  import { useSubscriptions } from '~/composables/useSubscriptions'
  
  // Get subscription data from composable
  const { 
    plans, 
    isLoading, 
    subscribe, 
    cancelSubscription, 
    isSubscribed 
  } = useSubscriptions()
  
  // Modal states
  const showModal = ref(false)
  const showPromoInfo = ref(false)
  const selectedPlan = ref<string | null>(null)
  
  // Toast state
  const showToast = ref(false)
  const toastMessage = ref('')
  
  // Refs for animation
  const promoCard = ref<HTMLElement | null>(null)
  const planCards = ref<HTMLElement[]>([])
  
  // Promo benefits
  const promoBenefits = reactive([
    'Increased visibility to thousands of potential customers',
    'Featured placement in search results and recommendations',
    'Professional marketing campaigns tailored to your brand',
    'Detailed analytics and performance tracking',
    'Priority customer support'
  ])
  
  // Helper functions
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
  const getPlanName = (planId: string): string => {
    const plan = plans.find(p => p.id === planId)
    return plan ? plan.name : ''
  }
  
  const getPlanPrice = (planId: string): number => {
    const plan = plans.find(p => p.id === planId)
    return plan ? plan.price : 0
  }
  
  const getPlanInterval = (planId: string): string => {
    const plan = plans.find(p => p.id === planId)
    return plan ? (plan.interval === 'week' ? 'Week' : 'Month') : ''
  }
  
  // Animation functions
  const animatePromoCard = () => {
    if (!promoCard.value) return
    promoCard.value.style.transform = 'translateY(-5px)'
    
    const icon = promoCard.value.querySelector('.promo-icon')
    if (icon) {
      icon.classList.add('animate-bounce')
    }
    
    const pattern = promoCard.value.querySelector('.promo-pattern')
    if (pattern) {
      pattern.classList.add('animate-spin-slow')
    }
  }
  
  const resetPromoCard = () => {
    if (!promoCard.value) return
    promoCard.value.style.transform = 'translateY(0)'
    
    const icon = promoCard.value.querySelector('.promo-icon')
    if (icon) {
      icon.classList.remove('animate-bounce')
    }
    
    const pattern = promoCard.value.querySelector('.promo-pattern')
    if (pattern) {
      pattern.classList.remove('animate-spin-slow')
    }
  }
  
  const animatePlanCard = (event: MouseEvent, index: number) => {
    const card = planCards.value[index]
    if (!card) return
    
    // 3D tilt effect based on mouse position
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateY = (x - centerX) / 20
    const rotateX = (centerY - y) / 20
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    
    // Animate price text
    const priceText = card.querySelector('.price-text')
    if (priceText) {
      priceText.classList.add('text-[#F47B4D]', 'scale-110')
    }
    
    // Animate feature items
    const featureItems = card.querySelectorAll('.feature-item')
    featureItems.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('feature-highlight')
      }, i * 50)
    })
    
    // Animate feature icons
    const featureIcons = card.querySelectorAll('.feature-icon')
    featureIcons.forEach((icon, i) => {
      setTimeout(() => {
        icon.classList.add('animate-ping-once')
      }, i * 50)
    })
  }
  
  const resetPlanCard = (event: MouseEvent) => {
    const card = event.currentTarget as HTMLElement
    if (!card) return
    
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    
    // Reset price text
    const priceText = card.querySelector('.price-text')
    if (priceText) {
      priceText.classList.remove('text-[#F47B4D]', 'scale-110')
    }
    
    // Reset feature items
    const featureItems = card.querySelectorAll('.feature-item')
    featureItems.forEach(item => {
      item.classList.remove('feature-highlight')
    })
    
    // Reset feature icons
    const featureIcons = card.querySelectorAll('.feature-icon')
    featureIcons.forEach(icon => {
      icon.classList.remove('animate-ping-once')
    })
  }
  
  // Modal functions
  const openModal = (planId: string) => {
    selectedPlan.value = planId
    showModal.value = true
  }
  
  const closeModal = () => {
    showModal.value = false
  }
  
  const showSuccessToast = (message: string) => {
    toastMessage.value = message
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 5000)
  }
  
  const confirmSubscription = async () => {
    if (!selectedPlan.value) return
    
    const planName = getPlanName(selectedPlan.value)
    
    if (isSubscribed(selectedPlan.value)) {
      const success = await cancelSubscription()
      if (success) {
        closeModal()
        showSuccessToast(`Successfully canceled ${planName} subscription!`)
      }
    } else {
      const success = await subscribe(selectedPlan.value)
      if (success) {
        closeModal()
        showSuccessToast(`Successfully subscribed to ${planName}!`)
      }
    }
  }


  definePageMeta({
      layout: 'dashboard'
  })
  
  // Initialize animations
  onMounted(() => {
    // Animate feature items on initial load
    setTimeout(() => {
      document.querySelectorAll('.feature-item').forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('animate-slide-in-right')
        }, i * 50)
      })
    }, 800)
  })
  </script>
  
  <style scoped>
  /* Base animations */
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
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
  
  @keyframes floatSlow {
    0%, 100% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(-15px) rotate(5deg);
    }
  }
  
  @keyframes spinSlow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes drawPath {
    0% {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  
  @keyframes pingOnce {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes floatBubble {
    0% {
      transform: translate(0, 0) rotate(0);
    }
    33% {
      transform: translate(30px, -50px) rotate(10deg);
    }
    66% {
      transform: translate(-20px, -100px) rotate(-5deg);
    }
    100% {
      transform: translate(0, -150px) rotate(0);
      opacity: 0;
    }
  }
  
  /* Applied animations */
  .animate-slide-in-right {
    animation: slideInRight 0.6s ease-out forwards;
  }
  
  .animate-slide-in-up {
    animation: slideInUp 0.6s ease-out forwards;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: floatSlow 6s ease-in-out infinite;
  }
  
  .animate-spin-slow {
    animation: spinSlow 20s linear infinite;
  }
  
  .animate-draw-path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawPath 3s ease-out forwards;
  }
  
  .animate-ping-once {
    animation: pingOnce 0.5s ease-out;
  }
  
  /* Floating bubbles */
  .floating-bubble {
    animation: floatBubble 15s linear infinite;
  }
  
  .bubble-1 { animation-delay: 0s; }
  .bubble-2 { animation-delay: 3s; }
  .bubble-3 { animation-delay: 6s; }
  .bubble-4 { animation-delay: 9s; }
  .bubble-5 { animation-delay: 12s; }
  
  /* Card styles */
  .plan-card {
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .active-plan {
    border: 2px solid #F47B4D;
    box-shadow: 0 10px 30px -5px rgba(244, 123, 77, 0.2);
  }
  
  .price-text {
    transition: all 0.3s ease;
    transform-origin: left;
  }
  
  .feature-item {
    transition: all 0.3s ease;
    padding: 8px;
    border-radius: 8px;
  }
  
  .feature-highlight {
    background-color: rgba(244, 123, 77, 0.05);
    transform: translateX(5px);
  }
  
  /* 3D perspective container */
  .perspective-container {
    perspective: 1000px;
  }
  
  /* Promo card */
  .promo-card {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .promo-pattern {
    transition: all 0.5s ease;
  }
  
  /* Modal animations */
  .modal-fancy-enter-active,
  .modal-fancy-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .modal-fancy-enter-from .modal-card,
  .modal-fancy-leave-to .modal-card {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  
  .modal-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Toast animations */
  .toast-fancy-enter-active,
  .toast-fancy-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .toast-fancy-enter-from,
  .toast-fancy-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .toast-card {
    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
               float 3s ease-in-out 0.4s infinite;
  }
  </style>