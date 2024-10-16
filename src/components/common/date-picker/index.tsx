import React, { useState } from 'react';
import { X, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Typography } from '@/components/common/typography';
import cn from '@/utils/cn';
import { dateUtil } from '@/utils/date';

interface DatepickerProps {
  initialState?: Date;
  callback: (date?: Date) => void;
}

const Datepicker: React.FC<DatepickerProps> = ({ initialState, callback }) => {
  const [date, setDate] = useState<Date | undefined>(initialState);
  const [open, setOpen] = useState<boolean>(false);

  const handleDateSelect = (date?: Date) => {
    setDate(date);
    setOpen(false);
    callback(date);
  };

  const handleClearDate = () => {
    setDate(undefined);
    setOpen(false);
    callback(undefined);
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
          {date ? (
            <div className="flex items-center gap-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearDate();
                }}
              >
                <X className="size-4" />
              </button>
              <Typography variant="small">
                {dateUtil(date).format('dd/MM/yyyy')}
              </Typography>
            </div>
          ) : (
            <Typography variant="small" className="text-input-placeholder">
              Pick a date
            </Typography>
          )}
          <CalendarDays className="ml-auto size-4 text-current" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default Datepicker;
