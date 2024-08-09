const revalidatePage = async (slug) => {
  const response = await fetch('/api/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug }),
  });

  const data = await response.json();
  if (response.ok) {
    console.log('Page revalidated:', data.message);
  } else {
    console.error('Error revalidating page:', data.message);
  }
};

