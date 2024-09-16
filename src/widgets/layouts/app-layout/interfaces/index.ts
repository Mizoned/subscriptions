export interface ISidebarItem {
  label: string;
  items?: ISidebarItem[];
  icon?: string;
  to?: string;
}
