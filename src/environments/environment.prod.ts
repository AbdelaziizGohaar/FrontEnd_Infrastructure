export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api',
  appName: 'SmartHome Wooden Utensils',
  features: {
    enableReviews: true,
    enableWishlist: true,
    enableCoupons: true,
    enableGuestCheckout: true
  },
  payment: {
    stripePublicKey: 'pk_live_your_key_here',
    paypalClientId: 'your_live_paypal_client_id'
  },
  social: {
    facebook: 'https://facebook.com/smarthome',
    instagram: 'https://instagram.com/smarthome',
    pinterest: 'https://pinterest.com/smarthome'
  }
};