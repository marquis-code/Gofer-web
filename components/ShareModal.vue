<template>
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
      @click="close"
    >
      <div 
        class="bg-white rounded-md shadow-xl w-full max-w-md p-6 animate-scaleIn"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">Share this vendor</h3>
          <button 
            @click="close"
            class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X size="20" />
          </button>
        </div>
        
        <div class="mb-6">
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-md mb-4">
            <div class="w-16 h-16 rounded-md overflow-hidden">
              <img 
                :src="vendor.image || '/placeholder.svg?height=64&width=64'" 
                :alt="vendor.name" 
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 class="font-bold">{{ vendor.name }}</h4>
              <p class="text-sm text-gray-600">{{ vendor.description }}</p>
            </div>
          </div>
          
          <div class="relative mb-4">
            <input 
              ref="urlInput"
              type="text" 
              :value="shareUrl" 
              readonly
              class="w-full pl-4 pr-20 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50"
            />
            <button 
              @click="copyToClipboard"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors duration-200"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-4 gap-4">
          <button 
            @click="shareViaWhatsApp"
            class="flex flex-col items-center justify-center p-3 rounded-md hover:bg-green-50 transition-colors duration-200"
          >
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span class="text-xs">WhatsApp</span>
          </button>
          
          <button 
            @click="shareViaTwitter"
            class="flex flex-col items-center justify-center p-3 rounded-md hover:bg-blue-50 transition-colors duration-200"
          >
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1DA1F2">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <span class="text-xs">Twitter</span>
          </button>
          
          <button 
            @click="shareViaFacebook"
            class="flex flex-col items-center justify-center p-3 rounded-md hover:bg-blue-50 transition-colors duration-200"
          >
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span class="text-xs">Facebook</span>
          </button>
          
          <button 
            @click="shareViaEmail"
            class="flex flex-col items-center justify-center p-3 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <Mail size="24" class="text-gray-700" />
            </div>
            <span class="text-xs">Email</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { X, Mail } from 'lucide-vue-next';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    vendor: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['close']);
  
  const shareUrl = ref('');
  const copied = ref(false);
  const urlInput = ref<HTMLInputElement | null>(null);
  
  onMounted(() => {
    shareUrl.value = window.location.href;
  });
  
  const close = () => {
    emit('close');
  };
  
  const copyToClipboard = () => {
    if (urlInput.value) {
      urlInput.value.select();
      document.execCommand('copy');
      copied.value = true;
      
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    }
  };
  
  const shareViaWhatsApp = () => {
    const text = `Check out ${props.vendor.name} on Gofer! ${props.vendor.description}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl.value)}`;
    window.open(url, '_blank');
  };
  
  const shareViaTwitter = () => {
    const text = `Check out ${props.vendor.name} on Gofer! ${props.vendor.description}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl.value)}`;
    window.open(url, '_blank');
  };
  
  const shareViaFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`;
    window.open(url, '_blank');
  };
  
  const shareViaEmail = () => {
    const subject = `Check out ${props.vendor.name} on Gofer!`;
    const body = `I found this amazing vendor on Gofer!\n\n${props.vendor.name}\n${props.vendor.description}\n\nCheck it out: ${shareUrl.value}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url);
  };
  </script>
  
  <style scoped>
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.4s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  </style>
  
  