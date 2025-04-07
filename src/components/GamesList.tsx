
import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import GameCard from './GameCard';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Expanded game data with all matches per group
const gamesData = [
  // Group A
  {
    id: '1',
    title: 'Morocco vs Mali',
    date: '2025-01-15T18:00:00',
    venue: 'Mohammed V Stadium, Casablanca',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Morocco',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/800px-Flag_of_Morocco.svg.png',
    },
    team2: {
      name: 'Mali',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Mali.svg/1200px-Flag_of_Mali.svg.png',
    },
    ticketsAvailable: 458,
    isPopular: true,
    group: 'A'
  },
  {
    id: '2',
    title: 'Morocco vs Zambia',
    date: '2025-01-19T16:00:00',
    venue: 'Grand Stade de Rabat, Rabat',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Morocco',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/800px-Flag_of_Morocco.svg.png',
    },
    team2: {
      name: 'Zambia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/1200px-Flag_of_Zambia.svg.png',
    },
    ticketsAvailable: 425,
    isPopular: true,
    group: 'A'
  },
  {
    id: '3',
    title: 'Morocco vs Comoros',
    date: '2025-01-23T18:00:00',
    venue: 'Stade de Marrakech, Marrakech',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Morocco',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/800px-Flag_of_Morocco.svg.png',
    },
    team2: {
      name: 'Comoros',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Flag_of_the_Comoros.svg/1200px-Flag_of_the_Comoros.svg.png',
    },
    ticketsAvailable: 380,
    isPopular: false,
    group: 'A'
  },
  {
    id: '4',
    title: 'Mali vs Zambia',
    date: '2025-01-20T16:00:00',
    venue: 'Mohammed V Stadium, Casablanca',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Mali',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Mali.svg/1200px-Flag_of_Mali.svg.png',
    },
    team2: {
      name: 'Zambia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/1200px-Flag_of_Zambia.svg.png',
    },
    ticketsAvailable: 310,
    isPopular: false,
    group: 'A'
  },
  {
    id: '5',
    title: 'Mali vs Comoros',
    date: '2025-01-24T19:00:00',
    venue: 'Grand Stade de Tangier, Tangier',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Mali',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Mali.svg/1200px-Flag_of_Mali.svg.png',
    },
    team2: {
      name: 'Comoros',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Flag_of_the_Comoros.svg/1200px-Flag_of_the_Comoros.svg.png',
    },
    ticketsAvailable: 280,
    isPopular: false,
    group: 'A'
  },
  {
    id: '6',
    title: 'Zambia vs Comoros',
    date: '2025-01-27T16:00:00',
    venue: 'Stade Adrar, Agadir',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Zambia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/1200px-Flag_of_Zambia.svg.png',
    },
    team2: {
      name: 'Comoros',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Flag_of_the_Comoros.svg/1200px-Flag_of_the_Comoros.svg.png',
    },
    ticketsAvailable: 265,
    isPopular: false,
    group: 'A'
  },

  // Group B
  {
    id: '7',
    title: 'Egypt vs South Africa',
    date: '2025-01-18T19:00:00',
    venue: 'Grand Stade de Rabat, Rabat',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Egypt',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/1200px-Flag_of_Egypt.svg.png',
    },
    team2: {
      name: 'South Africa',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/1200px-Flag_of_South_Africa.svg.png',
    },
    ticketsAvailable: 245,
    isPopular: false,
    group: 'B'
  },
  {
    id: '8',
    title: 'Egypt vs Ghana',
    date: '2025-01-22T18:00:00',
    venue: 'Mohammed V Stadium, Casablanca',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Egypt',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/1200px-Flag_of_Egypt.svg.png',
    },
    team2: {
      name: 'Ghana',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/1200px-Flag_of_Ghana.svg.png',
    },
    ticketsAvailable: 320,
    isPopular: false,
    group: 'B'
  },
  {
    id: '9',
    title: 'Egypt vs Mozambique',
    date: '2025-01-26T16:00:00',
    venue: 'Stade de Marrakech, Marrakech',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Egypt',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/1200px-Flag_of_Egypt.svg.png',
    },
    team2: {
      name: 'Mozambique',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Mozambique.svg/1200px-Flag_of_Mozambique.svg.png',
    },
    ticketsAvailable: 280,
    isPopular: false,
    group: 'B'
  },
  {
    id: '10',
    title: 'South Africa vs Ghana',
    date: '2025-01-21T19:00:00',
    venue: 'Grand Stade de Tangier, Tangier',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'South Africa',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/1200px-Flag_of_South_Africa.svg.png',
    },
    team2: {
      name: 'Ghana',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/1200px-Flag_of_Ghana.svg.png',
    },
    ticketsAvailable: 300,
    isPopular: false,
    group: 'B'
  },
  {
    id: '11',
    title: 'South Africa vs Mozambique',
    date: '2025-01-25T16:00:00',
    venue: 'Stade Adrar, Agadir',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'South Africa',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/1200px-Flag_of_South_Africa.svg.png',
    },
    team2: {
      name: 'Mozambique',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Mozambique.svg/1200px-Flag_of_Mozambique.svg.png',
    },
    ticketsAvailable: 270,
    isPopular: false,
    group: 'B'
  },
  {
    id: '12',
    title: 'Ghana vs Mozambique',
    date: '2025-01-29T18:00:00',
    venue: 'Mohammed V Stadium, Casablanca',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Ghana',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/1200px-Flag_of_Ghana.svg.png',
    },
    team2: {
      name: 'Mozambique',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Mozambique.svg/1200px-Flag_of_Mozambique.svg.png',
    },
    ticketsAvailable: 290,
    isPopular: false,
    group: 'B'
  },

  // Group C
  {
    id: '13',
    title: 'Nigeria vs Tunisia',
    date: '2025-01-20T16:00:00',
    venue: 'Stade de Marrakech, Marrakech',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Nigeria',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/1200px-Flag_of_Nigeria.svg.png',
    },
    team2: {
      name: 'Tunisia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png',
    },
    ticketsAvailable: 320,
    isPopular: false,
    group: 'C'
  },
  {
    id: '14',
    title: 'Nigeria vs Angola',
    date: '2025-01-24T18:00:00',
    venue: 'Grand Stade de Rabat, Rabat',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Nigeria',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/1200px-Flag_of_Nigeria.svg.png',
    },
    team2: {
      name: 'Angola',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Angola.svg/1200px-Flag_of_Angola.svg.png',
    },
    ticketsAvailable: 290,
    isPopular: false,
    group: 'C'
  },
  {
    id: '15',
    title: 'Nigeria vs Guinea',
    date: '2025-01-28T16:00:00',
    venue: 'Mohammed V Stadium, Casablanca',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Nigeria',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/1200px-Flag_of_Nigeria.svg.png',
    },
    team2: {
      name: 'Guinea',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Flag_of_Guinea.svg/1200px-Flag_of_Guinea.svg.png',
    },
    ticketsAvailable: 310,
    isPopular: false,
    group: 'C'
  },
  {
    id: '16',
    title: 'Tunisia vs Angola',
    date: '2025-01-23T19:00:00',
    venue: 'Stade Adrar, Agadir',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Tunisia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png',
    },
    team2: {
      name: 'Angola',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Angola.svg/1200px-Flag_of_Angola.svg.png',
    },
    ticketsAvailable: 280,
    isPopular: false,
    group: 'C'
  },
  {
    id: '17',
    title: 'Tunisia vs Guinea',
    date: '2025-01-27T18:00:00',
    venue: 'Grand Stade de Tangier, Tangier',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Tunisia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png',
    },
    team2: {
      name: 'Guinea',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Flag_of_Guinea.svg/1200px-Flag_of_Guinea.svg.png',
    },
    ticketsAvailable: 260,
    isPopular: false,
    group: 'C'
  },
  {
    id: '18',
    title: 'Angola vs Guinea',
    date: '2025-01-30T16:00:00',
    venue: 'Stade de Marrakech, Marrakech',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Angola',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Angola.svg/1200px-Flag_of_Angola.svg.png',
    },
    team2: {
      name: 'Guinea',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Flag_of_Guinea.svg/1200px-Flag_of_Guinea.svg.png',
    },
    ticketsAvailable: 250,
    isPopular: false,
    group: 'C'
  },

  // Group D
  {
    id: '19',
    title: 'Senegal vs DR Congo',
    date: '2025-01-22T19:00:00',
    venue: 'Stade Adrar, Agadir',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Senegal',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/1200px-Flag_of_Senegal.svg.png',
    },
    team2: {
      name: 'DR Congo',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/1200px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png',
    },
    ticketsAvailable: 185,
    isPopular: true,
    group: 'D'
  },
  {
    id: '20',
    title: 'Senegal vs Guinea-Bissau',
    date: '2025-01-26T18:00:00',
    venue: 'Mohammed V Stadium, Casablanca',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Senegal',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/1200px-Flag_of_Senegal.svg.png',
    },
    team2: {
      name: 'Guinea-Bissau',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Guinea-Bissau.svg/1200px-Flag_of_Guinea-Bissau.svg.png',
    },
    ticketsAvailable: 210,
    isPopular: false,
    group: 'D'
  },
  {
    id: '21',
    title: 'Senegal vs Mauritania',
    date: '2025-01-30T19:00:00',
    venue: 'Grand Stade de Rabat, Rabat',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Senegal',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/1200px-Flag_of_Senegal.svg.png',
    },
    team2: {
      name: 'Mauritania',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Mauritania.svg/1200px-Flag_of_Mauritania.svg.png',
    },
    ticketsAvailable: 240,
    isPopular: false,
    group: 'D'
  },
  {
    id: '22',
    title: 'DR Congo vs Guinea-Bissau',
    date: '2025-01-25T16:00:00',
    venue: 'Stade de Marrakech, Marrakech',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'DR Congo',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/1200px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png',
    },
    team2: {
      name: 'Guinea-Bissau',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Guinea-Bissau.svg/1200px-Flag_of_Guinea-Bissau.svg.png',
    },
    ticketsAvailable: 270,
    isPopular: false,
    group: 'D'
  },
  {
    id: '23',
    title: 'DR Congo vs Mauritania',
    date: '2025-01-29T16:00:00',
    venue: 'Grand Stade de Tangier, Tangier',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'DR Congo',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/1200px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png',
    },
    team2: {
      name: 'Mauritania',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Mauritania.svg/1200px-Flag_of_Mauritania.svg.png',
    },
    ticketsAvailable: 290,
    isPopular: false,
    group: 'D'
  },
  {
    id: '24',
    title: 'Guinea-Bissau vs Mauritania',
    date: '2025-02-01T18:00:00',
    venue: 'Stade Adrar, Agadir',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Guinea-Bissau',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Guinea-Bissau.svg/1200px-Flag_of_Guinea-Bissau.svg.png',
    },
    team2: {
      name: 'Mauritania',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Mauritania.svg/1200px-Flag_of_Mauritania.svg.png',
    },
    ticketsAvailable: 320,
    isPopular: false,
    group: 'D'
  },

  // Group E
  {
    id: '25',
    title: 'Algeria vs Burkina Faso',
    date: '2025-01-24T16:00:00',
    venue: 'Mohammed V Stadium, Casablanca',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Algeria',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/1200px-Flag_of_Algeria.svg.png',
    },
    team2: {
      name: 'Burkina Faso',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Burkina_Faso.svg/1200px-Flag_of_Burkina_Faso.svg.png',
    },
    ticketsAvailable: 275,
    isPopular: false,
    group: 'E'
  },
  {
    id: '26',
    title: 'Algeria vs Namibia',
    date: '2025-01-28T18:00:00',
    venue: 'Grand Stade de Rabat, Rabat',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Algeria',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/1200px-Flag_of_Algeria.svg.png',
    },
    team2: {
      name: 'Namibia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Namibia.svg/1200px-Flag_of_Namibia.svg.png',
    },
    ticketsAvailable: 295,
    isPopular: false,
    group: 'E'
  },
  {
    id: '27',
    title: 'Algeria vs Ethiopia',
    date: '2025-02-01T16:00:00',
    venue: 'Stade de Marrakech, Marrakech',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Algeria',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/1200px-Flag_of_Algeria.svg.png',
    },
    team2: {
      name: 'Ethiopia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/1200px-Flag_of_Ethiopia.svg.png',
    },
    ticketsAvailable: 310,
    isPopular: false,
    group: 'E'
  },
  {
    id: '28',
    title: 'Burkina Faso vs Namibia',
    date: '2025-01-27T19:00:00',
    venue: 'Stade Adrar, Agadir',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Burkina Faso',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Burkina_Faso.svg/1200px-Flag_of_Burkina_Faso.svg.png',
    },
    team2: {
      name: 'Namibia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Namibia.svg/1200px-Flag_of_Namibia.svg.png',
    },
    ticketsAvailable: 280,
    isPopular: false,
    group: 'E'
  },
  {
    id: '29',
    title: 'Burkina Faso vs Ethiopia',
    date: '2025-01-31T18:00:00',
    venue: 'Grand Stade de Tangier, Tangier',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Burkina Faso',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Burkina_Faso.svg/1200px-Flag_of_Burkina_Faso.svg.png',
    },
    team2: {
      name: 'Ethiopia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/1200px-Flag_of_Ethiopia.svg.png',
    },
    ticketsAvailable: 300,
    isPopular: false,
    group: 'E'
  },
  {
    id: '30',
    title: 'Namibia vs Ethiopia',
    date: '2025-02-03T16:00:00',
    venue: 'Mohammed V Stadium, Casablanca',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Namibia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Namibia.svg/1200px-Flag_of_Namibia.svg.png',
    },
    team2: {
      name: 'Ethiopia',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/1200px-Flag_of_Ethiopia.svg.png',
    },
    ticketsAvailable: 330,
    isPopular: false,
    group: 'E'
  },

  // Group F
  {
    id: '31',
    title: 'Ivory Coast vs Cameroon',
    date: '2025-01-25T19:00:00',
    venue: 'Grand Stade de Tangier, Tangier',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Ivory Coast',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg/1200px-Flag_of_C%C3%B4te_d%27Ivoire.svg.png',
    },
    team2: {
      name: 'Cameroon',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/1200px-Flag_of_Cameroon.svg.png',
    },
    ticketsAvailable: 310,
    isPopular: true,
    group: 'F'
  },
  {
    id: '32',
    title: 'Ivory Coast vs Benin',
    date: '2025-01-29T18:00:00',
    venue: 'Mohammed V Stadium, Casablanca',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Ivory Coast',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg/1200px-Flag_of_C%C3%B4te_d%27Ivoire.svg.png',
    },
    team2: {
      name: 'Benin',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Benin.svg/1200px-Flag_of_Benin.svg.png',
    },
    ticketsAvailable: 290,
    isPopular: false,
    group: 'F'
  },
  {
    id: '33',
    title: 'Ivory Coast vs Rwanda',
    date: '2025-02-02T16:00:00',
    venue: 'Grand Stade de Rabat, Rabat',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Ivory Coast',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg/1200px-Flag_of_C%C3%B4te_d%27Ivoire.svg.png',
    },
    team2: {
      name: 'Rwanda',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Rwanda.svg/1200px-Flag_of_Rwanda.svg.png',
    },
    ticketsAvailable: 320,
    isPopular: false,
    group: 'F'
  },
  {
    id: '34',
    title: 'Cameroon vs Benin',
    date: '2025-01-28T19:00:00',
    venue: 'Stade de Marrakech, Marrakech',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Cameroon',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/1200px-Flag_of_Cameroon.svg.png',
    },
    team2: {
      name: 'Benin',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Benin.svg/1200px-Flag_of_Benin.svg.png',
    },
    ticketsAvailable: 280,
    isPopular: false,
    group: 'F'
  },
  {
    id: '35',
    title: 'Cameroon vs Rwanda',
    date: '2025-02-01T18:00:00',
    venue: 'Stade Adrar, Agadir',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Cameroon',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/1200px-Flag_of_Cameroon.svg.png',
    },
    team2: {
      name: 'Rwanda',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Rwanda.svg/1200px-Flag_of_Rwanda.svg.png',
    },
    ticketsAvailable: 300,
    isPopular: false,
    group: 'F'
  },
  {
    id: '36',
    title: 'Benin vs Rwanda',
    date: '2025-02-04T16:00:00',
    venue: 'Grand Stade de Tangier, Tangier',
    image: 'https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    team1: {
      name: 'Benin',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Benin.svg/1200px-Flag_of_Benin.svg.png',
    },
    team2: {
      name: 'Rwanda',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Rwanda.svg/1200px-Flag_of_Rwanda.svg.png',
    },
    ticketsAvailable: 340,
    isPopular: false,
    group: 'F'
  },

  
];

const GamesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGames, setFilteredGames] = useState(gamesData);
  const [sortType, setSortType] = useState('popular');
  const [selectedGroup, setSelectedGroup] = useState('all');

  useEffect(() => {
    // Filter games based on search term and group
    let results = gamesData.filter(game =>
      (game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.venue.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Apply group filter
    if (selectedGroup !== 'all') {
      results = results.filter(game => game.group === selectedGroup);
    }

    // Sort games
    let sorted = [...results];
    if (sortType === 'date') {
      sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortType === 'popular') {
      sorted.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    setFilteredGames(sorted);
  }, [searchTerm, sortType, selectedGroup]);

  return (
    <section id="featured-games" className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            <span className="text-morocco-red">Featured</span> Games
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Discover and secure tickets for the most exciting events happening across Morocco.
          </p>
        </div>

        {/* Group Filtering */}
        <div className="mb-6 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Filter by Group:</h3>
          <ToggleGroup type="single" value={selectedGroup} onValueChange={(value) => setSelectedGroup(value || 'all')} className="flex flex-wrap md:flex-nowrap">
            <ToggleGroupItem value="all" aria-label="All Groups" className="bg-white">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="A" aria-label="Group A" className="bg-white">
              Group A
            </ToggleGroupItem>
            <ToggleGroupItem value="B" aria-label="Group B" className="bg-white">
              Group B
            </ToggleGroupItem>
            <ToggleGroupItem value="C" aria-label="Group C" className="bg-white">
              Group C
            </ToggleGroupItem>
            <ToggleGroupItem value="D" aria-label="Group D" className="bg-white">
              Group D
            </ToggleGroupItem>
            <ToggleGroupItem value="E" aria-label="Group E" className="bg-white">
              Group E
            </ToggleGroupItem>
            <ToggleGroupItem value="F" aria-label="Group F" className="bg-white">
              Group F
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-morocco-red focus:border-morocco-red"
              placeholder="Search events, venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-morocco-red focus:border-morocco-red"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="date">By Date</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredGames.map((game, index) => (
            <div
              key={game.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <GameCard {...game} />
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No games found matching your search criteria.</p>
          </div>
        )}

        {/* Pagination or Load More */}
        <div className="mt-12 flex justify-center">
          <button className="bg-white hover:bg-gray-50 text-morocco-red border border-morocco-red px-6 py-2.5 rounded-lg shadow-sm hover:shadow transition-all font-medium">
            View All Games
          </button>
        </div>
      </div>
    </section>
  );
};

export default GamesList;
