export type Category = {
  id: string;
  name: string;
  subNiches: string[];
};

export const categories: Category[] = [
  {
    id: "gaming",
    name: "Gaming (เกมมิ่ง)",
    subNiches: [
      "Indie Game (เกมอินดี้)",
      "RPG / JRPG (เกมสวมบทบาท)",
      "FPS / Shooter (เกมยิง)",
      "Mobile Game (เกมมือถือ)",
      "Esports (อีสปอร์ต)",
      "Retro Gaming (เกมย้อนยุค)"
    ]
  },
  {
    id: "health-fitness",
    name: "Health & Fitness (สุขภาพและการออกกำลังกาย)",
    subNiches: [
      "Yoga & Pilates (โยคะและพิลาทิส)",
      "Bodybuilding (เพาะกาย)",
      "Weight Loss (การลดน้ำหนัก)",
      "Mental Health (สุขภาพจิต)",
      "Home Workout (ออกกำลังกายที่บ้าน)"
    ]
  },
  {
    id: "finance",
    name: "Finance (การเงิน)",
    subNiches: [
      "Cryptocurrency (คริปโตเคอร์เรนซี)",
      "Personal Finance (การเงินส่วนบุคคล)",
      "Stock Trading (การเทรดหุ้น)",
      "Real Estate (อสังหาริมทรัพย์)",
      "Frugal Living (การใช้ชีวิตแบบประหยัด)"
    ]
  },
  {
    id: "technology",
    name: "Technology (เทคโนโลยี)",
    subNiches: [
      "Artificial Intelligence (ปัญญาประดิษฐ์)",
      "Web Development (การพัฒนาเว็บ)",
      "Cybersecurity (ความปลอดภัยไซเบอร์)",
      "SaaS Tools (ซอฟต์แวร์ให้บริการ)",
      "No-Code (การสร้างเว็บโดยไม่เขียนโค้ด)"
    ]
  },
  {
    id: "lifestyle",
    name: "Lifestyle (ไลฟ์สไตล์)",
    subNiches: [
      "Minimalism (มินิมอลลิสต์)",
      "Digital Nomad (ทำงานทางไกลเร่ร่อน)",
      "Sustainable Living (การใช้ชีวิตรักษ์โลก)",
      "Van Life (การใช้ชีวิตในรถตู้)",
      "Travel Hacking (เทคนิคเที่ยวราคาประหยัด)"
    ]
  },
  {
    id: "food",
    name: "Food & Beverage (อาหารและเครื่องดื่ม)",
    subNiches: [
      "Vegan Recipes (สูตรอาหารวีแกน)",
      "Coffee Brewing (การชงกาแฟพิเศษ)",
      "Meal Prepping (การเตรียมอาหารล่วงหน้า)",
      "Baking & Pastry (การอบขนม)",
      "Craft Beer / Mixology (คราฟต์เบียร์และค็อกเทล)"
    ]
  },
  {
    id: "education",
    name: "Education (การศึกษา)",
    subNiches: [
      "Language Learning (การเรียนภาษา)",
      "Study Hacks (เทคนิคการเรียน)",
      "Homeschooling (การเรียนแบบโฮมสคูล)",
      "Speed Reading (การอ่านเร็ว)",
      "Online Courses (คอร์สเรียนออนไลน์)"
    ]
  },
  {
    id: "marketing",
    name: "Marketing (การตลาด)",
    subNiches: [
      "SEO (การทำ SEO)",
      "Social Media (การตลาดโซเชียลมีเดีย)",
      "Email Marketing (การตลาดผ่านอีเมล)",
      "Content Creation (การสร้างคอนเทนต์)",
      "Affiliate Marketing (นายหน้าช่วยขาย)"
    ]
  },
  {
    id: "arts-crafts",
    name: "Arts & Crafts (ศิลปะและงานคราฟต์)",
    subNiches: [
      "Digital Art (ศิลปะดิจิทัล)",
      "Knitting & Crochet (ถักนิตติ้งและโครเชต์)",
      "Woodworking (งานไม้)",
      "Pottery & Ceramics (เครื่องปั้นดินเผา)",
      "Calligraphy (ศิลปะการเขียนอักษร)"
    ]
  },
  {
    id: "productivity",
    name: "Productivity (ประสิทธิภาพการทำงาน)",
    subNiches: [
      "Time Management (การจัดการเวลา)",
      "Notion Templates (เทมเพลต Notion)",
      "Habit Tracking (การติดตามนิสัย)",
      "Goal Setting (การตั้งเป้าหมาย)",
      "Deep Work (การทำงานแบบมีสมาธิจดจ่อ)"
    ]
  }
];
