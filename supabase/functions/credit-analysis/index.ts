import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// URL da API de análise de crédito - configurável via variável de ambiente
const API_CREDIT_ANALYSIS_URL = Deno.env.get('API_CREDIT_ANALYSIS_URL') || 
  'https://uat-api.serasaexperian.com.br/consultas/v1/relato';

// Gera token aleatório para simulação de autenticação
function generateRandomToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cpf } = await req.json();

    if (!cpf) {
      return new Response(
        JSON.stringify({ error: 'CPF é obrigatório' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Remove máscara do CPF
    const cpfClean = cpf.replace(/\D/g, '');

    // Gera token dinâmico
    const authToken = generateRandomToken();

    console.log(`Calling credit analysis API for CPF: ${cpfClean.substring(0, 3)}***`);

    // Requisição para API real
    const response = await fetch(API_CREDIT_ANALYSIS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        documento: cpfClean,
        tipo_documento: 'CPF',
        parametros: {
          consultar_score: true,
          exibir_negativacoes: false,
        },
      }),
    });

    if (!response.ok) {
      console.error(`Credit API error: ${response.status} ${response.statusText}`);
      return new Response(
        JSON.stringify({ error: 'Erro na consulta de crédito' }),
        { 
          status: 502, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();

    // Valida resposta
    if (typeof data.score !== 'number') {
      console.error('Invalid response from credit API: missing score field');
      return new Response(
        JSON.stringify({ error: 'Resposta inválida da API de crédito' }),
        { 
          status: 502, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Credit analysis completed. Score: ${data.score}`);

    return new Response(
      JSON.stringify({ 
        status: data.status || 'Done',
        score: data.score 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Credit analysis error:', error);
    
    // Timeout ou falha de rede
    return new Response(
      JSON.stringify({ error: 'Falha na comunicação com serviço de crédito' }),
      { 
        status: 503, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
