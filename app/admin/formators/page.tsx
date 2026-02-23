'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Formator {
  id: string;
  name: string;
  title: string;
  signature: string;
  bio: string;
  builds: string;
  protects: string;
  develops: string;
  values: string;
  closing: string;
  photo_url?: string;
  is_published: boolean;
  created_at: string;
  slug: string;
}

export default function FormatorsAdminPage() {
  const [formators, setFormators] = useState<Formator[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchFormators = async () => {
      try {
        const res = await fetch('/api/admin/formators/list');
        const data = await res.json();
        setFormators(data.formators || []);
      } catch (error) {
        console.error('Error fetching formators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormators();
  }, []);

  const handleApprove = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/formators/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      console.log('Approve response:', res.status, data);

      if (res.ok) {
        // Recharger la liste depuis la BD
        const listRes = await fetch('/api/admin/formators/list');
        const listData = await listRes.json();
        setFormators(listData.formators || []);
        
        setSelectedId(null);
        setSuccessMessage('✓ Profil publié avec succès !');
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        setSuccessMessage(`❌ Erreur: ${data.error || 'Impossible de publier'}`);
        setTimeout(() => setSuccessMessage(''), 4000);
      }
    } catch (error) {
      console.error('Error approving formator:', error);
      setSuccessMessage('❌ Erreur serveur');
      setTimeout(() => setSuccessMessage(''), 4000);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/formators/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      console.log('Reject response:', res.status, data);

      if (res.ok) {
        setFormators(formators.filter(f => f.id !== id));
        setSelectedId(null);
        setSuccessMessage('✓ Profil rejeté et supprimé');
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        setSuccessMessage(`❌ Erreur: ${data.error || 'Impossible de rejeter'}`);
        setTimeout(() => setSuccessMessage(''), 4000);
      }
    } catch (error) {
      console.error('Error rejecting formator:', error);
      setSuccessMessage('❌ Erreur serveur');
      setTimeout(() => setSuccessMessage(''), 4000);
    } finally {
      setActionLoading(false);
    }
  };

  const unpublished = formators.filter(f => !f.is_published);
  const published = formators.filter(f => f.is_published);
  const selected = formators.find(f => f.id === selectedId);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <Link 
            href="/admin" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Admin
          </Link>
          <h1 className="text-2xl font-light text-gray-900">Gestion des formateurs</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-8 py-20">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          <div>
            <p className="text-4xl font-light text-aw-red">{unpublished.length}</p>
            <p className="text-sm text-gray-600 mt-2">En attente de validation</p>
          </div>
          <div>
            <p className="text-4xl font-light text-gray-900">{published.length}</p>
            <p className="text-sm text-gray-600 mt-2">Publiés</p>
          </div>
          <div>
            <p className="text-4xl font-light text-gray-900">{formators.length}</p>
            <p className="text-sm text-gray-600 mt-2">Total</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* List */}
          <div className="lg:col-span-1 space-y-3 border-r border-gray-200 pr-8">
            <h2 className="text-lg font-light text-gray-900 mb-6">Profils à valider</h2>
            
            {unpublished.length === 0 ? (
              <p className="text-sm text-gray-600">Aucun profil en attente</p>
            ) : (
              unpublished.map(formator => (
                <button
                  key={formator.id}
                  onClick={() => setSelectedId(formator.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedId === formator.id
                      ? 'bg-aw-red/5 border-aw-red'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-gray-900">{formator.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{formator.title}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(formator.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </button>
              ))
            )}

            {published.length > 0 && (
              <>
                <div className="border-t border-gray-200 pt-6 mt-8">
                  <h3 className="text-sm font-light text-gray-900 mb-4">Déjà publiés</h3>
                  {published.map(formator => (
                    <div
                      key={formator.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-3"
                    >
                      <p className="text-sm font-medium text-gray-900">{formator.name}</p>
                      <p className="text-xs text-gray-600 mt-1">✓ Publié</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="space-y-12 border-l border-gray-200 pl-8">
                {/* Header */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-4xl font-light text-gray-900">{selected.name}</h2>
                    <p className="text-lg text-gray-700 mt-2">{selected.title}</p>
                  </div>
                  <p className="text-base italic text-gray-600 leading-relaxed">
                    "{selected.signature}"
                  </p>
                </div>

                {/* Photo */}
                {selected.photo_url && (
                  <div>
                    <img 
                      src={selected.photo_url} 
                      alt={selected.name}
                      className="w-full max-w-sm h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Debug Info */}
                <div className="bg-gray-50 p-4 rounded border border-gray-200 text-xs text-gray-600 space-y-1">
                  <p><span className="font-semibold">ID:</span> {selected.id}</p>
                  <p><span className="font-semibold">Slug:</span> {selected.slug}</p>
                  <p><span className="font-semibold">Photo URL:</span> {selected.photo_url || 'Aucune'}</p>
                  <p><span className="font-semibold">Publié:</span> {selected.is_published ? 'Oui' : 'Non'}</p>
                  <p><span className="font-semibold">Créé:</span> {new Date(selected.created_at).toLocaleString('fr-FR')}</p>
                </div>

                {/* Bio */}
                <div className="space-y-3 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Biographie</h3>
                  <p className="text-base text-gray-700 leading-relaxed">{selected.bio}</p>
                </div>

                {/* Intentions */}
                <div className="space-y-4 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Intentions</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Ce qu'il construit</p>
                      <p className="text-base text-gray-900">{selected.builds}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Ce qu'il protège</p>
                      <p className="text-base text-gray-900">{selected.protects}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Ce qu'il développe</p>
                      <p className="text-base text-gray-900">{selected.develops}</p>
                    </div>
                  </div>
                </div>

                {/* Values */}
                <div className="space-y-3 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Valeurs</h3>
                  <p className="text-base text-gray-900">{selected.values}</p>
                </div>

                {/* Closing */}
                <div className="space-y-3 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Lien à AW</h3>
                  <p className="text-base text-gray-700 leading-relaxed italic">"{selected.closing}"</p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-8 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(selected.id)}
                    disabled={actionLoading}
                    className="flex-1 px-6 py-4 bg-aw-red text-white font-light hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {actionLoading ? 'Traitement...' : '✓ Accepter et publier'}
                  </button>
                  <button
                    onClick={() => handleReject(selected.id)}
                    disabled={actionLoading}
                    className="flex-1 px-6 py-4 border border-red-300 text-red-600 font-light hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {actionLoading ? 'Traitement...' : '✕ Refuser'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border-l border-gray-200 pl-8">
                <p className="text-gray-600">Sélectionnez un profil pour le consulter</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
