import React from 'react';
import { X, ListFilter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CommonSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
}

const CommonSelect: React.FC<CommonSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  disabled = false,
  clearable = false,
}) => {
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <div className="flex items-center border border-input-border rounded-lg px-3">
        {clearable && value ? (
          <button type="button" onClick={handleClear}>
            <X className="size-4 mr-2" />
          </button>
        ) : (
          <ListFilter className="size-4 mr-2" />
        )}
        <SelectTrigger className="max-w-max border-none px-0">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </div>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CommonSelect;
