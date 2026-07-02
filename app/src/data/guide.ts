export interface GuideItem {
  title: string
  zh?: string
  description: string
  where: string
  price: string
  tip: string
}

export interface VenueGuide {
  name: string
  zh: string
  when: string
  order: string
  caution: string
  price: string
}

export const mustTry: GuideItem[] = [
  { title:'Coconut chicken', zh:'椰子鸡', description:'Мягкий hotpot с курицей в кокосовом бульоне', where:'椰小鸡 / 嗲嗲的椰子鸡', price:'100–180 CNY/чел', tip:'Хороший первый локальный ужин' },
  { title:'Wenchang chicken', zh:'文昌鸡', description:'Хайнаньская курица, часто white-cut', where:'Yanjiang / Qiongxiangge', price:'100–200 CNY/чел', tip:'Соус отдельно, не остро' },
  { title:'Zao-po vinegar seafood', zh:'糟粕醋海鲜锅', description:'Яркий кисловатый seafood hotpot', where:'Tai Qiong', price:'100–180 CNY/чел', tip:'Не брать огромный сет вслепую' },
  { title:'Baoluo fen', zh:'抱罗粉', description:'Рисовая лапша для быстрого локального завтрака', where:'Лавки 抱罗粉 / 海南粉', price:'15–35 CNY', tip:'Удобно, когда устали от ресторанов' },
  { title:'Qingbuliang', zh:'清补凉', description:'Холодный кокосовый десерт', where:'Aju / Zheng Apo', price:'15–35 CNY', tip:'Идеально в жару' },
  { title:'Seafood', zh:'海鲜', description:'Краб, креветки, scallops и рыба', where:'First Market / MS.LIN / A Lang', price:'150–350 CNY/чел', tip:'Согласовать цену за 斤 и обработку заранее' },
  { title:'Hainan fruits', zh:'水果', description:'Манго, мангостин, рамбутан и драконий фрукт', where:'Фруктовые лавки / First Market', price:'10–60 CNY', tip:'1 斤 = 500 граммов' },
  { title:'Hainan tea', zh:'茶', description:'Шу/шэн пуэр, улун, белый чай', where:'Tenfu Tea / чайные', price:'50–300 CNY', tip:'Не покупать дорогой aged puer вслепую' },
]

export const venueGuides: VenueGuide[] = [
  { name:'Dolphin Sports Bar & Grill', zh:'Dolphin海豚美式西餐厅', when:'Первый вечер или хочется знакомой еды и пива', order:'Burgers, wings, ribs/BBQ, fries; IPA, Hoegaarden, cider или peach beer', caution:'Не идти за локальной кухней; вечером возможна очередь', price:'120–220 CNY/чел' },
  { name:'FreeGen Beach Bar', zh:'大东海海边酒吧', when:'Закат и пляжный вечер', order:'Tropical cocktails, coconut, простые mains и snacks', caution:'Идти ради моря и атмосферы, не гастрономии', price:'100–200 CNY/чел' },
  { name:'Tai Qiong', zh:'太琼糟粕醋·海南酸汤火锅', when:'Хочется самого необычного локального вкуса', order:'糟粕醋酸汤锅, seafood platter, shrimp, pomfret, beef', caution:'Кислый вкус нравится не всем; начать с небольшого сета', price:'120–220 CNY/чел' },
  { name:'Coconut chicken', zh:'椰小鸡 / 嗲嗲的椰子鸡', when:'Мягкий первый локальный ужин', order:'Original coconut chicken, chicken oil rice, mushrooms, greens', caution:'Вкус мягкий и сладковатый, это не острый hotpot', price:'100–180 CNY/чел' },
  { name:'Yanjiang / Qiongxiangge', zh:'沿江海南菜 / 琼乡阁海南菜', when:'Хайнаньская кухня без рынка', order:'Wenchang chicken, Hainan noodles, coconut rice, mango/coconut rolls', caution:'Проверять конкретный филиал в Amap/Dianping', price:'100–200 CNY/чел' },
  { name:'MS.LIN / A Lang Seafood', zh:'林姐香味海鲜 / 阿浪海鲜', when:'Seafood-вечер', order:'Garlic scallops, steamed grouper, shrimp, spicy crab, oysters', caution:'Цена за 斤 плюс processing fee должна быть известна до заказа', price:'150–350 CNY/чел' },
  { name:'Mandarin / EDITION / Tikki', zh:'日落吧 / Sky Bar / Tikki Lounge', when:'Красивые напитки и вау-вечер', order:'Signature cocktails; в Tikki — craft beer и Asian tapas', caution:'Не бюджетный вариант; проверить часы, погоду и dress code', price:'150–400+ CNY/чел' },
  { name:'Casa Corona', zh:'卡萨科罗娜酒吧', when:'Party/pool-bar резерв в Dadonghai', order:'Corona, margarita, tacos и happy hour', caution:'Если не хочется шума — выбрать FreeGen или Sunset Bar', price:'130–260 CNY/чел' },
]

export const drinkGuide: GuideItem[] = [
  { title:'Tsingtao', zh:'青岛', description:'Лёгкий китайский лагер', where:'Dolphin, магазины, бары', price:'20–50 CNY', tip:'База для сравнения' },
  { title:'Snow', zh:'雪花', description:'Очень массовое лёгкое пиво', where:'Магазины и простые бары', price:'10–30 CNY', tip:'Не вау, но типичный Китай' },
  { title:'Wusu', zh:'乌苏', description:'Более крепкое китайское пиво', where:'Магазины и бары', price:'15–40 CNY', tip:'Пробовать аккуратно' },
  { title:'IPA / craft', description:'Крафт и импорт', where:'Dolphin, Houhai, Tikki', price:'45–90 CNY', tip:'Лучший шанс на выразительное пиво' },
  { title:'Tropical cocktail', description:'Отпускной коктейль у моря', where:'FreeGen', price:'60–120 CNY', tip:'Пить ради вида' },
  { title:'Signature cocktail', description:'Красивый барный коктейль', where:'EDITION / Mandarin', price:'120–250+ CNY', tip:'Один вау-вечер' },
]
