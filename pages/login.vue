<template>
    <div class="min-h-screen bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="fixed inset-0 pointer-events-none z-0">
        <!-- Gradient Blobs -->
        <div class="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full filter blur-3xl animate-blob"></div>
        <div class="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        
        <!-- Food Icons -->
        <div v-for="i in 6" :key="i" 
          class="absolute food-icon"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: 0.1 + (Math.random() * 0.1)
          }"
        >
          <component :is="foodIcons[i % foodIcons.length]" class="w-12 h-12" />
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="relative z-10 min-h-screen flex flex-col">
        <!-- Header -->
        <header class="py-6 px-6 md:px-10 bg-white shadow-sm">
          <div class="container mx-auto flex justify-between items-center">
            <NuxtLink to="/" class="flex items-center">
              <img src="@/assets/img/erranders.png" alt="Gofer" class="h-10" />
            </NuxtLink>
            <div class="flex items-center space-x-4">
              <NuxtLink to="/register" class="text-gray-700 hover:text-primary transition-colors">
                Create an account
              </NuxtLink>
            </div>
          </div>
        </header>
        
        <!-- Login Form -->
        <div class="flex-1 flex items-center justify-center px-6 py-10">
          <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Left Side - Illustration -->
            <div class="hidden md:block relative">
              <div class="relative z-10 animate-float">
                <!-- <img 
                  src="/images/login-illustration.svg" 
                  alt="Food Delivery" 
                  class="w-full h-auto max-w-md mx-auto"
                /> -->
              </div>
              
              <!-- Decorative Elements -->
              <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full filter blur-xl animate-pulse-slow"></div>
              <div class="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full filter blur-xl animate-pulse-slow animation-delay-500"></div>
              
              <!-- Text Overlay -->
              <div class="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                <h2 class="text-3xl md:text-4xl font-display font-bold text-primary mb-4 animate-fade-in">
                  Welcome Back!
                </h2>
                <p class="text-lg text-gray-700 max-w-xs animate-fade-in animation-delay-200">
                  Sign in to {{ selectedRole === 'customer' ? 'order your favorite meals' : 'manage your restaurant' }}
                </p>
              </div>
            </div>
            
            <!-- Right Side - Login Form -->
            <div class="bg-white rounded-2xl shadow-xl p-8 animate-fade-in animation-delay-300">
              <div class="text-center mb-8">
                <h2 class="text-2xl font-semibold text-gray-800">Sign In to Gofer</h2>
                <p class="text-gray-600 mt-2">
                  Access your account to {{ selectedRole === 'customer' ? 'start ordering' : 'manage your business' }}
                </p>
              </div>
              
              <!-- Role Selection Tabs -->
              <div class="relative mb-8 overflow-hidden">
                <div class="flex rounded-lg bg-gray-100 p-1 relative">
                  <!-- Animated Selection Indicator -->
                  <div 
                    class="absolute inset-y-1 transition-all duration-300 ease-out bg-white rounded-md shadow-sm" 
                    :style="{ 
                      width: 'calc(50% - 4px)', 
                      left: selectedRole === 'customer' ? '2px' : 'calc(50% + 2px)',
                    }"
                  ></div>
                  
                  <!-- Customer Tab -->
                  <button 
                    @click="selectRole('customer')" 
                    class="flex-1 relative z-10 py-2 px-4 text-center transition-colors duration-300"
                    :class="selectedRole === 'customer' ? 'text-primary font-medium' : 'text-gray-600'"
                  >
                    <div class="flex items-center justify-center">
                      <User class="w-4 h-4 mr-2" />
                      <span>Customer</span>
                    </div>
                  </button>
                  
                  <!-- Vendor Tab -->
                  <button 
                    @click="selectRole('vendor')" 
                    class="flex-1 relative z-10 py-2 px-4 text-center transition-colors duration-300"
                    :class="selectedRole === 'vendor' ? 'text-primary font-medium' : 'text-gray-600'"
                  >
                    <div class="flex items-center justify-center">
                      <Store class="w-4 h-4 mr-2" />
                      <span>Vendor</span>
                    </div>
                  </button>
                </div>
                
                <!-- Role-specific icons with animation -->
                <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <transition name="role-icon" mode="out-in">
                    <div v-if="selectedRole === 'customer'" key="customer" class="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                      <ShoppingBag class="w-5 h-5 text-primary/20" />
                    </div>
                    <div v-else key="vendor" class="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                      <ChefHat class="w-5 h-5 text-primary/20" />
                    </div>
                  </transition>
                </div>
              </div>
              
              <!-- Login Form -->
              <form @submit.prevent="login" class="space-y-5">
                <!-- Email -->
                <div class="form-group">
                  <label for="email" class="form-label">Email Address</label>
                  <div class="relative">
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      class="form-input pl-10"
                      placeholder="Enter your email address"
                      :class="{ 'form-input-error': errors.email || authError }"
                      @focus="animateInput"
                    />
                    <Mail class="form-icon" />
                    <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
                  </div>
                </div>
                
                <!-- Password -->
                <div class="form-group">
                  <!-- <div class="flex items-center justify-between mb-1">
                    <label for="password" class="form-label">Password</label>
                    <NuxtLink to="/forgot-password" class="text-sm text-primary hover:underline">
                      Forgot Password?
                    </NuxtLink>
                  </div> -->
                  <div class="relative">
                    <input
                      id="password"
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-input pl-10"
                      placeholder="Enter your password"
                      :class="{ 'form-input-error': errors.password || authError }"
                      @focus="animateInput"
                    />
                    <Lock class="form-icon" />
                    <button 
                      type="button" 
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      @click="showPassword = !showPassword"
                    >
                      <Eye v-if="!showPassword" class="w-5 h-5" />
                      <EyeOff v-else class="w-5 h-5" />
                    </button>
                    <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
                  </div>
                </div>
                
                <!-- Auth Error Message -->
                <div v-if="authError" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {{ authError }}
                </div>
                
                <!-- Remember Me -->
                <div class="flex items-center">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      v-model="form.rememberMe"
                      type="checkbox"
                      class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary/50"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-600">
                      Remember me
                    </label>
                  </div>
                </div>
                
                <!-- Submit Button -->
                <button
                  type="submit"
                  class="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-dark text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-primary/30 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed group"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="flex items-center justify-center">
                    <Loader2 class="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </span>
                  <span v-else class="group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Sign In as {{ selectedRole === 'customer' ? 'Customer' : 'Vendor' }}
                    <ArrowRight class="ml-2 w-4 h-4" />
                  </span>
                </button>
              </form>
              
              <!-- Register Link -->
              <div class="text-center mt-8">
                <p class="text-gray-600">
                  Don't have an account? 
                  <NuxtLink to="/register" class="text-primary font-medium hover:underline">
                    Create an account
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <footer class="py-6 px-6 text-center text-sm text-gray-500 bg-gray-50">
          <div class="container mx-auto">
            <div class="flex justify-center space-x-6 mb-2">
              <NuxtLink to="/about" class="hover:text-primary transition-colors">About</NuxtLink>
              <NuxtLink to="/contact" class="hover:text-primary transition-colors">Contact</NuxtLink>
              <NuxtLink to="/privacy" class="hover:text-primary transition-colors">Privacy</NuxtLink>
              <NuxtLink to="/terms" class="hover:text-primary transition-colors">Terms</NuxtLink>
            </div>
            <p>© {{ new Date().getFullYear() }} Gofer. All rights reserved.</p>
          </div>
        </footer>
      </div>
      
      <!-- Animated Full-Screen Loader Component -->
      <AnimatedLoader 
        :show="isLoading"
        :title="loaderTitle"
        :message="'Please wait while we verify your credentials'"
        :center-icon="selectedRole === 'customer' ? ShoppingBag : ChefHat"
        :orbit-icons="foodIcons"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { 
    Mail, Lock, Eye, EyeOff, Loader2, ArrowRight,
    Coffee, Pizza, Sandwich, IceCream, Salad, Beef,
    User, Store, ShoppingBag, ChefHat
  } from 'lucide-vue-next';
  import { useVendorLogin } from '@/composables/auth/useVendorLogin';
  import { useCustomerLogin } from '@/composables/auth/useCustomerLogin';
  import AnimatedLoader from '@/components/core/animated-loader.vue';
  
  // Role selection
  const selectedRole = ref<'customer' | 'vendor'>('customer');
  
  const selectRole = (role: 'customer' | 'vendor') => {
    selectedRole.value = role;
  };
  
  // Auth composables
  const { loginVendor, loading: vendorLoading, error: vendorError } = useVendorLogin();
  const { loginCustomer, loading: customerLoading, error: customerError } = useCustomerLogin();
  
  // Computed properties for loading and error states
  const isLoading = computed(() => 
    selectedRole.value === 'vendor' ? vendorLoading.value : customerLoading.value
  );
  
  const authError = computed(() => 
    selectedRole.value === 'vendor' ? vendorError.value : customerError.value
  );
  
  // Loader title based on role
  const loaderTitle = computed(() => 
    `Signing in as ${selectedRole.value === 'customer' ? 'Customer' : 'Vendor'}`
  );
  
  // Form data
  const form = ref({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // UI state
  const showPassword = ref(false);
  const errors = ref({} as Record<string, string>);
  
  // Food icons for background
  const foodIcons = [Coffee, Pizza, Sandwich, IceCream, Salad, Beef];
  
  // Validate form
  const validateForm = () => {
    errors.value = {};
    
    if (!form.value.email) {
      errors.value.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
      errors.value.email = 'Please enter a valid email address';
    }
    
    if (!form.value.password) {
      errors.value.password = 'Password is required';
    }
    
    return Object.keys(errors.value).length === 0;
  };
  
  // Login function
  const login = async () => {
    if (!validateForm()) return;

    const payload = {
        email: form.value.email, 
        password: form.value.password
    }
    
    try {
      if (selectedRole.value === 'vendor') {
        await loginVendor(payload);
      } else {
        await loginCustomer(payload);
      }
      
      // If we get here, login was successful
      // Redirect will be handled by the composables
    } catch (error) {
      console.error('Login error:', error);
      // Error handling is done by the composables
    }
  };
  
  // Animate input on focus
  const animateInput = (event: Event) => {
    const target = event.target as HTMLElement;
    target.classList.add('animate-pulse-once');
    setTimeout(() => {
      target.classList.remove('animate-pulse-once');
    }, 500);
  };
  </script>
  
  <style scoped>
  .animate-pulse-once {
    animation: pulseOnce 0.5s;
  }
  
  .animate-float {
    animation: float 5s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulseSlow 3s infinite;
  }
  
  .form-group {
    @apply mb-4;
  }
  
  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-1;
  }
  
  .form-input {
    @apply block w-full pl-10 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all;
  }
  
  .form-input-error {
    @apply border-red-500 focus:ring-red-500/50 focus:border-red-500;
  }
  
  .form-icon {
    @apply absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400;
  }
  
  .form-error {
    @apply text-red-500 text-sm mt-1 block;
  }
  
  /* Role selection animation */
  .role-icon-enter-active,
  .role-icon-leave-active {
    transition: all 0.3s ease-out;
  }
  
  .role-icon-enter-from,
  .role-icon-leave-to {
    opacity: 0;
    transform: scale(0.8) translateY(10px);
  }
  
  @keyframes pulseOnce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  
  @keyframes pulseSlow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  /* Add animation for role switching */
  @keyframes slideIn {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
  </style>