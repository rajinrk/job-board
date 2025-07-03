'use client';import {
  MapPin,
  Building,
  Clock,
  ExternalLink,
  Briefcase,
  ArrowLeft,
} from 'lucide-react';
import { Text } from '@/ui-kits';
import { Job } from '@/services/apis';
import UIButton from '@/ui-kits/button';
import { useAtom } from 'jotai';
import { jobsAtom } from '@/services/store/jobStore';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ApplicationModal from '@/components/job-apply-modal';

const JobDetail = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [jobs, setJobs] = useAtom(jobsAtom);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const currJob = jobs?.find((item: Job) => item?.id == params?.id);

      setCurrentJob(currJob as Job);
    }
  }, []);

  const handleApplyNow = () => {
    setShowApplicationModal(true);
  };

  const handleSubmit = () => {
    const updatedJobs = jobs?.map((elem: Job) => {
      if (elem?.id === currentJob?.id) {
        return { ...elem, is_applied: true };
      }
      return elem;
    });

    setCurrentJob({ ...currentJob, is_applied: true } as Job);

    setJobs(updatedJobs);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="p-4 md:p-10 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:underline font-medium"
        type="button"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>
      <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8 p-20 border rounded shadow-md">
        <div className="mb-6">
          <Text variant="H28" className="mb-2 text-gray-800">
            {currentJob?.title}
          </Text>
          <div className="flex items-center text-gray-600 mb-4">
            <Building className="w-5 h-5 mr-2" />
            <Text variant="D18" className="font-medium">
              {currentJob?.company_name}
            </Text>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-3" />
            <Text variant="D16">{currentJob?.location}</Text>
            {currentJob?.remote && (
              <Text
                variant="D12"
                className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
              >
                Remote
              </Text>
            )}
          </div>
          <div className="flex items-center text-gray-600">
            <Briefcase className="w-4 h-4 mr-3" />
            <Text variant="D16">
              {currentJob?.job_types?.[0] || 'Full-time'}
            </Text>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-3" />
            <Text variant="D16">
              Posted {currentJob && formatDate(currentJob?.created_at)}
            </Text>
          </div>
        </div>

        <div className="mb-6">
          <Text variant="H20" className="mb-3 text-gray-800">
            Skills Required
          </Text>
          <div className="flex flex-wrap gap-2">
            {currentJob?.tags.map((tag, index) => (
              <span key={index}>
                <Text
                  variant="D14"
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  {tag}
                </Text>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Text variant="H20" className="mb-3 text-gray-800">
            Current Job Description
          </Text>
          <div className="text-gray-600 leading-relaxed">
            {currentJob?.description.split('\n').map((paragraph, index) => (
              <Text key={index} variant="D16" className="mb-3 last:mb-0">
                {paragraph}
              </Text>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <UIButton
            onClick={handleApplyNow}
            title={currentJob?.is_applied ? 'Applied' : 'Apply Now'}
            disabled={currentJob?.is_applied}
          />

          <a
            href={currentJob?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full sm:w-fit px-4 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Text variant="D16" className="mr-2">
              View on Company Site
            </Text>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        job={currentJob}
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        handleApplyJob={handleSubmit}
      />
    </div>
  );
};

export default JobDetail;
