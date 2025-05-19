<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 overflow-hidden">
    <div class="w-full max-w-7xl mx-auto">
      <!-- Dashboard Header with animated gradient -->
      <div class="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-violet-600 p-6 shadow-lg">
        <div class="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div class="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary-400/20 blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-violet-400/20 blur-3xl"></div>
        
        <div class="relative">
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2 animate-slide-in">
            Dashboard
          </h1>
          <p class="text-primary-100 max-w-xl animate-slide-in animation-delay-100">
            Manage your orders and meals with our intuitive dashboard interface
          </p>
        </div>
      </div>

      <!-- Stats Cards with hover animations -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="bg-white rounded-md shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group animate-fade-in"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm mb-1">{{ stat.title }}</p>
              <h3 class="text-2xl font-bold group-hover:text-primary-600 transition-colors duration-300">{{ stat.value }}</h3>
            </div>
            <div :class="`p-3 rounded-full ${stat.iconBg} group-hover:scale-110 transition-transform duration-300`">
              <component :is="stat.icon" class="h-6 w-6" :class="stat.iconColor" />
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content with Tabs -->
      <div class="bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden animate-fade-in animation-delay-300">
        <!-- Tab Navigation -->
        <div class="flex border-b border-gray-200">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-6 py-4 text-sm font-medium transition-all duration-300 relative"
            :class="activeTab === tab.id ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'"
          >
            <div class="flex items-center space-x-2">
              <component :is="tab.icon" class="h-5 w-5" />
              <span>{{ tab.label }}</span>
            </div>
            <div 
              v-if="activeTab === tab.id" 
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 animate-grow-x"
            ></div>
          </button>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Orders Tab -->
          <div v-if="activeTab === 'orders'" class="space-y-8 animate-fade-in">
            <!-- Today's Orders -->
            <div>
              <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4 md:mb-0 flex items-center">
                  <CalendarIcon class="h-5 w-5 mr-2 text-primary-500" />
                  Today's Orders 
                  <span class="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {{ filteredTodayOrders.length }}
                  </span>
                </h2>
                <button 
                  @click="openCreateModal"
                  class="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  <PlusIcon class="h-4 w-4 mr-2" />
                  Add New Order
                </button>
              </div>

              <div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <div class="flex items-center">
                  <span class="mr-2 text-gray-600">Show</span>
                  <select 
                    v-model="todayPageSize" 
                    class="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  >
                    <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
                  </select>
                  <span class="ml-2 text-gray-600">entries</span>
                </div>
                
                <div class="relative flex items-center flex-1 max-w-md">
                  <input 
                    v-model="todaySearchQuery" 
                    type="text" 
                    class="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="Search orders..."
                  />
                  <SearchIcon class="h-5 w-5 text-gray-400 absolute left-3" />
                </div>
              </div>

              <div class="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th 
                          v-for="column in todayOrderColumns" 
                          :key="column.key"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors duration-200"
                          @click="sortTodayOrders(column.key)"
                        >
                          <div class="flex items-center space-x-1">
                            <span>{{ column.label }}</span>
                            <span v-if="todaySortKey === column.key" class="text-primary-500">
                              <ChevronUpIcon v-if="todaySortOrder === 'asc'" class="h-4 w-4" />
                              <ChevronDownIcon v-else class="h-4 w-4" />
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-if="paginatedTodayOrders.length === 0">
                        <td :colspan="todayOrderColumns.length" class="px-6 py-4 text-center text-gray-500">
                          <div class="flex flex-col items-center py-6">
                            <InboxIcon class="h-12 w-12 text-gray-300 mb-2" />
                            <p>No data available in table</p>
                          </div>
                        </td>
                      </tr>
                      <tr 
                        v-for="order in paginatedTodayOrders" 
                        :key="order.id"
                        class="hover:bg-gray-50 transition-colors duration-150 group"
                      >
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {{ order.id }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ order.customer }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ formatCurrency(order.total) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ formatDate(order.dateAdded) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ order.location }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-right space-x-1">
                          <div class="flex justify-end items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button 
                              @click="viewOrder(order)"
                              class="p-1 rounded-full text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                              title="View Order"
                            >
                              <EyeIcon class="h-5 w-5" />
                            </button>
                            <button 
                              @click="editOrder(order)"
                              class="p-1 rounded-full text-amber-600 hover:bg-amber-50 transition-colors duration-200"
                              title="Edit Order"
                            >
                              <PencilIcon class="h-5 w-5" />
                            </button>
                            <button 
                              @click="confirmDeleteOrder(order)"
                              class="p-1 rounded-full text-red-600 hover:bg-red-50 transition-colors duration-200"
                              title="Delete Order"
                            >
                              <TrashIcon class="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-center px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <div class="text-sm text-gray-500 mb-4 md:mb-0">
                    Showing {{ todayStartIndex + 1 }} to {{ Math.min(todayEndIndex, filteredTodayOrders.length) }} of {{ filteredTodayOrders.length }} entries
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      @click="todayCurrentPage--" 
                      :disabled="todayCurrentPage === 1"
                      class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 flex items-center"
                    >
                      <ChevronLeftIcon class="h-4 w-4 mr-1" />
                      Previous
                    </button>
                    <button 
                      @click="todayCurrentPage++" 
                      :disabled="todayEndIndex >= filteredTodayOrders.length"
                      class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 flex items-center"
                    >
                      Next
                      <ChevronRightIcon class="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Total Orders -->
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <ShoppingCartIcon class="h-5 w-5 mr-2 text-primary-500" />
                Total Orders 
                <span class="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {{ filteredOrders.length }}
                </span>
              </h2>

              <div class="bg-gray-50 rounded-md p-4 mb-6 border border-gray-200">
                <div class="flex flex-col md:flex-row gap-4 items-end">
                  <div class="flex flex-col flex-1">
                    <label class="text-sm font-medium text-gray-700 mb-1">From:</label>
                    <input 
                      v-model="dateRange.from" 
                      type="date" 
                      class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    />
                  </div>
                  
                  <div class="flex flex-col flex-1">
                    <label class="text-sm font-medium text-gray-700 mb-1">To:</label>
                    <input 
                      v-model="dateRange.to" 
                      type="date" 
                      class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    />
                  </div>
                  
                  <button 
                    @click="applyDateFilter"
                    class="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <FilterIcon class="h-4 w-4 mr-2" />
                    Apply Filter
                  </button>
                </div>
              </div>

              <div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <div class="flex items-center">
                  <span class="mr-2 text-gray-600">Show</span>
                  <select 
                    v-model="pageSize" 
                    class="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  >
                    <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
                  </select>
                  <span class="ml-2 text-gray-600">entries</span>
                </div>
                
                <div class="relative flex items-center flex-1 max-w-md">
                  <input 
                    v-model="searchQuery" 
                    type="text" 
                    class="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="Search orders..."
                  />
                  <SearchIcon class="h-5 w-5 text-gray-400 absolute left-3" />
                </div>
              </div>

              <div class="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th 
                          v-for="column in orderColumns" 
                          :key="column.key"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors duration-200"
                          @click="sortOrders(column.key)"
                        >
                          <div class="flex items-center space-x-1">
                            <span>{{ column.label }}</span>
                            <span v-if="sortKey === column.key" class="text-primary-500">
                              <ChevronUpIcon v-if="sortOrder === 'asc'" class="h-4 w-4" />
                              <ChevronDownIcon v-else class="h-4 w-4" />
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-if="paginatedOrders.length === 0">
                        <td :colspan="orderColumns.length" class="px-6 py-4 text-center text-gray-500">
                          <div class="flex flex-col items-center py-6">
                            <InboxIcon class="h-12 w-12 text-gray-300 mb-2" />
                            <p>No data available in table</p>
                          </div>
                        </td>
                      </tr>
                      <tr 
                        v-for="order in paginatedOrders" 
                        :key="order.id"
                        class="hover:bg-gray-50 transition-colors duration-150 group"
                      >
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {{ order.id }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ order.customer }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ formatCurrency(order.total) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ formatDate(order.dateAdded) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ order.location }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <button 
                            @click="viewOrder(order)"
                            class="p-1 rounded-full text-primary-600 hover:bg-primary-50 transition-colors duration-200 transform hover:scale-110"
                            title="View Order"
                          >
                            <EyeIcon class="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-center px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <div class="text-sm text-gray-500 mb-4 md:mb-0">
                    Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredOrders.length) }} of {{ filteredOrders.length }} entries
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      @click="currentPage--" 
                      :disabled="currentPage === 1"
                      class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 flex items-center"
                    >
                      <ChevronLeftIcon class="h-4 w-4 mr-1" />
                      Previous
                    </button>
                    <button 
                      @click="currentPage++" 
                      :disabled="endIndex >= filteredOrders.length"
                      class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 flex items-center"
                    >
                      Next
                      <ChevronRightIcon class="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Meals Tab -->
          <div v-if="activeTab === 'meals'" class="animate-fade-in">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4 md:mb-0 flex items-center">
                <UtensilsIcon class="h-5 w-5 mr-2 text-primary-500" />
                Meals Management 
                <span class="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {{ filteredMeals.length }}
                </span>
              </h2>
              <button 
                @click="openCreateMealModal"
                class="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <PlusIcon class="h-4 w-4 mr-2" />
                Add New Meal
              </button>
            </div>

            <div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <div class="flex items-center">
                <span class="mr-2 text-gray-600">Show</span>
                <select 
                  v-model="mealPageSize" 
                  class="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                >
                  <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
                </select>
                <span class="ml-2 text-gray-600">entries</span>
              </div>
              
              <div class="relative flex items-center flex-1 max-w-md">
                <input 
                  v-model="mealSearchQuery" 
                  type="text" 
                  class="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  placeholder="Search meals..."
                />
                <SearchIcon class="h-5 w-5 text-gray-400 absolute left-3" />
              </div>
            </div>

            <div class="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th 
                        v-for="column in mealColumns" 
                        :key="column.key"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors duration-200"
                        @click="sortMeals(column.key)"
                      >
                        <div class="flex items-center space-x-1">
                          <span>{{ column.label }}</span>
                          <span v-if="mealSortKey === column.key" class="text-primary-500">
                            <ChevronUpIcon v-if="mealSortOrder === 'asc'" class="h-4 w-4" />
                            <ChevronDownIcon v-else class="h-4 w-4" />
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="paginatedMeals.length === 0">
                      <td :colspan="mealColumns.length" class="px-6 py-4 text-center text-gray-500">
                        <div class="flex flex-col items-center py-6">
                          <InboxIcon class="h-12 w-12 text-gray-300 mb-2" />
                          <p>No data available in table</p>
                        </div>
                      </td>
                    </tr>
                    <tr 
                      v-for="meal in paginatedMeals" 
                      :key="meal.id"
                      class="hover:bg-gray-50 transition-colors duration-150 group"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ meal.id }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ meal.name }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatCurrency(meal.price) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span class="px-2 py-1 rounded-md text-xs font-medium" :class="getCategoryClass(meal.category)">
                          {{ meal.category }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span 
                          class="px-2 py-1 rounded-full text-xs font-medium inline-flex items-center"
                          :class="meal.visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                        >
                          <span class="h-1.5 w-1.5 rounded-full mr-1.5" :class="meal.visible ? 'bg-green-600' : 'bg-red-600'"></span>
                          {{ meal.visible ? 'Visible' : 'Hidden' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-right space-x-1">
                        <div class="flex justify-end items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button 
                            @click="viewMeal(meal)"
                            class="p-1 rounded-full text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                            title="View Meal"
                          >
                            <EyeIcon class="h-5 w-5" />
                          </button>
                          <button 
                            @click="toggleMealVisibility(meal)"
                            class="p-1 rounded-full text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                            :title="meal.visible ? 'Hide meal' : 'Show meal'"
                          >
                            <component :is="meal.visible ? EyeOffIcon : EyeIcon" class="h-5 w-5" />
                          </button>
                          <button 
                            @click="editMeal(meal)"
                            class="p-1 rounded-full text-amber-600 hover:bg-amber-50 transition-colors duration-200"
                            title="Edit Meal"
                          >
                            <PencilIcon class="h-5 w-5" />
                          </button>
                          <button 
                            @click="confirmDeleteMeal(meal)"
                            class="p-1 rounded-full text-red-600 hover:bg-red-50 transition-colors duration-200"
                            title="Delete Meal"
                          >
                            <TrashIcon class="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="flex flex-col md:flex-row justify-between items-center px-6 py-3 bg-gray-50 border-t border-gray-200">
                <div class="text-sm text-gray-500 mb-4 md:mb-0">
                  Showing {{ mealStartIndex + 1 }} to {{ Math.min(mealEndIndex, filteredMeals.length) }} of {{ filteredMeals.length }} entries
                </div>
                <div class="flex space-x-2">
                  <button 
                    @click="mealCurrentPage--" 
                    :disabled="mealCurrentPage === 1"
                    class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 flex items-center"
                  >
                    <ChevronLeftIcon class="h-4 w-4 mr-1" />
                    Previous
                  </button>
                  <button 
                    @click="mealCurrentPage++" 
                    :disabled="mealEndIndex >= filteredMeals.length"
                    class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 flex items-center"
                  >
                    Next
                    <ChevronRightIcon class="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Meal Cards View -->
            <div class="mt-8">
              <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <GridIcon class="h-5 w-5 mr-2 text-primary-500" />
                Meals Gallery
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div 
                  v-for="meal in paginatedMeals" 
                  :key="meal.id"
                  class="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
                >
                  <div class="h-40 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center p-4">
                    <UtensilsIcon class="h-16 w-16 text-primary-300" />
                  </div>
                  <div class="p-4">
                    <div class="flex justify-between items-start">
                      <h4 class="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">{{ meal.name }}</h4>
                      <span 
                        class="px-2 py-1 rounded-full text-xs font-medium inline-flex items-center"
                        :class="meal.visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                      >
                        <span class="h-1.5 w-1.5 rounded-full mr-1.5" :class="meal.visible ? 'bg-green-600' : 'bg-red-600'"></span>
                        {{ meal.visible ? 'Visible' : 'Hidden' }}
                      </span>
                    </div>
                    <p class="text-gray-500 text-sm mt-1">{{ meal.category }}</p>
                    <p class="text-lg font-bold text-primary-600 mt-2">{{ formatCurrency(meal.price) }}</p>
                    
                    <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                      <button 
                        @click="viewMeal(meal)"
                        class="text-primary-600 hover:text-primary-800 transition-colors duration-200 text-sm font-medium flex items-center"
                      >
                        <EyeIcon class="h-4 w-4 mr-1" />
                        View Details
                      </button>
                      <button 
                        @click="editMeal(meal)"
                        class="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm font-medium flex items-center"
                      >
                        <PencilIcon class="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Order Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="showOrderModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true" 
              @click="closeOrderModal"
            ></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-white" id="modal-title">
                  {{ isEditing ? 'Edit Order' : 'Create New Order' }}
                </h3>
              </div>
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="space-y-4">
                  <div class="relative">
                    <label for="customer" class="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                    <input 
                      type="text" 
                      id="customer" 
                      v-model="currentOrder.customer" 
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Customer name"
                    />
                  </div>
                  <div class="relative">
                    <label for="total" class="block text-sm font-medium text-gray-700 mb-1">Total</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input 
                        type="number" 
                        id="total" 
                        v-model="currentOrder.total" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div class="relative">
                    <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input 
                      type="text" 
                      id="location" 
                      v-model="currentOrder.location" 
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Customer location"
                    />
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  @click="saveOrder"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-base font-medium text-white hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 transform hover:scale-105"
                >
                  {{ isEditing ? 'Update Order' : 'Create Order' }}
                </button>
                <button 
                  type="button" 
                  @click="closeOrderModal"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Create/Edit Meal Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="showMealModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true" 
              @click="closeMealModal"
            ></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-white" id="modal-title">
                  {{ isEditingMeal ? 'Edit Meal' : 'Create New Meal' }}
                </h3>
              </div>
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="space-y-4">
                  <div class="relative">
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      v-model="currentMeal.name" 
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Meal name"
                    />
                  </div>
                  <div class="relative">
                    <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input 
                        type="number" 
                        id="price" 
                        v-model="currentMeal.price" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div class="relative">
                    <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      id="category" 
                      v-model="currentMeal.category" 
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    >
                      <option value="Main Course">Main Course</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Beverage">Beverage</option>
                    </select>
                  </div>
                  <div class="relative flex items-center">
                    <input 
                      type="checkbox" 
                      id="visible" 
                      v-model="currentMeal.visible" 
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-all duration-200"
                    />
                    <label for="visible" class="ml-2 block text-sm text-gray-700">Visible to customers</label>
                  </div>
                  <div class="relative">
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      id="description" 
                      v-model="currentMeal.description" 
                      rows="3"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Meal description"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  @click="saveMeal"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-base font-medium text-white hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 transform hover:scale-105"
                >
                  {{ isEditingMeal ? 'Update Meal' : 'Create Meal' }}
                </button>
                <button 
                  type="button" 
                  @click="closeMealModal"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- View Order Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true" 
              @click="closeViewModal"
            ></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-white" id="modal-title">
                  {{ viewingMeal ? 'Meal Details' : 'Order Details' }}
                </h3>
              </div>
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div v-if="!viewingMeal" class="space-y-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <p class="text-sm font-medium text-gray-500">Order ID</p>
                        <p class="mt-1 text-sm text-gray-900 font-medium">{{ currentOrder.id }}</p>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-500">Customer</p>
                        <p class="mt-1 text-sm text-gray-900">{{ currentOrder.customer }}</p>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-500">Total</p>
                        <p class="mt-1 text-sm text-gray-900 font-medium text-primary-600">{{ formatCurrency(currentOrder.total) }}</p>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-500">Date Added</p>
                        <p class="mt-1 text-sm text-gray-900">{{ formatDate(currentOrder.dateAdded) }}</p>
                      </div>
                      <div class="col-span-2">
                        <p class="text-sm font-medium text-gray-500">Location</p>
                        <p class="mt-1 text-sm text-gray-900">{{ currentOrder.location }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="space-y-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <p class="text-sm font-medium text-gray-500">Meal ID</p>
                        <p class="mt-1 text-sm text-gray-900 font-medium">{{ currentMeal.id }}</p>
                      </div>
                      <span 
                        class="px-2 py-1 rounded-full text-xs font-medium inline-flex items-center"
                        :class="currentMeal.visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                      >
                        <span class="h-1.5 w-1.5 rounded-full mr-1.5" :class="currentMeal.visible ? 'bg-green-600' : 'bg-red-600'"></span>
                        {{ currentMeal.visible ? 'Visible' : 'Hidden' }}
                      </span>
                    </div>
                    
                    <div class="space-y-3">
                      <div>
                        <p class="text-sm font-medium text-gray-500">Name</p>
                        <p class="mt-1 text-sm text-gray-900 font-medium">{{ currentMeal.name }}</p>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-500">Price</p>
                        <p class="mt-1 text-sm text-gray-900 font-medium text-primary-600">{{ formatCurrency(currentMeal.price) }}</p>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-500">Category</p>
                        <p class="mt-1">
                          <span class="px-2 py-1 rounded-md text-xs font-medium" :class="getCategoryClass(currentMeal.category)">
                            {{ currentMeal.category }}
                          </span>
                        </p>
                      </div>
                      <div v-if="currentMeal.description">
                        <p class="text-sm font-medium text-gray-500">Description</p>
                        <p class="mt-1 text-sm text-gray-900">{{ currentMeal.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  @click="closeViewModal"
                  class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto sm:text-sm transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Confirmation Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="showConfirmModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true" 
              @click="closeConfirmModal"
            ></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangleIcon class="h-6 w-6 text-red-600" />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {{ confirmTitle }}
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{ confirmMessage }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  @click="confirmAction"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 transform hover:scale-105"
                >
                  Confirm
                </button>
                <button 
                  type="button" 
                  @click="closeConfirmModal"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Toast Notification -->
    <Teleport to="body">
      <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="toast.show" 
          class="fixed bottom-0 right-0 m-4 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <component 
                  :is="toast.type === 'success' ? CheckCircleIcon : (toast.type === 'error' ? XCircleIcon : InfoIcon)" 
                  class="h-6 w-6" 
                  :class="toast.type === 'success' ? 'text-green-400' : (toast.type === 'error' ? 'text-red-400' : 'text-blue-400')" 
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">{{ toast.title }}</p>
                <p class="mt-1 text-sm text-gray-500">{{ toast.message }}</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button 
                  @click="closeToast" 
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { 
  PlusIcon, 
  EyeIcon, 
  EyeOffIcon, 
  PencilIcon, 
  TrashIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  InfoIcon, 
  XIcon, 
  AlertTriangleIcon,
  FilterIcon,
  ShoppingCartIcon,
  UsersIcon,
  DollarSignIcon,
  TrendingUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  SearchIcon,
  CalendarIcon,
  UtensilsIcon,
  InboxIcon,
  GridIcon
} from 'lucide-vue-next'

// Types
interface Order {
  id: string
  customer: string
  total: number
  dateAdded: Date
  location: string
}

interface Meal {
  id: string
  name: string
  price: number
  category: string
  visible: boolean
  description?: string
}

// Tabs
const tabs = [
  { id: 'orders', label: 'Orders Management', icon: ShoppingCartIcon },
  { id: 'meals', label: 'Meals Management', icon: UtensilsIcon }
]
const activeTab = ref('orders')

// Composable for orders

// Composable for orders
const useOrders = () => {
  const orders = ref<Order[]>([])
  const nextId = ref(1)

  const generateDummyOrders = (count: number) => {
    const customers = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown', 'Sarah Wilson', 'David Miller', 'Lisa Taylor']
    const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego']
    
    const result: Order[] = []
    
    for (let i = 0; i < count; i++) {
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 30))
      
      result.push({
        id: `ORD-${String(nextId.value).padStart(4, '0')}`,
        customer: customers[Math.floor(Math.random() * customers.length)],
        total: parseFloat((Math.random() * 200 + 10).toFixed(2)),
        dateAdded: date,
        location: locations[Math.floor(Math.random() * locations.length)]
      })
      
      nextId.value++
    }
    
    return result
  }

  const addOrder = (order: Omit<Order, 'id' | 'dateAdded'>) => {
    const newOrder: Order = {
      id: `ORD-${String(nextId.value).padStart(4, '0')}`,
      dateAdded: new Date(),
      ...order
    }
    
    orders.value.unshift(newOrder)
    nextId.value++
    return newOrder
  }

  const updateOrder = (id: string, updatedOrder: Partial<Omit<Order, 'id' | 'dateAdded'>>) => {
    const index = orders.value.findIndex(order => order.id === id)
    if (index !== -1) {
      orders.value[index] = {
        ...orders.value[index],
        ...updatedOrder
      }
      return orders.value[index]
    }
    return null
  }

  const deleteOrder = (id: string) => {
    const index = orders.value.findIndex(order => order.id === id)
    if (index !== -1) {
      orders.value.splice(index, 1)
      return true
    }
    return false
  }

  const getTodayOrders = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return orders.value.filter(order => {
      const orderDate = new Date(order.dateAdded)
      orderDate.setHours(0, 0, 0, 0)
      return orderDate.getTime() === today.getTime()
    })
  }

  const getOrdersInDateRange = (from?: Date, to?: Date) => {
    if (!from && !to) return orders.value
    
    return orders.value.filter(order => {
      const orderDate = new Date(order.dateAdded)
      orderDate.setHours(0, 0, 0, 0)
      
      if (from && to) {
        const fromDate = new Date(from)
        fromDate.setHours(0, 0, 0, 0)
        const toDate = new Date(to)
        toDate.setHours(23, 59, 59, 999)
        return orderDate >= fromDate && orderDate <= toDate
      } else if (from) {
        const fromDate = new Date(from)
        fromDate.setHours(0, 0, 0, 0)
        return orderDate >= fromDate
      } else if (to) {
        const toDate = new Date(to)
        toDate.setHours(23, 59, 59, 999)
        return orderDate <= toDate
      }
      
      return true
    })
  }

  // Initialize with dummy data
  onMounted(() => {
    orders.value = generateDummyOrders(50)
  })

  return {
    orders,
    addOrder,
    updateOrder,
    deleteOrder,
    getTodayOrders,
    getOrdersInDateRange
  }
}

// Composable for meals
const useMeals = () => {
  const meals = ref<Meal[]>([])
  const nextId = ref(1)

  const generateDummyMeals = (count: number) => {
    const mealNames = [
      'Grilled Chicken Salad', 'Beef Burger', 'Margherita Pizza', 'Pasta Carbonara', 
      'Vegetable Stir Fry', 'Caesar Salad', 'Fish and Chips', 'Mushroom Risotto',
      'Chicken Curry', 'Beef Steak', 'Sushi Platter', 'Vegetable Lasagna',
      'Shrimp Scampi', 'BBQ Ribs', 'Vegetable Soup', 'Chocolate Cake'
    ]
    
    const categories = ['Main Course', 'Appetizer', 'Dessert', 'Beverage']
    const descriptions = [
      'A delicious and healthy option for those watching their calories.',
      'Our signature dish made with premium ingredients.',
      'A classic favorite that never disappoints.',
      'Fresh ingredients combined to create a perfect harmony of flavors.',
      'A spicy and flavorful dish that will tantalize your taste buds.',
      'Light and refreshing, perfect for a summer day.',
      'Rich and savory, guaranteed to Gofer your cravings.'
    ]
    
    const result: Meal[] = []
    
    for (let i = 0; i < count; i++) {
      result.push({
        id: `MEAL-${String(nextId.value).padStart(4, '0')}`,
        name: mealNames[Math.floor(Math.random() * mealNames.length)],
        price: parseFloat((Math.random() * 30 + 5).toFixed(2)),
        category: categories[Math.floor(Math.random() * categories.length)],
        visible: Math.random() > 0.3, // 70% chance of being visible
        description: descriptions[Math.floor(Math.random() * descriptions.length)]
      })
      
      nextId.value++
    }
    
    return result
  }

  const addMeal = (meal: Omit<Meal, 'id'>) => {
    const newMeal: Meal = {
      id: `MEAL-${String(nextId.value).padStart(4, '0')}`,
      ...meal
    }
    
    meals.value.unshift(newMeal)
    nextId.value++
    return newMeal
  }

  const updateMeal = (id: string, updatedMeal: Partial<Omit<Meal, 'id'>>) => {
    const index = meals.value.findIndex(meal => meal.id === id)
    if (index !== -1) {
      meals.value[index] = {
        ...meals.value[index],
        ...updatedMeal
      }
      return meals.value[index]
    }
    return null
  }

  const deleteMeal = (id: string) => {
    const index = meals.value.findIndex(meal => meal.id === id)
    if (index !== -1) {
      meals.value.splice(index, 1)
      return true
    }
    return false
  }

  const toggleVisibility = (id: string) => {
    const index = meals.value.findIndex(meal => meal.id === id)
    if (index !== -1) {
      meals.value[index].visible = !meals.value[index].visible
      return meals.value[index]
    }
    return null
  }

  // Initialize with dummy data
  onMounted(() => {
    meals.value = generateDummyMeals(20)
  })

  return {
    meals,
    addMeal,
    updateMeal,
    deleteMeal,
    toggleVisibility
  }
}

// Toast notification
const useToast = () => {
  const toast = ref({
    show: false,
    title: '',
    message: '',
    type: 'info',
    duration: 3000
  })
  
  let timeoutId: number | null = null
  
  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    toast.value = {
      show: true,
      title,
      message,
      type,
      duration
    }
    
    timeoutId = window.setTimeout(() => {
      toast.value.show = false
    }, duration)
  }
  
  const closeToast = () => {
    toast.value.show = false
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }
  
  return {
    toast,
    showToast,
    closeToast
  }
}

// Initialize composables
const { orders, addOrder, updateOrder, deleteOrder, getTodayOrders, getOrdersInDateRange } = useOrders()
const { meals, addMeal, updateMeal, deleteMeal, toggleVisibility } = useMeals()
const { toast, showToast, closeToast } = useToast()

// Stats
const stats = ref([
  { 
    title: 'Total Orders', 
    value: computed(() => orders.value.length), 
    icon: ShoppingCartIcon, 
    bgColor: 'bg-blue-50', 
    iconBg: 'bg-blue-100', 
    iconColor: 'text-blue-600' 
  },
  { 
    title: 'Total Customers', 
    value: computed(() => new Set(orders.value.map(order => order.customer)).size), 
    icon: UsersIcon, 
    bgColor: 'bg-green-50', 
    iconBg: 'bg-green-100', 
    iconColor: 'text-green-600' 
  },
  { 
    title: 'Total Revenue', 
    value: computed(() => formatCurrency(orders.value.reduce((sum, order) => sum + order.total, 0))), 
    icon: DollarSignIcon, 
    bgColor: 'bg-purple-50', 
    iconBg: 'bg-purple-100', 
    iconColor: 'text-purple-600' 
  },
  { 
    title: 'Active Meals', 
    value: computed(() => meals.value.filter(meal => meal.visible).length), 
    icon: TrendingUpIcon, 
    bgColor: 'bg-amber-50', 
    iconBg: 'bg-amber-100', 
    iconColor: 'text-amber-600' 
  }
])

// Pagination and filtering for Today's Orders
const todayPageSize = ref(50)
const todayCurrentPage = ref(1)
const todaySearchQuery = ref('')
const todaySortKey = ref('dateAdded')
const todaySortOrder = ref('desc')

const todayOrderColumns = [
  { key: 'id', label: 'ORDER ID' },
  { key: 'customer', label: 'CUSTOMER' },
  { key: 'total', label: 'TOTAL' },
  { key: 'dateAdded', label: 'DATE ADDED' },
  { key: 'location', label: 'LOCATION' },
  { key: 'action', label: 'ACTION' }
]

const filteredTodayOrders = computed(() => {
  const todayOrders = getTodayOrders()
  
  if (!todaySearchQuery.value) return todayOrders
  
  const query = todaySearchQuery.value.toLowerCase()
  return todayOrders.filter(order => 
    order.id.toLowerCase().includes(query) ||
    order.customer.toLowerCase().includes(query) ||
    order.location.toLowerCase().includes(query) ||
    order.total.toString().includes(query)
  )
})

const sortedTodayOrders = computed(() => {
  if (!todaySortKey.value || todaySortKey.value === 'action') return [...filteredTodayOrders.value]
  
  return [...filteredTodayOrders.value].sort((a, b) => {
    let aValue = a[todaySortKey.value as keyof Order]
    let bValue = b[todaySortKey.value as keyof Order]
    
    // Handle date comparison
    if (todaySortKey.value === 'dateAdded') {
      aValue = new Date(aValue as Date).getTime()
      bValue = new Date(bValue as Date).getTime()
    }
    
    if (aValue < bValue) return todaySortOrder.value === 'asc' ? -1 : 1
    if (aValue > bValue) return todaySortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

const todayStartIndex = computed(() => (todayCurrentPage.value - 1) * todayPageSize.value)
const todayEndIndex = computed(() => todayStartIndex.value + todayPageSize.value)

const paginatedTodayOrders = computed(() => 
  sortedTodayOrders.value.slice(todayStartIndex.value, todayEndIndex.value)
)

const sortTodayOrders = (key: string) => {
  if (todaySortKey.value === key) {
    todaySortOrder.value = todaySortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    todaySortKey.value = key
    todaySortOrder.value = 'asc'
  }
}

// Pagination and filtering for Total Orders
const pageSizes = [10, 25, 50, 100]
const pageSize = ref(50)
const currentPage = ref(1)
const searchQuery = ref('')
const sortKey = ref('dateAdded')
const sortOrder = ref('desc')
const dateRange = ref({ from: '', to: '' })
const filteredDateRange = ref({ from: null as Date | null, to: null as Date | null })

const orderColumns = [
  { key: 'id', label: 'ORDER ID' },
  { key: 'customer', label: 'CUSTOMER' },
  { key: 'total', label: 'TOTAL' },
  { key: 'dateAdded', label: 'DATE ADDED' },
  { key: 'location', label: 'LOCATION' },
  { key: 'view', label: 'VIEW' }
]

const applyDateFilter = () => {
  filteredDateRange.value.from = dateRange.value.from ? new Date(dateRange.value.from) : null
  filteredDateRange.value.to = dateRange.value.to ? new Date(dateRange.value.to) : null
  currentPage.value = 1
}

const filteredOrders = computed(() => {
  let result = getOrdersInDateRange(
    filteredDateRange.value.from || undefined, 
    filteredDateRange.value.to || undefined
  )
  
  if (!searchQuery.value) return result
  
  const query = searchQuery.value.toLowerCase()
  return result.filter(order => 
    order.id.toLowerCase().includes(query) ||
    order.customer.toLowerCase().includes(query) ||
    order.location.toLowerCase().includes(query) ||
    order.total.toString().includes(query)
  )
})

const sortedOrders = computed(() => {
  if (!sortKey.value || sortKey.value === 'view') return [...filteredOrders.value]
  
  return [...filteredOrders.value].sort((a, b) => {
    let aValue = a[sortKey.value as keyof Order]
    let bValue = b[sortKey.value as keyof Order]
    
    // Handle date comparison
    if (sortKey.value === 'dateAdded') {
      aValue = new Date(aValue as Date).getTime()
      bValue = new Date(bValue as Date).getTime()
    }
    
    if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
const endIndex = computed(() => startIndex.value + pageSize.value)

const paginatedOrders = computed(() => 
  sortedOrders.value.slice(startIndex.value, endIndex.value)
)

const sortOrders = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

// Pagination and filtering for Meals
const mealPageSize = ref(50)
const mealCurrentPage = ref(1)
const mealSearchQuery = ref('')
const mealSortKey = ref('id')
const mealSortOrder = ref('desc')

const mealColumns = [
  { key: 'id', label: 'MEAL ID' },
  { key: 'name', label: 'NAME' },
  { key: 'price', label: 'PRICE' },
  { key: 'category', label: 'CATEGORY' },
  { key: 'visible', label: 'STATUS' },
  { key: 'action', label: 'ACTION' }
]

const filteredMeals = computed(() => {
  if (!mealSearchQuery.value) return meals.value
  
  const query = mealSearchQuery.value.toLowerCase()
  return meals.value.filter(meal => 
    meal.id.toLowerCase().includes(query) ||
    meal.name.toLowerCase().includes(query) ||
    meal.category.toLowerCase().includes(query) ||
    meal.price.toString().includes(query)
  )
})

const sortedMeals = computed(() => {
  if (!mealSortKey.value || mealSortKey.value === 'action') return [...filteredMeals.value]
  
  return [...filteredMeals.value].sort((a, b) => {
    let aValue = a[mealSortKey.value as keyof Meal]
    let bValue = b[mealSortKey.value as keyof Meal]
    
    if (aValue < bValue) return mealSortOrder.value === 'asc' ? -1 : 1
    if (aValue > bValue) return mealSortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

const mealStartIndex = computed(() => (mealCurrentPage.value - 1) * mealPageSize.value)
const mealEndIndex = computed(() => mealStartIndex.value + mealPageSize.value)

const paginatedMeals = computed(() => 
  sortedMeals.value.slice(mealStartIndex.value, mealEndIndex.value)
)

const sortMeals = (key: string) => {
  if (mealSortKey.value === key) {
    mealSortOrder.value = mealSortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    mealSortKey.value = key
    mealSortOrder.value = 'asc'
  }
}

// Order Modal
const showOrderModal = ref(false)
const isEditing = ref(false)
const currentOrder = ref<Order>({
  id: '',
  customer: '',
  total: 0,
  dateAdded: new Date(),
  location: ''
})

const openCreateModal = () => {
  isEditing.value = false
  currentOrder.value = {
    id: '',
    customer: '',
    total: 0,
    dateAdded: new Date(),
    location: ''
  }
  showOrderModal.value = true
}

const editOrder = (order: Order) => {
  isEditing.value = true
  currentOrder.value = { ...order }
  showOrderModal.value = true
}

const closeOrderModal = () => {
  showOrderModal.value = false
}

const saveOrder = () => {
  if (!currentOrder.value.customer || currentOrder.value.total <= 0 || !currentOrder.value.location) {
    showToast('Validation Error', 'Please fill in all required fields', 'error')
    return
  }

  if (isEditing.value) {
    updateOrder(currentOrder.value.id, {
      customer: currentOrder.value.customer,
      total: currentOrder.value.total,
      location: currentOrder.value.location
    })
    showToast('Success', 'Order updated successfully', 'success')
  } else {
    addOrder({
      customer: currentOrder.value.customer,
      total: currentOrder.value.total,
      location: currentOrder.value.location
    })
    showToast('Success', 'Order created successfully', 'success')
  }
  
  closeOrderModal()
}

// Meal Modal
const showMealModal = ref(false)
const isEditingMeal = ref(false)
const currentMeal = ref<Meal>({
  id: '',
  name: '',
  price: 0,
  category: 'Main Course',
  visible: true,
  description: ''
})

const openCreateMealModal = () => {
  isEditingMeal.value = false
  currentMeal.value = {
    id: '',
    name: '',
    price: 0,
    category: 'Main Course',
    visible: true,
    description: ''
  }
  showMealModal.value = true
}

const editMeal = (meal: Meal) => {
  isEditingMeal.value = true
  currentMeal.value = { ...meal }
  showMealModal.value = true
}

const closeMealModal = () => {
  showMealModal.value = false
}

const saveMeal = () => {
  if (!currentMeal.value.name || currentMeal.value.price <= 0 || !currentMeal.value.category) {
    showToast('Validation Error', 'Please fill in all required fields', 'error')
    return
  }

  if (isEditingMeal.value) {
    updateMeal(currentMeal.value.id, {
      name: currentMeal.value.name,
      price: currentMeal.value.price,
      category: currentMeal.value.category,
      visible: currentMeal.value.visible,
      description: currentMeal.value.description
    })
    showToast('Success', 'Meal updated successfully', 'success')
  } else {
    addMeal({
      name: currentMeal.value.name,
      price: currentMeal.value.price,
      category: currentMeal.value.category,
      visible: currentMeal.value.visible,
      description: currentMeal.value.description
    })
    showToast('Success', 'Meal created successfully', 'success')
  }
  
  closeMealModal()
}

// View Modal
const showViewModal = ref(false)
const viewingMeal = ref(false)

const viewOrder = (order: Order) => {
  currentOrder.value = { ...order }
  viewingMeal.value = false
  showViewModal.value = true
}

const viewMeal = (meal: Meal) => {
  currentMeal.value = { ...meal }
  viewingMeal.value = true
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
}

// Confirmation Modal
const showConfirmModal = ref(false)
const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmCallback = ref<() => void>(() => {})

const openConfirmModal = (title: string, message: string, callback: () => void) => {
  confirmTitle.value = title
  confirmMessage.value = message
  confirmCallback.value = callback
  showConfirmModal.value = true
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
}

const confirmAction = () => {
  confirmCallback.value()
  closeConfirmModal()
}

// Delete Order
const confirmDeleteOrder = (order: Order) => {
  openConfirmModal(
    'Delete Order',
    `Are you sure you want to delete order ${order.id}? This action cannot be undone.`,
    () => {
      deleteOrder(order.id)
      showToast('Success', 'Order deleted successfully', 'success')
    }
  )
}

// Delete Meal
const confirmDeleteMeal = (meal: Meal) => {
  openConfirmModal(
    'Delete Meal',
    `Are you sure you want to delete meal ${meal.name}? This action cannot be undone.`,
    () => {
      deleteMeal(meal.id)
      showToast('Success', 'Meal deleted successfully', 'success')
    }
  )
}

// Toggle Meal Visibility
const toggleMealVisibility = (meal: Meal) => {
  openConfirmModal(
    `${meal.visible ? 'Hide' : 'Show'} Meal`,
    `Are you sure you want to ${meal.visible ? 'hide' : 'show'} ${meal.name} from customers?`,
    () => {
      const updatedMeal = toggleVisibility(meal.id)
      if (updatedMeal) {
        showToast(
          'Visibility Updated', 
          `${meal.name} is now ${updatedMeal.visible ? 'visible' : 'hidden'} to customers`,
          'success'
        )
      }
    }
  )
}

// Utility functions
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Get category class for styling
const getCategoryClass = (category: string) => {
  switch (category) {
    case 'Main Course':
      return 'bg-blue-100 text-blue-800'
    case 'Appetizer':
      return 'bg-green-100 text-green-800'
    case 'Dessert':
      return 'bg-purple-100 text-purple-800'
    case 'Beverage':
      return 'bg-amber-100 text-amber-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Reset pagination when search changes
watch(todaySearchQuery, () => {
  todayCurrentPage.value = 1
})

watch(searchQuery, () => {
  currentPage.value = 1
})

watch(mealSearchQuery, () => {
  mealCurrentPage.value = 1
})

definePageMeta({
    layout: 'dashboard'
})
</script>