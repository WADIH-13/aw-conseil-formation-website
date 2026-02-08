import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation du payload
const surveyPayloadSchema = z.object({
  civility: z.enum(['M.', 'Mme', 'Autre']),
  age_range: z.enum(['18-25', '26-35', '36-45', '46-55', '56-65', '65+']),
  professional_status: z.enum(['salarié', 'indépendant', 'non-salarié', 'autre']),
  raw_score: z.number().int().min(10).max(40),
  aw_score: z.number().int().min(0).max(100),
  dimension_scores: z.array(
    z.object({
      dimension: z.string(),
      label: z.string(),
      score: z.number(),
      normalized: z.number(),
      color: z.string(),
    })
  ),
  // ⭐ Toutes les réponses : { question_id: réponse_value }
  answers: z.record(z.string(), z.number()),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    const payload = surveyPayloadSchema.parse(body);

    // Initialiser Supabase (côté serveur)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase non configuré' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insérer dans la base de données
    const { error } = await supabase.from('survey_responses').insert([
      {
        civility: payload.civility,
        age_range: payload.age_range,
        professional_status: payload.professional_status,
        raw_score: payload.raw_score,
        aw_score: payload.aw_score,
        dimension_scores: payload.dimension_scores,
        answers: payload.answers, // ⭐ Sauvegarder les réponses
      },
    ]);

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Réponse sauvegardée avec succès' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
