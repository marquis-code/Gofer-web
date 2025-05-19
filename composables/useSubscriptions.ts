import { ref, reactive } from 'vue'

export interface Plan {
  id: string
  name: string
  price: number
  interval: 'week' | 'month'
  features: string[]
  isPopular?: boolean
}

export function useSubscriptions() {
  const plans = reactive<Plan[]>([
    {
      id: 'basic',
      name: 'BASIC PLAN',
      price: 5000,
      interval: 'week',
      features: [
        'Feature as one of the Top 4 Restaurants of the Week',
        'Exclusive Gofer Marketing Campaigns',
        'Guaranteed Sales Boost of at Least 30%'
      ]
    },
    {
      id: 'premium',
      name: 'PREMIUM PLAN',
      price: 15000,
      interval: 'month',
      features: [
        'Feature as one of the Top 4 Restaurants of the Week',
        'Exclusive Gofer Marketing Campaigns',
        'One(1) Custom Graphic Design',
        'Guaranteed Sales Boost of at Least 30%'
      ],
      isPopular: true
    }
  ])

  const isLoading = ref(false)
  const currentSubscription = ref<string | null>(null)
  
  const subscribe = async (planId: string) => {
    isLoading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Set current subscription
      currentSubscription.value = planId
      
      return true
    } catch (error) {
      // console.error('Subscription failed:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  const cancelSubscription = async () => {
    isLoading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Clear current subscription
      currentSubscription.value = null
      
      return true
    } catch (error) {
      // console.error('Cancellation failed:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  const isSubscribed = (planId: string) => {
    return currentSubscription.value === planId
  }
  
  return {
    plans,
    isLoading,
    currentSubscription,
    subscribe,
    cancelSubscription,
    isSubscribed
  }
}