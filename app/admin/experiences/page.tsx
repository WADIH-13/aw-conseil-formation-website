'use client';

import { useEffect, useState } from 'react';
import { Experience } from '@/lib/universe/types';
import { getExperiencesAdmin, createExperience, updateExperience, deleteExperienceAdmin } from '@/lib/universe/queries';
import { universeCopy } from '@/lib/universe/copy';

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Experience>>({
    title: '',
    slug: '',
    category: 'STRUCTURER',
    kind: 'ATELIER',
    short_description: '',
    long_description: '',
    duration_minutes: 120,
    audience: [],
    benefits: [],
    deliverables: [],
    format_details: '',
    is_active: true,
    featured: false,
    order_index: 0,
  });

  const fetchExperiences = async () => {
    try {
      const data = await getExperiencesAdmin();
      setExperiences(data);
    } catch (err) {
      console.error('Error fetching experiences:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'STRUCTURER',
      kind: 'ATELIER',
      short_description: '',
      long_description: '',
      duration_minutes: 120,
      audience: [],
      benefits: [],
      deliverables: [],
      format_details: '',
      is_active: true,
      featured: false,
      order_index: 0,
    });
    setShowForm(true);
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData(exp);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateExperience(editingId, formData);
      } else {
        await createExperience(formData as Experience);
      }
      setShowForm(false);
      fetchExperiences();
    } catch (err) {
      console.error('Error submitting:', err);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr ?')) return;
    try {
      await deleteExperienceAdmin(id);
      fetchExperiences();
    } catch (err) {
      console.error('Error deleting:', err);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Expériences</h1>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-aw-red text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            + Nouvelle expérience
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">{editingId ? 'Modifier' : 'Nouvelle'} expérience</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-bold mb-1">Titre *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-bold mb-1">Slug (URL) *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red text-xs"
                  />
                </div>

                {/* Category & Kind */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">Catégorie</label>
                    <select
                      value={formData.category || 'structurer'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="structurer">Structurer</option>
                      <option value="liberer">Libérer</option>
                      <option value="renforcer">Renforcer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Type</label>
                    <select
                      value={formData.kind || 'atelier'}
                      onChange={(e) => setFormData({ ...formData, kind: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="atelier">Atelier</option>
                      <option value="formation">Formation</option>
                      <option value="immersion">Immersion</option>
                      <option value="teambuilding">Team Building</option>
                    </select>
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-bold mb-1">Description courte</label>
                  <textarea
                    value={formData.short_description || ''}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red text-sm"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold mb-1">Description complète</label>
                  <textarea
                    value={formData.long_description || ''}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aw-red text-sm"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-bold mb-1">Durée (minutes) *</label>
                  <input
                    type="number"
                    required
                    value={formData.duration_minutes || 120}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Audience */}
                <div>
                  <label className="block text-sm font-bold mb-1">Public</label>
                  <textarea
                    value={(formData.audience || []).join('\n')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        audience: e.target.value
                          .split('\n')
                          .map((item) => item.trim())
                          .filter(Boolean),
                      })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                {/* Format Details */}
                <div>
                  <label className="block text-sm font-bold mb-1">Format/Détails</label>
                  <textarea
                    value={formData.format_details || ''}
                    onChange={(e) => setFormData({ ...formData, format_details: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                {/* Flags */}
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active || false}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    />
                    <span className="text-sm">Actif</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span className="text-sm">En avant</span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button type="submit" className="flex-1 px-4 py-2 bg-aw-red text-white rounded-lg hover:bg-red-700 font-medium">
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 font-medium"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Experiences List */}
        <div className="space-y-4">
          {experiences.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Aucune expérience. Créez-en une !</p>
          ) : (
            experiences
              .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
              .map((exp) => (
                <div key={exp.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-xs text-gray-600">
                      {exp.category} • {exp.kind} • {exp.duration_minutes}min
                    </p>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">{exp.short_description}</p>
                    <div className="flex gap-2 mt-2">
                      {!exp.is_active && <span className="text-xs bg-gray-100 px-2 py-1 rounded">Inactif</span>}
                      {exp.featured && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">En avant</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
