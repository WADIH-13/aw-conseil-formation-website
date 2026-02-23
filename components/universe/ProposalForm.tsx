'use client';

import { useState } from 'react';
import { universeCopy } from '@/lib/universe/copy';

interface ProposalFormProps {
  cartId: string;
  onSuccess?: () => void;
}

export function ProposalForm({ cartId, onSuccess }: ProposalFormProps) {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    role: '',
    headcount: '',
    activity: '',
    priority: '',
    message: '',
    consent_marketing: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/universe/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart_id: cartId, ...formData }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          company_name: '',
          contact_name: '',
          email: '',
          role: '',
          headcount: '',
          activity: '',
          priority: '',
          message: '',
          consent_marketing: false,
        });
        onSuccess?.();
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
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      {/* Company */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {universeCopy.proposal.company}
        </label>
        <input
          type="text"
          required
          value={formData.company_name}
          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-aw-red"
        />
      </div>

      {/* Contact Name */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {universeCopy.proposal.contact}
        </label>
        <input
          type="text"
          required
          value={formData.contact_name}
          onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-aw-red"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {universeCopy.proposal.email}
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-aw-red"
        />
      </div>

      {/* Headcount */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {universeCopy.proposal.headcount}
        </label>
        <select
          value={formData.headcount}
          onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-aw-red"
        >
          <option value="">Sélectionner...</option>
          {Object.entries(universeCopy.proposal.headcounts).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {universeCopy.proposal.priority}
        </label>
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-aw-red"
        >
          <option value="">Sélectionner...</option>
          {Object.entries(universeCopy.proposal.priorities).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Consent */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.consent_marketing}
          onChange={(e) => setFormData({ ...formData, consent_marketing: e.target.checked })}
          className="mt-1"
        />
        <span className="text-xs text-gray-600">{universeCopy.proposal.marketingConsent}</span>
      </label>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-xs">
          {universeCopy.proposal.success}
        </div>
      )}
      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs">
          {universeCopy.proposal.error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-3 py-2 bg-aw-red text-white font-medium rounded-lg text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Envoi...' : universeCopy.proposal.submit}
      </button>
    </form>
  );
}
