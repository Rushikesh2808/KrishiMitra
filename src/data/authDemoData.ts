import { UserAccount } from '../types';

export const DEMO_USERS: Record<'FARMER' | 'FPO' | 'BUYER', UserAccount> = {
  FARMER: {
    id: 'user-farmer-01',
    role: 'FARMER',
    fullName: 'Ramesh Patil',
    mobile: '9822045678',
    email: 'ramesh.patil@krishimitra.demo',
    village: 'Niphad',
    taluka: 'Niphad',
    district: 'Nashik',
    state: 'Maharashtra',
    preferredCrops: ['Soybean', 'Red Onion', 'Cotton'],
  },
  FPO: {
    id: 'user-fpo-01',
    role: 'FPO',
    fullName: 'Vikas Shinde',
    organizationName: 'Sahyadri Farmers Producer Co. Ltd.',
    authorizedPerson: 'Vikas Shinde (Managing Director)',
    mobile: '9850123456',
    email: 'contact@sahyadrifarmers.org',
    registrationNumber: 'MH/NSK/FPO/2019/8842',
    operatingLocation: 'Nashik & Dindori Cluster, Maharashtra',
  },
  BUYER: {
    id: 'user-buyer-01',
    role: 'BUYER',
    fullName: 'Anand Agrawal',
    businessName: 'Khandesh Agro-Processing & Exports Pvt Ltd',
    contactPerson: 'Anand Agrawal (Procurement Head)',
    mobile: '9422789123',
    email: 'procurement@khandeshagro.com',
    buyerType: 'Agri-Processor',
    operatingLocation: 'Jalgaon & Nashik Hub, Maharashtra',
  },
};
