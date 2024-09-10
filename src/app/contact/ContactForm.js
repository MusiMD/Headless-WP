'use client';
import { useState, useEffect, useRef } from 'react';
import { handleFormSubmission } from '@/lib/formHandler';

const ContactFormHandler = ({ formId }) => {

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef(null); 

  const onSuccess = (data) => {
    setSuccessMessage('Message sent successfully!');
    setErrorMessage(''); 


    if (formRef.current) {
      formRef.current.reset();
    }

  
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };


  const onError = (error) => {
    setErrorMessage('Failed to send message. Please check the fields.');
    setSuccessMessage(''); 
  };

  useEffect(() => {
    const form = document.querySelector('form.wpcf7-form');
    formRef.current = form; 

    const handleSubmission = (e) => handleFormSubmission(e, formId, onSuccess, onError); 

    if (form) {
      form.addEventListener('submit', handleSubmission); 
    }

    
    return () => {
      if (form) {
        form.removeEventListener('submit', handleSubmission); 
      }
    };
  }, [formId]);

  return (
    <>
      <div className="container max-w-6xl mx-auto flex justify-center items-center">
        {successMessage && (
          <div className="text-green-600 border border-green-600 px-3 py-2 mt-5 w-[455px]">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-600 border border-red-600 px-3 py-2  mt-5 w-[455px]">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default ContactFormHandler;
