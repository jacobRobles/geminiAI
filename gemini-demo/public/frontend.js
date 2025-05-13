document.getElementById('sendBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value.trim();
    const responseContainer = document.getElementById('response');
  
    responseContainer.innerHTML = '💬 Thinking...';
  
    try {
      const res = await fetch('/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: userInput })
      });
  
      const data = await res.json();
      const markdown = data.response;
  
      // Basic formatting replacements
      const html = markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        .replace(/`(.*?)`/gim, '<code>$1</code>')
        .replace(/\n/g, '<br>');
  
      responseContainer.innerHTML = html;
    } catch (error) {
      console.error('Error:', error);
      responseContainer.textContent = '⚠️ Something went wrong: ' + error.message;
    }
  });
  