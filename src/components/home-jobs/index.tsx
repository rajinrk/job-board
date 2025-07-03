'use client';import { useState, useEffect, useRef, useCallback } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { toastError, Text } from '@/ui-kits';

import {
  jobsAtom,
  filtersAtom,
  selectedJobAtom,
} from '@/services/store/jobStore';
import { fetchJobs, Job } from '@/services/apis';
import JobFilters from '../job-filters';
import JobCard from '../job-card';
import LoadingSpinner from '../loader';
import { useRouter } from 'next/navigation';

const HomeJobs = () => {
  const router = useRouter();
  const [jobs, setJobs] = useAtom(jobsAtom);
  const [filters] = useAtom(filtersAtom);
  const setSelectedJob = useSetAtom(selectedJobAtom);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastJobRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadJobs(page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, hasMore]
  );

  useEffect(() => {
    if (jobs?.length == 0) {
      loadJobs(1, true);
      return;
    }
    loadJobs(page, false);
  }, [filters]);

  const loadJobs = async (pageNum: number, reset = false) => {
    setLoading(true);
    try {
      const newJobs = await fetchJobs(pageNum);
      if (newJobs.length === 0) {
        setHasMore(false);
      }

      if (reset) {
        setJobs(newJobs);
        setHasMore(true);
      } else {
        const seen = new Set();
        const uniqueJobs = [...jobs, ...newJobs].filter((job: Job) => {
          if (seen.has(job.id)) return false;
          seen.add(job.id);
          return true;
        });
        setJobs(uniqueJobs);
      }
      setPage(pageNum);
    } catch (error) {
      console.error('Job fetch error:', error);
      toastError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (
      filters.search &&
      !job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !job.company_name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.remote && !job.remote) return false;
    if (filters.jobType && job.job_types?.[0] !== filters.jobType) return false;
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Text
            variant="H40"
            className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Find Your Dream Job
          </Text>
          <Text
            variant="D20"
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover thousands of opportunities from top companies around the
            world
          </Text>
        </div>

        {/* Filters */}
        <JobFilters />

        {/* Job Listings */}

        <div className="mb-6 mt-4">
          <Text
            variant="H24"
            className="text-2xl font-semibold text-gray-800 mt-4"
          >
            {filteredJobs.length} Jobs Found
          </Text>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job, index) => {
            const isLast = index === filteredJobs.length - 1;
            return (
              <div key={job.id} ref={isLast ? lastJobRef : null}>
                <JobCard
                  job={job}
                  onClick={() => {
                    setSelectedJob(job);
                    router.push(`/job-details/${job.id}`);
                  }}
                />
              </div>
            );
          })}
        </div>

        {loading && (
          <div className="flex justify-center mt-8">
            <LoadingSpinner />
          </div>
        )}

        {filteredJobs?.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <Text
              variant="H18"
              className="text-xl font-semibold text-gray-700 mb-2"
            >
              No Jobs Found
            </Text>
            <Text variant="D16" className="text-gray-500">
              Try adjusting your search criteria
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeJobs;
