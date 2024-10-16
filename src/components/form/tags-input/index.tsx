import { useRef, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { FieldValues, Control, FieldPath, ControllerRenderProps } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import cn from '@/utils/cn';
import toast from 'react-hot-toast';

type TagsInputProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
  /**
   * The name of the input field, used for form identification and data handling.
   */
  name: TFieldName;

  /**
   * The control object from React Hook Form, used for managing form state and validation.
   */
  control: Control<TFieldValues>;

  /**
   * An optional label for the input field, providing context to the user.
   */
  label?: string;

  /**
   * The placeholder text displayed in the input field when it's empty, guiding the user on expected input.
   */
  placeholder: string;

  /**
   * An optional flag to disable the input field, preventing user interactions when set to true.
   */
  disabled?: boolean;
};

/**
 * A component representing a input that allows users to add and remove tags.
 *
 * This component supports keyboard interactions for adding tags via the Enter or comma keys,
 * and removing tags using the Backspace key. It prevents the addition of duplicate tags
 * and provides user feedback through error messages when necessary.
 *
 * @param {TagsInputProps<TFieldValues, TFieldName>} props - The props for the TagsInput component.
 * @returns {JSX.Element} A JSX element representing the TagsInput component.
 */
const TagsInput = <TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>({
  name,
  control,
  label,
  placeholder,
  disabled,
}: TagsInputProps<TFieldValues, TFieldName>): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(''); // Keep input state

  // Handle unselecting a tag
  const handleUnselect = useCallback((value: string, field: ControllerRenderProps<TFieldValues, TFieldName>) => {
    const newValues = field.value.filter((val: string) => val !== value);
    field.onChange(newValues); // Update field value after removal
  }, []);

  // Handle adding new tags with "Enter" key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, field: ControllerRenderProps<TFieldValues, TFieldName>) => {
      const input = inputRef.current;
      if (input && (e.key === 'Enter' || e.key === ',')) {
        e.preventDefault(); // Prevent form submission or default behavior

        const trimmedValue = inputValue.trim();

        if (field.value.includes(trimmedValue)) {
          return toast.error(`The tag "${trimmedValue}" has already been added.`);
        }

        if (trimmedValue && !field.value.includes(trimmedValue)) {
          const newSelected = [...field.value, trimmedValue]; // Add new tag
          field.onChange(newSelected); // Update form state
          setInputValue(''); // Clear the input field after adding
        }
      } else if (e.key === 'Backspace' && !inputValue) {
        if (field.value.length > 0) {
          const newSelected = [...field.value];
          newSelected.pop(); // Remove the last item
          field.onChange(newSelected); // Update form state
        }
      }
    },
    [inputValue], // Depend on the current inputValue
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div
            className={cn(
              'flex min-h-10 w-full items-center justify-between rounded-lg border border-input-border bg-white px-3 py-2 text-xs',
              disabled && 'opacity-50',
            )}
          >
            <div className="w-full flex items-center gap-1 flex-wrap">
              {/* Render selected tags as badges */}
              {field.value.map((selectedValue: string) => (
                <Badge key={selectedValue} variant="outline">
                  {selectedValue}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(selectedValue, field);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(selectedValue, field)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {/* Input for adding new tags */}
              <FormControl>
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)} // Update input state
                  onKeyDown={(e) => handleKeyDown(e, field)} // Handle tag addition
                  disabled={disabled}
                  placeholder={placeholder}
                  className={cn('w-full bg-transparent outline-none placeholder:text-muted-foreground flex-1')}
                />
              </FormControl>
            </div>
          </div>

          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default TagsInput;
