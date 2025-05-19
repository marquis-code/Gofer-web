<template>
  <div>
    <!-- Mobile Hamburger Menu Button -->
 <div class="mb-2">
  <button 
      @click="isMobileMenuOpen = !isMobileMenuOpen"
      class="fixed top-4 left-4 z-50 p-2 rounded-md  text-white mb-3 md:hidden transition-colors"
    >
      <!-- <Menu v-if="!isMobileMenuOpen" size="24" class="" /> -->
<div class="flex justify-between items-center">
  <svg  v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
  <X v-else size="24" class=" ml-[200px]" />
</div>
    </button>
 </div>
    
    <!-- Sidebar -->
    <div 
      :class="[
        'fixed top-0 left-0 bg-[#1e2530] text-gray-300 h-screen transition-all duration-300 flex flex-col z-40 sidebar',
        isCollapsed ? 'w-16' : 'w-64',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <div class="p-4 border-b border-gray-700 flex items-center justify-between">
        <div :class="['flex items-center', isCollapsed && 'justify-center w-full']">
          <!-- <div v-if="!isCollapsed" class="h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded px-2 text-white font-bold shadow-glow">LOGO</div> -->
          <img src="@/assets/img/erranders.png" class="h-10 w-10" />
          <!-- <div v-else class="h-8 w-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center text-white font-bold shadow-glow">L</div> -->
        </div>
        
        <button 
          @click="isCollapsed = !isCollapsed"
          :class="[
            'text-gray-400 hover:text-white transition-colors', 
            isCollapsed && 'hidden',
            'hidden md:block' // Hide on mobile
          ]"
        >
          <ChevronLeft v-if="!isCollapsed" size="20" class="hover:animate-pulse" />
          <ChevronRight v-else size="20" class="hover:animate-pulse" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto py-4 sidebar-content">
        <div class="mb-6">
          <p :class="[
            'px-4 text-xs uppercase text-gray-500 font-medium mb-2',
            isCollapsed && 'text-center'
          ]">
            {{ !isCollapsed ? "GENERAL" : "GEN" }}
          </p>
          
          <nav class="space-y-2">
            <!-- Nav Items -->
            <div 
              v-for="item in navItems" 
              :key="item.label"
              class="relative text-sm mx-2 menu-container"
            >
              <!-- Regular Nav Item -->
              <NuxtLink 
                v-if="!item.children"
                 @click="isMobileMenuOpen = !isMobileMenuOpen"
                :to="item.path"
                :class="[
                  'flex items-center px-4 py-2.5 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 menu-item relative overflow-hidden',
                  isCollapsed && 'justify-center',
                  isActiveRoute(item.path) && 'bg-blue-600 text-white'
                ]"
              >
                <component 
                  :is="item.icon" 
                  size="20" 
                  :class="[
                    'transition-transform duration-300',
                    isActiveRoute(item.path) ? 'text-white animate-float' : 'text-gray-400 group-hover:text-white'
                  ]"
                />
                <span 
                  v-if="!isCollapsed" 
                  :class="[
                    'ml-3 transition-all duration-300',
                    isActiveRoute(item.path) && 'font-medium'
                  ]"
                >
                  {{ item.label }}
                </span>
                <div 
                  v-if="isActiveRoute(item.path)" 
                  class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 active-indicator"
                ></div>
              </NuxtLink>

              <!-- Dropdown Nav Item -->
              <div class="" v-else>
                <button 
                  @click="toggleMenu(item.key)"
                  :class="[
                    'flex items-center w-full px-4 py-2.5 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 menu-item relative overflow-hidden',
                    isCollapsed && 'justify-center',
                    isActiveParent(item.path) && 'bg-blue-600/50 text-white'
                  ]"
                >
                  <component 
                    :is="item.icon" 
                    size="20" 
                    :class="[
                      'transition-transform duration-300',
                      isActiveParent(item.path) ? 'text-white animate-float' : 'text-gray-400'
                    ]"
                  />
                  <template v-if="!isCollapsed">
                    <span class="ml-3 flex-1 text-left">{{ item.label }}</span>
                    <ChevronDown 
                      size="16" 
                      :class="[
                        'transition-transform duration-300', 
                        expandedMenus[item.key] ? 'transform rotate-180' : ''
                      ]" 
                    />
                  </template>
                  <div 
                    v-if="isActiveParent(item.path)" 
                    class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 active-indicator"
                  ></div>
                </button>
                
                <div 
                  v-if="!isCollapsed" 
                  :class="[
                    'pl-12 overflow-hidden text-sm transition-all duration-300 ease-in-out submenu',
                    expandedMenus[item.key] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  ]"
                >
                  <NuxtLink 
                    v-for="child in item.children" 
                    @click="isMobileMenuOpen = !isMobileMenuOpen"
                    :key="child.label"
                    :to="child.path"
                    :class="[
                      'flex items-center py-2 text-sm  rounded-full px-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 relative submenu-item overflow-hidden',
                      isActiveRoute(child.path) && 'bg-blue-600 text-white'
                    ]"
                  >
                    <span>{{ child.label }}</span>
                    <div 
                      v-if="isActiveRoute(child.path)" 
                      class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 active-indicator"
                    ></div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </nav>
        </div>
        
        <div>
          <p :class="[
            'px-4 text-xs uppercase text-gray-500 font-medium mb-2',
            isCollapsed && 'text-center'
          ]">
            {{ !isCollapsed ? "SUPPORT" : "SUP" }}
          </p>
          
          <nav class="space-y-2.5">
            <NuxtLink 
              v-for="item in supportItems.filter(item => item.label !== 'Logout')" 
               @click="isMobileMenuOpen = !isMobileMenuOpen"
              :key="item.label"
              :to="item.path"
              :class="[
                'flex items-center px-4 text-sm py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 relative menu-item overflow-hidden',
                isCollapsed && 'justify-center',
                isActiveRoute(item.path) && 'bg-blue-600 text-white'
              ]"
            >
              <component 
                :is="item.icon" 
                size="20" 
                :class="[
                  'transition-transform text-sm duration-300',
                  isActiveRoute(item.path) ? 'text-white animate-float' : 'text-gray-400'
                ]"
              />
              <span 
                v-if="!isCollapsed" 
                :class="[
                  'ml-3 transition-all duration-300',
                  isActiveRoute(item.path) && 'font-medium'
                ]"
              >
                {{ item.label }}
              </span>
              <div 
                v-if="isActiveRoute(item.path)" 
                class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 active-indicator"
              ></div>
            </NuxtLink>
            
            <!-- Logout Button -->
            <button 
              @click="showLogoutModal = true"
              :class="[
                'flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300 relative w-full menu-item overflow-hidden',
                isCollapsed && 'justify-center'
              ]"
            >
              <LogOut size="20" class="text-gray-400 group-hover:text-white" />
              <span v-if="!isCollapsed" class="ml-3">Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
    
    <!-- Overlay for mobile menu -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 md:hidden overlay-fade-in"
      @click="isMobileMenuOpen = false"
    ></div>
    
    <!-- Animated Logout Confirmation Modal -->
    <Transition name="modal">
      <div 
        v-if="showLogoutModal" 
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <!-- Modal Backdrop with Particles -->
        <div 
          class="absolute inset-0 bg-black/70 backdrop-blur-sm"
          @click="showLogoutModal = false"
        >
          <!-- Animated Particles -->
          <div v-for="n in 20" :key="n" class="particle"></div>
        </div>
        
        <!-- Modal Content -->
        <div 
          class="bg-white dark:bg-gray-800 rounded-md shadow-2xl w-11/12 max-w-md relative overflow-hidden modal-content"
          @click.stop
        >
          <!-- Top Decorative Wave -->
          <div class="absolute top-0 left-0 right-0 h-2 wave-top"></div>
          
          <!-- Modal Header with Illustration -->
          <div class="p-6 text-center">
            <!-- Animated Logout Illustration -->
            <div class="logout-illustration mx-auto mb-4">
              <div class="circle-container">
                <div class="circle circle-outer"></div>
                <div class="circle circle-middle"></div>
                <div class="circle circle-inner"></div>
                <div class="logout-arrow">
                  <div class="arrow-body"></div>
                  <div class="arrow-head"></div>
                </div>
              </div>
            </div>
            
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1 animate-title">
              Logout Confirmation
            </h3>
            <p class="text-gray-600 dark:text-gray-300 animate-text">
              Are you sure you want to log out of your account?
            </p>
          </div>
          
          <!-- Modal Actions -->
          <div class="p-4 flex space-x-3 justify-center border-t border-gray-200 dark:border-gray-700">
            <button 
              @click="showLogoutModal = false"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 animate-button-cancel"
            >
              Cancel
            </button>
            <button 
              @click="handleLogout"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 animate-button-confirm relative overflow-hidden"
            >
              <span class="relative z-10">Confirm Logout</span>
              <span class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 button-shine"></span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { 
  BarChart2, 
  Calendar, 
  ChevronDown,
  ChevronLeft,
  ChevronRight, 
  Clock, 
  CreditCard, 
  FileText, 
  HelpCircle, 
  LayoutGrid, 
  List, 
  LogOut, 
  Menu, 
  MessageSquare, 
  ShoppingBag, 
  Star, 
  Truck, 
  User,
  X
} from 'lucide-vue-next';

// Router for navigation
const router = useRouter();

// State
const isCollapsed = ref(false);
const isMobileMenuOpen = ref(false);
const showLogoutModal = ref(false);
const expandedMenus = reactive({
  orders: false,
  analysis: false,
  delivery: false
});

// Get current route
const route = useRoute();

// Navigation items
interface NavChild {
  label: string;
  path: string;
}

interface NavItem {
  icon?: any;
  label: string;
  path: string;
  key?: string;
  children?: NavChild[];
}

const navItems = reactive<NavItem[]>([
  { 
    icon: LayoutGrid, 
    label: "Dashboard", 
    path: "/dashboard" 
  },
  { 
    icon: User, 
    label: "Profile", 
    path: "/dashboard/profile" 
  },
  { 
    icon: FileText, 
    label: "Food Categories", 
    path: "/dashboard/categories" 
  },
  { 
    icon: List, 
    label: "Menu List", 
    path: "/dashboard/menu" 
  },
  { 
    icon: ShoppingBag, 
    label: "Orders", 
    path: "/dashboard/order",
    key: "orders",
    children: [
      { label: "Today Orders", path: "/dashboard/order/today" },
      { label: "All Orders", path: "/dashboard/order/all" },
      { label: "Analytics", path: "/dashboard/order/analytics" },
    ]
  },
  { 
    icon: BarChart2, 
    label: "Analysis", 
    path: "/dashboard/analysis",
    key: "analysis",
    children: [
      { label: "Sales Overview", path: "/dashboard/analysis/sales" },
      { label: "Monthly Reports", path: "/dashboard/analysis/reports" },
      { label: "Customer Analytics", path: "/dashboard/analysis/customers" }
    ]
  },
  { 
    icon: Clock, 
    label: "Working Hours", 
    path: "/dashboard/working-hours" 
  },
  { 
    icon: BarChart2, 
    label: "Brand Promotion", 
    path: "/dashboard/promotions" 
  },
  { 
    icon: CreditCard, 
    label: "Transactions", 
    path: "/dashboard/transactions" 
  },
  { 
    icon: Star, 
    label: "Reviews", 
    path: "/dashboard/reviews" 
  },
  { 
    icon: Calendar, 
    label: "Catering Events", 
    path: "/dashboard/events" 
  },
  { 
    icon: Truck, 
    label: "Delivery", 
    path: "/dashboard/delivery",
    key: "delivery",
    children: [
      // { label: "Active Deliveries", path: "/dashboard/delivery/active" },
      { label: "Delivery Locations", path: "/dashboard/delivery/location" },
      { label: "Delivery Tracking", path: "/dashboard/delivery/" }
    ]
  }
]);

const supportItems = reactive<NavItem[]>([
  { 
    icon: HelpCircle, 
    label: "Help Center", 
    path: "https://wa.me/2347070759619?text=Hello%2C%20I%20need%20help%20with%20my%20account" 
  },
  { 
    icon: LogOut, 
    label: "Logout", 
    path: "/logout" 
  }
]);


// const supportItems = reactive<NavItem[]>([
//   { 
//     icon: HelpCircle, 
//     label: "Help Center", 
//     path: "#" 
//   },
//   // { 
//   //   icon: MessageSquare, 
//   //   label: "FAQs", 
//   //   path: "#" 
//   // },
//   { 
//     icon: LogOut, 
//     label: "Logout", 
//     path: "/logout" 
//   }
// ]);

// Updated active route checking functions
const isActiveRoute = (path: string): boolean => {
  if (path === '#') return false;
  
  // Exact match for parent routes
  if (!path.includes('/dashboard/')) {
    return route.path === path;
  }
  
  // For dashboard routes, be more specific to avoid multiple highlights
  const routeParts = route.path.split('/');
  const pathParts = path.split('/');
  
  // If the path has fewer segments than the current route, it needs to be an exact match
  // This prevents parent routes from being active when child routes are active
  if (pathParts.length < routeParts.length) {
    return route.path === path;
  }
  
  // Otherwise, check if it's an exact match
  return route.path === path;
};

// Check if a parent route is active (any child is active)
const isActiveParent = (parentPath: string): boolean => {
  // Only return true if we're on a child route and not the parent itself
  if (route.path.startsWith(parentPath) && route.path !== parentPath) {
    // Make sure we're actually on a direct child, not a deeply nested route
    // that would cause multiple parent highlights
    const routeDepth = route.path.split('/').length;
    const parentDepth = parentPath.split('/').length;
    
    // Only highlight direct parent
    return routeDepth === parentDepth + 1;
  }
  return false;
};

// Auto-expand menu when a child route is active
watch(() => route.path, (newPath) => {
  // Check each menu with children
  Object.keys(expandedMenus).forEach(key => {
    const item = navItems.find(item => item.key === key);
    if (item && item.children) {
      // If any child path matches the current route, expand the menu
      const hasActiveChild = item.children.some(child => 
        newPath === child.path || newPath.startsWith(`${child.path}/`)
      );
      if (hasActiveChild) {
        expandedMenus[key] = true;
      }
    }
  });
}, { immediate: true });

// Toggle dropdown menu
const toggleMenu = (menu: string) => {
  // If the clicked menu is already open, close it
  if (expandedMenus[menu]) {
    expandedMenus[menu] = false;
    return;
  }
  
  // Close all menus
  Object.keys(expandedMenus).forEach(key => {
    expandedMenus[key] = false;
  });
  
  // Open the clicked menu
  expandedMenus[menu] = true;
};

// Handle logout confirmation
const handleLogout = () => {
  // Add any logout logic here (clear tokens, etc.)
  setTimeout(() => {
    // Navigate to login page after a short delay for animation
    router.push('/login');
  }, 500);
};

// Handle window resize for mobile menu
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) { // md breakpoint
      isMobileMenuOpen.value = false;
    }
  };

  window.addEventListener('resize', handleResize);
  
  // Clean up event listener
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
});
</script>

<style>
/* Base Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Enhanced Animations */
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bounce-light {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

@keyframes highlightIn {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

.animate-pulse {
  animation: pulse 1s infinite;
}

.animate-float {
  animation: float 2s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-bounce-light {
  animation: bounce-light 0.5s ease infinite;
}

.shadow-glow {
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

/* Active Indicator Animation */
.active-indicator {
  transform-origin: left;
  animation: highlightIn 0.3s ease-out forwards;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}

/* Menu Item Hover Effect */
.menu-item {
  position: relative;
  overflow: hidden;
}

.menu-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.menu-item:hover::after {
  transform: translateX(0);
}

/* Submenu Animation */
.submenu {
  transition: max-height 0.3s ease, opacity 0.2s ease;
}

.submenu-item {
  transform: translateX(-5px);
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;
}

.submenu-item:nth-child(1) { animation-delay: 0.05s; }
.submenu-item:nth-child(2) { animation-delay: 0.1s; }
.submenu-item:nth-child(3) { animation-delay: 0.15s; }

/* Sidebar Content Scroll Animation */
.sidebar-content::-webkit-scrollbar {
  width: 4px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Overlay Animation */
.overlay-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

/* Modal Animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.modal-content {
  animation: modalBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes modalBounce {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  70% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

/* Animated Title and Text */
.animate-title {
  animation: slideDown 0.5s ease forwards;
  opacity: 0;
  transform: translateY(-20px);
}

.animate-text {
  animation: slideDown 0.5s ease 0.1s forwards;
  opacity: 0;
  transform: translateY(-15px);
}

@keyframes slideDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button Animations */
.animate-button-cancel {
  animation: fadeButton 0.5s ease 0.2s forwards;
  opacity: 0;
}

.animate-button-confirm {
  animation: fadeButton 0.5s ease 0.3s forwards;
  opacity: 0;
}

@keyframes fadeButton {
  to {
    opacity: 1;
  }
}

/* Button Shine Effect */
.button-shine {
  opacity: 0;
  animation: shine 3s ease-in-out infinite;
}

@keyframes shine {
  0% {
    opacity: 0;
    transform: translateX(-100%) skewX(-15deg);
  }
  20% {
    opacity: 0.4;
  }
  40% {
    opacity: 0;
    transform: translateX(100%) skewX(-15deg);
  }
  100% {
    opacity: 0;
  }
}

/* Decorative Wave */
.wave-top {
  background: linear-gradient(90deg, #3b82f6, #ef4444, #3b82f6);
  background-size: 200% 100%;
  animation: gradientMove 3s linear infinite;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 0%;
  }
}

/* Animated Particles */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat 4s ease-in infinite;
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translate(0, 0);
  }
  10% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translate(var(--x, 100px), var(--y, -100px));
  }
}

/* Position particles randomly */
.particle:nth-child(1) { --x: 100px; --y: -150px; left: 10%; top: 50%; animation-delay: 0.2s; }
.particle:nth-child(2) { --x: -120px; --y: -100px; left: 20%; top: 40%; animation-delay: 0.5s; }
.particle:nth-child(3) { --x: 80px; --y: -80px; left: 30%; top: 60%; animation-delay: 0.1s; }
.particle:nth-child(4) { --x: -90px; --y: -120px; left: 40%; top: 30%; animation-delay: 0.7s; }
.particle:nth-child(5) { --x: 110px; --y: -90px; left: 50%; top: 70%; animation-delay: 0.3s; }
.particle:nth-child(6) { --x: -100px; --y: -110px; left: 60%; top: 20%; animation-delay: 0.6s; }
.particle:nth-child(7) { --x: 90px; --y: -130px; left: 70%; top: 80%; animation-delay: 0.4s; }
.particle:nth-child(8) { --x: -110px; --y: -90px; left: 80%; top: 10%; animation-delay: 0.8s; }
.particle:nth-child(9) { --x: 120px; --y: -100px; left: 90%; top: 90%; animation-delay: 0.2s; }
.particle:nth-child(10) { --x: -80px; --y: -140px; left: 15%; top: 45%; animation-delay: 0.5s; }
.particle:nth-child(11) { --x: 100px; --y: -150px; left: 25%; top: 55%; animation-delay: 0.3s; }
.particle:nth-child(12) { --x: -120px; --y: -100px; left: 35%; top: 65%; animation-delay: 0.7s; }
.particle:nth-child(13) { --x: 80px; --y: -80px; left: 45%; top: 75%; animation-delay: 0.1s; }
.particle:nth-child(14) { --x: -90px; --y: -120px; left: 55%; top: 85%; animation-delay: 0.4s; }
.particle:nth-child(15) { --x: 110px; --y: -90px; left: 65%; top: 25%; animation-delay: 0.6s; }
.particle:nth-child(16) { --x: -100px; --y: -110px; left: 75%; top: 35%; animation-delay: 0.2s; }
.particle:nth-child(17) { --x: 90px; --y: -130px; left: 85%; top: 45%; animation-delay: 0.5s; }
.particle:nth-child(18) { --x: -110px; --y: -90px; left: 95%; top: 55%; animation-delay: 0.3s; }
.particle:nth-child(19) { --x: 120px; --y: -100px; left: 5%; top: 65%; animation-delay: 0.7s; }
.particle:nth-child(20) { --x: -80px; --y: -140px; left: 15%; top: 75%; animation-delay: 0.1s; }

/* Logout Illustration Animation */
.logout-illustration {
  width: 120px;
  height: 120px;
  position: relative;
}

.circle-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotateContainer 20s linear infinite;
}

.circle {
  border-radius: 50%;
  position: absolute;
  border: 2px solid;
}

.circle-outer {
  width: 100%;
  height: 100%;
  border-color: #3b82f6;
  animation: pulse 2s ease-in-out infinite alternate;
}

.circle-middle {
  width: 75%;
  height: 75%;
  border-color: #60a5fa;
  animation: pulse 2s ease-in-out 0.3s infinite alternate;
}

.circle-inner {
  width: 50%;
  height: 50%;
  border-color: #93c5fd;
  animation: pulse 2s ease-in-out 0.6s infinite alternate;
}

.logout-arrow {
  position: absolute;
  width: 60%;
  height: 60%;
  animation: arrowPulse 1.5s ease-in-out infinite alternate;
}

.arrow-body {
  position: absolute;
  top: 50%;
  left: 0;
  width: 70%;
  height: 6px;
  background-color: #ef4444;
  transform: translateY(-50%);
  border-radius: 3px;
}

.arrow-head {
  position: absolute;
  top: 50%;
  right: 30%;
  width: 16px;
  height: 16px;
  border-top: 6px solid #ef4444;
  border-right: 6px solid #ef4444;
  transform: translateY(-50%) rotate(45deg);
}

@keyframes rotateContainer {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes arrowPulse {
  0% {
    transform: scale(1) translateX(0);
  }
  50% {
    transform: scale(1.05) translateX(5px);
  }
  100% {
    transform: scale(1) translateX(0);
  }
}

/* Menu container hover effect */
.menu-container:hover .menu-item:not(:hover) {
  filter: brightness(0.9);
}

/* Ripple effect for active items */
.menu-item.bg-blue-600::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 4px;
  height: 4px;
  background: rgba(59, 130, 246, 0.7);
  border-radius: 50%;
  transform: translateY(-50%);
  animation: ripple 1.5s infinite;
}
</style>