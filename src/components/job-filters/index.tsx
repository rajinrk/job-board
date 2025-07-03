'use client';
import { useAtom } from 'jotai';
import { Filter } from 'lucide-react';
import { filtersAtom } from '../../services/store/jobStore';
import { Text } from '@/ui-kits';
import { UITextInput } from '@/ui-kits/text-input';
import { UISelect } from '@/ui-kits/single-select';

const jobTypeOptions = [
  { value: '', title: 'All Types' },
  { value: 'full-time', title: 'Full-time' },
  { value: 'part-time', title: 'Part-time' },
  { value: 'contract', title: 'Contract' },
];

const JobFilters = () => {
  const [filters, setFilters] = useAtom(filtersAtom);

  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-5 h-5 text-gray-600" />
        <Text variant="H16" className="text-gray-800">
          Filter Jobs
        </Text>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <div className="relative">
            <UITextInput
              placeHolder="Search jobs, companies..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              inputClass="md:pr-4 pb-3"
            />
          </div>
        </div>

        {/* Job Type */}
        <div className="pb-3">
          <UISelect
            options={jobTypeOptions}
            value={filters.jobType}
            onChange={(e) => updateFilter('jobType', e.target.value)}
          />
        </div>

        {/* Remote */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={filters.remote}
            onChange={(e) => updateFilter('remote', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <Text variant="D16" className="ml-3 text-gray-700 font-medium">
            Remote Only
          </Text>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
