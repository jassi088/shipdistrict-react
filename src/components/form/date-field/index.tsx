import React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarDays, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Typography } from '@/components/common/typography';
import cn from '@/utils/cn';
import { dateUtil } from '@/utils/date';

interface DateFieldProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> {
  /** The name of the date field, used for form identification. */
  name: TFieldName;

  /** The control object from React Hook Form for managing form state. */
  control: Control<TFieldValues>;

  /** An optional label for the date input field. */
  label?: string;

  /** An optional flag to disable the date input field. */
  disabled?: boolean;
}

/**
 * A component that renders a date picker input field, allowing users to select a date.
 *
 * The component displays a button to trigger the date picker popover. When a date is selected,
 * it updates the form state. The user can also clear the selected date.
 *
 * @param {DateFieldProps<TFieldValues, TFieldName>} props - The props for the DateField component.
 * @returns {JSX.Element} A JSX element representing the DateField component.
 */
const DateField = <TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>({
  name,
  control,
  label,
  disabled,
}: DateFieldProps<TFieldValues, TFieldName>): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleDateSelect = (selectedDate: Date | undefined) => {
          field.onChange(selectedDate);
          setOpen(false);
        };

        const handleClearDate = () => {
          field.onChange('');
          setOpen(false);
        };
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    'h-10 flex gap-x-4 w-full text-current bg-white px-4 text-left rounded-lg border-input-border',
                    disabled && 'opacity-70',
                  )}
                >
                  {field.value ? (
                    <div className="flex items-center gap-x-2">
                      <X
                        className="size-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClearDate();
                        }}
                      />
                      <Typography variant="small">
                        {dateUtil(field.value).format('dd/MM/yyyy')}
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
                  selected={field.value}
                  onSelect={handleDateSelect}
                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default DateField;
