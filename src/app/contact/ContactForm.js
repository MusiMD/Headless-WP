'use client';
import { useState, useEffect, useRef } from 'react';
import { handleFormSubmission } from '@/lib/formHandler'; // Import reusable form handler

const ContactFormHandler = ({ formId }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef(null); // Ref to access the form element directly

  // Success callback after form submission
  const onSuccess = (data) => {
    setSuccessMessage('Message sent successfully!');
    setErrorMessage(''); // Clear any existing error messages

    // Clear form fields
    if (formRef.current) {
      formRef.current.reset();
    }

    // Optionally hide the success message after a few seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Hide after 5 seconds
  };

  // Error callback if form submission fails
  const onError = (error) => {
    setErrorMessage('Failed to send message. Please check the fields and try again.');
    setSuccessMessage(''); // Clear any existing success messages
  };

  useEffect(() => {
    const form = document.querySelector('form.wpcf7-form'); // Select the form dynamically rendered by WordPress
    formRef.current = form; // Set the form ref

    const handleSubmission = (e) => handleFormSubmission(e, formId, onSuccess, onError); // Define the handler

    if (form) {
      form.addEventListener('submit', handleSubmission); // Attach the handler
    }

    // Cleanup event listener on unmount
    return () => {
      if (form) {
        form.removeEventListener('submit', handleSubmission); // Remove the same handler
      }
    };
  }, [formId]);

  return (
    <>
      <div className="container max-w-6xl mx-auto flex justify-center items-center">
        {successMessage && (
          <div className="text-green-600 border border-green-600 px-3 py-2 mt-[-70px] mb-[60px] w-[460px]">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-600 border border-red-600 px-3 py-2 mt-[-70px] mb-[60px] w-[460px]">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default ContactFormHandler;
