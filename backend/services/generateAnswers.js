import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Helper: Find best matching option (case-insensitive, partial match allowed)
function findBestOption(answer, options) {
  if (!answer || !options || options.length === 0) return '';
  // Exact match (case-insensitive)
  let match = options.find(opt => opt.toLowerCase() === answer.toLowerCase());
  if (match) return match;
  // Partial match
  match = options.find(opt => answer.toLowerCase().includes(opt.toLowerCase()) || opt.toLowerCase().includes(answer.toLowerCase()));
  if (match) return match;
  // Otherwise, return first option as fallback
  return options[0];
}

// Helper: For checkboxes, try to extract multiple options
function findBestOptions(answer, options) {
  if (!answer || !options || options.length === 0) return [];
  // Split answer by comma or "and"
  const parts = answer.split(/,| and /i).map(s => s.trim().toLowerCase());
  // Return all options that appear in answer
  return options.filter(opt => parts.some(part => opt.toLowerCase().includes(part) || part.includes(opt.toLowerCase())));
}

export const generateAnswers = async (questions) => {
  try {
    const promptText = `Answer the following questions concisely. For multiple choice or checkbox questions, answer using only the provided options. Personal info: name-nihal panday, email-nihalpanday2020@gmail.com, phone-8222886826, address-pune, comments-mkc.\n${
      questions.map((q, i) => {
        let qText = `${i + 1}. ${q.question}`;
        if (q.options && q.options.length > 0) {
          qText += ` (Options: ${q.options.join(', ')})`;
        }
        return qText;
      }).join('\n')
    }\n\nAnswers:`;

    const body = {
      contents: [{
        parts: [{ text: promptText }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512
      }
    };

    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(`Google Gemini API error: ${JSON.stringify(err)}`);
    }

    const data = await response.json();

    // Extract the answer text from the response
    const answerText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Parse answers (expecting "1. answer\n2. answer" format)
    const answers = answerText
      .split('\n')
      .filter(line => /^\d+\./.test(line))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());

    // Map answers to questions, constraining to options where needed
    return questions.map((q, i) => {
      let answer = answers[i] || 'No answer provided';
      if (q.options && q.options.length > 0) {
        if (q.type === 'checkboxes') {
          answer = findBestOptions(answer, q.options);
        } else {
          answer = findBestOption(answer, q.options);
        }
      }
      return { ...q, answer };
    });

  } catch (error) {
    console.error('Error in generateAnswers:', error);
    throw new Error(`Failed to generate answers: ${error.message}`);
  }
};
