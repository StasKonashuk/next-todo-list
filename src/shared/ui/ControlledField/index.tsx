import { FC } from 'react';
import { Select, Textarea, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import { ControlledFieldType } from './enums';

interface ControlledFieldProps {
  type: ControlledFieldType;
  inputName: string;
  label?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  disabled?: boolean;
}

const ControlledField: FC<ControlledFieldProps> = ({ type, disabled, inputName, label, placeholder, options }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={inputName}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        switch (type) {
          case ControlledFieldType.DateInput: {
            return (
              <DatePickerInput
                valueFormat="DD/MM/YYYY"
                label={label}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={onChange}
                dropdownType="popover"
                popoverProps={{ withinPortal: false }}
                error={error?.message}
                minDate={dayjs().add(1, 'd').format('YYYY-MM-DD')}
              />
            );
          }

          case ControlledFieldType.TextArea: {
            return (
              <Textarea
                label={label}
                placeholder={placeholder}
                onChange={onChange}
                value={value || ''}
                autosize
                disabled={disabled}
                minRows={2}
                maxRows={3}
                error={error?.message}
              />
            );
          }

          case ControlledFieldType.Select: {
            return (
              <Select
                label="Status"
                disabled={disabled}
                value={value}
                comboboxProps={{ withinPortal: false }}
                onChange={onChange}
                data={options || []}
                error={error?.message}
              />
            );
          }

          case ControlledFieldType.Input:
          default: {
            return (
              <TextInput
                onChange={onChange}
                value={value || ''}
                disabled={disabled}
                label={label}
                placeholder={placeholder}
                error={error?.message}
              />
            );
          }
        }
      }}
    />
  );
};

export default ControlledField;
