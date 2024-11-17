fetch('http://localhost:3000/api/submitForm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      isbn: '123',
      title: 'Test Title',
      author: 'Test Author',
      tags: ['Tag1'],
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log('Response:', data))
    .catch((error) => console.error('Error:', error));
  