import { LayoutDashboard } from '@ui/icons';

export const siteTitle = 'My Site';
export function SiteDefaultIcons({ className = 'w-4 h-4' }: { className?: string }): JSX.Element {
  return (
    <LayoutDashboard
      absoluteStrokeWidth
      className={className}
      fill="currentColor"
      fillOpacity={1}
    />
  );
}

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const QUERY_KEYS = {
  profile: 'profile',
  organizations: 'organizations',
  auth_organization: 'auth_organization',
  games: 'games',
};

export const isDev = process.env.NODE_ENV !== 'production';

export const authConfig = {
  secret: process.env.AUTH_SECRET || 'secret',
  google: { clientId: process.env.AUTH_GOOGLE_ID!, secret: process.env.AUTH_GOOGLE_SECRET! },
};

export const liveKitConfig = {
  apiUrl: process.env.LIVEKIT_API_URL!,
  apiKey: process.env.LIVEKIT_API_KEY!,
  secretKey: process.env.LIVEKIT_SECRET_KEY!,
  wsUrl: process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!,
};

export const stripeConfig = {
  publishKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
};
