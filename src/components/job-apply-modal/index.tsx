'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { X, Upload, CheckCircle } from 'lucide-react';
import { Text, toastError, toastSuccess } from '@/ui-kits';
import { UITextInput } from '@/ui-kits/text-input';
import { Modal, Box } from '@mui/material';
import { Job } from '@/services/apis';
import UIButton from '@/ui-kits/button';

const applicationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  linkedinUrl: yup
    .string()
    .url('Invalid LinkedIn URL')
    .nullable()
    .notRequired(),
  coverLetter: yup
    .string()
    .min(10, 'Cover letter must be at least 10 characters')
    .required('Cover letter is required'),
});

interface ApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  handleApplyJob: () => void;
}

const ApplicationModal = ({
  job,
  isOpen,
  onClose,
  handleApplyJob,
}: ApplicationModalProps) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      linkedinUrl: '',
      coverLetter: '',
    },
    validationSchema: applicationSchema,
    onSubmit: async () => {
      if (!resumeFile) {
        toastError('Please upload your resume');
        return;
      }

      setIsSubmitting(true);
      try {
        handleApplyJob();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toastSuccess('Application submitted successfully!');
        setIsSubmitted(true);
      } catch {
        toastError('Failed to submit application. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toastError('Resume file must be less than 5MB');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      setResumeFile(null);
      setIsSubmitted(false);
      onClose();
    }
  };

  if (!job) return null;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className="outline-none flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky z-50 top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <Text variant="H24" className="text-gray-800">
              Apply to {job.company_name}
            </Text>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <Text variant="H20" className="mb-2 text-gray-800">
                  Application Submitted!
                </Text>
                <Text variant="D16" className="text-gray-600 mb-6">
                  Thank you for applying to <strong>{job.title}</strong> at{' '}
                  <strong>{job.company_name}</strong>.
                  {"We'll be in touch soon!"}
                </Text>
                <UIButton onClick={handleClose} title="Close" />
              </div>
            ) : (
              <>
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <Text variant="H18" className="mb-1 text-blue-800">
                    {job.title}
                  </Text>
                  <Text variant="D16" className="text-blue-600">
                    {job.company_name}
                  </Text>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <UITextInput
                    name="name"
                    title="Full Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeHolder="Enter your full name"
                    error={touched.name && (errors.name as string)}
                    required
                  />

                  <UITextInput
                    name="email"
                    title="Email Address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeHolder="Enter your email address"
                    error={touched.email && (errors.email as string)}
                    required
                  />

                  <UITextInput
                    name="linkedinUrl"
                    title="LinkedIn URL"
                    value={values.linkedinUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeHolder="https://linkedin.com/in/yourprofile"
                    error={
                      touched.linkedinUrl && (errors.linkedinUrl as string)
                    }
                  />

                  <div>
                    <Text
                      variant="D16"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Resume <span className="text-red-700">*</span>
                    </Text>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <Text variant="D16" className="text-gray-600 break-all">
                          {resumeFile
                            ? resumeFile.name
                            : 'Click to upload your resume'}
                        </Text>
                        <Text
                          variant="D14"
                          className="text-sm text-gray-400 mt-1"
                        >
                          PDF, DOC, or DOCX (max 5MB)
                        </Text>
                      </label>
                    </div>
                  </div>

                  <UITextInput
                    name="coverLetter"
                    rows={6}
                    placeHolder="Tell us why you're interested..."
                    value={values.coverLetter}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.coverLetter && (errors.coverLetter as string)
                    }
                    title="Cover Letter"
                    required
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <UIButton
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="sm:w-1/2  bg-white border border-blue-700 text-blue-700"
                      title="Cancel"
                    />

                    <UIButton
                      type="submit"
                      disabled={isSubmitting || job?.is_applied}
                      title={
                        isSubmitting ? 'Submitting...' : 'Submit Application'
                      }
                      className="sm:w-1/2"
                    />
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ApplicationModal;
