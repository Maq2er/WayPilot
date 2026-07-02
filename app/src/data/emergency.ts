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

export const consularContacts = [
  {
    id: 'guangzhou',
    title: 'Генконсульство РФ в Гуанчжоу',
    note: 'Обслуживает провинцию Хайнань',
    addressRu: 'Гуанчжоу, р-н Тяньхэ, пр-т Линьцзян дадао, БЦ «Фа чжань чжунсинь», 26 этаж, секция A',
    addressZh: '广州市天河区临江大道3号发展中心26楼A单元俄罗斯联邦驻广州总领事馆',
    phone: '+86 20 8518 5001',
    emergencyPhone: '+86 138 2505 1775',
  },
  {
    id: 'beijing',
    title: 'Посольство РФ в Пекине',
    note: 'Резервный контакт',
    addressRu: 'Пекин, ул. Дунчжимэнь Бэйчжунцзе, 4',
    addressZh: '北京市东直门北中街4号俄罗斯联邦大使馆',
    phone: '+86 10 6532 1381',
    emergencyPhone: '+86 185 1866 4933',
  },
] as const
