import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SectionKey = 'summary' | 'experience' | 'education' | 'skills' | 'projects';

export interface ResumeProfile {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  location: string;
}

export interface ResumeSection {
  key: SectionKey;
  label: string;
  description: string;
}

interface ResumeState {
  profile: ResumeProfile;
  sections: ResumeSection[];
  selectedSection: SectionKey;
  setProfile: (profile: Partial<ResumeProfile>) => void;
  setSelectedSection: (key: SectionKey) => void;
  reorderSections: (from: number, to: number) => void;
}

const initialSections: ResumeSection[] = [
  { key: 'summary', label: 'Summary', description: 'Your headline and positioning.' },
  { key: 'experience', label: 'Experience', description: 'Achievements and role history.' },
  { key: 'education', label: 'Education', description: 'Degrees and certifications.' },
  { key: 'skills', label: 'Skills', description: 'Core competencies and tags.' },
  { key: 'projects', label: 'Projects', description: 'Portfolio highlights and outcomes.' },
];

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      profile: {
        fullName: 'Alex Morgan',
        role: 'Senior Product Designer',
        email: 'alex@example.com',
        phone: '+1 (555) 010-2024',
        location: 'Remote · San Francisco',
      },
      sections: initialSections,
      selectedSection: 'summary',
      setProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),
      setSelectedSection: (key) => set({ selectedSection: key }),
      reorderSections: (from, to) =>
        set((state) => {
          const next = [...state.sections];
          const [item] = next.splice(from, 1);
          next.splice(to, 0, item);
          return { sections: next };
        }),
    }),
    {
      name: 'resume-saas-foundation',
    },
  ),
);
