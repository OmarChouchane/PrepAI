import React from 'react'
import { FormItem, FormControl, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Controller, FieldValues, Control, Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} 
          type={type}
          {...field} />
        </FormControl>
        <FormDescription>{`This is your public display ${name}.`}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField
