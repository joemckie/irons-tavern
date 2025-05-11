import { KeyboardEventHandler } from 'react';

export const disableEnterSubmission: KeyboardEventHandler<HTMLInputElement> = (
  e,
) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};
