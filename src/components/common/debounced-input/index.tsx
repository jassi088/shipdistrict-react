import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

type DebouncedSearchInputProps = {
  onSearch: (value: string) => void;
  value: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
};

const DebouncedSearchInput: React.FC<DebouncedSearchInputProps> = ({
  value,
  onSearch,
  placeholder = 'Search...',
  type = 'text',
}) => {
  const [input, setInput] = useState(value ?? '');

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      onSearch(searchValue);
    }, 500),
    [onSearch],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setInput('');
    onSearch('');
  };

  return (
    <div className="flex items-center bg-white rounded-lg border border-input-border">
      <Input
        type={type}
        placeholder={placeholder}
        value={input}
        onChange={handleChange}
        className="h-10 w-full border-none px-3 placeholder:text-input-placeholder"
      />
      {input ? <X className="mx-4 cursor-pointer" onClick={clearSearch} /> : <Search className="mx-4" />}
    </div>
  );
};

export default DebouncedSearchInput;
