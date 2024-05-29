import { AppWindow, HomeIcon, Package, Settings, User } from '@ui/icons';

export const siteRoutes = [
  { title: 'Home', href: '/', component: <HomeIcon /> },
  { title: 'Dashboard', href: '/dashboard', component: <Package /> },
  { title: 'TV', href: '/tv', component: <Package /> },
  { title: 'Admin', href: '/admin', component: <AppWindow /> },
];

export const dashboardRoutes = [
  { title: 'Home', href: '/dashboard/home', component: <HomeIcon /> },
];

export const settingsRoutes = [
  { title: 'General', href: '/dashboard/settings/general', component: <Settings /> },
  { title: 'Profile', href: '/dashboard/settings/profile', component: <User /> },
  { title: 'Appearance', href: '/dashboard/settings/appearance', component: <AppWindow /> },
  { title: 'TV', href: '/dashboard/settings/broadcast', component: <Package /> },
];
