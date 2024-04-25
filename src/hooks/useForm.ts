import { useEffect, useState } from "react";

export const useForm = (initialForm: any) => {
  const [formState, setFormState] = useState(initialForm);

  const onIputChange = ({ target }: any) => {
    const { value, name } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };
  return { formState, onIputChange, onResetForm };
};
