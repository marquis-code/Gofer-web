import { ref, computed } from 'vue'

/**
 * Composable for generating and managing restaurant URLs
 * 
 * @param {string} baseUrl - The base URL of the application (optional)
 * @returns Various URL utilities for restaurant pages
 */
export function useRestaurantUrl(baseUrl?: string) {
  // Get the base URL from the browser if not provided
  const siteUrl = ref(baseUrl || (process.client ? window.location.origin : 'https://Gofer.com'))
  
  /**
   * Formats a restaurant name for use in a URL
   * - Replaces spaces with hyphens
   * - Removes special characters
   * - Converts to title case with first letter of each word capitalized
   */
  const formatRestaurantNameForUrl = (name: string, vendor: any): string => {
    if (!name) return ''
    
    // Convert to title case (capitalize first letter of each word)
    const titleCase = name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    // Replace spaces with hyphens and remove special characters
    return titleCase
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w\-]/g, '') // Remove special characters except hyphens
  }
  
  /**
   * Generates a full restaurant URL from a restaurant name and vendor object
   */
  const getRestaurantUrl = (restaurantName: string, vendor: any): string => {
    // Use vendor ID directly rather than the formatted name
    if (!vendor || !vendor._id) {
      console.error('Vendor or vendor ID is missing')
      return `${siteUrl.value}`
    }
    
    return `${siteUrl.value}/${vendor.slug}`
  }
  
  /**
   * Extracts a vendor ID from a URL
   */
  const getVendorIdFromUrl = (url: string): string => {
    const urlObj = new URL(url)
    const path = urlObj.pathname
    
    // Get the last part of the path (the vendor ID)
    return path.split('/').filter(Boolean).pop() || ''
  }
  
  /**
   * Creates a shareable URL for the current restaurant
   */
  const createShareableUrl = (restaurantName: string, vendor: any, params?: Record<string, string>): string => {
    const baseRestaurantUrl = getRestaurantUrl(restaurantName, vendor)
    
    if (!params) return baseRestaurantUrl
    
    // Add query parameters if provided
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, value)
    })
    
    return `${baseRestaurantUrl}?${queryParams.toString()}`
  }
  
  /**
   * Checks if a given URL is a valid restaurant URL
   */
  const isValidRestaurantUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      const pathParts = urlObj.pathname.split('/').filter(Boolean)
      // Check if URL has the format /vendors/{vendorId}
      return urlObj.origin === siteUrl.value && 
             pathParts.length >= 2 && 
             pathParts[0] === 'vendors' &&
             pathParts[1].length > 0
    } catch (e) {
      return false
    }
  }
  
  return {
    siteUrl,
    formatRestaurantNameForUrl,
    getRestaurantUrl,
    getVendorIdFromUrl,
    createShareableUrl,
    isValidRestaurantUrl
  }
}