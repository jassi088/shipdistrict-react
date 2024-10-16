import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cn from '@/utils/cn';
import { buttonVariants } from '@/components/ui/button';

type YearPickerProps = {
  selectedYear?: number;
  onSelect: (year: number) => void;
  minYear?: number;
  maxYear?: number;
  className?: string;
};

const getYearsInRange = (startYear: number, endYear: number) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};

export function YearCalender({
  selectedYear,
  onSelect,
  minYear = 1900,
  maxYear = new Date().getFullYear(),
  className,
}: YearPickerProps) {
  const [currentDecade, setCurrentDecade] = React.useState(
    (Math.floor(selectedYear || new Date().getFullYear()) / 10) * 10,
  );

  const years = getYearsInRange(currentDecade, currentDecade + 9);

  const handlePreviousDecade = () => {
    setCurrentDecade(currentDecade - 10);
  };

  const handleNextDecade = () => {
    setCurrentDecade(currentDecade + 10);
  };

  return (
    <div className={cn('p-3', className)}>
      <div className="flex justify-center items-center space-x-4 mb-4">
        <button
          onClick={handlePreviousDecade}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">
          {currentDecade} - {currentDecade + 9}
        </span>
        <button
          onClick={handleNextDecade}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelect(year)}
            disabled={year > maxYear || year < minYear}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'w-12 h-12 flex items-center justify-center rounded-full',
              {
                'bg-primary text-white': selectedYear === year,
                'text-muted-foreground': year > maxYear || year < minYear,
                'hover:bg-primary hover:text-white': year <= maxYear && year >= minYear,
              },
            )}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}

YearCalender.displayName = 'YearCalender';

export default YearCalender;
