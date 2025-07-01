import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateExplanation(amount: number, email: string, score: number): Promise<string> {
  const prompt = `A payment of $${amount} was made using the email: ${email}. The fraud score calculated was ${score}. Explain in simple language why this payment was either accepted or blocked.`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message?.content?.trim()  || "No explanation available.";
}

export async function summarizeCampaign(description: string): Promise<{ tags: string[]; summary: string }> {
  const prompt = `Given the following donation campaign description, generate: 1. A short one-sentence summary 2. 3 relevant tags. Description: ${description}`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0].message?.content?.trim()  || "";
  const tags = content.match(/["'](.*?)["']/g)?.map(s => s.replace(/["']/g, '')) || [];
  const summary = content.split("\n")[0];

  return {
    tags,
    summary: summary.trim(),
  };
}
