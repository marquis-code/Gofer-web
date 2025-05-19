import { ref } from 'vue'

interface Plan {
  id: string
  name: string
  price: number
  period: 'Week' | 'Month'
  features: string[]
  isPopular?: boolean
}

export function usePlans() {
  const plans = ref<Plan[]>([
    {
      id: 'basic',
      name: 'BASIC PLAN',
      price: 5000,
      period: 'Week',
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
      period: 'Month',
      features: [
        'Feature as one of the Top 4 Restaurants of the Week',
        'Exclusive Gofer Marketing Campaigns',
        'One(1) Custom Graphic Design',
        'Guaranteed Sales Boost of at Least 30%'
      ],
      isPopular: true
    }
  ])

  const choosePlan = (planId: string) => {
    // In a real app, this would handle plan selection
    alert(`You have selected the ${planId.toUpperCase()} plan`)
  }

  return {
    plans,
    choosePlan
  }
}