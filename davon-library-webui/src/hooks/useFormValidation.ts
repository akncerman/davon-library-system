import { useState, useCallback } from 'react';

interface ValidationRules {
  [key: string]: (value: string) => string | undefined;
}

export const useFormValidation = (initialValues: any, validationRules: ValidationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev: typeof initialValues) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validationRules[name]?.(value);
      setErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  }, [touched, validationRules]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validationRules[name]?.(values[name]);
    setErrors(prev => ({ ...prev, [name]: error || '' }));
  }, [values, validationRules]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    Object.keys(validationRules).forEach(key => {
      const error = validationRules[key]?.(values[key]);
      if (error) newErrors[key] = error;
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