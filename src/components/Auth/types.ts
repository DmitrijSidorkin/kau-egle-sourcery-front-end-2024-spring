export interface UserData {
  userName?: string;
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
  balance?: number;
  img?: string;
  orders?: {
    weekDay?: string;
    mealIds?: number[];
  }[];
  orderHistory?: {
    date?: string;
    mealsIds?: number[];
  }[];
}

export interface FormFields {
  email: string;
  username: string;
  password: string;
  repassword: string;
  rules: boolean;
}

export interface FormData {
  email: string;
  password: string;
}
