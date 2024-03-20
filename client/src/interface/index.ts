export interface IIProps {
  loading: boolean;
  searchTerm: string;
  isSidebarOpen: boolean;
}

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
