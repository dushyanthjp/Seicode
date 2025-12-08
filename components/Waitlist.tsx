import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Google Apps Script Web App URL - Replace with your deployed script URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzLoNfyBYoXE90d9dW6hw-ROTF8J394SXlTwP5dr1TPIkI6KJ3mD856k_nGqSv7ntsmfg/exec';
      
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          timestamp: new Date().toISOString()
        })
      });

      setSubmitted(true);
      setEmail('');
      setName('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-app-bg text-app-text flex items-center justify-center p-4">
      <div style={{ zoom: '0.7' }}>
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <img 
            src="/images/logo.png" 
            alt="Sei Logo" 
            className="w-16 h-16 mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Sei IDE
          </h1>
          <p className="text-xl md:text-2xl text-app-textSecondary mb-4">
            Code in Tamil. Think in Tanglish.
          </p>
          <p className="text-app-textMuted">
            We're launching soon. Join the waitlist to get early access.
          </p>
        </div>

        <div className="bg-app-surface border border-app-border rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-app-textSecondary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-app-bg border border-app-border rounded-lg text-app-text placeholder-app-textMuted focus:outline-none focus:border-app-text transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-app-textSecondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-app-bg border border-app-border rounded-lg text-app-text placeholder-app-textMuted focus:outline-none focus:border-app-text transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-app-text text-app-bg font-bold rounded-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail className="w-5 h-5" />
                {loading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
              <p className="text-app-textSecondary">
                We'll notify you when Sei IDE launches.
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-12 text-app-textMuted text-sm">
          <p>Built by <span className="text-app-textSecondary">Dushyanth</span></p>
        </div>
      </div>
      </div>
    </div>
  );
};
