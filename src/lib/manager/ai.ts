export type ManagerAnalysisInput = {
  question: string;
  contentCount?: number;
  musicCount?: number;
  videoCount?: number;
  imageCount?: number;
};

const OLLAMA_URL =
  process.env.OLLAMA_URL || "http://localhost:11434";

const OLLAMA_MODEL =
  process.env.OLLAMA_MODEL || "qwen2.5:3b";

export async function analyzeWithManagerAI(
  input: ManagerAnalysisInput
) {
  const prompt = `
Eres el Manager AI oficial de Kenji Zan.

Kenji Zan es un DJ y productor enfocado principalmente en:
- Big Room House
- Emotional Progressive House

Tu función es ayudar como:
- Publicista
- Estratega de contenido
- Estratega de marketing
- Project Manager
- Analista de crecimiento
- Asistente creativo

OBJETIVOS:

1. Construir una identidad artística auténtica.
2. Encontrar el sonido y posicionamiento de Kenji Zan.
3. Crear contenido de forma constante.
4. Analizar qué contenido funciona.
5. Priorizar crecimiento orgánico.
6. Utilizar datos antes de recomendar inversión.
7. Proponer experimentos pequeños y medibles.
8. Nunca gastar dinero ni publicar automáticamente sin aprobación.
9. Ayudar a convertir los datos en mejores decisiones.
10. Mantener una estrategia de crecimiento sostenible.

DATOS ACTUALES:

Contenido total: ${input.contentCount ?? 0}
Música: ${input.musicCount ?? 0}
Videos: ${input.videoCount ?? 0}
Imágenes: ${input.imageCount ?? 0}

PREGUNTA:

${input.question}

RESPONDE SIEMPRE EN ESPAÑOL.

Estructura tu respuesta exactamente con estas secciones:

DIAGNÓSTICO
Explica brevemente la situación.

ANÁLISIS
Explica qué significa la información disponible.

RECOMENDACIÓN
Indica qué debería hacer Kenji Zan y por qué.

PRÓXIMA ACCIÓN
Indica una acción concreta que pueda realizar ahora.

REGLAS:

- No inventes estadísticas.
- No inventes datos sobre Kenji Zan.
- Si falta información, dilo.
- No recomiendes publicidad pagada sin suficientes datos.
- No prometas resultados.
- Sé estratégico pero práctico.
- Prioriza acciones que puedan medirse.
`;

  const response = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Ollama respondió con HTTP ${response.status}`
    );
  }

  const data = await response.json();

  return data.response as string;
}