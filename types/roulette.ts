export type Category = {
  id: string;
  name: string;
  subNiches: string[];
};

export type ProductType = {
  id: string;
  name: string;
  category: "software" | "digital";
};
