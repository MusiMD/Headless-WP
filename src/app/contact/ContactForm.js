'use client';

import { useEffect } from 'react';
import { handleFormSubmission } from '@/lib/formHandler'; // Import reusable form handler

const ContactFormHandler = ({ formId }) => {
  // Success callback after form submission
  const onSuccess = (data) => {
    alert('Message sent successfully!');
  };

  // Error callback if form submission fails
  const onError = (error) => {
    alert('Failed to send message. Please try again.');
  };

  // useEffect hook to handle form submission with event listeners
  useEffect(() => {
    const form = document.querySelector('form.wpcf7-form'); // Select the form dynamically rendered by WordPress
    if (form) {
      form.addEventListener('submit', (e) =>
        handleFormSubmission(e, formId, onSuccess, onError) // Attach the handler
      );
    }

    // Cleanup event listener on unmount
    return () => {
      if (form) {
        form.removeEventListener('submit', handleFormSubmission);
      }
    };
  }, [formId]);

  return null; // This component does not render anything visually, it only handles the form submission
};

export default ContactFormHandler;
