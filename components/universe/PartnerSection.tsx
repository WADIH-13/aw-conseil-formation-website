'use client';

import { useState } from 'react';
import { universeCopy } from '@/lib/universe/copy';

export function PartnerSection() {
  const [formData, setFormData] = useState({
    name: '',
    expertise: '',
    area: '',
    website: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/universe/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', expertise: '', area: '', website: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {universeCopy.partner.title}
          </h2>
          <p className="text-lg text-gray-700 mb-2">{universeCopy.partner.subtitle}</p>
          <p className="text-gray-600">{universeCopy.partner.description}</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {universeCopy.partner.name}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red"
              />
            </div>

            {/* Expertise */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {universeCopy.partner.expertise}
              </label>
              <input
                type="text"
                required
                value={formData.expertise}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red"
                placeholder="ex: Coaching d'équipe, Facilitation ..."
              />
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {universeCopy.partner.area}
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red"
                placeholder="ex: Ile-de-France, Toute la France ..."
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {universeCopy.partner.website}
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red"
                placeholder="https://..."
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {universeCopy.partner.message}
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red resize-none"
                rows={4}
                placeholder="Parlez-nous de vous..."
              />
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                {universeCopy.partner.success}
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {universeCopy.partner.error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-aw-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Envoi...' : universeCopy.partner.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
