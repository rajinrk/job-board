import { atomWithStorage } from 'jotai/utils';
import { Job } from '@/services/apis/index';

export interface JobFilters {
  search: string;
  remote: boolean;
  jobType: 'full-time' | 'part-time' | 'contract' | '';
}

// ✅ Persisted atom for the jobs list
export const jobsAtom = atomWithStorage<Job[]>('jobs', []);

// ✅ Persisted atom for the selected job
export const selectedJobAtom = atomWithStorage<Job | null>('selectedJob', null);

// ✅ Persisted atom for the job filters
export const filtersAtom = atomWithStorage<JobFilters>('jobFilters', {
  search: '',
  remote: false,
  jobType: '',
});
