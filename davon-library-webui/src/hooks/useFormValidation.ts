import { useState, useCallback } from 'react';

interface ValidationRules {
  [key: string]: (value: string) => string | undefined;  // DRY PRINCIPLE
}

export const useFormValidation = (initialValues: any, validationRules: ValidationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // HANDLE CHANGE
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setValues((prevValues: typeof initialValues) => ({
      ...prevValues,
      [name]: value
    }));

    if (touched[name]) {
      const error = validationRules[name]?.(value);
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error || ''
      }));
    }
  }, [touched, validationRules]);

  // HANDLE BLUR
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));

    const error = validationRules[name]?.(values[name]);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error || ''
    }));
  }, [values, validationRules]);

  // VALIDATE FORM
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    Object.keys(validationRules).forEach(fieldName => {
      const error = validationRules[fieldName]?.(values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationRules]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setValues
  };
}; 