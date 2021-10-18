import {Offer} from '../types/offer';

const AVATAR_URL = 'https://i.pravatar.cc/128';

export const offers: Offer[] = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: `The house was lovingly built with stone floors,
      high-beamed ceilings, and antique details for a luxurious yet charming feel.`,
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 3,
      isPro: true,
      name: 'Sara',
    },
    id: 1,
    images: [
      'img/room.jpg', 'img/apartment-01.jpg',
      'img/apartment-02.jpg', 'img/apartment-03.jpg',
      'img/studio-01.jpg', 'img/paris2.jpg'],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 7,
    },
    maxAdults: 3,
    previewImage: 'img/room.jpg',
    price: 220,
    rating: 5,
    title: 'Romantic Stone House with Ocean Views',
    type: 'house',
  },
  {
    bedrooms: 4,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: `Wander around the historic streets while the city sleeps,
    then head back for a morning coffee at this urban-chic studio with a suspended loft bedroom.`,
    goods: ['Heating', 'Kitchen', 'Cable TV'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 56,
      isPro: false,
      name: 'Anna',
    },
    id: 5,
    images: [
      'img/paris1.jpg', 'img/paris2.jpg',
      'img/paris3.jpg', 'img/paris4.jpg',
      'img/paris5.jpg', 'img/paris6.jpg'],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: 'img/paris1.jpg',
    price: 160,
    rating: 3,
    title: 'Luxury City Center Loft on a Traffic-Free Street',
    type: 'apartment',
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'Enjoy the elegance of a by-gone era while staying in this Art Deco home.',
    goods: ['Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 35,
      isPro: true,
      name: 'Harry',
    },
    id: 8,
    images: [
      'img/paris1.jpg', 'img/paris2.jpg',
      'img/apartment-02.jpg', 'img/apartment-03.jpg',
      'img/paris5.jpg', 'img/apartment-01.jpg'],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 10,
    },
    maxAdults: 3,
    previewImage: 'img/apartment-01.jpg',
    price: 200,
    rating: 2,
    title: 'Elegant Art Deco Home with Garden',
    type: 'house',
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: `The house is located in the enclave of Llandudno Beach,
    a locals-only spot with unspoilt, fine white sand and curling surfing waves.
    Although shops and restaurants are only a five-minute drive away,
    the area feels peaceful and secluded.`,
    goods: ['Heating', 'Kitchen', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 15,
      isPro: true,
      name: 'Tom',
    },
    id: 10,
    images: [
      'img/room.jpg', 'img/paris2.jpg',
      'img/apartment-02.jpg', 'img/apartment-03.jpg',
      'img/studio-01.jpg', 'img/apartment-01.jpg'],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.3809553943508,
      longitude:  4.939309666406198,
      zoom: 10,
    },
    maxAdults: 4,
    previewImage: 'img/room.jpg',
    price: 300,
    rating: 1,
    title: 'Forest-and-Heaven Themed Hotel',
    type: 'hotel',
  },
];
