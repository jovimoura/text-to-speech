export const PLANS = [
  {
    name: 'Free',
    slug: 'free',
    credits: 100,
    price: {
      amount: 0,
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  {
    name: 'Pro',
    slug: 'pro',
    credits: 10000,
    price: {
      amount: 2,
    priceIds: {
        test: 'price_1QSjV7GOYVQiQ3wSpU1fBu8n',
        // when u create a production version on stripe, please paste here the prod Id!
        production: 'price_1QSjV7GOYVQiQ3wSpU1fBu8n',
      },
    },
  },
];

