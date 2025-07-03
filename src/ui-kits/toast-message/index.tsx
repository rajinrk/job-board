import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { ShieldCloseIcon } from 'lucide-react';

interface ToastOptions {
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
  className?: string;
  bodyClassName?: string;
  closeButton?: boolean;
  autoClose?: number | false;
  hideProgressBar?: boolean;
}

const ToastContent = ({ title }: { title: string }) => (
  <Box className="flex items-center gap-3">
    <Box component="div">
      <p className="font-sm text-black">{title}</p>
    </Box>
    <ShieldCloseIcon
      onClick={() => toast.dismiss()}
      className="ml-auto text-gray-400 cursor-pointer hover:text-white"
    />
  </Box>
);

export const toastSuccess = (title: string | undefined): void => {
  if (!title) return;

  toast.success(<ToastContent title={title} />, {
    position: 'top-center',
    className: 'rounded-lg shadow-lg',
    bodyClassName: 'flex items-center',
    closeButton: false,
    autoClose: 5000,
    hideProgressBar: true
  } as ToastOptions);
};

export const toastError = (title: string | undefined): void => {
  if (!title) return;

  toast.error(<ToastContent title={title} />, {
    position: 'top-center',
    className: 'rounded-lg shadow-lg',
    bodyClassName: 'flex items-center',
    closeButton: false,
    autoClose: 5000,
    hideProgressBar: true
  } as ToastOptions);
};
