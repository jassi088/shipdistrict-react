import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import cn from '@/utils/cn';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { FieldValues, Control, FieldPath, ControllerRenderProps } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Typography } from '@/components/common/typography';

type Item = Record<'value' | 'label', string>;

type MultiSelectProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
  name: TFieldName;
  control: Control<TFieldValues>;
  label?: string;
  placeholder: string;
  items: Item[];
  disabled?: boolean;
  onChange?: (value: string[]) => void;
  inputable?: boolean;
};

const MultiSelect = <TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>({
  name,
  control,
  label,
  placeholder,
  items,
  disabled,
  onChange,
}: MultiSelectProps<TFieldValues, TFieldName>): JSX.Element => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const getPopoverWidth = () => {
    if (buttonRef.current) {
      return buttonRef.current.offsetWidth;
    }
    return 'auto';
  };

  const handleSelectOption = (
    value: string,
    selectedValues: string[],
    field: ControllerRenderProps<TFieldValues, TFieldName>,
  ) => {
    const newValue = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
    field.onChange(newValue);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    ref={buttonRef}
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    className={cn(
                      'text-current w-full justify-between rounded-lg h-10 px-4 border border-input-border',
                      field.value.length === 0 && '', // Empty state
                    )}
                  >
                    {field.value.length > 0 ? (
                      items
                        .filter((option) => field.value.includes(option.value))
                        .map((option) => option.label)
                        .join(', ') // Display selected options
                    ) : (
                      <Typography variant="small" className="text-input-placeholder">
                        {placeholder}
                      </Typography>
                    )}
                    <ChevronDownIcon
                      className={cn(
                        'size-4 shrink-0',
                        field.value.length > 0 ? 'text-current' : 'text-input-placeholder',
                      )}
                    />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <FormMessage>{fieldState.error?.message}</FormMessage>
              <PopoverContent className="p-0 box-shadow" style={{ width: getPopoverWidth() }}>
                {items.length > 0 ? (
                  <Command>
                    <CommandInput placeholder="Search..." className="h-9 text-xs" />
                    <CommandEmpty>No {name} found.</CommandEmpty>
                    <CommandGroup className="max-h-60 overflow-y-scroll no-scrollbar">
                      {items.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => handleSelectOption(option.value, field.value, field)}
                          className="text-xs"
                        >
                          {option.label}
                          <CheckIcon
                            className={cn(
                              'ml-auto h-4 w-4',
                              field.value.includes(option.value) ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                ) : (
                  <div className="py-6 text-center text-sm">
                    <Typography variant="small">No {name} found.</Typography>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </FormItem>
        );
      }}
    />
  );
};

export default MultiSelect;
