import React from 'react';
import {
  Sidebar,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarSpace,
} from '@backstage/core-components';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import { Settings as SidebarSettings } from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';

export const AppSidebar = () => (
  <Sidebar>
    <SidebarGroup label="Search" icon={<SidebarSearchModal />}>
      <SidebarSearchModal />
    </SidebarGroup>
    <SidebarDivider />
    <SidebarGroup label="Menu" icon={<HomeIcon />}>
      <SidebarItem icon={HomeIcon} to="catalog" text="Home" />
      <SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />
      <SidebarItem icon={LibraryBooks} to="docs" text="Docs" />
    </SidebarGroup>
    <SidebarSpace />
    <SidebarDivider />
    <SidebarGroup label="Settings" icon={<SidebarSettings />}>
      <SidebarSettings />
    </SidebarGroup>
  </Sidebar>
);

export default AppSidebar;
