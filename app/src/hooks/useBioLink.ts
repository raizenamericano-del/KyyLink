import { useState, useEffect, useCallback } from 'react';
import type { BioLinkProfile, SocialLink } from '@/types';

const STORAGE_KEY = 'kyylink_profiles';

const defaultProfile: BioLinkProfile = {
  username: '',
  displayName: '',
  bio: '',
  avatar: null,
  links: [],
  theme: 'pink',
};

export function useBioLink() {
  const [profiles, setProfiles] = useState<Record<string, BioLinkProfile>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load profiles from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfiles(parsed);
      } catch (e) {
        console.error('Failed to parse profiles:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever profiles change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    }
  }, [profiles, isLoaded]);

  const getProfile = useCallback((username: string): BioLinkProfile | null => {
    return profiles[username.toLowerCase()] || null;
  }, [profiles]);

  const saveProfile = useCallback((username: string, profile: Partial<BioLinkProfile>) => {
    const key = username.toLowerCase();
    setProfiles(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || defaultProfile),
        ...profile,
        username: key,
      }
    }));
    return true;
  }, []);

  const deleteProfile = useCallback((username: string) => {
    const key = username.toLowerCase();
    setProfiles(prev => {
      const newProfiles = { ...prev };
      delete newProfiles[key];
      return newProfiles;
    });
  }, []);

  const addLink = useCallback((username: string, link: SocialLink) => {
    const key = username.toLowerCase();
    setProfiles(prev => {
      const profile = prev[key] || { ...defaultProfile, username: key };
      return {
        ...prev,
        [key]: {
          ...profile,
          links: [...profile.links, link],
        }
      };
    });
  }, []);

  const removeLink = useCallback((username: string, linkId: string) => {
    const key = username.toLowerCase();
    setProfiles(prev => {
      const profile = prev[key];
      if (!profile) return prev;
      return {
        ...prev,
        [key]: {
          ...profile,
          links: profile.links.filter(l => l.id !== linkId),
        }
      };
    });
  }, []);

  const updateLink = useCallback((username: string, linkId: string, updates: Partial<SocialLink>) => {
    const key = username.toLowerCase();
    setProfiles(prev => {
      const profile = prev[key];
      if (!profile) return prev;
      return {
        ...prev,
        [key]: {
          ...profile,
          links: profile.links.map(l => 
            l.id === linkId ? { ...l, ...updates } : l
          ),
        }
      };
    });
  }, []);

  const reorderLinks = useCallback((username: string, newOrder: SocialLink[]) => {
    const key = username.toLowerCase();
    setProfiles(prev => {
      const profile = prev[key];
      if (!profile) return prev;
      return {
        ...prev,
        [key]: {
          ...profile,
          links: newOrder,
        }
      };
    });
  }, []);

  const usernameExists = useCallback((username: string): boolean => {
    return !!profiles[username.toLowerCase()];
  }, [profiles]);

  const getAllProfiles = useCallback((): BioLinkProfile[] => {
    return Object.values(profiles);
  }, [profiles]);

  return {
    profiles,
    isLoaded,
    getProfile,
    saveProfile,
    deleteProfile,
    addLink,
    removeLink,
    updateLink,
    reorderLinks,
    usernameExists,
    getAllProfiles,
  };
}
