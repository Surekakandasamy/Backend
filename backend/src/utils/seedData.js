const Plan = require('../models/Plan');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Offer = require('../models/Offer');

const SAMPLE_PLANS = [
  {
    name: "Unlimited Plan",
    operator: "Airtel",
    price: 299,
    data: "2GB/day",
    validity: "28",
    popular: true,
    category: "unlimited",
    benefits: "Unlimited Voice, 100 SMS/day, Free Roaming"
  },
  {
    name: "Smart Recharge",
    operator: "Airtel",
    price: 199,
    data: "1.5GB/day",
    validity: "28",
    popular: true,
    category: "unlimited",
    benefits: "Unlimited Voice, 100 SMS/day, Free Roaming"
  },
  {
    name: "Max Plan",
    operator: "Airtel",
    price: 499,
    data: "3GB/day",
    validity: "56",
    popular: false,
    category: "unlimited",
    benefits: "Unlimited Voice, 100 SMS/day, Disney+ Hotstar"
  },
  {
    name: "Data Booster",
    operator: "Jio",
    price: 98,
    data: "12GB",
    validity: "28",
    popular: false,
    category: "data",
    benefits: "Data Only, No Voice/SMS"
  },
  {
    name: "Weekend Data",
    operator: "Jio",
    price: 58,
    data: "4GB",
    validity: "7",
    popular: false,
    category: "data",
    benefits: "Data Only, Weekend Special"
  },
  {
    name: "Unlimited Plus",
    operator: "Jio",
    price: 349,
    data: "2.5GB/day",
    validity: "28",
    popular: true,
    category: "unlimited",
    benefits: "Unlimited Voice, 100 SMS/day, JioTV, JioCinema"
  },
  {
    name: "Quick Recharge",
    operator: "Vi",
    price: 99,
    data: "200MB",
    validity: "28",
    popular: false,
    category: "talktime",
    benefits: "₹75 Talktime, Local/STD Calls"
  },
  {
    name: "Vi Hero Unlimited",
    operator: "Vi",
    price: 249,
    data: "1.5GB/day",
    validity: "28",
    popular: true,
    category: "unlimited",
    benefits: "Unlimited Voice, 100 SMS/day, Vi Movies & TV"
  },
  {
    name: "Annual Plan",
    operator: "BSNL",
    price: 2999,
    data: "2.5GB/day",
    validity: "365",
    popular: false,
    category: "long-term",
    benefits: "Unlimited Voice, 100 SMS/day, Free Roaming"
  },
  {
    name: "Budget Plan",
    operator: "BSNL",
    price: 187,
    data: "2GB/day",
    validity: "28",
    popular: false,
    category: "unlimited",
    benefits: "Unlimited Voice, 100 SMS/day"
  }
];



const SAMPLE_OFFERS = [
  {
    title: 'New User Offer',
    description: 'Get 20% off on your first recharge',
    discount: 20,
    validFrom: new Date(),
    validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Weekend Special',
    description: 'Flat ₹50 off on recharges above ₹200',
    discount: 50,
    validFrom: new Date(),
    validTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
];

const seedPlans = async () => {
  try {
    const existingPlans = await Plan.countDocuments();
    if (existingPlans === 0) {
      await Plan.insertMany(SAMPLE_PLANS);
      console.log('Sample plans seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding plans:', error);
  }
};



const seedOffers = async () => {
  try {
    const existingOffers = await Offer.countDocuments();
    if (existingOffers === 0) {
      await Offer.insertMany(SAMPLE_OFFERS);
      console.log('Sample offers seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding offers:', error);
  }
};

const seedAll = async () => {
  await seedPlans();
  await seedOffers();
};

module.exports = { seedAll };