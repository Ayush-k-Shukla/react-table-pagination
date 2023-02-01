import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export interface CustomInputChangeFuncInterface {
  name: string;
  value?: string | boolean | number | string[];
}

interface PropTypes {
  name?: string;
  value: string;
  handleValueChange: (args: CustomInputChangeFuncInterface) => any;
  label?: string;
  fullWidth?: boolean;
  placeholder?: string;
  type?: 'button' | 'number' | 'text';
}

function CustomInput({
  name,
  value,
  type,
  handleValueChange,
  label,
  placeholder,
  fullWidth = false,
}: PropTypes) {
  const [val, setVal] = useState<string>(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = e.target;
    setVal(value);
    handleValueChange({ name, value });
  };

  return (
    <TextField
      type={type ?? 'text'}
      name={name}
      label={label}
      value={val}
      variant='standard'
      onChange={handleValChange}
      fullWidth={fullWidth}
      placeholder={placeholder}
    />
  );
}

export default CustomInput;
