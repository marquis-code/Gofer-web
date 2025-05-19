<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 overflow-hidden">
    <!-- Page Loader -->
    <Transition name="fade">
      <div v-if="isLoading" class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-rose-50">
        <div class="relative w-24 h-24 md:w-32 md:h-32">
          <!-- Animated plate -->
          <div class="absolute inset-0 rounded-full bg-white shadow-lg animate-pulse"></div>
          
          <!-- Food icons -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="relative">
              <div class="absolute -top-10 -left-8 animate-float-staggered" style="animation-delay: 0s;">
                <UtensilsIcon class="h-6 w-6 text-amber-500" />
              </div>
              <div class="absolute -top-6 left-6 animate-float-staggered" style="animation-delay: 0.5s;">
                <CakeIcon class="h-6 w-6 text-rose-500" />
              </div>
              <div class="absolute top-4 -left-10 animate-float-staggered" style="animation-delay: 1s;">
                <CoffeeIcon class="h-6 w-6 text-amber-700" />
              </div>
              <div class="absolute top-6 left-4 animate-float-staggered" style="animation-delay: 1.5s;">
                <SaladIcon class="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
          
          <!-- Circular spinner -->
          <svg class="absolute inset-0 animate-spin-slow" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="url(#gradient)" 
              stroke-width="3" 
              stroke-linecap="round"
              stroke-dasharray="70 30"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f59e0b" />
                <stop offset="100%" stop-color="#e11d48" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <h2 class="mt-8 text-2xl font-bold text-gray-800 animate-pulse">
          Preparing Your Checkout
        </h2>
        <p class="mt-2 text-gray-600">Just a moment while we get everything ready...</p>
        
        <!-- Loading progress bar -->
        <div class="w-64 h-1.5 mt-6 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full animate-progress"
          ></div>
        </div>
      </div>
    </Transition>

    <!-- Floating Back Button -->
    <button 
      @click="goBack" 
      class="fixed top-4 left-4 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 group"
    >
      <ArrowLeftIcon class="h-5 w-5 text-gray-700 group-hover:text-rose-500 transition-colors" />
      <span class="absolute left-full ml-2 px-2 py-1 text-sm font-medium text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Back to Menu
      </span>
    </button>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-16 md:py-20">
      <!-- Checkout Header -->
      <div class="text-center mb-10 animate-fade-in-down">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Complete Your Order</h1>
        <p class="text-gray-600">
          <span v-if="vendor?.restaurantName">{{ vendor.restaurantName }}</span>
          <span v-else>Restaurant</span>
          <span class="mx-2">•</span>
          <span v-if="cart?.totalItems.value" class="text-rose-500 font-medium">{{ cart.totalItems.value }} items</span>
          <span v-else class="text-rose-500 font-medium">Your cart</span>
        </p>
      </div>

      <!-- Checkout Steps -->
      <div class="flex justify-center mb-10 overflow-x-auto pb-2 animate-fade-in">
        <div class="flex items-center space-x-2 md:space-x-4">
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
              <ShoppingCartIcon class="h-5 w-5" />
            </div>
            <span class="mt-2 text-xs md:text-sm font-medium text-gray-700">Cart</span>
          </div>
          
          <div class="w-10 md:w-16 h-0.5 bg-rose-300"></div>
          
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md relative">
              <MapPinIcon class="h-5 w-5" />
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-rose-300 rounded-full animate-ping-slow"></span>
            </div>
            <span class="mt-2 text-xs md:text-sm font-medium text-gray-700">Delivery</span>
          </div>
          
          <div class="w-10 md:w-16 h-0.5 bg-gray-300"></div>
          
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
              <CreditCardIcon class="h-5 w-5" />
            </div>
            <span class="mt-2 text-xs md:text-sm font-medium text-gray-500">Payment</span>
          </div>
          
          <div class="w-10 md:w-16 h-0.5 bg-gray-300"></div>
          
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
              <CheckIcon class="h-5 w-5" />
            </div>
            <span class="mt-2 text-xs md:text-sm font-medium text-gray-500">Confirm</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Column: Order Details -->
        <div class="w-full lg:w-7/12 animate-slide-in-left" style="--delay: 0.2s">
          <!-- Order Summary Card -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100 transform transition-all duration-500 hover:shadow-2xl">
            <div class="p-6 md:p-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800 flex items-center">
                  <ShoppingBagIcon class="h-5 w-5 mr-2 text-rose-500" />
                  <span class="relative">
                    Order Summary
                    <span class="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-rose-400 rounded-full"></span>
                  </span>
                </h2>
                <span 
                  v-if="cart?.totalItems.value > 0"
                  class="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm font-medium animate-pulse-slow"
                >
                  {{ cart.totalItems.value }} items
                </span>
              </div>

              <!-- Loading State -->
              <div v-if="cart.loading.value" class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
              </div>

              <!-- Empty Cart State -->
              <div v-else-if="cart.totalItems.value === 0" class="text-center py-12">
                <div class="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-bounce-slow">
                  <ShoppingCartIcon class="h-10 w-10 text-gray-400" />
                </div>
                <h3 class="text-lg font-medium text-gray-700 mb-2">Your cart is empty</h3>
                <p class="text-gray-500 mb-6">Add some delicious items to get started</p>
                <button
                  @click="goBack"
                  class="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Browse Menu
                </button>
              </div>

              <!-- Cart Items -->
              <div v-else class="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <div 
                  v-for="(pack, packIndex) in cart.packs.value" 
                  :key="pack.id"
                  class="border border-gray-100 rounded-xl p-5 hover:border-rose-200 transition-all duration-300 hover:shadow-md bg-white animate-fade-in"
                  :style="{ animationDelay: `${packIndex * 0.1}s` }"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm">
                        {{ packIndex + 1 }}
                      </div>
                      <h3 class="ml-3 font-medium text-gray-800">Pack {{ packIndex + 1 }}</h3>
                    </div>
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {{ pack.items.length }} items
                    </span>
                  </div>

                  <div 
                    v-for="(item, itemIndex) in pack.items" 
                    :key="`${pack.id}-${itemIndex}`"
                    class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group animate-slide-in"
                    :style="{ animationDelay: `${packIndex * 0.1 + itemIndex * 0.05}s` }"
                  >
                    <div class="flex items-center">
                      <div class="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                        <img 
                          :src="item.image" 
                          :alt="item.name"
                          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div class="ml-4">
                        <h4 class="font-medium text-gray-800 group-hover:text-rose-600 transition-colors">{{ item.name }}</h4>
                        <p class="text-sm text-gray-500">₦{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-medium text-gray-800">₦{{ formatPrice(item.price * item.quantity) }}</p>
                      <div class="flex items-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          @click="decrementItemQuantity(packIndex, itemIndex)"
                          class="w-6 h-6 rounded-l-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <MinusIcon class="h-3 w-3 text-gray-600" />
                        </button>
                        <span class="w-6 text-center text-xs font-medium bg-gray-50">{{ item.quantity }}</span>
                        <button 
                          @click="incrementItemQuantity(packIndex, itemIndex)"
                          class="w-6 h-6 rounded-r-md bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                        >
                          <PlusIcon class="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div v-if="pack.note" class="mt-3 p-3 bg-amber-50 rounded-lg text-sm text-amber-800 border-l-2 border-amber-400">
                    <span class="font-medium">Note:</span> {{ pack.note }}
                  </div>

                  <button
                    @click="openPackNoteModal(packIndex)"
                    class="mt-3 text-xs text-rose-500 hover:text-rose-700 transition-colors flex items-center transform hover:translate-x-1"
                  >
                    <PencilIcon class="h-3 w-3 mr-1" />
                    {{ pack.note ? "Edit" : "Add" }} special instructions
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Delivery Method Card -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100 transform transition-all duration-500 hover:shadow-2xl animate-slide-in-left" style="--delay: 0.4s">
            <div class="p-6 md:p-8">
              <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <TruckIcon class="h-5 w-5 mr-2 text-rose-500" />
                <span class="relative">
                  Delivery Method
                  <span class="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-rose-400 rounded-full"></span>
                </span>
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  @click="setDeliveryMethod('delivery')"
                  class="relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-md"
                  :class="[
                    deliveryMethod === 'delivery' 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  <div class="p-5">
                    <div class="flex items-center mb-3">
                      <div 
                        class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                        :class="deliveryMethod === 'delivery' ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-500'"
                      >
                        <TruckIcon class="h-5 w-5" />
                      </div>
                      <div class="ml-3">
                        <h3 class="font-medium text-gray-800">Delivery</h3>
                        <p class="text-sm text-gray-500">Delivered to your location</p>
                      </div>
                    </div>
                    <div 
                      class="text-sm font-medium transition-colors"
                      :class="deliveryMethod === 'delivery' ? 'text-rose-600' : 'text-gray-600'"
                    >
                      <template v-if="selectedLocation">
                        ₦{{ formatPrice(selectedLocation.deliveryFee) }}
                      </template>
                      <template v-else>
                        Select location for fee
                      </template>
                    </div>
                  </div>
                  
                  <div 
                    v-if="deliveryMethod === 'delivery'"
                    class="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-rose-500"
                  ></div>
                  <CheckIcon 
                    v-if="deliveryMethod === 'delivery'"
                    class="absolute top-1 right-1 h-4 w-4 text-white"
                  />
                </div>

                <div 
                  @click="setDeliveryMethod('pickup')"
                  class="relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-md"
                  :class="[
                    deliveryMethod === 'pickup' 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  <div class="p-5">
                    <div class="flex items-center mb-3">
                      <div 
                        class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                        :class="deliveryMethod === 'pickup' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'"
                      >
                        <ShoppingBagIcon class="h-5 w-5" />
                      </div>
                      <div class="ml-3">
                        <h3 class="font-medium text-gray-800">Pickup</h3>
                        <p class="text-sm text-gray-500">Collect from restaurant</p>
                      </div>
                    </div>
                    <div 
                      class="text-sm font-medium transition-colors"
                      :class="deliveryMethod === 'pickup' ? 'text-emerald-600' : 'text-gray-600'"
                    >
                      Free
                    </div>
                  </div>
                  
                  <div 
                    v-if="deliveryMethod === 'pickup'"
                    class="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-emerald-500"
                  ></div>
                  <CheckIcon 
                    v-if="deliveryMethod === 'pickup'"
                    class="absolute top-1 right-1 h-4 w-4 text-white"
                  />
                </div>
              </div>

              <!-- Delivery Location Selector - Only shown for delivery -->
              <div 
                v-if="deliveryMethod === 'delivery'" 
                class="mt-6 animate-fade-in"
              >
                <label class="block text-gray-700 mb-2 text-sm font-medium">
                  Delivery Location <span class="text-rose-500">*</span>
                </label>
                
                <div class="relative">
                  <select 
                    v-if="vendor?.deliveryLocations?.length"  
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 pr-10 bg-white"
                    v-model="selectedLocationId"
                    @change="handleLocationChange"
                  >
                    <option value="" disabled selected>Select a location</option>
                    <option 
                      v-for="item in vendor?.deliveryLocations" 
                      :key="item?._id" 
                      :value="item?._id"
                    >
                      {{item.name}} - ₦{{ formatPrice(item.deliveryFee) }}
                    </option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <ChevronDownIcon class="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div 
                  v-if="validationErrors.location" 
                  class="mt-1 text-sm text-rose-500 animate-shake"
                >
                  {{ validationErrors.location }}
                </div>

                <div 
                  v-if="!vendor?.deliveryLocations?.length" 
                  class="mt-2 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center"
                >
                  <MapPinOffIcon class="h-6 w-6 mx-auto mb-2 text-amber-500" />
                  <p class="text-amber-800">No delivery locations available</p>
                  <p class="text-sm text-amber-700 mt-1">Please choose pickup or contact the vendor</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Customer Details & Payment -->
        <div class="w-full lg:w-5/12 animate-slide-in-right" style="--delay: 0.3s">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-500 hover:shadow-2xl sticky top-4">
            <div class="p-6 md:p-8">
              <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <UserIcon class="h-5 w-5 mr-2 text-rose-500" />
                <span class="relative">
                  Customer Details
                  <span class="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-rose-400 rounded-full"></span>
                </span>
              </h2>

              <div class="space-y-5">
                <!-- Customer Name -->
                <div class="animate-slide-in-right" style="--delay: 0.4s">
                  <label class="block text-gray-700 mb-2 text-sm font-medium">
                    Your Name <span class="text-rose-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="customerName"
                      type="text"
                      class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                    <UserIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <div 
                    v-if="validationErrors.customerName" 
                    class="mt-1 text-sm text-rose-500 animate-shake"
                  >
                    {{ validationErrors.customerName }}
                  </div>
                </div>

                <!-- Phone Number -->
                <div class="animate-slide-in-right" style="--delay: 0.5s">
                  <label class="block text-gray-700 mb-2 text-sm font-medium">
                    Phone Number <span class="text-rose-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="phoneNumber"
                      type="tel"
                      class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                    <PhoneIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <div 
                    v-if="validationErrors.phoneNumber" 
                    class="mt-1 text-sm text-rose-500 animate-shake"
                  >
                    {{ validationErrors.phoneNumber }}
                  </div>
                </div>

                <!-- Delivery Address - Only shown for delivery -->
                <div v-if="deliveryMethod === 'delivery'" class="animate-fade-in">
                  <label class="block text-gray-700 mb-2 text-sm font-medium">
                    Delivery Address <span class="text-rose-500">*</span>
                  </label>
                  <div class="relative">
                    <textarea
                      v-model="deliveryAddress"
                      rows="3"
                      class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your detailed delivery address"
                    ></textarea>
                    <MapPinIcon class="absolute left-3 top-5 h-5 w-5 text-gray-400" />
                  </div>
                  <div 
                    v-if="validationErrors.deliveryAddress" 
                    class="mt-1 text-sm text-rose-500 animate-shake"
                  >
                    {{ validationErrors.deliveryAddress }}
                  </div>
                </div>

                <!-- Additional Notes -->
                <div class="animate-slide-in-right" style="--delay: 0.6s">
                  <label class="block text-gray-700 mb-2 text-sm font-medium">
                    Additional Notes
                  </label>
                  <div class="relative">
                    <textarea
                      v-model="additionalNotes"
                      rows="2"
                      class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                      placeholder="Any special instructions or requests..."
                    ></textarea>
                    <ClipboardIcon class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <!-- Save Order Checkbox -->
                <div class="flex items-center animate-slide-in-right" style="--delay: 0.7s">
                  <div class="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="save-order" 
                      v-model="saveOrder"
                      class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ease-in-out"
                      :class="saveOrder ? 'transform translate-x-full border-rose-500' : 'border-gray-300'"
                    />
                    <label 
                      for="save-order" 
                      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      :class="saveOrder ? 'bg-rose-100' : ''"
                    ></label>
                  </div>
                  <label for="save-order" class="text-sm text-gray-700 cursor-pointer">
                    Save this order for future purchases
                  </label>
                </div>

                <!-- Order Summary -->
                <div class="mt-8 pt-6 border-t border-gray-200 animate-slide-in-right" style="--delay: 0.8s">
                  <h3 class="font-semibold text-gray-800 mb-4">Order Summary</h3>

                  <div class="space-y-3">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Subtotal</span>
                      <span class="font-medium">₦{{ formatPrice(cart.subtotal.value) }}</span>
                    </div>

                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Service Charge</span>
                      <span class="font-medium">₦{{ formatPrice(serviceCharge) }}</span>
                    </div>

                    <!-- <div class="flex justify-between items-center">
                      <span class="text-gray-600">Service Charge</span>
                      <span class="font-medium">₦{{ formatPrice(serviceCharge) }}</span>
                    </div> -->
                    
                    <div 
                      v-if="deliveryMethod === 'delivery'" 
                      class="flex justify-between items-center"
                    >
                      <span class="text-gray-600">Delivery Fee</span>
                      <span 
                        class="font-medium" 
                        :class="{ 'animate-highlight': selectedLocation }"
                      >
                        ₦{{ formatPrice(deliveryFee) }}
                      </span>
                    </div>
                    
                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Pack Fee (₦{{ packPrice }} × {{ cart.packs.value.length }})</span>
                      <span class="font-medium">₦{{ formatPrice(calculatePackFees()) }}</span>
                    </div>
                    
                    <div class="flex justify-between items-center pt-4 border-t border-dashed border-gray-200 mt-2">
                      <span class="text-lg font-semibold text-gray-800">Total</span>
                      <span class="text-xl font-bold text-rose-600 animate-pulse-slow">
                        ₦{{ formatPrice(calculateGrandTotal()) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 mt-6 animate-slide-in-right" style="--delay: 0.9s">
                  <button
                    @click="cancelOrder"
                    class="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300 flex items-center justify-center transform hover:scale-98"
                  >
                    <XCircleIcon class="h-5 w-5 mr-2" />
                    Cancel
                  </button>
                  <button
                    @click="submitOrder"
                    class="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                    :disabled="!isFormValid || orderLoading"
                    :class="{
                      'opacity-50 cursor-not-allowed': !isFormValid || orderLoading,
                    }"
                  >
                    <span v-if="orderLoading" class="flex items-center">
                      <span class="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Processing...
                    </span>
                    <template v-else>
                      <ShoppingBagIcon class="h-5 w-5 mr-2" />
                      Place Order
                    </template>
                  </button>
                </div>

                <!-- Error Message -->
                <div
                  v-if="error"
                  class="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md animate-shake mt-4"
                >
                  <div class="flex">
                    <AlertTriangleIcon class="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>{{ error }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pack Note Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="showPackNoteModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          @click="closePackNoteModal"
        >
          <div
            class="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-up"
            @click.stop
          >
            <div class="p-6 md:p-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800 flex items-center">
                  <ClipboardEditIcon class="h-5 w-5 mr-2 text-amber-500" />
                  Special Instructions
                </h2>
                <button 
                  @click="closePackNoteModal" 
                  class="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XIcon class="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div class="mb-6">
                <label class="block text-gray-700 mb-2 text-sm font-medium">
                  Add special instructions for this pack:
                </label>
                <textarea
                  v-model="packNote"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                  placeholder="E.g., Make it spicy, no onions, extra sauce, etc."
                ></textarea>
              </div>

              <div class="flex justify-end gap-3">
                <button
                  @click="closePackNoteModal"
                  class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  @click="savePackNote"
                  class="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center"
                >
                  <CheckIcon class="h-4 w-4 mr-1" />
                  Save Instructions
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Order Success Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="showOrderSuccessModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
          <div
            class="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-up overflow-hidden"
          >
            <!-- Success Header -->
            <div class="bg-gradient-to-r from-emerald-400 to-teal-500 p-6 text-white relative">
              <div class="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
              
              <div class="relative">
                <h2 class="text-2xl font-bold mb-2">Order Successful!</h2>
                <p>Your order has been placed successfully.</p>
              </div>
            </div>
            
            <div class="p-6 md:p-8">
              <div class="flex justify-center mb-6">
                <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center animate-success-pop">
                  <CheckIcon class="h-10 w-10 text-emerald-500" />
                </div>
              </div>
              
              <div class="text-center mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Thank you for your order!</h3>
                <p class="text-gray-600">
                  Your order has been received and will be processed shortly.
                </p>
                <div class="mt-4 p-3 bg-amber-50 rounded-lg text-sm text-amber-800 inline-block">
                  <span class="font-medium">Order ID:</span> {{ orderResponse?.value?.orderId || 'Pending' }}
                </div>
              </div>
              
              <div class="space-y-3">
                <button
                  @click="chatWithVendor"
                  class="w-full px-4 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat with Vendor
                </button>
                
                <button
                  @click="copyVendorNumber"
                  class="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <ClipboardCopyIcon class="h-5 w-5 mr-2" />
                  Copy Vendor Number
                </button>
                
                <button
                  @click="goToHome"
                  class="w-full px-4 py-3 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <HomeIcon class="h-5 w-5 mr-2" />
                  Back to Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Toast Container -->
    <div class="fixed bottom-4 right-4 z-50">
      <Transition name="toast">
        <div 
          v-if="toastMessage" 
          class="bg-white rounded-lg shadow-lg p-4 mb-3 flex items-center max-w-md animate-slide-in-right"
          :class="[
            toastType === 'success' ? 'border-l-4 border-emerald-500' : 
            toastType === 'error' ? 'border-l-4 border-rose-500' : 
            toastType === 'warning' ? 'border-l-4 border-amber-500' : 
            'border-l-4 border-blue-500'
          ]"
        >
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
            :class="[
              toastType === 'success' ? 'bg-emerald-100 text-emerald-500' : 
              toastType === 'error' ? 'bg-rose-100 text-rose-500' : 
              toastType === 'warning' ? 'bg-amber-100 text-amber-500' : 
              'bg-blue-100 text-blue-500'
            ]"
          >
            <CheckIcon v-if="toastType === 'success'" class="h-5 w-5" />
            <XIcon v-else-if="toastType === 'error'" class="h-5 w-5" />
            <AlertTriangleIcon v-else-if="toastType === 'warning'" class="h-5 w-5" />
            <InfoIcon v-else class="h-5 w-5" />
          </div>
          <div>
            <h4 class="font-medium text-gray-800">{{ toastTitle }}</h4>
            <p class="text-sm text-gray-600">{{ toastMessage }}</p>
          </div>
          <button 
            @click="clearToast" 
            class="ml-auto p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <XIcon class="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCart } from "~/composables/useCart";
import { useFetchVendorBySlug } from '@/composables/modules/vendor/useFetchVendorBySlug';
import { useVendorDeliveryLocations } from "@/composables/modules/delivery/useVendorDeliveryLocations";
import { useCreateOrder } from "@/composables/modules/order/useCreateOrder";
import { useCustomToast } from "@/composables/core/useCustomToast";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  PlusIcon,
  MinusIcon,
  XCircleIcon,
  CheckIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TruckIcon,
  PencilIcon,
  ClipboardEditIcon,
  AlertTriangleIcon,
  MapPinIcon,
  MapPinOffIcon,
  UserIcon,
  PhoneIcon,
  ClipboardIcon,
  XIcon,
  CreditCardIcon,
  HomeIcon,
  ClipboardCopyIcon,
  InfoIcon,
  CoffeeIcon,
  CakeIcon,
  SaladIcon,
  UtensilsIcon
} from "lucide-vue-next";

// Router
const router = useRouter();
const route = useRoute();

// Composables
const cart = useCart();
const { showToast: originalShowToast } = useCustomToast();
const { vendor, loading: vendorLoading } = useFetchVendorBySlug();
const { fetchVendorDeliveryLocations, loading: fetchingDeliveryLocations, vendorDeliveryLocations } = useVendorDeliveryLocations();
const { createOrder, loading: orderLoading, error, orderResponse } = useCreateOrder();

// State
const isLoading = ref(true);
const phoneNumber = ref("");
const customerName = ref("");
const deliveryAddress = ref("");
const deliveryMethod = ref("delivery"); // Default to delivery
const additionalNotes = ref("");
const saveOrder = ref(false);
const showPackNoteModal = ref(false);
const showOrderSuccessModal = ref(false);
const packNoteIndex = ref(0);
const packNote = ref("");
const selectedLocationId = ref("");
const selectedLocation = ref(null);
const serviceCharge = ref(30);
const validationErrors = ref({
  phoneNumber: "",
  customerName: "",
  location: "",
  deliveryAddress: "",
});
const orderIds = ref<string[]>([]);
// const serviceCharge = ref(30)

// Toast state
const toastMessage = ref("");
const toastTitle = ref("");
const toastType = ref("info"); // success, error, warning, info
const toastTimeout = ref(null);

// Pack settings from vendor
const packPrice = ref(0);
const packLimit = ref(10);

// Get vendor from localStorage
const localVendor = localStorage.getItem('selected-vendor');
const parsedLocalVendorObj = localVendor ? JSON.parse(localVendor) : null;

// Computed
const deliveryFee = computed(() => {
  if (deliveryMethod.value !== "delivery") return 0;
  return selectedLocation.value ? selectedLocation.value.deliveryFee : 0;
});

const isFormValid = computed(() => {
  if (deliveryMethod.value === 'pickup') {
    return (
      phoneNumber.value.trim() !== "" && 
      customerName.value.trim() !== "" && 
      cart.totalItems.value > 0
    );
  } else {
    return (
      phoneNumber.value.trim() !== "" && 
      customerName.value.trim() !== "" &&
      selectedLocation.value !== null &&
      deliveryAddress.value.trim() !== "" &&
      cart.totalItems.value > 0
    );
  }
});

// Methods
const formatPrice = (price: number): string => {
  return price.toLocaleString();
};

// Calculate pack fees based on vendor's packSettings
const calculatePackFees = (): number => {
  return packPrice.value * cart.packs.value.length;
};

// Calculate grand total (subtotal + delivery fee + pack fees)
const calculateGrandTotal = (): number => {
  return cart.subtotal.value + serviceCharge.value + deliveryFee.value + calculatePackFees();
};

const incrementItemQuantity = (packIndex: number, itemIndex: number) => {
  cart.incrementItemQuantity(packIndex, itemIndex);
};

const decrementItemQuantity = (packIndex: number, itemIndex: number) => {
  cart.decrementItemQuantity(packIndex, itemIndex);
};

const openPackNoteModal = (index: number) => {
  packNoteIndex.value = index;
  packNote.value = cart.packs.value[index].note;
  showPackNoteModal.value = true;
};

const closePackNoteModal = () => {
  showPackNoteModal.value = false;
};

const savePackNote = () => {
  const success = cart.updatePackNote(packNoteIndex.value, packNote.value);
  if (success) {
    showToast({
      title: "Note Saved",
      message: "Your special instructions have been saved",
      type: "success"
    });
    closePackNoteModal();
  }
};

const setDeliveryMethod = (method: 'pickup' | 'delivery') => {
  deliveryMethod.value = method;
  
  // Reset validation errors when switching methods
  if (method === 'pickup') {
    validationErrors.value.location = "";
    validationErrors.value.deliveryAddress = "";
    selectedLocation.value = null;
    selectedLocationId.value = "";
  }
  
  // Show a toast notification
  showToast({
    title: method === 'pickup' ? "Pickup Selected" : "Delivery Selected",
    message: method === 'pickup' 
      ? "You'll pick up your order at the restaurant" 
      : "Your order will be delivered to your location",
    type: "info"
  });
};

const handleLocationChange = () => {
  // Find the full location object based on the selected ID
  selectedLocation.value = vendor?.value?.deliveryLocations?.find(
    location => location?._id === selectedLocationId?.value
  );
  
  if (selectedLocation.value) {
    // Clear location validation error if a location is selected
    validationErrors.value.location = "";
    
    // Show toast with the selected location and fee
    showToast({
      title: "Delivery Location Selected",
      message: `Delivery to ${selectedLocation.value.name} costs ₦${formatPrice(selectedLocation.value.deliveryFee)}`,
      type: "success"
    });
  }
};

const goBack = () => {
  router.push(`/${route.params.id}`);
};

const goToHome = () => {
  showOrderSuccessModal.value = false;
  router.push(`/${route.params.id}`);
};

const cancelOrder = () => {
  if (confirm("Are you sure you want to cancel your order?")) {
    cart.clearCart();
    router.push(`/${route.params.id}`);
    showToast({
      title: "Order Cancelled",
      message: "Your order has been cancelled",
      type: "info"
    });
  }
};

const validateForm = () => {
  let isValid = true;
  validationErrors.value = {
    phoneNumber: "",
    customerName: "",
    location: "",
    deliveryAddress: "",
  };

  if (!phoneNumber.value.trim()) {
    validationErrors.value.phoneNumber = "Phone number is required";
    isValid = false;
  } else if (!/^\+?[0-9]{10,15}$/.test(phoneNumber.value.trim())) {
    validationErrors.value.phoneNumber = "Please enter a valid phone number";
    isValid = false;
  }

  if (!customerName.value.trim()) {
    validationErrors.value.customerName = "Customer name is required";
    isValid = false;
  }

  if (deliveryMethod.value === "delivery") {
    if (!selectedLocation.value) {
      validationErrors.value.location = "Please select a delivery location";
      isValid = false;
    }

    if (!deliveryAddress.value.trim()) {
      validationErrors.value.deliveryAddress = "Delivery address is required";
      isValid = false;
    }
  }

  return isValid;
};

interface OrderData {
  vendorId: string;
  customerName: string;
  packPrice: number;
  deliveryPrice: number;
  phoneNumber: string;
  deliveryType: "delivery" | "pickup";
  location?: string;  // Marked as optional
  address?: string;   // Marked as optional
  packs: Array<{
    items: Array<{ menuItemId: string, quantity: number }>;
    quantity?: number;
  }>;
  notes: string;
}

const submitOrder = async () => {
  if (!validateForm()) {
    showToast({
      title: "Form Incomplete",
      message: "Please fill in all required fields correctly",
      type: "warning"
    });
    return;
  }

  if (cart.totalItems.value === 0) {
    showToast({
      title: "Empty Cart",
      message: "Please add items to your cart before checking out",
      type: "warning"
    });
    return;
  }

  try {
    // Create a single order with all packs
    const orderData: OrderData = {
      vendorId: parsedLocalVendorObj?._id || vendor?.value?._id,
      customerName: customerName.value,
      packPrice: calculatePackFees(),
      deliveryPrice: deliveryFee.value,
      phoneNumber: phoneNumber.value,
      deliveryType: deliveryMethod.value as "delivery" | "pickup",
      location: deliveryMethod.value === "delivery" && selectedLocation?.value ? selectedLocation?.value?.name : "",
      address: deliveryMethod.value === "delivery" ? deliveryAddress?.value : "",
      // Transform cart packs to match the new structure
      packs: cart.packs.value
        .filter(pack => pack.items.length > 0)
        .map(pack => ({
          items: pack.items.map(item => ({
            menuItemId: item.mealId,
            quantity: item.quantity
          })),
          // Add pack quantity if it exists, otherwise it defaults to 1
          ...(pack?.quantity && pack?.quantity > 1 ? { quantity: pack?.quantity } : {})
        })),
      // Add general notes if provided
      notes: additionalNotes.value.trim()
    };

    // Add pack-specific notes if needed
    const packsWithNotes = cart.packs.value.filter(pack => pack.items.length > 0 && pack.note);
    if (packsWithNotes.length > 0) {
      const packNotes = packsWithNotes.map((pack, index) => `Pack ${index + 1}: ${pack.note}`).join('. ');
      orderData.notes = orderData.notes
        ? `${orderData.notes}. ${packNotes}`
        : packNotes;
    }

    // Remove empty optional fields
    if (orderData.location === "") {
      delete orderData.location;
    }

    if (orderData.address === "") {
      delete orderData.address;
    }
    
    // Submit the order
    const response = await createOrder(orderData);
    if (response && response?._id) {
      orderIds.value = [response?._id];
      
      // If save order is checked, we would save it to the user's profile
      if (saveOrder.value) {
        console.log("Saving order for future use");
      }
      
      // Clear the cart immediately after successful order
      // cart.clearCart();
      
      // Show success toast
      showToast({
        title: "Order Successful",
        message: "Your order has been placed successfully. Redirecting to WhatsApp...",
        type: "success"
      });
      
      // Immediately redirect to WhatsApp instead of showing success modal
      chatWithVendor();
    }
  } catch (err) {
    console.error("Error submitting order:", err);
    showToast({
      title: "Order Failed",
      message: "Failed to submit order. Please try again.",
      type: "error"
    });
  }
};

// const chatWithVendor = () => {
//   // Get vendor details from local storage
//   let vendorData = null;
//   try {
//     const vendorString = localStorage.getItem("selected-vendor");
//     if (vendorString) {
//       vendorData = JSON.parse(vendorString);
//     }
//   } catch (error) {
//     console.error("Error retrieving vendor data:", error);
//   }

//   // If no vendor data or phone number, use a fallback approach
//   const vendorPhone = vendorData?.phoneNumber || "";
  
//   // Create a more compact message format
//   let message = `🛍️ ORDER FROM Gofer\n`;
//   message += `📋 Order ID: ${orderResponse?.value?.orderId || 'Pending'}\n`;
//   message += `🚚 Delivery: ${deliveryMethod.value === 'delivery' ? '✅' : '❌'}\n\n`;
  
//   // Add items from each pack with a more compact format
//   cart.packs.value.forEach((pack, packIndex) => {
//     if (pack.items.length > 0) {
//       message += `📦 PACK ${packIndex + 1}:\n`;
      
//       // Add each item in the pack
//       pack.items.forEach(item => {
//         message += `- ${item.name} x${item.quantity}\n`;
//       });
      
//       if (pack.note) {
//         message += `Note: ${pack.note}\n`;
//       }
      
//       message += '\n';
//     }
//   });
  
//   // Add order summary
//   message += `💰 SUMMARY:\n`;
//   message += `Subtotal: ₦${formatPrice(cart.subtotal.value)}\n`;
  
//   if (deliveryMethod.value === 'delivery' && selectedLocation.value) {
//     message += `Delivery: ₦${formatPrice(selectedLocation.value.deliveryFee)}\n`;
//   }
  
//   if (calculatePackFees() > 0) {
//     message += `Pack Fee: ₦${formatPrice(calculatePackFees())}\n`;
//   }
  
//   message += `TOTAL: ₦${formatPrice(calculateGrandTotal())}\n\n`;
  
//   // Add customer details section
//   message += `👤 CUSTOMER INFO:\n`;
//   message += `Name: ${customerName.value}\n`;
//   message += `Phone: ${phoneNumber.value}\n`;
  
//   if (deliveryMethod.value === 'delivery') {
//     if (selectedLocation.value) {
//       message += `Location: ${selectedLocation.value.name}\n`;
//     }
    
//     if (deliveryAddress.value) {
//       message += `Address: ${deliveryAddress.value}\n`;
//     }
//   }
  
//   if (additionalNotes.value) {
//     message += `\n📝 Additional Notes: ${additionalNotes.value}\n`;
//   }
  
//   // Encode the message for WhatsApp URL
//   const encodedMessage = encodeURIComponent(message);
  
//   // Format the phone number correctly for WhatsApp
//   let formattedPhone = "";
//   if (vendorPhone) {
//     // Remove any non-digit characters
//     formattedPhone = vendorPhone.replace(/\D/g, "");
    
//     // Ensure it starts with country code (if not already)
//     if (!formattedPhone.startsWith("234") && formattedPhone.startsWith("0")) {
//       // Replace leading 0 with 234 (Nigeria's country code)
//       formattedPhone = "234" + formattedPhone.substring(1);
//     } else if (!formattedPhone.startsWith("234") && !formattedPhone.startsWith("+")) {
//       // Add country code if missing
//       formattedPhone = "234" + formattedPhone;
//     }
//   }
  
//   // Use the wa.me WhatsApp URL format
//   const whatsappUrl = formattedPhone 
//     ? `https://wa.me/${formattedPhone}?text=${encodedMessage}` 
//     : `https://wa.me/?text=${encodedMessage}`;
  
//   // Immediately redirect to WhatsApp without delay
//   window.location.href = whatsappUrl;
//   cart.clearCart();

//   // Set a fallback for mobile devices that might not have WhatsApp installed
//   setTimeout(() => {
//     // If we're still on the same page after 1.5 seconds, offer alternative options
//     showToast({
//       title: "WhatsApp not opening?",
//       message: "Try copying the vendor's number manually",
//       type: "warning"
//     });
    
//     // Navigate back to menu
//     router.push(`/${route.params.id}`);
//   }, 1500);
// };

const chatWithVendor = () => {
  // Get vendor details from local storage
  let vendorData = null;
  try {
    const vendorString = localStorage.getItem("selected-vendor");
    if (vendorString) {
      vendorData = JSON.parse(vendorString);
    }
  } catch (error) {
    console.error("Error retrieving vendor data:", error);
  }

  // If no vendor data or phone number, use a fallback approach
  const vendorPhone = vendorData?.phoneNumber || "";
  
  // Create a more compact message format
  let message = `🛍️ ORDER FROM Gofer\n`;
  message += `📋 Order ID: ${orderResponse?.value?.orderId || 'Pending'}\n`;
  message += `🚚 Delivery: ${deliveryMethod.value === 'delivery' ? '✅' : '❌'}\n\n`;
  
  // Add items from each pack with a more compact format
  cart.packs.value.forEach((pack, packIndex) => {
    if (pack.items.length > 0) {
      message += `📦 PACK ${packIndex + 1}:\n`;
      
      // Add each item in the pack
      pack.items.forEach(item => {
        message += `- ${item.name} x${item.quantity}\n`;
      });
      
      if (pack.note) {
        message += `Note: ${pack.note}\n`;
      }
      
      message += '\n';
    }
  });
  
  // Add order summary
  message += `💰 SUMMARY:\n`;
  message += `Subtotal: ₦${formatPrice(cart.subtotal.value)}\n`;
  
  if (deliveryMethod.value === 'delivery' && selectedLocation.value) {
    message += `Delivery: ₦${formatPrice(selectedLocation.value.deliveryFee)}\n`;
  }
  
  if (calculatePackFees() > 0) {
    message += `Pack Fee: ₦${formatPrice(calculatePackFees())}\n`;
  }
  
  message += `TOTAL: ₦${formatPrice(calculateGrandTotal())}\n\n`;
  
  // Add customer details section
  message += `👤 CUSTOMER INFO:\n`;
  message += `Name: ${customerName.value}\n`;
  message += `Phone: ${phoneNumber.value}\n`;
  
  if (deliveryMethod.value === 'delivery') {
    if (selectedLocation.value) {
      message += `Location: ${selectedLocation.value.name}\n`;
    }
    
    if (deliveryAddress.value) {
      message += `Address: ${deliveryAddress.value}\n`;
    }
  }
  
  if (additionalNotes.value) {
    message += `\n📝 Additional Notes: ${additionalNotes.value}\n`;
  }
  
  // Encode the message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message);
  
  // Enhanced Nigerian phone number formatting
  let formattedPhone = "";
  if (vendorPhone) {
    // Clean the phone number (remove all non-digit characters)
    let cleanPhone = vendorPhone.replace(/\D/g, "");
    
    // Handle different Nigerian phone number formats
    if (cleanPhone.startsWith('234')) {
      // Already has country code 234
      formattedPhone = cleanPhone;
    } else if (cleanPhone.startsWith('0')) {
      // Starts with 0 (local format), replace with 234
      formattedPhone = '234' + cleanPhone.substring(1);
    } else if (cleanPhone.length === 10) {
      // 10 digits, likely missing country code and leading 0
      formattedPhone = '234' + cleanPhone;
    } else if (cleanPhone.length === 11 && !cleanPhone.startsWith('234')) {
      // 11 digits starting with 0, replace 0 with 234
      formattedPhone = '234' + cleanPhone.substring(1);
    } else {
      // Fallback: assume it needs 234 prefix
      formattedPhone = '234' + cleanPhone;
    }
    
    // Validate Nigerian phone number (should be 13 digits: 234 + 10 digits)
    if (formattedPhone.length !== 13 || !formattedPhone.startsWith('234')) {
      console.warn('Invalid Nigerian phone number format:', vendorPhone);
      // Still proceed but log the warning
    }
  }
  
  // Use the wa.me WhatsApp URL format (works for both regular and business WhatsApp)
  const whatsappUrl = formattedPhone 
    ? `https://wa.me/${formattedPhone}?text=${encodedMessage}` 
    : `https://wa.me/?text=${encodedMessage}`;
  
  // Enhanced WhatsApp opening logic with better cross-platform support
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // On mobile devices, direct redirect usually works better
    window.location.href = whatsappUrl;
  } else {
    // On desktop, try to open in new tab first
    const newWindow = window.open(whatsappUrl, '_blank');
    
    // If popup is blocked, fallback to direct redirect
    if (!newWindow) {
      window.location.href = whatsappUrl;
    }
  }
  
  // Clear cart after opening WhatsApp
  cart.clearCart();

  // Enhanced fallback handling with more helpful options
  setTimeout(() => {
    // Check if we're still on the same page (WhatsApp might not have opened)
    if (document.hasFocus()) {
      showToast({
        title: "WhatsApp not opening?",
        message: `Try copying this number: ${formattedPhone ? `+${formattedPhone}` : 'Number not available'}`,
        type: "warning",
        // duration: 5000 // Show for 5 seconds 
      });
      
      // Optional: Provide additional fallback options
      if (formattedPhone) {
        // Create a fallback with WhatsApp Web
        const webWhatsAppUrl = `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`;
        
        // Optionally show a dialog with both options
        const useWebWhatsApp = confirm("WhatsApp app didn't open. Would you like to try WhatsApp Web instead?");
        if (useWebWhatsApp) {
          window.open(webWhatsAppUrl, '_blank');
        }
      }
    }
    
    // Navigate back to menu after a delay
    setTimeout(() => {
      router.push(`/${route.params.id}`);
    }, 2000);
  }, 1500);
};

const copyVendorNumber = () => {
  try {
    const vendorString = localStorage.getItem("selected-vendor");
    if (vendorString) {
      const vendorData = JSON.parse(vendorString);
      const vendorPhone = vendorData?.phoneNumber || "";
      
      if (vendorPhone) {
        navigator.clipboard.writeText(vendorPhone);
        showToast({
          title: "Number Copied",
          message: "Vendor phone number copied to clipboard",
          type: "success"
        });
      } else {
        showToast({
          title: "No Number Available",
          message: "Vendor phone number not available",
          type: "error"
        });
      }
    }
  } catch (error) {
    console.error("Error copying vendor number:", error);
    showToast({
      title: "Error",
      message: "Failed to copy vendor number",
      type: "error"
    });
  }
};

// Custom toast implementation
const showToast = ({ title, message, type = "info" }) => {
  // Clear any existing timeout
  if (toastTimeout.value) {
    clearTimeout(toastTimeout.value);
  }
  
  // Set toast data
  toastTitle.value = title;
  toastMessage.value = message;
  toastType.value = type;
  
  // Auto-hide after 5 seconds
  toastTimeout.value = setTimeout(() => {
    clearToast();
  }, 5000);
  
  // Also use the original toast system for compatibility
  originalShowToast({
    title,
    message,
    toastType: type,
    duration: 5000,
  });
};

const clearToast = () => {
  toastMessage.value = "";
  toastTitle.value = "";
  if (toastTimeout.value) {
    clearTimeout(toastTimeout.value);
    toastTimeout.value = null;
  }
};

// Initialize pack settings from vendor object
const initializePackSettings = () => {
  if (parsedLocalVendorObj && parsedLocalVendorObj.packSettings) {
    // Set pack price from vendor's packSettings
    packPrice.value = parsedLocalVendorObj.packSettings.price || 0;
    
    // Set pack limit from vendor's packSettings
    packLimit.value = parsedLocalVendorObj.packSettings.limit || 10;
  }
};

// Lifecycle hooks
onMounted(() => {
  // Initialize cart from localStorage
  cart.initCart();

  // Redirect to home if no order exists
  if (cart.totalItems.value === 0) {
    router.push(`/${route.params.id}`);
    showToast({
      title: "Empty Cart",
      message: "Your cart is empty",
      type: "warning"
    });
  }
  
  // Fetch vendor delivery locations
  if (parsedLocalVendorObj && parsedLocalVendorObj?._id) {
    fetchVendorDeliveryLocations(parsedLocalVendorObj?._id);
  }
  
  // Initialize pack settings from vendor object
  initializePackSettings();
  
  // Simulate loading time for better UX
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});

// Watch for vendor changes to fetch delivery locations and update pack settings
watch(
  () => vendor.value,
  (newVendor) => {
    if (newVendor && newVendor._id) {
      fetchVendorDeliveryLocations(newVendor._id);
      
      // Update pack settings if vendor has them
      if (newVendor.packSettings) {
        packPrice.value = newVendor.packSettings.price || 0;
        packLimit.value = newVendor.packSettings.limit || 10;
      }
    }
  },
  { immediate: true, deep: true }
);

// Watch for loading states to update page loader
watch(
  [() => vendorLoading.value, () => fetchingDeliveryLocations.value, () => cart.loading.value],
  ([isVendorLoading, isLocationsLoading, isCartLoading]) => {
    // Hide loader when all data is loaded
    if (!isVendorLoading && !isLocationsLoading && !isCartLoading) {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    }
  }
);
</script>

<style scoped>
/* Animations */
.animate-fade-in-down {
  animation: fadeInDown 0.6s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft calc(0.5s + var(--delay, 0s)) ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight calc(0.5s + var(--delay, 0s)) ease-out forwards;
}

.animate-slide-in {
  animation: slideIn 0.4s ease-out forwards;
}

.animate-bounce-slow {
  animation: bounceSlow 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 2s ease-in-out infinite;
}

.animate-success-pop {
  animation: successPop 0.5s ease-out forwards;
}

.animate-ping-slow {
  animation: pingSlow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-highlight {
  animation: highlight 1s ease-in-out;
}

.animate-float-staggered {
  animation: float 3s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}

.animate-scale-up {
  animation: scaleUp 0.4s ease-out forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
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

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

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

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceSlow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulseSlow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes successPop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pingSlow {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

@keyframes highlight {
  0% { background-color: transparent; }
  30% { background-color: rgba(244, 63, 94, 0.2); }
  100% { background-color: transparent; }
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
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes progress {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}

@keyframes scaleUp {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Custom scrollbar */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

/* Toggle switch */
.toggle-checkbox:checked {
  right: 0;
  border-color: #f43f5e;
}

.toggle-checkbox:checked + .toggle-label {
  background-color: #fecdd3;
}

.transform.hover\:scale-98:hover {
  transform: scale(0.98);
}
</style>