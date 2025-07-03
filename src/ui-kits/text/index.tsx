'use client'

import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import { cn } from '@/utils';

const variants = {
  default: ' text-md',
  fieldError: 'text-[10px] sm:text-[14px] text-error font-nunito font-secondary',

  // Headings
  H12: 'text-[10px] sm:text-[10px] md:text-[12px] lg:text-[12px] font-bold font-nunito',
  H14: 'text-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px] font-bold font-nunito',
  H16: 'text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-bold font-nunito',
  H18: 'text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-bold font-nunito',
  H20: 'text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-bold font-nunito',
  H22: 'text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold font-nunito',
  H28: 'text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] leading-8 font-bold font-nunito',
  H32: 'text-[26px] sm:text-[28px] md:text-[30px] lg:text-[32px] font-bold leading-7 font-nunito',
  H24: 'text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold leading-7 font-nunito',
  H26: 'text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-bold leading-6 md:leading-8 font-nunito',
  H30: 'text-[20px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-bold leading-7 text-primaryText font-nunito',

  H34: 'text-[22px] sm:text-[24px] md:text-[28px] lg:text-[34px] font-bold leading-8 text-primaryText font-nunito',
  H36: 'text-[24px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-bold leading-8 text-primaryText font-nunito',
  H40: 'text-[24px] sm:text-[28px] md:text-[34px] lg:text-[40px] font-bold leading-7 sm:leading-10 font-nunito',
  H48: 'text-[24px] sm:text-[32px] md:text-[36px] lg:text-[48px] font-bold leading-12 font-nunito',

  // Descriptions
  D10: 'text-[8px] lg:text-[10px] text-primaryText font-nunito',
  D12: 'text-[10px] lg:text-[12px] text-primaryText font-nunito',
  D14: 'text-[12px] lg:text-[14px] text-primaryText font-nunito',
  D16: 'text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] text-primaryText font-nunito',
  D18: 'text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-primaryText font-nunito',
  D20: 'text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-primaryText font-nunito',
  D22: 'text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-5 sm:leading-7 text-primaryText font-nunito',
  D24: 'text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-7 text-primaryText font-nunito',
  D26: 'text-[19px] sm:text-[22px] md:text-[24px] lg:text-[26px] leading-7 text-primaryText font-nunito',
  D28: 'text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] leading-7 text-primaryText font-nunito',
  D30: 'text-[20px] sm:text-[26px] md:text-[28px] lg:text-[30px] leading-7 text-primaryText font-nunito',
  D32: 'text-[22px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-8 text-primaryText font-nunito',

  //input-label
  label:
    'text-[15px] sm:text-[16px] md:text-[18px] 2xl:text-[19px] font-bold font-nunito text-black'
};

// Define the variant type based on the keys of variants
export type VariantType = keyof typeof variants;

// Define props for the Text component
interface TextProps {
  children: ReactNode;
  className?: string;
  variant?: VariantType;
  onClick?: () => void;
  style?: any;
}

export const Text: React.FC<TextProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick,
  style,
  ...rest
}) => {
  const combinedClass = cn(variants.default, variants[variant], className);

  return (
    <Typography className={combinedClass} onClick={onClick} style={style} {...rest}>
      {children}
    </Typography>
  );
};
