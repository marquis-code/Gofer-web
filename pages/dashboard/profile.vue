<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
    <!-- Decorative background elements -->
     <!-- {{vendorObj}} -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full filter blur-3xl opacity-20 animate-float"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-orange-300 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
    <div class="absolute top-1/3 left-1/4 w-40 h-40 bg-yellow-200 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
    
    <!-- Decorative shapes -->
    <div class="hidden lg:block absolute top-20 right-20 animate-spin-slow">
      <div class="w-10 h-10 rounded-full border-4 border-orange-300 border-dashed"></div>
    </div>
    <div class="hidden lg:block absolute bottom-20 left-20 animate-bounce-slow">
      <div class="w-6 h-6 rounded-full bg-orange-400 opacity-30"></div>
    </div>
    
    <div class="lg:max-w-7xl mx-auto  relative z-10">
      <transition 
        :name="isEditing ? 'slide-up' : 'slide-down'" 
        mode="out-in"
      >
        <div v-if="!isEditing" key="profile" class="profile-view bg-white rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-500">
          <!-- Banner and Profile Image -->
          <div class="relative">
            <div class="banner-bg h-48 w-full relative overflow-hidden">
              <!-- Animated circles in the banner -->
              <div v-for="i in 5" :key="i" class="absolute rounded-full bg-white opacity-10 animate-float-random" 
                   :style="`width: ${20 + i * 10}px; height: ${20 + i * 10}px; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;`">
              </div>
              
              <!-- Store Open Badge -->
              <div class="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 shadow-md animate-pulse-slow">
                <span :class="[vendor?.isStoreOpen ? 'text-green-500' : 'text-red-500', 'flex items-center text-sm font-medium']">
                  <div :class="[vendor?.isStoreOpen ? 'bg-green-500' : 'bg-red-500', 'w-2 h-2 rounded-full mr-2']"></div>
                  {{ vendor?.isStoreOpen ? 'Open Now' : 'Closed' }}
                </span>
              </div>
            </div>
            <div class="absolute -bottom-12 left-6 transform transition-transform duration-500 hover:scale-105">
              <div class="profile-image-container rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img v-if="vendor?.displayImage" :src="vendor.displayImage" alt="Profile" class="w-24 h-24 object-cover" />
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="#000000" viewBox="0 0 256 256" class="w-24 h-24 bg-gray-200"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,1,1,1,131.52,0Z"></path></svg>
              </div>
            </div>
          </div>
          
          <!-- Profile Info -->
          <div class="pt-16 px-6 pb-6">
            <div class="flex justify-between items-start mb-2">
              <div class="animate-fade-in">
                <h1 class="text-2xl font-bold text-gray-800 flex items-center">
                  {{ vendor?.restaurantName || 'Your Restaurant' }}
                  <CheckCircle class="ml-2 text-green-500 h-5 w-5 animate-pulse-slow" />
                </h1>
                <p class="text-gray-600">
                  {{ vendor?.email || 'No email provided' }}
                </p>
              </div>
              <button 
                @click="startEditing" 
                class="edit-button px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
              >
                <Edit2 class="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>
            
            <!-- Category Badge -->
            <div class="mt-2 animate-fade-in-up" style="animation-delay: 0.1s">
              <span class="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium border border-orange-200">
                {{ vendor?.category || 'Uncategorized' }}
              </span>
            </div>
            
            <!-- Location and Contact -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 border-b border-gray-100 pb-6">
              <div class="flex items-start transform transition-all duration-300 hover:translate-x-1">
                <div class="p-2 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 mr-3 shadow-sm">
                  <MapPin class="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Location</p>
                  <p class="font-medium">
                    {{ vendor?.locationName || 'Not specified' }}
                  </p>
                  <p class="text-sm text-gray-500">{{ vendor?.address || 'No address provided' }}</p>
                </div>
              </div>
              <div class="flex items-start transform transition-all duration-300 hover:translate-x-1">
                <div class="p-2 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 mr-3 shadow-sm">
                  <Phone class="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Contact</p>
                  <p class="font-medium">
                    {{ vendor?.phoneNumber || 'Not provided' }}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Website -->
            <div class="mt-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-orange-50 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow transition-all duration-300">
              <p class="text-gray-700 text-sm truncate">{{ computedName }}</p>
              <button @click="copyToClipboard(computedName)" class="p-1 text-gray-500 hover:text-orange-500 transition-colors duration-300 transform hover:scale-110">
                <Copy class="h-5 w-5" />
              </button>
            </div>
            
            <!-- Working Hours Section -->
            <div class="mt-6 bg-orange-50 rounded-lg border border-orange-100 animate-fade-in-up">
              <div class="p-4 border-b border-orange-100">
                <h3 class="font-medium text-orange-700 flex items-center">
                  <Clock class="h-5 w-5 mr-2 text-orange-500" />
                  Working Hours
                </h3>
              </div>
              
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(hours, index) in vendor?.workingHours" :key="index" 
                     :class="[hours.isActive ? 'opacity-100' : 'opacity-50', 'flex justify-between items-center transform transition-all duration-300 hover:translate-x-1 animate-fade-in-up']"
                     :style="`animation-delay: ${0.1 + index * 0.05}s`">
                  <span :class="[hours.isActive ? 'font-medium' : 'text-gray-500', 'text-sm']">{{ hours.day }}</span>
                  <span v-if="hours.isActive" class="text-sm text-gray-700">{{ hours.openingTime }} - {{ hours.closingTime }}</span>
                  <span v-else class="text-sm text-gray-500">Closed</span>
                </div>
              </div>
            </div>
            
            <!-- Packaging Section -->
            <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-fade-in-up" style="animation-delay: 0.6s">
              <h3 class="font-medium text-blue-700 mb-2 flex items-center">
                <Box class="h-5 w-5 mr-2 text-blue-500" />
                Packaging Settings
              </h3>
              <div class="flex items-center justify-between">
                <p class="text-gray-600 text-sm">Limit: <span class="font-medium">{{ vendor?.packSettings?.limit || 0 }} items</span></p>
                <p class="text-gray-600 text-sm">Price: <span class="font-medium">₦{{ vendor?.packSettings?.price || 0 }}</span></p>
              </div>
            </div>
            
            <!-- Registration Info -->
            <div class="mt-4 flex justify-between items-center text-xs text-gray-400 animate-fade-in-up" style="animation-delay: 0.7s">
              <p>Registered: {{ formatDate(vendor?.createdAt) }}</p>
              <p>Last Updated: {{ formatDate(vendor?.updatedAt) }}</p>
            </div>
          </div>
        </div>
        
        <div v-else key="edit" class="edit-form bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-xl font-bold text-gray-800">Profile Details</h1>
            <div class="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100">
              <User class="h-5 w-5 text-orange-500" />
            </div>
          </div>
          
          <!-- Divider with animation -->
          <div class="border-b border-gray-200 mb-6 relative">
            <div class="absolute left-0 top-0 h-0.5 bg-gradient-to-r from-orange-300 to-orange-500 w-1/3 animate-expand"></div>
          </div>
          
          <!-- Display Image -->
          <div class="mb-6">
            <label class="block text-gray-700 mb-2 flex items-center">
              <ImageIcon class="h-4 w-4 mr-2 text-orange-500" />
              Display Image
            </label>
            <div class="flex items-center">
              <label class="cursor-pointer bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition-all duration-300 rounded-l-lg px-4 py-2 text-white shadow-md">
                Choose File
                <input 
                  type="file" 
                  class="hidden" 
                  accept="image/*"
                  @change="handleImageUpload"
                />
              </label>
              <div class="flex-1 border border-l-0 border-gray-300 rounded-r-lg px-4 py-2 text-gray-500 bg-gray-50">
                {{ imageFileName || 'No file chosen' }}
              </div>
            </div>

            <div v-if="uploading" class="py-8 flex flex-col items-center">
              <svg class="animate-spin h-12 w-12 text-orange-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600">Uploading image...</p>
            </div>
            
            <!-- Image preview with animation -->
            <div v-if="editForm.imageUrl" class="mt-3 animate-fade-in">
              <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-300 shadow-md">
                <img :src="editForm.imageUrl" alt="Preview" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          <!-- Restaurant Name -->
          <div class="mb-6 animate-fade-in-up" style="animation-delay: 0.1s">
            <label class="block text-gray-700 mb-2 flex items-center">
              <Briefcase class="h-4 w-4 mr-2 text-orange-500" />
              Restaurant Name
            </label>
            <input 
              v-model="editForm.restaurantName" 
              type="text" 
              placeholder="Restaurant name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-gray-50 focus:bg-white"
            />
          </div>
          
          <!-- Email and Phone -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="animate-fade-in-up" style="animation-delay: 0.2s">
              <label class="block text-gray-700 mb-2 flex items-center">
                <Mail class="h-4 w-4 mr-2 text-orange-500" />
                Email Address
              </label>
              <input 
                v-model="editForm.email" 
                type="email" 
                placeholder="Email address"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-gray-50 focus:bg-white"
              />
            </div>
            <div class="animate-fade-in-up" style="animation-delay: 0.3s">
              <label class="block text-gray-700 mb-2 flex items-center">
                <Phone class="h-4 w-4 mr-2 text-orange-500" />
                Phone Number
              </label>
              <input 
                v-model="editForm.phoneNumber" 
                type="text" 
                placeholder="Phone number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-gray-50 focus:bg-white"
              />
            </div>
          </div>
          
          <!-- Location -->
          <div class="mb-6 animate-fade-in-up" style="animation-delay: 0.4s">
            <label class="block text-gray-700 mb-2 flex items-center">
              <MapPin class="h-4 w-4 mr-2 text-orange-500" />
              Location
            </label>
            <input 
              v-model="editForm.locationName" 
              type="text" 
              placeholder="Location"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-gray-50 focus:bg-white"
            />
          </div>
          
          <!-- Address -->
          <div class="mb-6 animate-fade-in-up" style="animation-delay: 0.5s">
            <label class="block text-gray-700 mb-2 flex items-center">
              <Home class="h-4 w-4 mr-2 text-orange-500" />
              Address
            </label>
            <input 
              v-model="editForm.address" 
              type="text" 
              placeholder="Full address"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-gray-50 focus:bg-white"
            />
          </div>
          
          <!-- Category -->
          <div class="mb-6 animate-fade-in-up" style="animation-delay: 0.6s">
            <label class="block text-gray-700 mb-2 flex items-center">
              <Tag class="h-4 w-4 mr-2 text-orange-500" />
              Category
            </label>
            <select 
              v-model="editForm.category" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-gray-50 focus:bg-white"
            >
              <option value="fast food">Fast Food</option>
              <option value="restaurant">Restaurant</option>
              <option value="cafe">Cafe</option>
              <option value="bakery">Bakery</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drinks</option>
              <option value="grocery">Grocery</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <!-- Store Status -->
          <div class="mb-6 animate-fade-in-up" style="animation-delay: 0.7s">
            <label class="block text-gray-700 mb-2 flex items-center">
              <Activity class="h-4 w-4 mr-2 text-orange-500" />
              Store Status
            </label>
            <div class="flex items-center space-x-4">
  <label for="storeToggle" class="text-gray-700">Store Status</label>
  
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      id="storeToggle"
      v-model="editForm.isStoreOpen"
      class="sr-only peer"
    />
    <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-orange-500 transition-all duration-200"></div>
    <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-200 peer-checked:translate-x-full"></div>
  </label>

  <span class="text-sm font-semibold text-gray-700">
    {{ editForm.isStoreOpen ? 'Open' : 'Closed' }}
  </span>
</div>

            <!-- <div class="flex items-center space-x-2">
              <div class="flex items-center">
                <input 
                  type="radio" 
                  id="open" 
                  v-model="editForm.isStoreOpen" 
                  :value="true"
                  class="mr-2 text-orange-500 focus:ring-orange-500"
                />
                <label for="open" class="text-gray-700">Open</label>
              </div>
              <div class="flex items-center">
                <input 
                  type="radio" 
                  id="closed" 
                  v-model="editForm.isStoreOpen" 
                  :value="false"
                  class="mr-2 text-orange-500 focus:ring-orange-500"
                />
                <label for="closed" class="text-gray-700">Closed</label>
              </div>
            </div> -->
          </div>
          
          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 animate-fade-in-up" style="animation-delay: 0.8s">
            <button 
              @click="cancelEdit" 
              class="px-6 py-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300 shadow-sm hover:shadow transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <div class="flex items-center">
                <X class="h-4 w-4 mr-2" />
                Cancel
              </div>
            </button>
            <button 
              :disabled="isUpdating"
              @click="saveChanges" 
              class="px-6 py-3 bg-gradient-to-r disabled:cursor-not-allowed disabled:opacity-50 from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <div class="flex items-center">
                <Save class="h-4 w-4 mr-2" />
                {{ isUpdating ? 'Updating...' : 'Update Profile' }}
              </div>
            </button>
          </div>
          
          <!-- Decorative elements -->
          <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-100 rounded-full opacity-50 z-0"></div>
          <div class="absolute -top-5 -left-5 w-20 h-20 bg-yellow-100 rounded-full opacity-30 z-0"></div>
        </div>
      </transition>
      
      <!-- Animated Copy Modal -->
      <AnimatedCopyModal
        :is-visible="showCopyModal"
        :copied-content="copiedUrl"
        title="URL Copied Successfully!"
        message="Share your restaurant link with customers"
        button-text="Awesome!"
        animation="bounce"
        :auto-close="true"
        :auto-close-time="5000"
        @close="closeCopyModal"
      />
    </div>
    
    <!-- Floating decorative elements -->
    <div class="hidden md:block absolute bottom-10 right-10 animate-float">
      <div class="relative">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 opacity-40"></div>
        <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 opacity-60"></div>
      </div>
    </div>
    
    <div class="hidden md:block absolute top-20 left-10 animate-float-delay">
      <div class="w-12 h-12 rounded-full border-4 border-orange-200 opacity-40"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
// import { useUser } from '@/composables/auth/vendor'
import { useUpdateProfile } from '@/composables/modules/vendor/useUpdateProfile'
import { useRestaurantUrl } from '@/composables/useRestaurantUrl'
import AnimatedCopyModal from '@/components/AnimatedCopyModal.vue'
import { useFetchVendor } from "@/composables/modules/vendor/useFetchVendor"
import { useFetchVendorById } from "@/composables/modules/vendor/useFetchVendorById"
import { useUploadFile } from '@/composables/core/useUpload'
import { 
  CheckCircle, Edit2, MapPin, Phone, Copy, Tag, Clock, User, 
  ImageIcon, Briefcase, FileText, Mail, X, Save, Activity,
  Home, Box
} from 'lucide-vue-next'

const { uploadFile, loading: uploading } = useUploadFile()

// Get vendor data from composable
// const { vendor } = useUser()
const { updateProfile, loading: isUpdating } = useUpdateProfile()
const { vendor } = useFetchVendorById()
const { vendor: vendorObj } = useFetchVendor()

// Define extended profile data type
interface ProfileData {
  _id?: string
  imageUrl: string
  displayImage: string
  restaurantName: string
  email: string
  phoneNumber: string
  locationName: string
  address: string
  category: string
  isStoreOpen: boolean
  description?: string
  tags?: string[]
  packSettings?: {
    limit: number
    price: number
  }
  workingHours?: {
    _id: string
    day: string
    isActive: boolean
    openingTime: string
    closingTime: string
  }[]
}

// Initialize the URL composable
const { getRestaurantUrl } = useRestaurantUrl()

// State
const isEditing = ref(false)
const imageFileName = ref('')
const showCopyModal = ref(false)
const copiedUrl = ref('')

// Initialize profile data with empty values
const profileData = reactive<ProfileData>({
  imageUrl: '',
  displayImage: '',
  restaurantName: '',
  email: '',
  phoneNumber: '',
  locationName: '',
  address: '',
  category: 'fast food',
  isStoreOpen: true,
  description: '',
  tags: [],
  packSettings: {
    limit: 0,
    price: 0
  },
  workingHours: []
})

const siteUrl = ref(process.client ? window.location.origin : 'https://Gofer.com')
const computedName = computed(() => {
  return `${siteUrl.value}/${vendor?.value?.slug}`
})

// Edit form state - will be populated when editing starts
const editForm = reactive<ProfileData>({
  imageUrl: '',
  displayImage: '',
  restaurantName: '',
  email: '',
  phoneNumber: '',
  locationName: '',
  address: '',
  category: 'fast food',
  isStoreOpen: true,
  description: '',
  tags: [],
  packSettings: {
    limit: 0,
    price: 0
  },
  workingHours: []
})

// Computed URL based on restaurant name
const restaurantUrl = computed(() => {
  return getRestaurantUrl(vendor.value?.slug || 'restaurant')
})

// Format date helper function
const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Watch for vendor data changes and update profile data
watch(() => vendor.value, (newUser) => {
  if (newUser) {
    // Update profile data with vendor data
    profileData.restaurantName = newUser.restaurantName || ''
    profileData.email = newUser.email || ''
    profileData.phoneNumber = newUser.phoneNumber || ''
    profileData.locationName = newUser.locationName || ''
    profileData.address = newUser.address || ''
    profileData.category = newUser.category || 'fast food'
    profileData.isStoreOpen = newUser.isStoreOpen !== undefined ? newUser.isStoreOpen : true
    
    // Handle display image
    profileData.displayImage = newUser.displayImage || ''
    profileData.imageUrl = newUser.displayImage || ''
    
    // If we have additional fields in the vendor object, map them too
    if (newUser.description) profileData.description = newUser.description
    if (newUser.tags) profileData.tags = newUser.tags
    if (newUser.packSettings) profileData.packSettings = newUser.packSettings
    if (newUser.workingHours) profileData.workingHours = newUser.workingHours
  }
}, { immediate: true, deep: true })

// Methods
const startEditing = () => {
  // Copy current profile data to edit form
  Object.assign(editForm, profileData)
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  imageFileName.value = ''
}

const saveChanges = async () => {
  try {
    // Prepare update data
    const updateData = {
      restaurantName: editForm.restaurantName,
      email: editForm.email,
      phoneNumber: editForm.phoneNumber,
      locationName: editForm.locationName,
      address: editForm.address,
      category: editForm.category,
      isStoreOpen: editForm.isStoreOpen,
      displayImage: editForm.displayImage || editForm.imageUrl
    }
    
    // Call update profile composable
    await updateProfile(updateData)
    
    // Update profile data with edited values
    Object.assign(profileData, editForm)
    
    // Exit edit mode
    isEditing.value = false
    
    // Show success notification (could use AnimatedCopyModal)
    console.log('Profile updated successfully!')
  } catch (error) {
    console.error('Failed to update profile:', error)
    // Handle error (show error notification)
  }
}

const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]
    imageFileName.value = file.name

    try {
      // Call the uploadFile method from the composable
      const fileUrl = await uploadFile(file)
      
      // Set the returned URL to the form data
      editForm.displayImage = fileUrl
      editForm.imageUrl = fileUrl
      
      console.log('Image uploaded successfully:', fileUrl)
    } catch (error) {
      console.error('Upload error:', error)
    }
  }
}

// Copy URL to clipboard with animated modal
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  copiedUrl.value = text
  showCopyModal.value = true
}

// Close the copy modal
const closeCopyModal = () => {
  showCopyModal.value = false
}

onMounted(() => {
  // If we have vendor data, initialize the profile
  if (vendor.value) {
    // This will be handled by the watcher
  }
})

definePageMeta({
  layout: "dashboard"
})
</script>

<style scoped>
/* Banner background with circles pattern */
.banner-bg {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  background-image: radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes float-delay {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes float-random {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(5px, -5px); }
  50% { transform: translate(10px, 0); }
  75% { transform: translate(5px, 5px); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes expand {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 8s ease-in-out infinite;
}

.animate-float-random {
  animation: float-random 10s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 15s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-expand {
  animation: expand 1.5s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .profile-image-container {
    width: 72px;
    height: 72px;
  }
  
  .banner-bg {
    height: 120px;
  }
}
</style>