import { Clock, MapPin, Building, Briefcase } from 'lucide-react';import { Text } from '@/ui-kits';
import React from 'react';
import { Job } from '@/services/apis';

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-blue-500 shadow-lg border-gray-100 dark:border-gray-800 hover:border-blue-200`}
    >
      <div className="w-full flex gap-2 justify-between items-start mb-4">
        <div className="flex-1">
          <Text
            variant="H20"
            className="mb-2 whitespace-wrap text-gray-800 dark:text-white hover:text-blue-600 transition-colors"
          >
            {job?.title}
          </Text>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
            <Building className="w-4 h-4 mr-2" />
            <Text variant="D16" className="font-medium">
              {job.company_name}
            </Text>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {job?.remote && (
            <Text
              variant="D14"
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              Remote
            </Text>
          )}

          {job?.is_applied && (
            <Text
              variant="D14"
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              Applied
            </Text>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <Text variant="D14">{job?.location}</Text>
        </div>
        <div className="flex items-center">
          <Briefcase className="w-4 h-4 mr-1" />
          <Text variant="D14">{job?.job_types?.[0] || 'Full-time'}</Text>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <Text variant="D14">{formatDate(job?.created_at)}</Text>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {job?.tags?.slice(0, 4).map((tag, index) => (
          <span
            key={index}
            className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-md text-sm"
          >
            {tag}
          </span>
        ))}
        {job?.tags?.length > 3 && (
          <span className="text-gray-500 text-sm">
            +{job.tags.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
};

export default JobCard;
