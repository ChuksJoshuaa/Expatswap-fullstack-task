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
