import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const generateAnswers = async (questions) => {
  try {
    const promptText = `Answer the following questions concisely name-nihal panday , email-nihalpanday2020@gmail.com, phone - 8222886826,address - pune,comments - mkc :\n${
      questions.map((q, i) => `${i + 1}. ${q.question}`).join('\n')
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

    return questions.map((q, i) => ({
      ...q,
      answer: answers[i] || 'No answer provided',
    }));

  } catch (error) {
    console.error('Error in generateAnswers:', error);
    throw new Error(`Failed to generate answers: ${error.message}`);
  }
};
