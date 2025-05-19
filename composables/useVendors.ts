import { ref, computed } from 'vue';
import meal1 from '@/assets/img/meal1.jpg'
import meal2 from '@/assets/img/meal2.jpg'
import meal3 from '@/assets/img/meal3.jpg'
import meal4 from '@/assets/img/meal4.jpg'

export interface Vendor {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  isOpen: boolean;
  promoted: boolean;
  tags?: string[];
}

export function useVendors() {
  const vendors = ref<Vendor[]>([
    {
      id: 1,
      name: 'Elihemspice foods',
      description: '...Here to Gofer your cravin',
      image: meal1,
      rating: 4.5,
      reviewCount: 300,
      deliveryTime: '15-30 min',
      isOpen: true,
      promoted: true,
      tags: ['spicy', 'local', 'food']
    },
    {
      id: 2,
      name: 'DALISH Restaurant',
      description: 'Rice & Swallow',
      image: meal2,
      rating: 5.0,
      reviewCount: 300,
      deliveryTime: '15-30 min',
      isOpen: true,
      promoted: true,
      tags: ['rice', 'swallow', 'restaurant']
    },
    {
      id: 3,
      name: 'OSAS CHOPS',
      description: 'SMALL CHOPS WEY MAKE SENSE',
      image: meal3,
      rating: 4.8,
      reviewCount: 300,
      deliveryTime: '15-30 min',
      isOpen: true,
      promoted: true,
      tags: ['snacks', 'small chops']
    },
    {
      id: 4,
      name: 'Olumanny hot meal',
      description: 'Food, drinks and provisions',
      image: meal4,
      rating: 4.2,
      reviewCount: 250,
      deliveryTime: '20-35 min',
      isOpen: true,
      promoted: true,
      tags: ['hot meal', 'drinks']
    },
    {
      id: 5,
      name: 'LeahBella\'s Food & Treats',
      description: 'Tasty Meals',
      image: meal1,
      rating: 4.7,
      reviewCount: 180,
      deliveryTime: '15-25 min',
      isOpen: true,
      promoted: true,
      tags: ['treats', 'meals']
    },
    {
      id: 6,
      name: 'Hand of God',
      description: 'Best Jollof, Waakye, Ewa Agoyin',
      image: meal2,
      rating: 4.9,
      reviewCount: 320,
      deliveryTime: '10-20 min',
      isOpen: true,
      promoted: false,
      tags: ['jollof', 'waakye', 'local']
    },
    {
      id: 7,
      name: 'Boripe Foods',
      description: 'Rice, bread, beans and swallow',
      image: meal3,
      rating: 4.3,
      reviewCount: 210,
      deliveryTime: '20-30 min',
      isOpen: true,
      promoted: false,
      tags: ['rice', 'beans', 'bread']
    },
    {
      id: 8,
      name: 'CAKE CITY',
      description: 'Food',
      image: meal4,
      rating: 4.6,
      reviewCount: 150,
      deliveryTime: '25-40 min',
      isOpen: true,
      promoted: false,
      tags: ['cake', 'dessert']
    }
  ]);

  const promotedVendors = computed(() => vendors.value.filter(vendor => vendor.promoted));

  return {
    vendors,
    promotedVendors
  };
}