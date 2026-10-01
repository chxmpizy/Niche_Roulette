export type SubNiche = {
  en: string;
  th: string;
};

export type Category = {
  id: string;
  name: {
    en: string;
    th: string;
  };
  subNiches: SubNiche[];
};

export const categories: Category[] = [
  {
    id: "gaming",
    name: { en: "Gaming", th: "เกมมิ่ง" },
    subNiches: [
      { en: "Indie Game", th: "เกมอินดี้" },
      { en: "RPG / JRPG", th: "เกมสวมบทบาท" },
      { en: "FPS / Shooter", th: "เกมยิง" },
      { en: "Mobile Game", th: "เกมมือถือ" },
      { en: "Esports", th: "อีสปอร์ต" },
      { en: "Retro Gaming", th: "เกมย้อนยุค" }
    ]
  },
  {
    id: "health-fitness",
    name: { en: "Health & Fitness", th: "สุขภาพและการออกกำลังกาย" },
    subNiches: [
      { en: "Yoga & Pilates", th: "โยคะและพิลาทิส" },
      { en: "Bodybuilding", th: "เพาะกาย" },
      { en: "Weight Loss", th: "การลดน้ำหนัก" },
      { en: "Mental Health", th: "สุขภาพจิต" },
      { en: "Home Workout", th: "ออกกำลังกายที่บ้าน" }
    ]
  },
  {
    id: "finance",
    name: { en: "Finance", th: "การเงิน" },
    subNiches: [
      { en: "Cryptocurrency", th: "คริปโตเคอร์เรนซี" },
      { en: "Personal Finance", th: "การเงินส่วนบุคคล" },
      { en: "Stock Trading", th: "การเทรดหุ้น" },
      { en: "Real Estate", th: "อสังหาริมทรัพย์" },
      { en: "Frugal Living", th: "การใช้ชีวิตแบบประหยัด" }
    ]
  },
  {
    id: "technology",
    name: { en: "Technology", th: "เทคโนโลยี" },
    subNiches: [
      { en: "Artificial Intelligence", th: "ปัญญาประดิษฐ์" },
      { en: "Web Development", th: "การพัฒนาเว็บ" },
      { en: "Cybersecurity", th: "ความปลอดภัยไซเบอร์" },
      { en: "SaaS Tools", th: "ซอฟต์แวร์ให้บริการ" },
      { en: "No-Code", th: "การสร้างเว็บโดยไม่เขียนโค้ด" }
    ]
  },
  {
    id: "lifestyle",
    name: { en: "Lifestyle", th: "ไลฟ์สไตล์" },
    subNiches: [
      { en: "Minimalism", th: "มินิมอลลิสต์" },
      { en: "Digital Nomad", th: "ทำงานทางไกลเร่ร่อน" },
      { en: "Sustainable Living", th: "การใช้ชีวิตรักษ์โลก" },
      { en: "Van Life", th: "การใช้ชีวิตในรถตู้" },
      { en: "Travel Hacking", th: "เทคนิคเที่ยวราคาประหยัด" }
    ]
  },
  {
    id: "food",
    name: { en: "Food & Beverage", th: "อาหารและเครื่องดื่ม" },
    subNiches: [
      { en: "Vegan Recipes", th: "สูตรอาหารวีแกน" },
      { en: "Coffee Brewing", th: "การชงกาแฟพิเศษ" },
      { en: "Meal Prepping", th: "การเตรียมอาหารล่วงหน้า" },
      { en: "Baking & Pastry", th: "การอบขนม" },
      { en: "Craft Beer / Mixology", th: "คราฟต์เบียร์และค็อกเทล" }
    ]
  },
  {
    id: "education",
    name: { en: "Education", th: "การศึกษา" },
    subNiches: [
      { en: "Language Learning", th: "การเรียนภาษา" },
      { en: "Study Hacks", th: "เทคนิคการเรียน" },
      { en: "Homeschooling", th: "การเรียนแบบโฮมสคูล" },
      { en: "Speed Reading", th: "การอ่านเร็ว" },
      { en: "Online Courses", th: "คอร์สเรียนออนไลน์" }
    ]
  },
  {
    id: "marketing",
    name: { en: "Marketing", th: "การตลาด" },
    subNiches: [
      { en: "SEO", th: "การทำ SEO" },
      { en: "Social Media", th: "การตลาดโซเชียลมีเดีย" },
      { en: "Email Marketing", th: "การตลาดผ่านอีเมล" },
      { en: "Content Creation", th: "การสร้างคอนเทนต์" },
      { en: "Affiliate Marketing", th: "นายหน้าช่วยขาย" }
    ]
  },
  {
    id: "arts-crafts",
    name: { en: "Arts & Crafts", th: "ศิลปะและงานคราฟต์" },
    subNiches: [
      { en: "Digital Art", th: "ศิลปะดิจิทัล" },
      { en: "Knitting & Crochet", th: "ถักนิตติ้งและโครเชต์" },
      { en: "Woodworking", th: "งานไม้" },
      { en: "Pottery & Ceramics", th: "เครื่องปั้นดินเผา" },
      { en: "Calligraphy", th: "ศิลปะการเขียนอักษร" }
    ]
  },
  {
    id: "productivity",
    name: { en: "Productivity", th: "ประสิทธิภาพการทำงาน" },
    subNiches: [
      { en: "Time Management", th: "การจัดการเวลา" },
      { en: "Notion Templates", th: "เทมเพลต Notion" },
      { en: "Habit Tracking", th: "การติดตามนิสัย" },
      { en: "Goal Setting", th: "การตั้งเป้าหมาย" },
      { en: "Deep Work", th: "การทำงานแบบมีสมาธิจดจ่อ" }
    ]
  }
];
