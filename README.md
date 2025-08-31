# 🧞‍♂️ AI Content Genie - Roo Hackathon 2025 Submission

![AI Content Genie](./frontend/src/assets/genie.png)

> Unleash your inner AI Content Genie! Our submission for the Roo Hackathon 2025 is an AI-powered content generation platform that leverages large language models to streamline content creation.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-blue.svg)](https://tailwindcss.com/)
[![Requesty](https://img.shields.io/badge/Powered_by-Requesty-orange.svg)](https://requesty.ai/)
[![Google Gemini](https://img.shields.io/badge/Model-Google_Gemini-blue.svg)](https://deepmind.google/technologies/gemini/)

## 🌐 Live Demo

The application is hosted on GitHub Pages. You can access the live demo here:

**[https://roguetex.github.io/ContentGenerator_RooHackathon/](https://roguetex.github.io/ContentGenerator_RooHackathon/)**

## 🎯 Problem Statement

In the fast-paced digital world, content is king. However, creating high-quality, engaging, and diverse content consistently is a major challenge for marketers, bloggers, and businesses. This process is often time-consuming, requires significant creative effort, and can lead to burnout. There is a need for a tool that can accelerate the creative process, provide inspiration, and automate the generation of various content types without sacrificing quality.

## ✨ Solution

The AI Content Generator is designed to solve this problem. It provides a user-friendly interface where users can select from over eight different content types, provide a topic and optional keywords, and receive high-quality, formatted content in seconds!

By integrating with **Requesty**, the application gains access to **Google's Gemini 2.5 Flash**. This allows the tool to generate nuanced, context-aware, and creative content tailored to the user's specific needs, from professional blog posts to catchy social media updates.

### Core Features

- **8+ Content Types**: Generate blog posts, social media updates, emails, ad copy, and more.
- **Powered by Requesty & Google Gemini**: Utilizes a powerful AI backend for fast, creative, and high-quality content generation.
- **Content History**: All generated content is saved locally, allowing users to review and reuse past generations.
- **Markdown Rendering**: Displays generated content with rich formatting (headings, lists, bolding) for a better user experience.
- **Sleek UI**: A modern, responsive interface built with React and Tailwind CSS.
- **One-click Copy**: Easily copy the raw Markdown of generated content to your clipboard.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, `react-markdown`
- **Backend**: Node.js, Express.js
- **AI API**: Requesty (providing access to Google Gemini)
- **Deployment**: GitHub Actions for CI/CD, GitHub Pages for hosting the frontend.

## 🚀 Getting Started Locally

To run this project on your local machine, follow these steps:

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/RogueTex/ContentGenerator_RooHackathon.git
cd ContentGenerator_RooHackathon/ai-content-generator
```

### 2. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure Environment
In the `backend` directory, create a `.env` file and add your Requesty API key. If you do not provide a key, the application will run in **Demo Mode** and serve sample content.

```env
REQUESTY_API_KEY="your_requesty_api_key_here"
PORT=3001
```

### 4. Run the Application

**Terminal 1 - Start the Backend:**
```bash
cd backend
npm start
# Server will run on http://localhost:3001
```

**Terminal 2 - Start the Frontend:**
```bash
cd frontend
npm run dev
# Application will be available at http://localhost:5173 (or another port if 5173 is busy)
```

## 🔑 API Configuration

1. Get your Requesty API key from [Requesty](https://requesty.ai/)
2. Add it to your `.env` file in the `backend` directory:
```env
REQUESTY_API_KEY=your_actual_requesty_key_here
PORT=3001
```

## 📊 Content Types Supported

| Type | Icon | Description | Use Case |
|------|------|-------------|----------|
| Blog Post | 📝 | In-depth articles and guides | Content marketing, SEO |
| Social Media | 📱 | Engaging social content | Social media marketing |
| Email Newsletter | 📧 | Professional email content | Email campaigns |
| Product Description | 🛍️ | Compelling product copy | E-commerce |
| Press Release | 📰 | Official announcements | PR and media |
| Advertisement | 📢 | Persuasive ad content | Paid advertising |
| Video Script | 🎬 | Engaging video content | Video marketing |
| Landing Page | 🌐 | Conversion-focused copy | Sales funnels |

## 🎨 Customization Options

### Tones Available:
- Professional (formal, business-like)
- Casual (relaxed, friendly)
- Enthusiastic (energetic, exciting)
- Informative (educational, factual)
- Persuasive (convincing, compelling)
- Humorous (light-hearted, funny)

### Content Lengths:
- Short: 100-200 words
- Medium: 300-500 words
- Long: 600-1000 words

## 🚀 Deployment Ready

This application is ready for deployment on:
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Heroku, Railway, DigitalOcean, or AWS

### Environment Variables for Production:
```env
REQUESTY_API_KEY=your_production_api_key
PORT=3001
NODE_ENV=production
```

**Built with ❤️ for Roo Hackathon 2025**