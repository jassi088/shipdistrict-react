import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import cn from '@/utils/cn';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { FieldValues, Control, FieldPath, ControllerRenderProps, ControllerFieldState } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import TextField from '@/components/form/text-field';
import { Typography } from '@/components/common/typography';

type Item = Record<'value' | 'label', string>;

/**
 * Props for the Search Select component.
 */
type SearchSelectProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
  /**
   * Name of the field in react-hook-form.
   */
  name: TFieldName;
  /**
   * Control object from react-hook-form.
   */
  control: Control<TFieldValues>;
  /**
   * Label for the input.
   */
  label?: string;
  /**
   * Placeholder text displayed in the input field when it's empty.
   */
  placeholder: string;
  /**
   * An array of items to be displayed in the dropdown list.
   */
  items: Item[];
  /**
   * Boolean value indicating whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Callback triggered on value change.
   */
  onChange?: (value: string) => void;
  /**
   * Can use input field when no option found.
   */
  inputable?: boolean;
};

/**
 * A component representing a searchable select input.
 * @param {SearchSelectProps} props - The props for the SearchSelect component.
 * @returns {JSX.Element} A JSX element representing the SearchSelect component.
 */
const SearchSelect = <TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>({
  name,
  control,
  label,
  placeholder,
  items,
  disabled,
  onChange,
  inputable,
}: SearchSelectProps<TFieldValues, TFieldName>): JSX.Element => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const getPopoverWidth = () => {
    if (buttonRef.current) {
      return buttonRef.current.offsetWidth;
    }
    return 'auto';
  };

  const renderDropdown = (field: ControllerRenderProps<TFieldValues, TFieldName>, fieldState: ControllerFieldState) => (
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
                !field.value && '',
              )}
            >
              {field.value ? (
                items.find((option) => option.value === field.value)?.label
              ) : (
                <Typography variant="small" className="text-input-placeholder">
                  {placeholder}
                </Typography>
              )}
              <ChevronDownIcon
                className={cn('size-4 shrink-0', field.value ? 'text-current' : 'text-input-placeholder')}
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
                    onSelect={(currentValue) => {
                      if (typeof onChange === 'function') {
                        onChange(currentValue);
                      }
                      field.onChange(currentValue);
                      setOpen(false);
                    }}
                    className="text-xs"
                  >
                    {option.label}
                    <CheckIcon
                      className={cn('ml-auto h-4 w-4', field.value === option.value ? 'opacity-100' : 'opacity-0')}
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

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <>
            {inputable ? (
              items.length > 0 ? (
                <>{renderDropdown(field, fieldState)}</>
              ) : (
                <TextField
                  control={control}
                  name={name}
                  label={label}
                  placeholder={placeholder.replace('Select', 'Enter')}
                  disabled={disabled}
                />
              )
            ) : (
              <>{renderDropdown(field, fieldState)}</>
            )}
          </>
        );
      }}
    />
  );
};

export default SearchSelect;
