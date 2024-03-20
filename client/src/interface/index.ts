export type ChildrenProps = {
  children: React.ReactNode;
};

export interface HeaderProps {
  type: string;
}

export interface UserProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

export interface AllUsersProps {
  data: UserProps[];
  currentPage: number;
  numberOfPages: number;
  count: number;
}

export interface IIProps {
  loading: boolean;
  searchTerm: string;
  isSidebarOpen: boolean;
  searchedData: UserProps[];
  dateFrom: string;
  dateTo: string;
  page: number;
  pageSize: number;
  numberOfPages: number;
}
