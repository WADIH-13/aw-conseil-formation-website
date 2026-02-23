'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { AidDialog } from '@/components/AidDialog';

export default function ContributionProfilPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [codeValidated, setCodeValidated] = useState(false);
  const [codeFeedback, setCodeFeedback] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);
  const [aidOpen, setAidOpen] = useState<'bio' | 'intentions' | 'closing' | null>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);

  const handleCodeChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.trim();
    
    if (!code) {
      setCodeValidated(false);
      setCodeFeedback('');
      return;
    }

    setCodeLoading(true);
    setCodeFeedback('');

    try {
      const res = await fetch('/api/admin/invitations/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const body = await res.json();

      if (res.ok && body.valid) {
        setCodeValidated(true);
        setCodeFeedback('');
      } else {
        setCodeValidated(false);
        setCodeFeedback(body.error || 'Code invalide ou expiré');
      }
    } catch (err) {
      console.error(err);
      setCodeValidated(false);
      setCodeFeedback('Erreur lors de la vérification du code');
    } finally {
      setCodeLoading(false);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch('/api/formators/submit', {
        method: 'POST',
        body: formData,
      });

      const body = await res.json();

      if (!res.ok) {
        setErrorMessage(body.error || 'Une erreur est survenue.');
        setStatus('error');
        return;
      }

      setStatus('success');
      event.currentTarget.reset();
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Une erreur est survenue lors de la soumission.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-5xl mx-auto px-8 py-5 flex items-center">
          <Link 
            href="/avancent-avec-aw" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Retour
          </Link>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-8 py-20">
        {/* Hero Section */}
        <div className="space-y-12 mb-20">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-light text-gray-900 leading-tight">
              Proposer<br />
              <span className="text-aw-red">votre profil</span>
            </h1>
            <p className="text-xl font-light text-gray-700 max-w-2xl leading-relaxed">
              Rejoignez le mouvement AW en partageant votre trajectoire et votre vision.
            </p>
          </div>

          {/* Validation Box */}
          <div className="border-t border-gray-200 pt-12 space-y-6">
            <p className="text-lg text-gray-900 leading-relaxed">
              Votre profil sera examiné avant publication.
            </p>
            <p className="text-base text-gray-700 leading-relaxed max-w-2xl">
              Nous vérifions l'alignement avec les valeurs et la vision d'AW Conseil. Cette rigueur est le gage de la cohérence collective.
            </p>
          </div>

          {/* Help Link */}
          <div className="border-t border-gray-200 pt-12">
            <p className="text-base text-gray-700">
              Besoin d'aide pour rédiger ?{' '}
              <button
                type="button"
                onClick={() => setAidOpen('bio')}
                className="text-aw-red font-semibold hover:underline transition-colors"
              >
                Cliquez ici pour accéder aux conseils
              </button>
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-16" encType="multipart/form-data">
          {/* Code d'invitation */}
          <div className="space-y-6 border-t border-gray-200 pt-12">
            <label className="block text-xs font-semibold text-gray-900 tracking-wide uppercase">
              Code d'invitation
            </label>
            <input
              ref={codeInputRef}
              name="invitation_code"
              type="text"
              onChange={handleCodeChange}
              readOnly={codeValidated}
              className={`w-full px-0 py-4 border-b-2 transition-colors text-base font-light ${
                codeValidated 
                  ? 'border-green-300 text-gray-600 bg-white' 
                  : 'border-gray-300 hover:border-gray-400 focus:outline-none focus:border-aw-red'
              }`}
              placeholder="Entrez votre code"
            />

            <div className="h-5">
              {codeLoading && (
                <p className="text-xs text-gray-500">Vérification...</p>
              )}
              {codeFeedback && (
                <p className="text-xs text-red-600">{codeFeedback}</p>
              )}
              {codeValidated && (
                <p className="text-xs text-green-600">Code accepté ✓</p>
              )}
            </div>

            <p className="text-xs text-gray-600">
              Vous n'avez pas de code ? Contactez AW Conseil.
            </p>
          </div>

          {/* Welcome Message */}
          {codeValidated && (
            <div className="border-l-4 border-aw-red pl-6 py-2 animate-in fade-in slide-in-from-top-4">
              <p className="text-lg font-light text-gray-900">Bienvenue !</p>
              <p className="text-sm text-gray-700 mt-2">
                Merci de partager votre vision avec AW Conseil.
              </p>
            </div>
          )}

          {/* Form Fields Container */}
          <div className={`space-y-16 transition-opacity duration-300 ${!codeValidated ? 'opacity-40 pointer-events-none' : ''}`}>
            {/* Section: Basic Info */}
            <div className="space-y-12">
              {/* Nom */}
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-gray-900 tracking-wide uppercase">
                  Nom complet
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-0 py-3 bg-white border-b-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-aw-red transition-colors text-base font-light"
                  placeholder="David Apruzzese"
                />
              </div>

              {/* Fonction */}
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-gray-900 tracking-wide uppercase">
                  Fonction / spécialité
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full px-0 py-3 bg-white border-b-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-aw-red transition-colors text-base font-light"
                  placeholder="Régulation & stabilité en environnement exigeant"
                />
              </div>

              {/* Phrase signature */}
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-gray-900 tracking-wide uppercase">
                  Phrase signature
                </label>
                <textarea
                  name="signature"
                  required
                  maxLength={150}
                  rows={2}
                  className="w-full px-0 py-3 bg-white border-b-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-aw-red transition-colors text-base font-light resize-none"
                  placeholder="Stabiliser les dynamiques sous pression pour restaurer la clarté collective."
                />
                <p className="text-xs text-gray-500">Max 150 caractères</p>
              </div>
            </div>

            {/* Section: Biography */}
            <div className="border-t border-gray-200 pt-12 space-y-8">
              <h2 className="text-lg font-light text-gray-900">Votre histoire</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-900 tracking-wide uppercase">
                    Biographie
                  </label>
                  <button
                    type="button"
                    onClick={() => setAidOpen('bio')}
                    className="relative inline-flex items-center justify-center w-5 h-5 text-gray-400 hover:text-aw-red transition-colors group"
                  >
                    <span className="text-xs font-bold">?</span>
                    <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      Conseils de rédaction
                    </span>
                  </button>
                </div>
                <textarea
                  name="bio"
                  required
                  maxLength={900}
                  rows={5}
                  className="w-full px-0 py-3 bg-white border-b-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-aw-red transition-colors text-base font-light resize-none"
                  placeholder="Présentez votre parcours, votre expertise et comment vous contribuez au mouvement AW..."
                />
                <p className="text-xs text-gray-500">Max 900 caractères</p>
              </div>
            </div>

            {/* Section: Intentions */}
            <div className="border-t border-gray-200 pt-12 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-light text-gray-900">Vos intentions</h2>
                <button
                  type="button"
                  onClick={() => setAidOpen('intentions')}
                  className="relative inline-flex items-center justify-center w-5 h-5 text-gray-400 hover:text-aw-red transition-colors group"
                >
                  <span className="text-xs font-bold">?</span>
                  <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Conseils de rédaction
                  </span>
                </button>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="block text-xs text-gray-600">Ce que vous construisez</label>
                  <input
                    name="builds"
                    type="text"
                    required
                    className="w-full px-0 py-2 bg-white border-b-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-aw-red transition-colors text-base font-light"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-xs text-gray-600">Ce que vous protégez</label>
                  <input
                    name="protects"
                    type="text"
                    required
                    className="w-full px-0 py-2 bg-white border-b-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-aw-red transition-colors text-base font-light"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-xs text-gray-600">Ce que vous développez</label>
                  <input
                    name="develops"
                    type="text"
                    required
                    className="w-full px-0 py-2 bg-white border-b-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-aw-red transition-colors text-base font-light"
                  />
                </div>
              </div>
            </div>

            {/* Section: Values & Closing */}
            <div className="border-t border-gray-200 pt-12 space-y-12">
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-gray-900 tracking-wide uppercase">
                  3 valeurs qui vous guident
                </label>
                <input
                  name="values"
                  type="text"
                  required
                  className="w-full px-0 py-3 bg-white border-b-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-aw-red transition-colors text-base font-light"
                  placeholder="Ex: Clarté - Stabilité - Responsabilité"
                />
                <p className="text-xs text-gray-500">Séparées par des tirets</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-900 tracking-wide uppercase">
                    Phrase de clôture
                  </label>
                  <button
                    type="button"
                    onClick={() => setAidOpen('closing')}
                    className="relative inline-flex items-center justify-center w-5 h-5 text-gray-400 hover:text-aw-red transition-colors group"
                  >
                    <span className="text-xs font-bold">?</span>
                    <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      Conseils de rédaction
                    </span>
                  </button>
                </div>
                <textarea
                  name="closing"
                  required
                  maxLength={300}
                  rows={3}
                  className="w-full px-0 py-3 bg-white border-b-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:border-aw-red transition-colors text-base font-light resize-none"
                  placeholder="Comment votre trajectoire contribue-t-elle au mouvement AW ?"
                />
                <p className="text-xs text-gray-500">Max 300 caractères</p>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="border-t border-gray-200 pt-12 space-y-4">
              <label className="block text-xs font-semibold text-gray-900 tracking-wide uppercase">
                Photo HD (optionnel)
              </label>
              <input
                name="photo"
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-aw-red file:text-white hover:file:bg-red-700 transition-colors cursor-pointer"
              />
              <p className="text-xs text-gray-500">JPG, PNG ou WEBP • Max 5MB</p>
            </div>


          {/* Messages */}
          {status === 'success' && (
            <div className="border-l-4 border-green-300 pl-6 py-4 animate-in fade-in">
              <p className="font-light text-gray-900">Votre profil a été reçu !</p>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                Nous l'examinerons dans les meilleurs délais. Vous recevrez une confirmation par email.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="border-l-4 border-red-300 pl-6 py-4 animate-in fade-in">
              <p className="font-light text-gray-900">Une erreur est survenue</p>
              <p className="text-sm text-gray-700 mt-2">{errorMessage}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-12 flex flex-col sm:flex-row gap-6">
            <button
              type="submit"
              disabled={status === 'loading' || !codeValidated}
              className="flex-1 px-8 py-4 bg-aw-red text-white font-light hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-base"
            >
              {status === 'loading' ? 'Envoi en cours...' : 'Soumettre pour validation'}
            </button>
            <Link
              href="/avancent-avec-aw"
              className="flex-1 px-8 py-4 border border-gray-300 text-gray-900 hover:border-gray-400 transition-colors text-center text-base font-light"
            >
              Annuler
            </Link>
          </div>
          </div>
        </form>
      </main>

      {/* Aid Dialogs */}
      <AidDialog 
        isOpen={aidOpen === 'bio'} 
        onClose={() => setAidOpen(null)} 
        section="bio"
      />
      <AidDialog 
        isOpen={aidOpen === 'intentions'} 
        onClose={() => setAidOpen(null)} 
        section="intentions"
      />
      <AidDialog 
        isOpen={aidOpen === 'closing'} 
        onClose={() => setAidOpen(null)} 
        section="closing"
      />
    </div>
  );
}
