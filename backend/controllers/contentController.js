const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const generateContent = async (req, res) => {
  try {
    const { contentType, topic } = req.body;

    if (!contentType || !topic) {
      return res.status(400).json({ error: 'Content type and topic are required.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate a ${contentType} about "${topic}".`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ generatedContent: text });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content.' });
  }
};

module.exports = {
  generateContent,
};