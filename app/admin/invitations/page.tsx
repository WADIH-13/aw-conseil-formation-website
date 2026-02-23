'use client';

import { useState } from 'react';

interface GeneratedCode {
  code: string;
  email: string;
  expiresAt: string;
}

export default function AdminInvitationsPage() {
  const [email, setEmail] = useState('');
  const [generatedCodes, setGeneratedCodes] = useState<GeneratedCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [codes, setCodes] = useState<any[]>([]);

  const loadCodes = async () => {
    try {
      const res = await fetch('/api/admin/invitations/list');
      const data = await res.json();
      if (res.ok) {
        setCodes(data.codes || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const generateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage('L\'email est requis.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/invitations/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Code généré avec succès !');
        setEmail('');
        setGeneratedCodes([...generatedCodes, data.code]);
        loadCodes();
      } else {
        setMessage(data.error || 'Erreur lors de la génération.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur serveur.');
    } finally {
      setLoading(false);
    }
  };

  const revokeCode = async (codeId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir révoquer ce code ?')) return;

    try {
      const res = await fetch('/api/admin/invitations/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codeId }),
      });

      if (res.ok) {
        setMessage('Code révoqué.');
        loadCodes();
      } else {
        setMessage('Erreur.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-light text-gray-900">Codes d'invitation AW</h1>
          <a href="/" className="text-gray-600 hover:text-gray-900">
            Retour au site
          </a>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Génération */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-2">Générer un code</h2>
              <p className="text-gray-600 text-sm">Créez un code d'invitation unique (valide 30 jours)</p>
            </div>

            <form onSubmit={generateCode} className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="david@exemple.fr"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aw-red"
                />
              </div>

              {message && (
                <div className={`p-3 rounded text-sm ${message.includes('succès') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2.5 bg-aw-red text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Génération...' : 'Générer le code'}
              </button>
            </form>

            {/* Codes générés */}
            {generatedCodes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Codes créés cette session</h3>
                {generatedCodes.map((item, idx) => (
                  <div key={idx} className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 justify-between">
                      <code className="font-mono font-bold text-blue-900">{item.code}</code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.code);
                          setMessage('Code copié !');
                        }}
                        className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Copier
                      </button>
                    </div>
                    <p className="text-sm text-blue-800">
                      {item.email}
                    </p>
                    <p className="text-xs text-blue-700">
                      Expire : {new Date(item.expiresAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Liste des codes */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-2">Codes actifs</h2>
              <p className="text-gray-600 text-sm">Codes non utilisés et non expirés</p>
            </div>

            <button
              onClick={loadCodes}
              className="w-full px-4 py-2 border border-gray-300 text-gray-900 font-medium rounded-lg hover:border-gray-400 transition-colors"
            >
              Actualiser la liste
            </button>

            <div className="space-y-3">
              {codes.filter((c) => !c.is_used && new Date(c.expires_at) > new Date()).map((code) => (
                <div key={code.id} className="p-4 bg-white border border-gray-200 rounded-lg space-y-2 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <code className="font-mono font-bold text-gray-900">{code.code}</code>
                    <button
                      onClick={() => revokeCode(code.id)}
                      className="text-xs px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded"
                    >
                      Révoquer
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{code.email}</p>
                  <p className="text-xs text-gray-500">
                    Expire : {new Date(code.expires_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              ))}
              {codes.filter((c) => !c.is_used && new Date(c.expires_at) > new Date()).length === 0 && (
                <p className="text-center text-gray-500 py-8">Aucun code actif</p>
              )}
            </div>

            {/* Codes utilisés */}
            <details className="text-sm">
              <summary className="cursor-pointer font-medium text-gray-900 hover:text-aw-red">
                Codes utilisés ({codes.filter((c) => c.is_used).length})
              </summary>
              <div className="mt-3 space-y-2">
                {codes.filter((c) => c.is_used).map((code) => (
                  <div key={code.id} className="text-xs p-2 bg-gray-50 rounded text-gray-600">
                    <span className="font-mono">{code.code}</span> - {code.email} - {code.used_by_slug}
                  </div>
                ))}
              </div>
            </details>
          </section>
        </div>
      </main>
    </div>
  );
}
