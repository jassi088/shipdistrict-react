import { FieldValues, FieldPath, Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import cn from '@/utils/cn';
import { Typography } from '../../common/typography';

/**
 * Type for items displayed in the dropdown list.
 */
type Item = Record<'value' | 'label', string>;

/**
 * Props for the SelectField component.
 */
type SelectFieldProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
  /**
   * Name of the field in react-hook-form.
   */
  name: TFieldName;
  /**
   * Control object from react-hook-form.
   */
  control: Control<TFieldValues>;
  /**
   * Label for the select field.
   */
  label?: string;
  /**
   * Array of items to be displayed in the dropdown list.
   */
  options: Item[];
  /**
   * Placeholder text displayed in the input field when it's empty.
   */
  placeholder: string;
  /**
   * Boolean value indicating whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Source path value for the icon.
   */
  iconPath?: string;
  onChange?: (value: string) => void;
};

/**
 * A reusable component representing a select input.
 * @param {SelectFieldProps} props - The props for the SelectField component.
 * @returns {JSX.Element} A JSX element representing the SelectField component.
 */
const SelectField = <TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>({
  name,
  control,
  label,
  options = [],
  placeholder,
  disabled,
  iconPath,
  onChange,
}: SelectFieldProps<TFieldValues, TFieldName>): JSX.Element => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (typeof onChange === 'function') {
                onChange(value);
              }
            }}
            defaultValue={field.value}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger disabled={disabled} className={cn(!field.value && '')}>
                <div className="flex items-center">
                  {iconPath && <img src={iconPath} className="mr-2 size-5" />}
                  <SelectValue placeholder={placeholder} />
                </div>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.length > 0 ? (
                options.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))
              ) : (
                <Typography variant="small">No item found</Typography>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
