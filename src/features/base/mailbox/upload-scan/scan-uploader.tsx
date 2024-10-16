import React, { useState, useRef } from 'react';
import { FieldValues, FieldPath, Control, ControllerRenderProps } from 'react-hook-form';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/common/typography';

/**
 * Props for the ScanUploader component.
 */
type ScanUploaderProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
  /**
   * Name of the field in react-hook-form.
   */
  name: TFieldName;
  /**
   * Control object from react-hook-form.
   */
  control: Control<TFieldValues>;
  /**
   * Label for the upload field.
   */
  label?: string;
  /**
   * Boolean value indicating whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Placeholder text for the upload field.
   */
  placeholder?: string;
};

/**
 * A reusable component for uploading scan files (PDF, JPEG, PNG).
 * @param {ScanUploaderProps} props - The props for the ScanUploader component.
 * @returns {JSX.Element} A JSX element representing the ScanUploader component.
 */
const ScanUploader = <TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>({
  name,
  control,
  label,
  disabled,
  placeholder = 'Upload PDF, JPEG, or PNG files',
}: ScanUploaderProps<TFieldValues, TFieldName>): JSX.Element => {
  // State to hold uploaded files
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the file input

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TFieldValues, TFieldName>,
  ) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files).filter((file) => {
        // Allow only specific file types
        return (
          file.type === 'application/pdf' || file.type.startsWith('image/jpeg') || file.type.startsWith('image/png')
        );
      });

      // Check for duplicates
      const existingFileNames = uploadedFiles.map((file) => file.name);
      const duplicateFiles = selectedFiles.filter((file) => existingFileNames.includes(file.name));

      if (duplicateFiles.length > 0) {
        // Show error toast for duplicates
        toast.error('Some files are already selected. Please choose different files.');
        return;
      }

      // Update the uploaded files state
      setUploadedFiles((prev) => [...prev, ...selectedFiles]);
      field.onChange([...field.value, ...selectedFiles]); // Pass selected files to the react-hook-form
    }
  };

  // Remove a file from the uploaded list
  const handleRemoveFile = (fileToRemove: File, field: ControllerRenderProps<TFieldValues, TFieldName>) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.name !== fileToRemove.name);

      // Update the field in react-hook-form with the new file list
      field.onChange(updatedFiles); // Pass updated files to react-hook-form

      return updatedFiles;
    });
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="flex items-center">
              <input
                type="file"
                accept=".pdf, .jpeg, .jpg, .png"
                multiple
                onChange={(e) => handleFileChange(e, field)}
                className="hidden"
                id={name}
                ref={fileInputRef} // Attach ref to the input
              />
              <Button
                type="button"
                onClick={handleButtonClick} // Trigger file input on button click
                disabled={disabled}
                className="w-full h-10 flex items-center justify-center rounded-lg"
              >
                {placeholder}
              </Button>
            </div>
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>

          {/* List of uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="pt-6">
              <Typography variant="body-small" className="font-medium">
                Selected labels:
              </Typography>
              <ul className="list-item">
                {uploadedFiles.map((file) => (
                  <li key={file.name} className="flex items-center gap-x-2">
                    <Typography variant="small">{file.name}</Typography>
                    <X onClick={() => handleRemoveFile(file, field)} className="text-primary size-4 mt-0.5" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default ScanUploader;
