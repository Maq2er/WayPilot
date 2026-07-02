import type { TripDay } from '../types'

export const tripDays: TripDay[] = [
  {
    id:'2026-07-05', label:'5 июля', title:'Прилёт и мягкий старт',
    primary:'Ascott → сон → Dadonghai после 16:30 → фрукты → FreeGen или Dolphin',
    fallback:'Сон, ближайший ТЦ и массаж',
    segments:[
      { label:'Утро', summary:'Аэропорт → Ascott → багаж или early check-in → сон', placeIds:['p1','p0'], phraseIds:['taxi-hotel'] },
      { label:'День', summary:'Отдых. После 16:30 — Dadonghai, фрукты и SPF', placeIds:['p2','p23'] },
      { label:'Вечер', summary:'Coconut chicken, затем FreeGen или Dolphin', placeIds:['p30','p28','p27'], phraseIds:['not-spicy','bill'] },
    ], tags:['устали','рядом'],
  },
  {
    id:'2026-07-06', label:'6 июля', title:'West Island',
    primary:'Ранний выезд на West Island, деревня, море и фото', fallback:'Joy City + еда + чай',
    segments:[
      { label:'Утро', summary:'Ранний выезд к причалу West Island', placeIds:['p4'], phraseIds:['taxi-here'] },
      { label:'День', summary:'Остров, рыбацкая деревня, море и фото', placeIds:['p5'] },
      { label:'Вечер', summary:'Luhuitou на закат', placeIds:['p3'], phraseIds:['taxi-here'] },
    ], tags:['море','остров'],
  },
  {
    id:'2026-07-07', label:'7 июля', title:'Yalong Bay',
    primary:'Пляж утром или после 16:00 + Forest Park по погоде', fallback:'Atlantis / CDF',
    segments:[
      { label:'Утро', summary:'Forest Park до жары, только без ливня', placeIds:['p7'] },
      { label:'День', summary:'Пауза в помещении или отеле', placeIds:['p18','p17'] },
      { label:'Вечер', summary:'Yalong Bay после 16:00', placeIds:['p6'], phraseIds:['taxi-here'] },
    ], tags:['море','жара'],
  },
  {
    id:'2026-07-08', label:'8 июля', title:'Yanoda',
    primary:'Джунгли утром, только без ливня и сильной духоты', fallback:'Чай + еда + массаж',
    segments:[
      { label:'Утро', summary:'Ранний выезд в Yanoda', placeIds:['p9'], phraseIds:['taxi-here'] },
      { label:'День', summary:'Джунгли; в ливень отменить', placeIds:['p9'] },
      { label:'Вечер', summary:'Seafood с заранее согласованной ценой', placeIds:['p26','p34'], phraseIds:['total-price','bill'] },
    ], tags:['природа'],
  },
  {
    id:'2026-07-09', label:'9 июля', title:'Wanning / Riyue Bay',
    primary:'Поезд + DiDi, серф-вайб, кафе и побережье', fallback:'Atlantis + CDF',
    segments:[
      { label:'Утро', summary:'Sanya Station → поезд → Shenzhou или Wanning', placeIds:['p10','p48','p49'] },
      { label:'День', summary:'Riyue Bay, Shimei Bay по времени', placeIds:['p11','p12'] },
      { label:'Вечер', summary:'Возвращение и спокойный ужин', placeIds:['p27'] },
    ], tags:['море'],
  },
  {
    id:'2026-07-10', label:'10 июля', title:'Houhai + Haitang',
    primary:'Houhai после 15:00, затем Haitang по настроению', fallback:'Lost Chambers + CDF',
    segments:[
      { label:'Утро', summary:'Свободное утро и отдых', placeIds:['p2'] },
      { label:'День', summary:'Houhai после 15:00', placeIds:['p14'] },
      { label:'Вечер', summary:'Houhai bars или возвращение', placeIds:['p14','p42'] },
    ], tags:['море','бар'],
  },
  {
    id:'2026-07-11', label:'11 июля', title:'Indoor day',
    primary:'CDF + Atlantis, без спешки и жары', fallback:'Этот день уже Plan B',
    segments:[
      { label:'Утро', summary:'Atlantis Lost Chambers', placeIds:['p18'] },
      { label:'День', summary:'CDF со списком покупок', placeIds:['p17'], phraseIds:['how-much','total-price'] },
      { label:'Вечер', summary:'Sky Bar EDITION или Tikki', placeIds:['p19','p42'] },
    ], tags:['дождь','жара'],
  },
  {
    id:'2026-07-12', label:'12 июля', title:'Nanshan + Sanya Bay',
    primary:'Nanshan утром, пауза, закат в Sanya Bay', fallback:'Чай / массаж / ТЦ',
    segments:[
      { label:'Утро', summary:'Nanshan до жары', placeIds:['p20'], phraseIds:['taxi-here'] },
      { label:'День', summary:'Пауза, чай или массаж', placeIds:['p31'] },
      { label:'Вечер', summary:'Закат в Sanya Bay', placeIds:['p21'] },
    ], tags:['природа','фото'],
  },
  {
    id:'2026-07-13', label:'13 июля', title:'Финальный chill',
    primary:'Любимое место, массаж и последние покупки', fallback:'Ничего не догонять',
    segments:[
      { label:'Утро', summary:'Dadonghai и спокойный завтрак', placeIds:['p2'] },
      { label:'День', summary:'Массаж и покупки рядом', placeIds:['p23','p24'] },
      { label:'Вечер', summary:'Любимое место и ранний сон', placeIds:['p28','p27'] },
    ], tags:['устали','рядом'],
  },
  {
    id:'2026-07-14', label:'14 июля', title:'Вылет',
    primary:'Выезд в аэропорт в 02:30–03:00', fallback:'Проверить паспорт и терминал заранее',
    segments:[
      { label:'Ночь', summary:'Ascott → Sanya Phoenix International Airport', placeIds:['p0','p1'], phraseIds:['taxi-airport'] },
      { label:'Перед выездом', summary:'Паспорт, багаж, терминал international departures', placeIds:['p1'] },
      { label:'Финиш', summary:'Аэропорт', placeIds:['p1'] },
    ], tags:['транспорт'],
  },
]
