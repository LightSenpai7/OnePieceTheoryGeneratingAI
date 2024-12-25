import axios from 'axios';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = import.meta.env.VITE_OPENAI_API_URL;

export const generateOnePieceTheory = async (category: string, userThoughts: string) => {
    const messages = [{
        role: "system",
        content: "You are a One Piece expert with in-depth knowledge of the manga, anime, and fan theories."
    }, {
        role: "user",
        content: `Generate a plausible and detailed theory based on the following inputs:
    Category: ${category}
    User's Thoughts: ${userThoughts}

    Please divide the theory into the following well-structured sections:

    1. **Introduction**:
       - Begin with an engaging summary of the theory.
       - Explain why this theory is significant within the One Piece universe.
       - Provide a brief outline of what will be covered.

    2. **Existing Information**:
       - List and explain key details from the manga, anime, SBS, databooks, fan theories, and resources such as the One Piece Wiki - Fandom.
       - Highlight specific story arcs, character actions, or historical events that support this theory.
       - Be specific about quotes, chapter numbers, or notable events.

    3. **Theory Development**:
       - Elaborate on the central idea of the theory.
       - Explain how this theory logically connects to established story elements.
       - Explore character motivations, unresolved mysteries, or symbolic connections.
       - Discuss any implications or predictions related to future story developments.
       - Use at least two to three examples to solidify the argument.

    4. **Conclusion**:
       - Clearly state whether this theory is plausible or not based on the One Piece universe and its established lore.
       - If the theory is plausible, explicitly state why it is significant and how it impacts the story, characters, and themes.
       - If the theory is not plausible, provide clear reasons for its inconsistency and suggest how the inputs could inspire alternative theories.
       - Reflect on how this theory contributes to fan discussions and the broader understanding of One Piece lore.
       - Finally, discuss any implications or predictions for future developments in the series.

       Each section must be detailed, logical, and supported by evidence. Avoid overly speculative ideas, and ensure the theory aligns with established One Piece lore. Use a professional and structured tone to deliver a coherent and immersive experience.`

    }];

    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: 2000,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const cleanedText = cleanMarkdown(response.data.choices[0].message.content);
        return addHeadingsToTheory(cleanedText);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message);
        } else {
            console.error('Error generating theory:', error);
        }
        throw error;
    }
};

const cleanMarkdown = (text: string) => {
    return text
        .replace(/(\*\*|\*|__|_|\#|\-|\d\.)/g, '')
        .replace(/\n+/g, '\n')
        .trim();
};

const addHeadingsToTheory = (text: string) => {
    return text
        .replace(/(Introduction)/g, '<h6 class="mt-4"><strong>$1:</strong></h6>')
        .replace(/(Existing Information)/g, '<h6 class="mt-4"><strong>$1:</strong></h6>')
        .replace(/(Theory Development)/g, '<h6 class="mt-4"><strong>$1:</strong></h6>')
        .replace(/(Conclusion)/g, '<h6 class="mt-4"><strong>$1:</strong></h6>');
};