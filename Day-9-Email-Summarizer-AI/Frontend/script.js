class EmailSummarizer {
    constructor() {
        this.apiUrl = 'http://localhost:3000';
        this.init();
    }

    init() {
        document.getElementById('summarizeBtn').addEventListener('click', () => this.summarize());
        document.getElementById('copyBtn').addEventListener('click', () => this.copySummary());
        document.getElementById('newBtn').addEventListener('click', () => this.reset());
    }

    async summarize() {
        const email = document.getElementById('emailText').value;
        const maxLength = document.getElementById('maxLength').value;
        const btn = document.getElementById('summarizeBtn');

        if (!email.trim()) {
            alert('Lütfen e-posta metni girin!');
            return;
        }

        btn.textContent = 'Özetleniyor...';
        btn.disabled = true;

        try {
            const response = await fetch(`${this.apiUrl}/api/summarize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, maxLength: parseInt(maxLength) })
            });

            const data = await response.json();
            
            if (response.ok) {
                this.showResult(data.summary);
            } else {
                alert('Hata: ' + (data.error || 'Bilinmeyen hata'));
            }
        } catch (error) {
            alert('Backend bağlantı hatası! Backend çalışıyor mu?');
        } finally {
            btn.textContent = 'Özetle';
            btn.disabled = false;
        }
    }

    showResult(summary) {
        document.getElementById('summaryContent').textContent = summary;
        document.getElementById('resultSection').style.display = 'block';
    }

    copySummary() {
        const summary = document.getElementById('summaryContent').textContent;
        navigator.clipboard.writeText(summary);
        alert('Özet kopyalandı!');
    }

    reset() {
        document.getElementById('emailText').value = '';
        document.getElementById('resultSection').style.display = 'none';
    }
}

// Uygulamayı başlat
new EmailSummarizer();