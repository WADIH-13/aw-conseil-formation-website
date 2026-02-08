import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase non configuré' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Récupérer toutes les réponses
    const { data: responses, error } = await supabase
      .from('survey_responses')
      .select('answers');

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des stats' },
        { status: 500 }
      );
    }

    if (!responses || responses.length === 0) {
      return NextResponse.json(
        { totalResponses: 0, questionStats: {} },
        { status: 200 }
      );
    }

    // Calculer les statistiques par question
    const totalResponses = responses.length;
    const questionStats: Record<string, Record<number, number>> = {};

    responses.forEach((response) => {
      if (!response.answers) return;

      Object.entries(response.answers).forEach(([questionId, answerValue]) => {
        if (!questionStats[questionId]) {
          questionStats[questionId] = {};
        }

        const answer = Number(answerValue);
        questionStats[questionId][answer] = (questionStats[questionId][answer] || 0) + 1;
      });
    });

    // Convertir en pourcentages
    const stats: Record<string, Record<number, number>> = {};
    Object.entries(questionStats).forEach(([questionId, answers]) => {
      stats[questionId] = {};
      Object.entries(answers).forEach(([answerValue, count]) => {
        stats[questionId][Number(answerValue)] = Math.round(
          (count / totalResponses) * 100
        );
      });
    });

    return NextResponse.json(
      { totalResponses, stats },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
