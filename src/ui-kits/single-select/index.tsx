'use client'

import { Box, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { Text, VariantType } from '../text';
import { cn } from '@/utils';



interface Option {
  [key: string]: any;
  value?: string | number;
  title?: string;
  showIcon?: boolean;
}

interface UISelectProps {
  options: Option[];
  value?: string | number;
  onChange?: (event: SelectChangeEvent<string | number>) => void;
  title?: string;
  error?: string | boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  variant?: VariantType;
  placeHolder?: string;
  returnValue?: string;
  optionLabel?: string;
  defaultValue?: string | number;
  required?: boolean;
  containerClass?: string;
  selectClass?: string;
  label?: string;
  name?: string;
  readOnly?: boolean;
}

export const UISelect: React.FC<UISelectProps> = ({
  name,
  options,
  value,
  onChange,
  title,
  error,
  onBlur,
  variant = 'D16',
  placeHolder,
  returnValue = 'value',
  optionLabel = 'title',
  defaultValue,
  required = false,
  containerClass = '',
  selectClass = '',
  label,
  readOnly = false
}) => {
 

  const styles = {
    input: {
      '& .MuiTypography-root': {
        fontSize: '14px',
        width: 'calc(100%-30px)'
      },
      '& .Mui-disabled': {
        cursor: 'not-allowed !important'
      },
      '& .MuiSelect-icon': {
        display: readOnly ? 'none' : 'block'
      }
    }
  };

  const [selected, setSelected] = useState<string | number>('');

  useEffect(() => {
    setSelected(value || '');
  }, [value]);

  const handleSelect = (e: any) => {
    if (onChange) {
      onChange(e);
    } else {
      setSelected(e.target.value);
    }
  };

  return (
    <Box className={cn('w-full relative mt-2', containerClass)}>
      {title && (
        <Text variant={variant}>
          {title}
          {required && <span className="text-error">*</span>}
        </Text>
      )}

      {label && (
        <Text variant={'D10'} className={cn('mb-1 bg-white z-40 px-1 absolute -top-[7px] left-2')}>
          {label}
          {required && <span className="text-error">*</span>}
        </Text>
      )}

      <Select
        defaultValue={defaultValue}
        value={selected}
        onChange={handleSelect}
        name={name}
        onBlur={onBlur}
        readOnly={readOnly}
        sx={styles.input}
        className={cn('w-full mt-2 h-[35px] rounded-[8px] sm:h-[40px] bg-white flex', selectClass)}
        displayEmpty
        renderValue={(selectedValue) => {
          const selectedOption = options.find((opt) => opt[returnValue] === selectedValue);
          return selectedOption ? (
            <Text>{selectedOption[optionLabel]}</Text>
          ) : (
            <MenuItem value="" className={cn('w-full break-all')}>
              <Text className="text-gray break-all">{placeHolder}</Text>
            </MenuItem>
          );
        }}>
        {placeHolder && (
          <MenuItem value="" className={cn('w-full break-all')}>
            <Text className="text-gray break-all">{placeHolder}</Text>
          </MenuItem>
        )}
        {options && options.length > 0 ? (
          options.map((option, index) => (
            <MenuItem
              key={`${index}-${option[returnValue]}`}
              className={cn('w-full flex')}
              value={option[returnValue]}>
              <ListItemText primary={option[optionLabel]} />
            </MenuItem>
          ))
        ) : (
          <MenuItem>No options</MenuItem>
        )}
      </Select>

      {error && <Text variant="fieldError">{error}</Text>}
    </Box>
  );
};
