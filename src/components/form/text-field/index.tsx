import React, { InputHTMLAttributes } from 'react';
import { FieldValues, FieldPath, Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import cn from '@/utils/cn';

/**
 * Props for the TextField component.
 */
type TextFieldProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
  /**
   * Name of the field in react-hook-form.
   */
  name: TFieldName;
  /**
   * Control object from react-hook-form.
   */
  control: Control<TFieldValues>;
  /**
   * Label for the input field.
   */
  label?: string;
  /**
   * Placeholder text for the input field.
   */
  placeholder: string;
  /**
   * Type of input (e.g. text, email, password, etc.).
   */
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  /**
   * Boolean value indicating whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Source path value for the icon.
   */
  iconPath?: string;
};

/**
 * A reusable component representing a text input field.
 * @param {TextFieldProps} props - The props for the TextField component.
 * @returns {JSX.Element} A JSX element representing the TextField component.
 */
const TextField = <TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  disabled,
  iconPath,
}: TextFieldProps<TFieldValues, TFieldName>): JSX.Element => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div
            className={cn(
              'h-10 flex items-center bg-white border border-input-border rounded-lg',
              iconPath ? 'px-4' : 'px-4',
              disabled && 'opacity-70',
            )}
          >
            {iconPath && (
              <div className="pr-2">
                <img src={iconPath} alt={`${label} icon`} className="size-6" />
              </div>
            )}
            <FormControl className="w-full">
              <Input {...field} type={type} placeholder={placeholder} disabled={disabled} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
