export type PropertyData = {
  name: string;
  description: string;
  price: number;
  image?: File | null;
  imageSrc?: string;
  quadrature: number;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  includesKitchen: boolean;
  includesParking: boolean;
  country: string;
  city: string;
  street: string;
  postalCode: string;
  county?: string;
  categories: string[];
};
