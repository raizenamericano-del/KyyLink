export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  title: string;
  icon: string;
}

export interface BioLinkProfile {
  username: string;
  displayName: string;
  bio: string;
  avatar: string | null;
  links: SocialLink[];
  theme: 'pink' | 'blue' | 'purple';
}

export const SOCIAL_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: '#E4405F', placeholder: 'https://instagram.com/username' },
  { id: 'tiktok', name: 'TikTok', icon: 'Music2', color: '#000000', placeholder: 'https://tiktok.com/@username' },
  { id: 'youtube', name: 'YouTube', icon: 'Youtube', color: '#FF0000', placeholder: 'https://youtube.com/@username' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', color: '#25D366', placeholder: 'https://wa.me/1234567890' },
  { id: 'telegram', name: 'Telegram', icon: 'Send', color: '#0088CC', placeholder: 'https://t.me/username' },
  { id: 'twitter', name: 'Twitter', icon: 'Twitter', color: '#1DA1F2', placeholder: 'https://twitter.com/username' },
  { id: 'website', name: 'Website', icon: 'Globe', color: '#FF9ECF', placeholder: 'https://yourwebsite.com' },
  { id: 'shop', name: 'Online Shop', icon: 'ShoppingBag', color: '#A7C7FF', placeholder: 'https://yourshop.com' },
  { id: 'email', name: 'Email', icon: 'Mail', color: '#EA4335', placeholder: 'mailto:you@email.com' },
] as const;
