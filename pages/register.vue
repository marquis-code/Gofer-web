<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <!-- Gradient Blobs -->
      <div class="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full filter blur-3xl animate-blob"></div>
      <div class="absolute bottom-0 right-0 w-1/3 h-1/3 bg-secondary/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 w-1/4 h-1/4 bg-accent/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      
      <!-- Food Icons -->
      <div v-for="i in 8" :key="i" 
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
            <!-- <img src="/images/Gofer-logo.svg" alt="Gofer" class="h-10" /> -->
          </NuxtLink>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/login" class="text-gray-700 hover:text-primary transition-colors">
              Already have an account?
            </NuxtLink>
          </div>
        </div>
      </header>
      
      <!-- Registration Form -->
      <div class="flex-1 flex items-center justify-center px-6 py-10">
        <div class="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="flex flex-col md:flex-row">
            <!-- Left Side - Progress & Info -->
            <div class="w-full md:w-1/3 hidden lg:block bg-gradient-to-b from-primary to-primary-dark text-white p-8">
              <div class="h-full flex flex-col">
                <h2 class="text-2xl font-display font-bold mb-6 animate-fade-in">Create Your Account</h2>
                
                <!-- Progress Steps -->
                <div class="space-y-8 mb-8">
                  <div 
                    v-for="(step, index) in steps" 
                    :key="index"
                    class="flex items-start"
                  >
                    <div 
                      class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-300"
                      :class="[
                        currentStep > index 
                          ? 'bg-white text-primary' 
                          : currentStep === index 
                            ? 'bg-secondary text-white ring-4 ring-secondary/30' 
                            : 'bg-white/20 text-white'
                      ]"
                    >
                      <component 
                        :is="currentStep > index ? Check : step.icon" 
                        class="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p 
                        class="font-medium transition-all duration-300"
                        :class="[
                          currentStep === index 
                            ? 'text-secondary' 
                            : 'text-white/90'
                        ]"
                      >
                        {{ step.title }}
                      </p>
                      <p 
                        class="text-sm text-white/70 transition-all duration-300"
                        :class="{ 'text-white/90': currentStep === index }"
                      >
                        {{ step.description }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Benefits -->
                <div class="mt-auto space-y-4 animate-fade-in animation-delay-500">
                  <h3 class="text-lg font-semibold text-white/90">Why join Gofer?</h3>
                  
                  <div class="flex items-start">
                    <div class="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                      <Truck class="w-3 h-3 text-secondary" />
                    </div>
                    <p class="text-sm text-white/80">Fast delivery to your location</p>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                      <Utensils class="w-3 h-3 text-secondary" />
                    </div>
                    <p class="text-sm text-white/80">Wide variety of food options</p>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                      <BadgePercent class="w-3 h-3 text-secondary" />
                    </div>
                    <p class="text-sm text-white/80">Exclusive student discounts</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Right Side - Form Steps -->
            <div class="w-full md:w-2/3 p-8">
              <!-- Step 1: Basic Info -->
              <div v-if="currentStep === 0" class="animate-fade-in">
                <h3 class="text-2xl font-semibold text-gray-800 mb-6">Tell us about yourself</h3>
                
                <form @submit.prevent="nextStep" class="space-y-5">
                  <!-- Name -->
                  <div class="form-group">
                    <label for="fullName" class="form-label">Full Name</label>
                    <div class="relative">
                      <input
                        id="fullName"
                        v-model="form.fullName"
                        type="text"
                        class="form-input pl-10"
                        placeholder="Enter your full name"
                        :class="{ 'form-input-error': errors.fullName }"
                        @focus="animateInput"
                      />
                      <User class="form-icon" />
                      <span v-if="errors.fullName" class="form-error">{{ errors.fullName }}</span>
                    </div>
                  </div>
                  
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
                        :class="{ 'form-input-error': errors.email }"
                        @focus="animateInput"
                      />
                      <Mail class="form-icon" />
                      <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
                    </div>
                  </div>
                  
                  <!-- Phone -->
                  <div class="form-group">
                    <label for="phone" class="form-label">Phone Number</label>
                    <div class="relative">
                      <input
                        id="phone"
                        v-model="form.phone"
                        type="tel"
                        class="form-input pl-10"
                        placeholder="Enter your phone number"
                        :class="{ 'form-input-error': errors.phone }"
                        @focus="animateInput"
                      />
                      <Phone class="form-icon" />
                      <span v-if="errors.phone" class="form-error">{{ errors.phone }}</span>
                    </div>
                  </div>
                  
                  <!-- Account Type -->
                  <div class="form-group">
                    <label class="form-label">Account Type</label>
                    <div class="grid grid-cols-2 gap-4 mt-2">
                      <div 
                        class="account-type-card"
                        :class="{ 'account-type-selected': form.accountType === 'customer' }"
                        @click="form.accountType = 'customer'"
                      >
                        <div class="account-type-icon bg-primary/10">
                          <User class="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 class="font-medium text-gray-800">Customer</h4>
                          <p class="text-xs text-gray-500">Order food from vendors</p>
                        </div>
                      </div>
                      
                      <div 
                        class="account-type-card"
                        :class="{ 'account-type-selected': form.accountType === 'vendor' }"
                        @click="form.accountType = 'vendor'"
                      >
                        <div class="account-type-icon bg-secondary/10">
                          <Store class="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <h4 class="font-medium text-gray-800">Vendor</h4>
                          <p class="text-xs text-gray-500">Sell food to customers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Display Image Upload (Vendor Only) -->
                  <div v-if="form.accountType === 'vendor'" class="form-group">
                    <label class="form-label">Store Display Image</label>
                    <div class="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <!-- Image Preview -->
                      <div v-if="form.displayImageUrl" class="mb-4 flex justify-center">
                        <div class="relative w-full">
                          <img 
                            :src="form.displayImageUrl" 
                            alt="Store Display" 
                            class="w-full h-40 object-cover rounded-lg shadow-md"
                          />
                          <button 
                            type="button"
                            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            @click="removeDisplayImage"
                          >
                            <X class="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <!-- Upload Button -->
                      <div class="flex flex-col items-center justify-center">
                        <div v-if="uploading" class="mb-3 flex items-center">
                          <Loader2 class="w-5 h-5 text-primary animate-spin mr-2" />
                          <span class="text-sm text-gray-600">Uploading image...</span>
                        </div>
                        
                        <label 
                          v-if="!form.displayImageUrl && !uploading"
                          class="cursor-pointer flex flex-col items-center"
                        >
                          <ImagePlus class="w-10 h-10 text-gray-400 mb-2" />
                          <span class="text-sm text-gray-600 mb-1">Upload store display image</span>
                          <span class="text-xs text-gray-500">JPG, PNG or GIF (max. 2MB)</span>
                          <input 
                            type="file" 
                            class="hidden" 
                            accept="image/*"
                            @change="handleImageUpload"
                          />
                        </label>
                        
                        <button 
                          v-if="form.displayImageUrl && !uploading"
                          type="button"
                          class="mt-3 text-sm text-primary hover:text-primary-dark hover:underline"
                          @click="triggerFileInput"
                        >
                          Change image
                        </button>
                        <input 
                          ref="fileInput"
                          type="file" 
                          class="hidden" 
                          accept="image/*"
                          @change="handleImageUpload"
                        />
                      </div>
                    </div>
                    <span v-if="errors.displayImage" class="form-error">{{ errors.displayImage }}</span>
                  </div>
                  
                  <!-- Next Button -->
                  <div class="pt-4">
                    <button 
                      type="submit"
                      class="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                      Continue
                      <ArrowRight class="inline-block ml-2 w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
              
              <!-- Step 2: Location -->
              <div v-if="currentStep === 1" class="animate-fade-in">
                <h3 class="text-2xl font-semibold text-gray-800 mb-6">Where are you located?</h3>
                
                <form @submit.prevent="nextStep" class="space-y-5">
                  <!-- School/Campus -->
                  <div class="form-group">
                    <label for="school" class="form-label">School/Campus</label>
                    <div class="relative">
                      <select
                        id="school"
                        v-model="form.school"
                        class="form-input pl-10 appearance-none"
                        :class="{ 'form-input-error': errors.school }"
                        @focus="animateInput"
                      >
                        <option value="" disabled selected>Select your school</option>
                        <option v-for="(school, index) in schools" :key="index" :value="school">
                          {{ school }}
                        </option>
                      </select>
                      <GraduationCap class="form-icon" />
                      <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      <span v-if="errors.school" class="form-error">{{ errors.school }}</span>
                    </div>
                  </div>
                  
                  <!-- Address -->
                  <div class="form-group">
                    <label for="address" class="form-label">Address</label>
                    <div class="relative">
                      <input
                        id="address"
                        v-model="form.address"
                        type="text"
                        class="form-input pl-10"
                        placeholder="Enter your address"
                        :class="{ 'form-input-error': errors.address }"
                        @focus="animateInput"
                      />
                      <MapPin class="form-icon" />
                      <span v-if="errors.address" class="form-error">{{ errors.address }}</span>
                    </div>
                  </div>
                  
                  <!-- Map Preview (Placeholder) -->
                  <!-- <div class="mt-4 rounded-lg overflow-hidden border border-gray-200 h-48 bg-gray-100 flex items-center justify-center">
                    <div class="text-center">
                      <Map class="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p class="text-gray-500 text-sm">Map preview will appear here</p>
                    </div>
                  </div> -->
                  
                  <!-- Navigation Buttons -->
                  <div class="pt-4 flex space-x-4">
                    <button 
                      type="button"
                      class="w-1/3 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/30 focus:ring-offset-2"
                      @click="currentStep--"
                    >
                      <ArrowLeft class="inline-block mr-2 w-4 h-4" />
                      Back
                    </button>
                    
                    <button 
                      type="submit"
                      class="w-2/3 py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                      Continue
                      <ArrowRight class="inline-block ml-2 w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
              
              <!-- Step 3: Security -->
              <div v-if="currentStep === 2" class="animate-fade-in">
                <h3 class="text-2xl font-semibold text-gray-800 mb-6">Secure your account</h3>
                
                <form @submit.prevent="nextStep" class="space-y-5">
                  <!-- Password -->
                  <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <div class="relative">
                      <input
                        id="password"
                        v-model="form.password"
                        :type="showPassword ? 'text' : 'password'"
                        class="form-input pl-10"
                        placeholder="Create a strong password"
                        :class="{ 'form-input-error': errors.password }"
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
                    
                    <!-- Password Strength Indicator -->
                    <div class="mt-2">
                      <div class="flex space-x-1">
                        <div 
                          v-for="(_, index) in 4" 
                          :key="index"
                          class="h-1 flex-1 rounded-full transition-colors duration-300"
                          :class="[
                            index < passwordStrength ? 
                              (passwordStrength === 1 ? 'bg-accent' : 
                               passwordStrength === 2 ? 'bg-secondary' : 
                               passwordStrength === 3 ? 'bg-yellow-500' : 'bg-primary') : 
                              'bg-gray-200'
                          ]"
                        ></div>
                      </div>
                      <p class="text-xs text-gray-500 mt-1">
                        {{ passwordStrengthText }}
                      </p>
                    </div>
                  </div>
                  
                  <!-- Confirm Password -->
                  <div class="form-group">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <div class="relative">
                      <input
                        id="confirmPassword"
                        v-model="form.confirmPassword"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        class="form-input pl-10"
                        placeholder="Confirm your password"
                        :class="{ 'form-input-error': errors.confirmPassword }"
                        @focus="animateInput"
                      />
                      <LockKeyhole class="form-icon" />
                      <button 
                        type="button" 
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        @click="showConfirmPassword = !showConfirmPassword"
                      >
                        <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
                        <EyeOff v-else class="w-5 h-5" />
                      </button>
                      <span v-if="errors.confirmPassword" class="form-error">{{ errors.confirmPassword }}</span>
                    </div>
                  </div>
                  
                  <!-- Security Question -->
                  <div class="form-group">
                    <label for="securityQuestion" class="form-label">Security Question</label>
                    <div class="relative">
                      <select
                        id="securityQuestion"
                        v-model="form.securityQuestion"
                        class="form-input pl-10 appearance-none"
                        :class="{ 'form-input-error': errors.securityQuestion }"
                        @focus="animateInput"
                      >
                        <option value="" disabled selected>Select a security question</option>
                        <option value="pet">What was your first pet's name?</option>
                        <option value="school">What elementary school did you attend?</option>
                        <option value="city">In what city were you born?</option>
                        <option value="mother">What is your mother's maiden name?</option>
                      </select>
                      <ShieldQuestion class="form-icon" />
                      <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      <span v-if="errors.securityQuestion" class="form-error">{{ errors.securityQuestion }}</span>
                    </div>
                  </div>
                  
                  <!-- Security Answer -->
                  <div class="form-group">
                    <label for="securityAnswer" class="form-label">Security Answer</label>
                    <div class="relative">
                      <input
                        id="securityAnswer"
                        v-model="form.securityAnswer"
                        type="text"
                        class="form-input pl-10"
                        placeholder="Enter your answer"
                        :class="{ 'form-input-error': errors.securityAnswer }"
                        @focus="animateInput"
                      />
                      <Shield class="form-icon" />
                      <span v-if="errors.securityAnswer" class="form-error">{{ errors.securityAnswer }}</span>
                    </div>
                  </div>
                  
                  <!-- Navigation Buttons -->
                  <div class="pt-4 flex space-x-4">
                    <button 
                      type="button"
                      class="w-1/3 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/30 focus:ring-offset-2"
                      @click="currentStep--"
                    >
                      <ArrowLeft class="inline-block mr-2 w-4 h-4" />
                      Back
                    </button>
                    
                    <button 
                      type="submit"
                      class="w-2/3 py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                      Continue
                      <ArrowRight class="inline-block ml-2 w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
              
              <!-- Step 4: Terms & Finish -->
              <div v-if="currentStep === 3" class="animate-fade-in">
                <h3 class="text-2xl font-semibold text-gray-800 mb-6">Almost there!</h3>
                
                <form @submit.prevent="submitForm" class="space-y-5">
                  <!-- Terms and Conditions -->
                  <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="terms"
                          v-model="form.agreeToTerms"
                          type="checkbox"
                          class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary/50"
                          :class="{ 'ring-2 ring-accent': errors.agreeToTerms }"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="text-gray-600">
                          I agree to the 
                          <button 
                            type="button" 
                            class="text-primary font-medium hover:underline"
                            @click="showTermsModal = true"
                          >
                            Terms and Conditions
                          </button>
                          and 
                          <button 
                            type="button" 
                            class="text-primary font-medium hover:underline"
                            @click="showPrivacyModal = true"
                          >
                            Privacy Policy
                          </button>.
                        </label>
                      </div>
                    </div>
                    <span v-if="errors.agreeToTerms" class="form-error block mt-1">{{ errors.agreeToTerms }}</span>
                  </div>
                  
                  <!-- Marketing Preferences -->
                  <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 class="font-medium text-gray-800 mb-3">Communication Preferences</h4>
                    
                    <div class="space-y-3">
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="emailUpdates"
                            v-model="form.emailUpdates"
                            type="checkbox"
                            class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary/50"
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="emailUpdates" class="text-gray-600">
                            Email me about special offers and discounts
                          </label>
                        </div>
                      </div>
                      
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="smsUpdates"
                            v-model="form.smsUpdates"
                            type="checkbox"
                            class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary/50"
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="smsUpdates" class="text-gray-600">
                            Send me SMS notifications about my orders
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Referral Code (Optional) -->
                  <div class="form-group">
                    <label for="referralCode" class="form-label">
                      Referral Code <span class="text-gray-500 text-sm">(Optional)</span>
                    </label>
                    <div class="relative">
                      <input
                        id="referralCode"
                        v-model="form.referralCode"
                        type="text"
                        class="form-input pl-10"
                        placeholder="Enter referral code if you have one"
                        @focus="animateInput"
                      />
                      <Users class="form-icon" />
                    </div>
                  </div>
                  
                  <!-- Auth Error Message -->
                  <div v-if="authError" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {{ authError }}
                  </div>
                  
                  <!-- Navigation Buttons -->
                  <div class="pt-4 flex space-x-4">
                    <button 
                      type="button"
                      class="w-1/3 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/30 focus:ring-offset-2"
                      @click="currentStep--"
                    >
                      <ArrowLeft class="inline-block mr-2 w-4 h-4" />
                      Back
                    </button>
                    
                    <button 
                      type="submit"
                      class="w-2/3 py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 group"
                      :disabled="isLoading"
                    >
                      <span v-if="isLoading" class="flex items-center justify-center">
                        <Loader2 class="w-5 h-5 mr-2 animate-spin" />
                        Creating Account...
                      </span>
                      <span v-else class="group-hover:translate-x-1 transition-transform inline-flex items-center">
                        Complete Registration
                        <PartyPopper class="ml-2 w-5 h-5" />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
              
              <!-- Success Step -->
              <div v-if="currentStep === 4" class="animate-fade-in text-center py-8">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
                  <Check class="w-10 h-10 text-primary" />
                </div>
                
                <h3 class="text-2xl font-semibold text-gray-800 mb-3">Registration Successful!</h3>
                <p class="text-gray-600 mb-8">Your account has been created successfully.</p>
                
                <div class="max-w-md mx-auto p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 class="font-medium text-gray-800 mb-4">What's Next?</h4>
                  
                  <div class="space-y-4">
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span class="text-primary font-medium">1</span>
                      </div>
                      <div>
                        <p class="text-gray-700">Verify your email address</p>
                        <p class="text-sm text-gray-500">We've sent a verification link to your email</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span class="text-primary font-medium">2</span>
                      </div>
                      <div>
                        <p class="text-gray-700">Complete your profile</p>
                        <p class="text-sm text-gray-500">Add your preferences and payment methods</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span class="text-primary font-medium">3</span>
                      </div>
                      <div>
                        <p class="text-gray-700">Start ordering food</p>
                        <p class="text-sm text-gray-500">Browse restaurants and place your first order</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="mt-8">
                  <NuxtLink 
                    to="/dashboard" 
                    class="py-3 px-6 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center"
                  >
                    Go to Dashboard
                    <ArrowRight class="ml-2 w-4 h-4" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Terms and Conditions Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showTermsModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showTermsModal = false"></div>
          <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-zoom-in">
            <div class="flex items-center justify-between p-4 md:p-6 border-b">
              <h3 class="text-xl font-semibold text-gray-800">Terms and Conditions</h3>
              <button 
                type="button" 
                class="text-gray-400 hover:text-gray-500"
                @click="showTermsModal = false"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
            <div class="p-4 md:p-6 overflow-y-auto max-h-[60vh]">
              <div class="prose prose-sm max-w-none">
                <h4>1. Introduction</h4>
                <p>Welcome to Gofer! These Terms and Conditions govern your use of our platform and services.</p>
                
                <h4>2. Acceptance of Terms</h4>
                <p>By accessing or using Gofer, you agree to be bound by these Terms and Conditions.</p>
                
                <h4>3. User Accounts</h4>
                <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
                
                <h4>4. Ordering and Payment</h4>
                <p>All orders placed through Gofer are subject to acceptance and availability. Payment must be made at the time of ordering.</p>
                
                <h4>5. Delivery</h4>
                <p>Delivery times are estimates and may vary based on various factors including location, traffic, and weather conditions.</p>
              </div>
            </div>
            <div class="p-4 md:p-6 border-t bg-gray-50 flex justify-end">
              <button 
                type="button" 
                class="py-2 px-4 rounded-md bg-primary text-white font-medium hover:bg-primary/90"
                @click="showTermsModal = false"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    
    <!-- Privacy Policy Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showPrivacyModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showPrivacyModal = false"></div>
          <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-zoom-in">
            <div class="flex items-center justify-between p-4 md:p-6 border-b">
              <h3 class="text-xl font-semibold text-gray-800">Privacy Policy</h3>
              <button 
                type="button" 
                class="text-gray-400 hover:text-gray-500"
                @click="showPrivacyModal = false"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
            <div class="p-4 md:p-6 overflow-y-auto max-h-[60vh]">
              <div class="prose prose-sm max-w-none">
                <h4>1. Information We Collect</h4>
                <p>We collect personal information that you provide to us, such as your name, email address, phone number, and location.</p>
                
                <h4>2. How We Use Your Information</h4>
                <p>We use your information to provide and improve our services, process your orders, and communicate with you.</p>
                
                <h4>3. Information Sharing</h4>
                <p>We may share your information with restaurants and delivery partners to fulfill your orders.</p>
                
                <h4>4. Data Security</h4>
                <p>We implement appropriate security measures to protect your personal information.</p>
                
                <h4>5. Your Rights</h4>
                <p>You have the right to access, correct, or delete your personal information.</p>
              </div>
            </div>
            <div class="p-4 md:p-6 border-t bg-gray-50 flex justify-end">
              <button 
                type="button" 
                class="py-2 px-4 rounded-md bg-primary text-white font-medium hover:bg-primary/90"
                @click="showPrivacyModal = false"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    
    <!-- Animated Full-Screen Loader Component -->
    <AnimatedLoader 
      :show="isLoading"
      :title="loaderTitle"
      :message="loaderMessage"
      :center-icon="form.accountType === 'customer' ? User : Store"
      :orbit-icons="foodIcons"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { 
  User, Mail, Phone, Store, GraduationCap, MapPin, Map,
  Lock, LockKeyhole, Eye, EyeOff, Shield, ShieldQuestion,
  Check, ArrowRight, ArrowLeft, ChevronDown, X, Loader2,
  Users, PartyPopper, Truck, Utensils, BadgePercent,
  Coffee, Pizza, Sandwich, IceCream, Salad, Beef, Cake, Banana,
  ImagePlus
} from 'lucide-vue-next';
import AnimatedLoader from '@/components/core/animated-loader.vue';
import { useVendorRegister } from '@/composables/auth/useVendorRegister';
import { useCustomerRegister } from '@/composables/auth/useCustomerRegister';
import { useUploadFile } from '@/composables/core/useUpload';

// Auth composables
const { registerVendor, loading: vendorLoading, error: vendorError } = useVendorRegister();
const { registerCustomer, loading: customerLoading, error: customerError } = useCustomerRegister();
const { uploadFile, loading: uploading } = useUploadFile();

// Form data
const form = ref({
  fullName: '',
  email: '',
  phone: '',
  accountType: 'customer',
  school: '',
  address: '',
  password: '',
  confirmPassword: '',
  securityQuestion: '',
  securityAnswer: '',
  agreeToTerms: false,
  emailUpdates: true,
  smsUpdates: true,
  referralCode: '',
  displayImageUrl: '',
  displayImage: null as File | null
});

// UI state
const currentStep = ref(0);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showTermsModal = ref(false);
const showPrivacyModal = ref(false);
const errors = ref({} as Record<string, string>);
const fileInput = ref<HTMLInputElement | null>(null);

// Computed properties for loading and error states
const isLoading = computed(() => 
  form.value.accountType === 'vendor' ? vendorLoading.value : customerLoading.value
);

const authError = computed(() => 
  form.value.accountType === 'vendor' ? vendorError.value : customerError.value
);

// Loader text based on account type
const loaderTitle = computed(() => 
  `Creating ${form.value.accountType === 'customer' ? 'Customer' : 'Vendor'} Account`
);

const loaderMessage = computed(() => 
  `Please wait while we set up your ${form.value.accountType === 'customer' ? 'customer' : 'vendor'} account`
);

// Food icons for background
const foodIcons = [Coffee, Pizza, Sandwich, IceCream, Salad, Beef, Cake, Banana];

// Steps configuration
const steps = [
  { 
    title: 'Basic Information', 
    description: 'Tell us about yourself',
    icon: User
  },
  { 
    title: 'Location', 
    description: 'Where are you located?',
    icon: MapPin
  },
  { 
    title: 'Security', 
    description: 'Create a secure password',
    icon: Lock
  },
  { 
    title: 'Finish Up', 
    description: 'Review and complete',
    icon: Check
  }
];

// Sample schools list
// Comprehensive list of Nigerian universities
const schools = [
  // Federal Universities
  'Federal University of Technology, Akure (FUTA)',
  'Obafemi Awolowo University (OAU)',
  'University of Ibadan (UI)',
  'University of Lagos (UNILAG)',
  'University of Benin (UNIBEN)',
  'Ahmadu Bello University (ABU)',
  'Bayero University Kano (BUK)',
  'Federal University of Agriculture, Abeokuta (FUNAAB)',
  'Federal University Oye-Ekiti (FUOYE)',
  'Federal University of Technology, Minna (FUTMINNA)',
  'Federal University of Technology, Owerri (FUTO)',
  'Federal University, Dutse (FUD)',
  'Federal University, Lafia (FULAFIA)',
  'Federal University, Lokoja (FULOKOJA)',
  'Federal University, Otuoke (FUO)',
  'Federal University, Wukari (FUWUKARI)',
  'Michael Okpara University of Agriculture, Umudike (MOUAU)',
  'Modibbo Adama University of Technology, Yola (MAUTECH)',
  'National Open University of Nigeria (NOUN)',
  'Nigeria Police Academy, Wudil',
  'Nigerian Defence Academy (NDA)',
  'Nnamdi Azikiwe University, Awka (UNIZIK)',
  'University of Abuja (UNIABUJA)',
  'University of Agriculture, Makurdi (UAM)',
  'University of Calabar (UNICAL)',
  'University of Ilorin (UNILORIN)',
  'University of Jos (UNIJOS)',
  'University of Maiduguri (UNIMAID)',
  'University of Nigeria, Nsukka (UNN)',
  'University of Port Harcourt (UNIPORT)',
  'University of Uyo (UNIUYO)',
  'Abubakar Tafawa Balewa University (ATBU)',
  'Federal University Gashua (FUGASHUA)',
  'Federal University Gusau (FUGUS)',
  'Federal University Kashere (FUK)',
  'Federal University Birnin Kebbi (FUBK)',
  'Federal University Dustin-Ma (FUDMA)',
  'Alex Ekwueme Federal University, Ndufu-Alike (AE-FUNAI)',
  'Federal University of Petroleum Resources, Effurun (FUPRE)',
  'Federal University of Health Sciences, Otukpo (FUHSO)',
  
  // State Universities
  'Abia State University, Uturu (ABSU)',
  'Adamawa State University, Mubi (ADSU)',
  'Adekunle Ajasin University, Akungba (AAUA)',
  'Akwa Ibom State University (AKSU)',
  'Ambrose Alli University, Ekpoma (AAU)',
  'Chukwuemeka Odumegwu Ojukwu University, Uli (COOU)',
  'Bauchi State University, Gadau (BASUG)',
  'Benue State University, Makurdi (BSU)',
  'Yobe State University, Damaturu (YSU)',
  'Cross River State University of Technology, Calabar (CRUTECH)',
  'Delta State University, Abraka (DELSU)',
  'Ebonyi State University, Abakaliki (EBSU)',
  'Ekiti State University, Ado Ekiti (EKSU)',
  'Enugu State University of Science and Technology (ESUT)',
  'Gombe State University (GSU)',
  'Ibrahim Badamasi Babangida University, Lapai (IBBUL)',
  'Ignatius Ajuru University of Education, Port Harcourt (IAUE)',
  'Imo State University, Owerri (IMSU)',
  'Kaduna State University (KASU)',
  'Kano University of Science and Technology, Wudil (KUST)',
  'Kebbi State University of Science and Technology, Aliero (KSUSTA)',
  'Kogi State University, Anyigba (KSU)',
  'Kwara State University, Malete (KWASU)',
  'Ladoke Akintola University of Technology, Ogbomoso (LAUTECH)',
  'Lagos State University, Ojo (LASU)',
  'Nasarawa State University, Keffi (NSUK)',
  'Niger Delta University, Wilberforce Island (NDU)',
  'Olabisi Onabanjo University, Ago-Iwoye (OOU)',
  'Ondo State University of Science and Technology, Okitipupa (OSUSTECH)',
  'Osun State University, Osogbo (UNIOSUN)',
  'Plateau State University, Bokkos (PLASU)',
  'Rivers State University (RSU)',
  'Tai Solarin University of Education, Ijagun (TASUED)',
  'Taraba State University, Jalingo (TASU)',
  'Technical University, Ibadan',
  'Sokoto State University (SSU)',
  
  // Private Universities
  'Covenant University',
  'Landmark University',
  'Babcock University',
  'Afe Babalola University, Ado-Ekiti (ABUAD)',
  'American University of Nigeria, Yola (AUN)',
  'Benson Idahosa University, Benin City (BIU)',
  'Bowen University, Iwo',
  'Caleb University, Lagos',
  'Caritas University, Enugu',
  'Crawford University, Igbesa',
  'Crescent University, Abeokuta',
  'Elizade University, Ilara-Mokin',
  'Evangel University, Akaeze',
  'Fountain University, Osogbo',
  'Gregory University, Uturu',
  'Hallmark University, Ijebu-Itele',
  'Igbinedion University, Okada',
  'Joseph Ayo Babalola University, Ikeji-Arakeji (JABU)',
  'Kings University, Ode Omu',
  'Lead City University, Ibadan',
  'Madonna University, Okija',
  'McPherson University, Seriki Sotayo',
  'Mountain Top University',
  'Novena University, Ogume',
  'Obong University, Obong Ntak',
  'Oduduwa University, Ipetumodu',
  'Pan-Atlantic University, Lagos',
  'Paul University, Awka',
  'Redeemer\'s University, Ede',
  'Renaissance University, Enugu',
  'Rhema University, Obeama-Asa',
  'Salem University, Lokoja',
  'Samuel Adegboyega University, Ogwa',
  'Southwestern University, Okun Owa',
  'Summit University, Offa',
  'Tansian University, Umunya',
  'University of Mkar, Mkar',
  'Veritas University, Abuja',
  'Wellspring University, Benin City',
  'Wesley University, Ondo',
  'Western Delta University, Oghara',
  'Christopher University, Mowe',
  'Anchor University, Lagos',
  'Augustine University, Ilara',
  'Chrisland University, Abeokuta',
  'Edwin Clark University, Kiagbodo',
  'Hezekiah University, Umudi',
  'Admiralty University of Nigeria, Ibusa',
  'Skyline University, Kano',
  'Dominion University, Ibadan',
  'Precious Cornerstone University, Ibadan',
  'PAMO University of Medical Sciences, Port Harcourt',
  'Legacy University, Okija',
  'Atiba University, Oyo',
  'Nile University of Nigeria, Abuja',
  'Trinity University, Oyo'
];

// Password strength
const passwordStrength = computed(() => {
  const password = form.value.password;
  if (!password) return 0;
  
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  return strength;
});

// Password strength text
const passwordStrengthText = computed(() => {
  switch (passwordStrength.value) {
    case 0: return 'Use 8+ characters with letters, numbers & symbols';
    case 1: return 'Weak - Add uppercase letters, numbers, or symbols';
    case 2: return 'Fair - Add more variety to strengthen';
    case 3: return 'Good - Almost there!';
    case 4: return 'Strong - Excellent password!';
    default: return '';
  }
});

// Handle image upload
const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  
  const file = target.files[0];
  
  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    errors.value.displayImage = 'Image size should not exceed 2MB';
    return;
  }
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    errors.value.displayImage = 'Please select a valid image file';
    return;
  }
  
  try {
    // Upload the file
    const fileUrl = await uploadFile(file);
    
    // Update form with the file URL
    form.value.displayImageUrl = fileUrl;
    form.value.displayImage = file;
    
    // Clear any previous errors
    if (errors.value.displayImage) {
      delete errors.value.displayImage;
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    errors.value.displayImage = 'Failed to upload image. Please try again.';
  }
};

// Remove display image
const removeDisplayImage = () => {
  form.value.displayImageUrl = '';
  form.value.displayImage = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// Trigger file input click
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Validate current step
const validateStep = () => {
  errors.value = {};
  
  if (currentStep.value === 0) {
    if (!form.value.fullName) errors.value.fullName = 'Full name is required';
    if (!form.value.email) {
      errors.value.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
      errors.value.email = 'Please enter a valid email address';
    }
    if (!form.value.phone) {
      errors.value.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(form.value.phone.replace(/\D/g, ''))) {
      errors.value.phone = 'Please enter a valid phone number';
    }
    
    // Validate display image for vendors
    if (form.value.accountType === 'vendor' && !form.value.displayImageUrl) {
      errors.value.displayImage = 'Please upload a display image for your store';
    }
  } else if (currentStep.value === 1) {
    if (!form.value.school) errors.value.school = 'Please select your school';
    if (!form.value.address) errors.value.address = 'Address is required';
  } else if (currentStep.value === 2) {
    if (!form.value.password) {
      errors.value.password = 'Password is required';
    } else if (form.value.password.length < 8) {
      errors.value.password = 'Password must be at least 8 characters';
    } else if (passwordStrength.value < 2) {
      errors.value.password = 'Password is too weak';
    }
    
    if (!form.value.confirmPassword) {
      errors.value.confirmPassword = 'Please confirm your password';
    } else if (form.value.password !== form.value.confirmPassword) {
      errors.value.confirmPassword = 'Passwords do not match';
    }
    
    if (!form.value.securityQuestion) errors.value.securityQuestion = 'Please select a security question';
    if (!form.value.securityAnswer) errors.value.securityAnswer = 'Security answer is required';
  } else if (currentStep.value === 3) {
    if (!form.value.agreeToTerms) errors.value.agreeToTerms = 'You must agree to the terms and conditions';
  }
  
  return Object.keys(errors.value).length === 0;
};

// Next step
const nextStep = () => {
  if (validateStep()) {
    currentStep.value++;
  }
};

// Submit form
const submitForm = async () => {
  if (!validateStep()) return;
  
  try {
    const userData = {
      fullName: form.value.fullName,
      email: form.value.email,
      phone: form.value.phone,
      school: form.value.school,
      address: form.value.address,
      password: form.value.password,
      securityQuestion: form.value.securityQuestion,
      securityAnswer: form.value.securityAnswer,
      emailUpdates: form.value.emailUpdates,
      smsUpdates: form.value.smsUpdates,
      referralCode: form.value.referralCode
    };

    const customerPayload = {
      "fullName": userData.fullName,
      "email": userData.email,
      "phoneNumber": userData.phone,
      "locationName": userData.school,  // Assuming school is the location
      "password": userData.password
    };

    const vendorPayload = {
      "restaurantName": userData.fullName,  // Assuming restaurantName is the full name of the vendor
      "email": userData.email,
      "phoneNumber": userData.phone,
      "locationName": userData.address,  // Assuming address is the location
      "address": userData.address,
      "category": "fast food",  // This could be changed to be dynamic if needed
      "password": userData.password,
      "displayImage": form.value.displayImageUrl  // Add the display image URL to the payload
    };

    // Register based on account type
    if (form.value.accountType === 'vendor') {
      const res = await registerVendor(vendorPayload);
      currentStep.value++;
    } else {
      const res = await registerCustomer(customerPayload);
      currentStep.value++;
    }
  } catch (error) {
    console.error('Registration error:', error);
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
/* Account Type Cards */
.account-type-card {
  @apply flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-gray-50 transition-all;
}

.account-type-selected {
  @apply border-primary bg-primary/5 ring-2 ring-primary/20;
}

.account-type-icon {
  @apply w-10 h-10 rounded-full flex items-center justify-center mr-3;
}

/* Form Styles */
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

/* Animations */
.animate-pulse-once {
  animation: pulseOnce 0.5s;
}

.animate-bounce-subtle {
  animation: bounceSlight 2s ease-in-out infinite;
}

.animate-zoom-in {
  animation: zoomIn 0.3s ease-out forwards;
}

@keyframes pulseOnce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

@keyframes bounceSlight {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Modal */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>