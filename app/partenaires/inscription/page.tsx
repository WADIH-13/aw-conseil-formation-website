'use client';

import { useState } from 'react';

export default function PartenaireInscriptionPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/partners/submit', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMessage(body.error || 'Une erreur est survenue.');
        setStatus('error');
        return;
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Une erreur est survenue.');
    }
  };

  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-wide text-aw-red font-semibold mb-4">
              Partenaires
            </p>
            <h1 className="text-3xl md:text-4xl font-light text-black mb-4">
              Demande de fiche partenaire
            </h1>
            <p className="text-gray-700 leading-relaxed">
              Ce formulaire permet de créer une fiche publique de présentation. Les informations
              transmises seront publiées sur le site.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Nom / raison sociale *</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Courte description *</label>
                <textarea
                  name="short"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Logo (PNG, JPG, SVG) *</label>
                  <input name="logo" type="file" accept="image/*" required className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Photo (JPG, PNG, WEBP) *</label>
                  <input name="photo" type="file" accept="image/*" required className="w-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Site web</label>
                  <input
                    name="website"
                    type="url"
                    placeholder="https://"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Telephone</label>
                  <input
                    name="phone"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Zone d'intervention</label>
                  <input
                    name="area"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red"
                  />
                </div>
              </div>

              {status === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                  Merci, votre demande a été envoyée.
                  <div className="mt-3">
                    <a
                      href="/partenaires"
                      className="inline-flex items-center text-sm font-medium text-aw-red hover:underline"
                    >
                      Voir la liste des partenaires
                    </a>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-3 bg-aw-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Envoi...' : 'Envoyer la demande'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
