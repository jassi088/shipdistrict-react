import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import cn from '@/utils/cn';
import { Typography } from '@/components/common/typography';
import YearCalender from '@/components/ui/year-calender';

interface YearPickerProps {
  initialState?: number;
  callback: (year?: number) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({ initialState, callback }) => {
  const [year, setYear] = useState<number | undefined>(initialState);
  const [open, setOpen] = useState<boolean>(false);

  const handleYearChange = (year?: number) => {
    setYear(year);
    setOpen(false);
    callback(year);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'h-10 flex gap-x-4 w-auto text-current bg-white px-4 text-left font-normal rounded-lg border-input-border',
          )}
        >
          {year ? (
            <Typography variant="body-small">{year}</Typography>
          ) : (
            <Typography variant="body-small" className="text-input-placeholder">
              Pick a year
            </Typography>
          )}
          <CalendarDays className="size-4 text-current" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <YearCalender
          selectedYear={year}
          onSelect={handleYearChange}
          minYear={1900}
          maxYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  );
};

export default YearPicker;
