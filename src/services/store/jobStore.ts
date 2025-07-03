import { atom } from 'jotai';import { Job } from '@/services/apis/index';
export interface JobFilters {
  search: string;
  remote: boolean;
  jobType: 'full-time' | 'part-time' | 'contract' | '';
}

export const jobsAtom = atom<Job[]>([]);
export const selectedJobAtom = atom<Job | null>(null);
export const filtersAtom = atom<JobFilters>({
  search: '',
  remote: false,
  jobType: '',
});
