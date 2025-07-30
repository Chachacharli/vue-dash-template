<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <CustomerCard
      v-for="customer in MOCK_DATA"
      :key="customer.id"
      :id="customer.id"
      :name="customer.name"
      :email="customer.email"
      :phone="customer.phone"
      :country="customer.country"
      :dob="customer.dob"
      :avatarURL="customer.avatarURL"
    ></CustomerCard>
  </section>
</template>

<script setup lang="ts">
import CustomerCard from './CustomerCard.vue'
import type { Customers } from '@/types/customers/customers'

const MOCK_DATA: Customers[] = [
  {
    id: 3569427083002097,
    name: 'Marshall Padberg',
    email: 'Troy52@yahoo.com',
    phone: '739.692.7125 x76679',
    country: 'Monaco',
    dob: '2024-08-06T17:51:38.040Z',
    avatarURL: 'https://avatars.githubusercontent.com/u/36292923',
    metrics: [],
  },
  {
    id: 2546581112137128,
    name: 'Leah Lockman',
    email: 'Maximilian_Hickle@gmail.com',
    phone: '302-228-6956 x25806',
    country: 'Mauritius',
    dob: '2024-09-15T16:28:01.186Z',
    avatarURL: 'https://avatars.githubusercontent.com/u/36292923',
    metrics: [],
  },
  {
    id: 6217971326652140,
    name: 'Jo Abbott',
    email: 'Eli97@gmail.com',
    phone: '1-356-694-8219',
    country: 'Cuba',
    dob: '2025-01-25T00:07:00.152Z',
    avatarURL: 'https://avatars.githubusercontent.com/u/21920612',
    metrics: [],
  },
  {
    id: 2128385992478139,
    name: 'Benny Gerlach',
    email: 'Marvin66@gmail.com',
    phone: '687.453.1142 x665',
    country: 'Paraguay',
    dob: '2025-04-24T17:21:00.277Z',
    avatarURL: 'https://avatars.githubusercontent.com/u/9239848',
    metrics: [],
  },
  {
    id: 406990361285917,
    name: 'Dr. Alberto Roberts',
    email: 'Reta.Renner14@gmail.com',
    phone: '785.708.4216',
    country: 'Cameroon',
    dob: '2025-02-12T22:20:43.453Z',
    avatarURL: 'https://avatars.githubusercontent.com/u/67005665',
    metrics: [],
  },
  {
    id: 8483096271958497,
    name: 'Kathy Cole',
    email: 'Abe45@gmail.com',
    phone: '1-971-626-2509',
    country: 'Cyprus',
    dob: '2024-10-09T00:23:27.280Z',
    avatarURL: 'https://avatars.githubusercontent.com/u/56293326',
    metrics: [],
  },
  {
    id: 5870685500281551,
    name: 'Felix Hirthe',
    email: 'Ross_OReilly95@gmail.com',
    phone: '1-585-551-7527',
    country: 'Suriname',
    dob: '2025-07-14T09:39:04.027Z',
    avatarURL: 'https://avatars.githubusercontent.com/u/70660374',
    metrics: [],
  },
  {
    id: 629683090055889,
    name: 'Nina Schimmel',
    email: 'Aniyah_Miller@hotmail.com',
    phone: '1-859-454-6116',
    country: 'Nigeria',
    dob: '2025-07-25T17:08:42.031Z',
    avatarURL: 'https://avatars.githubusercontent.com/u/4648042',
    metrics: [],
  },
  {
    id: 7381646828015112,
    name: 'Raul Koepp',
    email: 'Rosemarie6@hotmail.com',
    phone: '1-821-724-2747',
    country: 'Poland',
    dob: '2025-04-02T03:23:15.884Z',
    avatarURL: 'https://avatars.githubusercontent.com/u/10841974',
    metrics: [],
  },
  {
    id: 6581573315333927,
    name: 'Tabitha Emard',
    email: 'Magdalena53@gmail.com',
    phone: '1-534-941-2181',
    country: 'Poland',
    dob: '2025-05-21T11:52:23.092Z',
    avatarURL: 'https://avatars.githubusercontent.com/u/68747892',
    metrics: [],
  },
]
</script>
