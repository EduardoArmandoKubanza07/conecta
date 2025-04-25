export interface User {
  id: string;
  name: string;
  firsName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: string;
  role: string;
}

export interface UsersPaginated {
  users: User[];
  limit: number;
  total: number;
  totalPages: number;
  page: number;
}
