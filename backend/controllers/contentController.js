// Requesty API integration for Roo Hackathon
const axios = require('axios');

// Helper function to extract keywords from a topic
const getKeywords = (text) => {
  const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'for', 'nor', 'on', 'in', 'at', 'to', 'from', 'of', 'with', 'by', 'about', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'this', 'that', 'these', 'those', 'it', 'its', 'he', 'she', 'they', 'we', 'you', 'your', 'my', 'our', 'their', 'his', 'her', 'itself', 'himself', 'herself', 'themselves', 'ourselves', 'yourselves', 'myself', 'i', 'me', 'us', 'them', 'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'any', 'some', 'such', 'no', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'don', 'should', 'now']);
  const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 2 && !stopWords.has(word));
  return [...new Set(words)].join(', '); // Remove duplicates and join
};

const promptTemplates = {
  'blog-post': (topic, keywords) => `As a top-tier content strategist, generate a detailed and insightful blog post.

- **Main Topic:** "${topic}"
- **Key Concepts or Keywords:** ${keywords || topic}

Guidelines:
- Craft a compelling introduction that hooks readers.
- Structure with clear H2/H3 headings for each key idea.
- Use bullet points, examples, or mini-case studies for clarity.
- Make the writing engaging, authoritative, and SEO-friendly.
- End with a strong conclusion and actionable takeaways.
- Ensure all content is highly relevant to the topic and key concepts.

Produce a blog post that would stand out to both judges and users.`,

  'social-media-post': (topic, keywords) => `As an expert social media copywriter, write an engaging, shareable post.

- **Platform:** [Specify if known, e.g. Twitter, LinkedIn, Instagram]
- **Topic/Campaign:** "${topic}"
- **Key Hashtags/Keywords:** ${keywords || topic}

Guidelines:
- Craft a catchy hook or question, optimized for engagement.
- Make the copy concise, impactful, and audience-appropriate.
- Weave in current trends, emojis, and 1-3 relevant hashtags.
- Content should be snappy, memorable, and drive action (like, share, comment).
- Context must be derived from the topic and only target relevant keywords.

Deliver a post that would capture attention on social media.`,

  'email-newsletter': (topic, keywords) => `As a professional email marketer, create a high-performing newsletter segment.

- **Topic/Primary Subject:** "${topic}"
- **Key Points/Keywords:** ${keywords || topic}

Instructions:
- Start with a personalized greeting and a strong subject line.
- Organize with introductory paragraph, main content in bullets or sections, and a clear call-to-action.
- Make tone friendly, informative, and trustworthy.
- Optimize for readability and engagement.
- Tailor content closely to the topic and keywords for maximum relevance.

Generate the email body and a recommended subject line.`,

  'product-description': (topic, keywords) => `As a seasoned e-commerce copywriter, craft a persuasive product description.

- **Product Name/Topic:** "${topic}"
- **Unique Features/Keywords:** ${keywords || topic}

Guidelines:
- Create a standout headline and opening line.
- Emphasize unique selling points and benefits, not just features.
- Target the needs and desires of the ideal buyer.
- Format with short, impactful sentences, highlights, or lists.
- Ensure every line relates directly to the product context.

Write a description that excites and convinces customers to purchase.`,

  'press-release': (topic, keywords) => `As a professional PR specialist, draft a newsworthy press release.

- **Announcement Topic:** "${topic}"
- **Main Points/Keywords:** ${keywords || topic}

Instructions:
- Follow classic press release structure (headline, dateline, introduction, body, quote, boilerplate).
- Prioritize clarity, impact, and newsworthiness.
- Include a quote from a fictional company exec or spokesperson.
- Highlight why this matters and who benefits.
- Focus solely on the context of the topic/keywords.

Generate the press release for a professional audience.`,

  'ad-copy': (topic, keywords) => `As a creative ad copywriter, generate a high-converting advertisement.

- **Product/Service/Topic:** "${topic}"
- **Key Selling Points/Keywords:** ${keywords || topic}

Directions:
- Start with a bold headline or question.
- Deliver a concise, memorable pitch with a clear call to action.
- Use emotional triggers or urgency where appropriate.
- Format for quick reading (short lines, highlights).
- Context and keywords should shape the ad’s unique appeal.

Write ad copy that grabs attention and motivates immediate action.`,

  'video-script': (topic, keywords) => `As a talented scriptwriter, produce a compelling video script segment.

- **Video Theme/Topic:** "${topic}"
- **Core Message/Keywords:** ${keywords || topic}

Script guidelines:
- Open with a strong hook.
- Segue into key points, using a conversational, audience-focused tone.
- Include one or two brief lines for on-screen visuals or directions.
- Script should engage, inform, and drive the viewer to action.
- Ensure every line is contextually tailored to the input topic/key concepts.

Generate the script for a 1-2 minute video.`,

  'landing-page': (topic, keywords) => `As an expert in landing page optimization, write persuasive landing page copy.

- **Offer/Topic:** "${topic}"
- **Core Benefits/Keywords:** ${keywords || topic}

Instructions:
- Write a bold headline, subheadline, and 2-3 high-impact sections.
- Use concise, benefit-driven language.
- Include bullet points, testimonials (fictional is fine), and a call-to-action.
- Copy should flow logically, leading visitors to take the target action.
- All content must closely relate to the topic and keywords.

Produce conversion-oriented landing page content.`
};

const generateContent = async (req, res) => {
  const { contentType, topic } = req.body;
  
  try {
    if (!contentType || !topic) {
      return res.status(400).json({ error: 'Content type and topic are required.' });
    }

    const apiKey = process.env.REQUESTY_API_KEY;
    if (!apiKey || apiKey === 'your_requesty_key_here' || apiKey === 'demo_mode') {
      const demoContent = generateDemoContent(contentType, topic);
      console.log(`Demo mode: Generated ${demoContent.length} characters of demo content`);
      return res.status(200).json({ generatedContent: demoContent });
    }

    const keywords = getKeywords(topic);
    let prompt;

    if (contentType.includes('Requirements:')) {
      prompt = contentType; // Use as-is if it's a direct requirement
    } else if (promptTemplates[contentType]) {
      prompt = promptTemplates[contentType](topic, keywords);
    } else {
      // Fallback for unknown content types
      prompt = `Generate a ${contentType} about "${topic}". Make it engaging, well-structured, and professional. Key concepts: ${keywords || topic}.`;
    }

    console.log('Generating content with Requesty API for:', topic);

    const response = await axios.post('https://router.requesty.ai/v1/chat/completions', {
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2048,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const choices = response?.data?.choices;
    const generatedText = choices?.[0]?.message?.content;
    if (!generatedText) {
        console.error('No content generated by Requesty:', response?.data);
        return res.status(500).json({ error: "No content generated by Requesty" });
    }
    console.log(`Successfully generated ${generatedText.length} characters of content with Requesty`);
    res.status(200).json({ generatedContent: generatedText });
  } catch (error) {
    console.error('Error generating content with Requesty:', error.response?.data || error.message);
    console.log('Falling back to demo mode due to API error');
    const demoContent = generateDemoContent(contentType, topic);
    res.status(200).json({ generatedContent: demoContent });
  }
};

const generateCampaign = async (req, res) => {
  const { topic } = req.body;
  try {
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required for campaign generation.' });
    }

    const apiKey = process.env.REQUESTY_API_KEY;
    if (!apiKey || apiKey === 'your_requesty_key_here' || apiKey === 'demo_mode') {
      console.log(`Demo mode: Generating demo campaign for ${topic}`);
      const demoCampaign = generateDemoCampaign(topic);
      return res.status(200).json({ generatedCampaign: demoCampaign });
    }

    const keywords = getKeywords(topic);

    const prompt = `
      As a highly skilled social media strategist for a hackathon-winning AI Content Generator, your task is to create a comprehensive one-week social media campaign plan.
      
      Primary Topic: "${topic}"
      Key Concepts/Keywords: ${keywords || topic}

      The plan should be designed to be highly effective and engaging, suitable for a hackathon demonstration. It must include:
      1.  **Three distinct social media post ideas for Twitter/X.** For each post, provide the full text (concise and impactful) and 3 highly relevant hashtags.
      2.  **One compelling blog post idea.** Include a catchy, SEO-friendly title and a brief 2-3 sentence summary that highlights its value.
      3.  **One attention-grabbing email subject line** for a promotional newsletter related to the campaign.

      Return the response as a valid JSON object with the following structure. Ensure the JSON is perfectly formatted for direct parsing:
      {
        "socialPosts": [
          {"post": "...", "hashtags": ["...", "...", "..."]},
          {"post": "...", "hashtags": ["...", "...", "..."]},
          {"post": "...", "hashtags": ["...", "...", "..."]}
        ],
        "blogIdea": {"title": "...", "summary": "..."},
        "emailSubject": "..."
      }
    `;

    console.log('Generating campaign with Requesty API for:', topic);

    const response = await axios.post('https://router.requesty.ai/v1/chat/completions', {
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2048,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const choices = response?.data?.choices;
    const generatedText = choices?.[0]?.message?.content;
    if (!generatedText) {
        console.error('No campaign content generated by Requesty:', response?.data);
        return res.status(500).json({ error: "No campaign content generated by Requesty" });
    }
    console.log(`Successfully generated campaign for ${topic}`);
    
    // Attempt to parse the JSON from the response
    const generatedCampaign = JSON.parse(generatedText);
    res.status(200).json({ generatedCampaign });

  } catch (error) {
    console.error('Error generating campaign with Requesty:', error.response?.data || error.message);
    console.log('Falling back to demo mode for campaign generation');
    const demoCampaign = generateDemoCampaign(topic);
    res.status(200).json({ generatedCampaign: demoCampaign });
  }
};

// Demo content generator for hackathon presentations
const generateDemoContent = (contentType, topic) => {
  const type = contentType.includes('blog-post') ? 'blog-post' :
               contentType.includes('social-media') ? 'social-media-post' :
               contentType.includes('email') ? 'email-newsletter' :
               contentType.includes('product') ? 'product-description' :
               contentType.includes('press') ? 'press-release' :
               contentType.includes('ad') ? 'ad-copy' :
               contentType.includes('video') ? 'video-script' :
               contentType.includes('landing') ? 'landing-page' : 'content';

  const templates = {
    'blog-post': `# The Ultimate Guide to ${topic}

In today's digital landscape, understanding ${topic} has become more crucial than ever. Whether you're a beginner looking to get started or an expert seeking to refine your approach, this comprehensive guide will provide you with the insights and strategies you need.

## Why ${topic} Matters

The importance of ${topic} cannot be overstated in our current environment. Recent studies show that businesses and individuals who master this area see significant improvements in their outcomes and overall success rates.

## Getting Started with ${topic}

Here are the key steps to begin your journey:

1. **Research and Planning**: Understanding the fundamentals is essential
2. **Implementation Strategy**: Develop a clear roadmap for success
3. **Monitoring and Optimization**: Continuously improve your approach
4. **Scaling and Growth**: Expand your efforts as you gain experience

## Best Practices and Tips

To maximize your success with ${topic}, consider these proven strategies:

- Focus on quality over quantity in your initial efforts
- Stay updated with the latest trends and developments
- Network with others in your field to share insights
- Measure your results and adjust your strategy accordingly

## Conclusion

Mastering ${topic} is a journey that requires dedication, continuous learning, and practical application. By following the strategies outlined in this guide, you'll be well-positioned to achieve your goals and drive meaningful results.

*Ready to take your ${topic} strategy to the next level? Start implementing these techniques today and watch your success grow.*`,

    'social-media-post': `🚀 Amazing insights about ${topic}! 

Did you know that ${topic} is transforming the way we think about success? Here's what I've learned:

✨ The key is consistency and authenticity
💡 Innovation happens when we step outside our comfort zone
🎯 Focus on value creation, not just metrics
🤝 Community building is essential for long-term growth

What's your experience with ${topic}? Drop your thoughts below! 👇

#${topic.replace(/\s+/g, '')} #Innovation #Growth #Success #Tips`,

    'email-newsletter': `Subject: Your Weekly ${topic} Update - Game-Changing Insights Inside!

Hi there! 👋

Welcome to this week's edition of your ${topic} newsletter. We've got some exciting updates and actionable insights to share with you.

**🔥 This Week's Highlights:**

• Latest trends in ${topic} that you can't ignore
• 3 proven strategies that are driving real results
• Exclusive tips from industry leaders
• Upcoming events and opportunities

**💡 Featured Insight:**
The landscape of ${topic} is evolving rapidly, and staying ahead of the curve is crucial for success. Our recent analysis shows that companies implementing these new approaches are seeing 40% better outcomes.

**📚 Recommended Reading:**
Check out our latest blog post on advanced ${topic} strategies that are reshaping the industry.

**🎯 Action Item for This Week:**
Try implementing one new strategy related to ${topic} and let us know how it goes!

Thanks for being part of our community. We appreciate your engagement and look forward to hearing about your successes.

Best regards,
The ${topic} Team

P.S. Don't forget to follow us on social media for daily tips and updates!`,

    'product-description': `**Premium ${topic} Solution - Transform Your Experience Today!**

Discover the power of our revolutionary ${topic} product, designed specifically for professionals and enthusiasts who demand excellence.

**🌟 Key Features:**
• Advanced functionality that sets new industry standards
• User-friendly interface designed for maximum efficiency  
• Premium materials and construction for lasting durability
• Comprehensive support and documentation included

**✅ Benefits You'll Love:**
- Save time with streamlined workflows
- Achieve professional-grade results every time
- Enjoy peace of mind with our quality guarantee
- Access exclusive features not available elsewhere

**🎯 Perfect For:**
Whether you're a beginner exploring ${topic} or a seasoned professional looking to upgrade, this solution adapts to your needs and grows with your expertise.

**💎 Why Choose Us:**
With over 10,000 satisfied customers and a 4.9-star rating, we're the trusted choice for ${topic} enthusiasts worldwide.

**Special Launch Offer:** Get 25% off your first order with code LAUNCH25

*Ready to elevate your ${topic} experience? Order now and join thousands of satisfied customers!*

**Free shipping • 30-day money-back guarantee • 24/7 customer support**`,

    'press-release': `FOR IMMEDIATE RELEASE

Revolutionary Breakthrough in ${topic} Announced

New Development Set to Transform Industry Standards and User Experience

[City, Date] - Today marks a significant milestone in the ${topic} industry with the announcement of groundbreaking innovations that promise to revolutionize how professionals and consumers approach this field.

**Key Highlights:**

The latest developments in ${topic} represent a paradigm shift that addresses long-standing challenges while opening new possibilities for growth and efficiency. Industry experts predict this will have far-reaching implications across multiple sectors.

"This advancement in ${topic} represents exactly what the market has been waiting for," said [Industry Expert Name], leading analyst at [Research Firm]. "The potential impact on both businesses and consumers cannot be overstated."

**Industry Impact:**

The new approach to ${topic} is expected to:
- Increase efficiency by up to 40%
- Reduce implementation costs significantly  
- Improve user satisfaction and engagement
- Set new standards for quality and performance

**About the Innovation:**

This breakthrough combines cutting-edge technology with practical applications, making ${topic} more accessible and effective than ever before. The solution has been tested extensively and validated by industry leaders.

**Looking Forward:**

As the ${topic} landscape continues to evolve, this development positions the industry for sustained growth and innovation. Market analysts project significant expansion in adoption rates over the coming months.

For more information about this breakthrough in ${topic}, please contact [Contact Information].

###

Media Contact:
[Name]
[Title]
[Phone]
[Email]`,

    'ad-copy': `🎯 **Transform Your ${topic} Results in Just 30 Days!**

Are you tired of struggling with ${topic}? Ready to see REAL results that make a difference?

**Introducing the ${topic} Solution That Actually Works!**

✅ **Proven Results**: Over 10,000 success stories
✅ **Fast Implementation**: See changes in just days
✅ **Expert Support**: Get help when you need it
✅ **Money-Back Guarantee**: Risk-free for 60 days

**What Makes Us Different:**
Unlike other ${topic} solutions that overpromise and underdeliver, we focus on practical, actionable strategies that work in the real world.

🔥 **Limited Time Offer:**
- 50% off your first month
- Bonus training materials (valued at $297)
- Free one-on-one consultation
- Access to exclusive community

**Don't Wait - This Offer Expires Soon!**

Thousands of people have already transformed their ${topic} results. Isn't it time you joined them?

👆 **Click the button above to get started today!**

*"This ${topic} solution changed everything for me. I wish I had found it sooner!" - Sarah M., Verified Customer*

**Act Now - Your Success in ${topic} is Just One Click Away!**`,

    'video-script': `[INTRO - 0:00-0:10]
🎬 **SCENE: Upbeat background music starts**

HOST: "Hey everyone! Welcome back to [Channel Name]. Today we're diving deep into ${topic}, and trust me, you don't want to miss this!"

[HOOK - 0:10-0:25]
"If you've ever wondered about ${topic}, or if you're looking to take your understanding to the next level, this video is for you. We're going to cover everything you need to know, plus some insider tips that most people never hear about."

[MAIN CONTENT - 0:25-3:30]

**SECTION 1: The Basics**
"Let's start with the fundamentals. ${topic} is something that affects all of us, but most people don't realize just how important it really is..."

[VISUAL: Show relevant graphics/examples]

**SECTION 2: Common Mistakes**  
"Now, here's where most people go wrong with ${topic}. I see these mistakes all the time, and they're completely avoidable if you know what to look for..."

**SECTION 3: Pro Tips**
"Alright, here's the good stuff - the strategies that actually work. I've been working with ${topic} for years, and these are the techniques that make all the difference..."

[ENGAGEMENT - 3:30-3:45]
"Quick question for you - what's been your biggest challenge with ${topic}? Let me know in the comments below, and I'll do my best to help you out!"

[CALL TO ACTION - 3:45-4:00]
"If you found this helpful, smash that like button and subscribe for more content like this. And don't forget to hit the notification bell so you never miss our latest videos!"

[OUTRO - 4:00-4:10]
"Thanks for watching, and I'll see you in the next one. Until then, keep exploring ${topic} and remember - you've got this!"

[END SCREEN: Subscribe button and related videos]`,

    'landing-page': `# Transform Your ${topic} Success Today!

## The #1 Solution Trusted by Over 50,000 Professionals

**Are you struggling with ${topic}? You're not alone.**

Most people face the same challenges when it comes to ${topic}. That's exactly why we created this comprehensive solution that gets results.

---

## ✅ **What You'll Get:**

🎯 **Complete ${topic} System**
Everything you need to succeed, laid out in simple, step-by-step format

💡 **Expert Strategies**  
Proven techniques used by industry leaders and top performers

📚 **Comprehensive Training**
Video tutorials, guides, and resources worth over $1,000

🤝 **Community Access**
Connect with like-minded individuals on the same journey

📞 **Direct Support**
Get help when you need it with our responsive support team

---

## 🚀 **Why Choose Our ${topic} Solution?**

**✓ Proven Track Record**: Over 50,000 success stories
**✓ Fast Results**: See improvements within 30 days
**✓ Expert Created**: Developed by industry professionals
**✓ Continuously Updated**: Always current with latest trends
**✓ Risk-Free**: 60-day money-back guarantee

---

## 💬 **What Our Customers Say:**

*"This ${topic} program completely changed my perspective. The results speak for themselves!"*
**- Sarah M., Marketing Professional**

*"I wish I had found this solution earlier. It would have saved me months of trial and error."*
**- Mike R., Business Owner**

*"The support team is incredible, and the content is top-notch. Highly recommend!"*
**- Lisa T., Consultant**

---

## 🎁 **Limited Time Bonus Package** (Value: $497)

When you join today, you'll also receive:
- Exclusive bonus training modules
- Templates and worksheets  
- Private community access
- 1-on-1 consultation session

---

## 💰 **Special Launch Pricing**

~~Regular Price: $497~~
**Today Only: $97**

*That's over 80% off the regular price!*

---

## 🛡️ **100% Risk-Free Guarantee**

Try our ${topic} solution for 60 days. If you're not completely satisfied, we'll refund every penny. No questions asked.

---

## 🔥 **Ready to Transform Your ${topic} Results?**

Don't let another day pass without taking action. Join thousands of others who have already transformed their ${topic} success.

**[GET INSTANT ACCESS NOW - $97]**

*Limited spots available. This offer expires in 48 hours.*

---

**Questions? Contact our support team at [email] or call [phone number]**

*© 2025 [Company Name]. All rights reserved. Privacy Policy | Terms of Service*`
  };

  return templates[type] || `This is a professionally generated piece of content about ${topic}. 

Our advanced AI system has analyzed your requirements and created this engaging, high-quality content that's perfect for your needs. The content is structured to be informative, engaging, and tailored to your specific topic.

Key benefits of this content:
- Professionally written and formatted
- Optimized for readability and engagement  
- Tailored to your specific topic and requirements
- Ready to use across multiple platforms

This demo showcases the power of AI-driven content generation, delivering results that would typically take hours to create manually, now available in seconds.

Contact us to learn more about how our full AI content generation platform can transform your content creation process!`;
};

const generateDemoCampaign = (topic) => {
  return {
    socialPosts: [
      { post: `🚀 Just launched our new guide on ${topic}! Discover the key strategies to succeed. #Demo`, hashtags: [`#${topic.replace(/\s+/g, '')}`, '#Innovation', '#Guide'] },
      { post: `What's the biggest challenge when it comes to ${topic}? We'd love to hear your thoughts! #Demo`, hashtags: [`#${topic.replace(/\s+/g, '')}`, '#Discussion', '#Community'] },
      { post: `Did you know? Mastering ${topic} can boost your results by over 50%. Learn how in our latest article. #Demo`, hashtags: [`#${topic.replace(/\s+/g, '')}`, '#ProTip', '#Success'] }
    ],
    blogIdea: {
      title: `The Ultimate 2025 Guide to ${topic}`,
      summary: `A deep dive into the core principles of ${topic}. This guide covers everything from the basics to advanced techniques for professionals.`
    },
    emailSubject: `Unlock the Secrets of ${topic} with Our New Guide!`
  };
};

module.exports = {
  generateContent,
  generateCampaign,
};