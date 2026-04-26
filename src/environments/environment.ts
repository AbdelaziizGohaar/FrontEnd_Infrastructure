export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'SmartHome Wooden Utensils',
  features: {
    enableReviews: true,
    enableWishlist: true,
    enableCoupons: true,
    enableGuestCheckout: true
  },
  payment: {
    stripePublicKey: 'pk_test_your_key_here',
    paypalClientId: 'your_paypal_client_id'
  },
  social: {
    facebook: 'https://facebook.com/smarthome',
    instagram: 'https://instagram.com/smarthome',
    pinterest: 'https://pinterest.com/smarthome'
  }
};