document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shorten-form');
    const urlInput = document.getElementById('url-input');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');
    const shortUrlEl = document.getElementById('short-url');
    const copyBtn = document.getElementById('copy-btn');
    const errorEl = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const targetUrl = urlInput.value.trim();
        
        if (!targetUrl) return;

        // Reset UI
        errorEl.classList.add('hidden');
        resultContainer.classList.add('hidden');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Shortening...';

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ target_url: targetUrl }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Failed to shorten URL');
            }

            // Show result
            const currentHost = window.location.origin;
            const fullShortUrl = `${currentHost}/${data.short_code}`;
            shortUrlEl.href = fullShortUrl;
            shortUrlEl.textContent = fullShortUrl;
            resultContainer.classList.remove('hidden');
            
            // Clear input
            urlInput.value = '';

        } catch (error) {
            errorEl.textContent = error.message;
            errorEl.classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Shorten';
        }
    });

    copyBtn.addEventListener('click', () => {
        const urlToCopy = shortUrlEl.textContent;
        navigator.clipboard.writeText(urlToCopy).then(() => {
            const originalIcon = copyBtn.innerHTML;
            // Show checkmark icon temporarily
            copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            copyBtn.style.color = 'var(--success)';
            copyBtn.style.borderColor = 'var(--success)';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                copyBtn.style.color = '';
                copyBtn.style.borderColor = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});
