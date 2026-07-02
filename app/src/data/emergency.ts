import type { EmergencyData } from '../types'

export const emergencyData: EmergencyData = {
  hotel: {
    nameRu: 'Ascott Dadonghai Bay Sanya',
    nameEn: 'Ascott Dadonghai Bay Sanya',
    nameZh: '三亚雅诗阁山海天服务公寓',
    addressZh: '海南省三亚市吉阳区大东海，海韵路66号',
    phone: null,
    bookingNumber: null,
  },
  insurance: {
    company: null,
    policyNumber: null,
    phone: null,
  },
  numbers: [
    { number: '110', label: 'Полиция' },
    { number: '119', label: 'Пожарные' },
    { number: '120', label: 'Скорая' },
  ],
  phraseIds: ['need-help', 'ambulance', 'police', 'lost', 'call-hotel'],
}
