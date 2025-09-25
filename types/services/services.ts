export interface Product {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}
