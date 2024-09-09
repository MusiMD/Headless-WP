// lib/formHandler.js

export const handleFormSubmission = (e, formId, successCallback, errorCallback) => {
  e.preventDefault(); // Prevent default form submission behavior

  const form = e.target;
  const formData = new FormData(form);

  // Use the form ID to dynamically send the request to the correct endpoint
  fetch(
    `https://dev-headlessdev.pantheonsite.io/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
    {
      method: 'POST',
      body: formData,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'mail_sent') {
        if (typeof successCallback === 'function') {
          successCallback(data);
        } else {
          alert('Message sent successfully!');
        }
      } else {
        if (typeof errorCallback === 'function') {
          errorCallback(data);
        } else {
          alert('Failed to send message. Please try again.');
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      if (typeof errorCallback === 'function') {
        errorCallback(error);
      } else {
        alert('Error submitting form.');
      }
    });
};
