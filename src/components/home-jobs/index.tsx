'use client';import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { toastError, Text } from '@/ui-kits';
import UIButton from '@/ui-kits/button';

import { jobsAtom, filtersAtom } from '@/services/store/jobStore';
import { fetchJobs, Job } from '@/services/apis';
import JobFilters from '../job-filters';
import JobCard from '../job-card';
import LoadingSpinner from '../loader';
import { useRouter } from 'next/navigation';

const HomeJobs = () => {
  const router = useRouter();
  const [jobs, setJobs] = useAtom(jobsAtom);
  const [filters] = useAtom(filtersAtom);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (jobs?.length == 0) {
      loadJobs(1, true);
    }
  }, []);

  useEffect(() => {
    loadJobs(page, false);
  }, [filters]);

  const loadJobs = async (pageNum: number, reset = false) => {
    setLoading(true);
    try {
      const newJobs = await fetchJobs(pageNum, filters);
      if (reset) {
        setJobs(newJobs);
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

  const loadMore = () => {
    if (!loading) {
      loadJobs(page + 1);
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
          {filteredJobs?.length > 0 &&
            filteredJobs?.map((job) => (
              <JobCard
                key={job?.id}
                job={job}
                onClick={() => {
                  router.push(`/job-details/${job?.id}`);
                }}
              />
            ))}
        </div>

        {loading && (
          <div className="flex justify-center mt-8">
            <LoadingSpinner />
          </div>
        )}

        {!loading && filteredJobs?.length > 0 && filteredJobs?.length < 30 && (
          <div className="flex justify-center mt-8">
            <UIButton onClick={loadMore} title="Load More Jobs" />
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
