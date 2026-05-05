export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api',
  appName: 'ACC Wooden Utensils',
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
    facebook: 'https://facebook.com/acc',
    instagram: 'https://instagram.com/acc',
    pinterest: 'https://pinterest.com/acc'
  }
};