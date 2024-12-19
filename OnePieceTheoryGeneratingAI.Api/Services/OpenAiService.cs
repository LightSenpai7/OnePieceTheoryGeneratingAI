using OpenAI_API;
using OpenAI_API.Chat;
using Microsoft.Extensions.Options;
using OnePieceTheoryGeneratingAI.Api.Configurations;
using System.Collections.Generic;
using System.Threading.Tasks;
using OnePieceTheoryGeneratingAI.Entities.Interface;

namespace OnePieceTheoryGeneratingAI.Api.Services
{
    public class OpenAiService : IOpenAiService
    {
        private readonly OpenAiConfig _openAiConfig;
        private readonly OpenAIAPI _openAiClient;

        public OpenAiService(IOptionsMonitor<OpenAiConfig> optionsMonitor)
        {
            _openAiConfig = optionsMonitor.CurrentValue;
            _openAiClient = new OpenAIAPI(_openAiConfig.Key);
        }

        public async Task<string> CompleteSentence(string category, string userThoughts)
        {
            var prompt = $"You are a One Piece expert with in-depth knowledge of the manga, anime, and fan theories. " +
              $"Your task is to generate a plausible and detailed theory based on the following inputs:\n" +
                  $"Category: {category}\n" +
                  $"User's Thoughts: {userThoughts}\n\n" +
                    "Please divide the theory into the following well-structured sections:\n\n" +
                    "1. **Introduction**:\n" +
                    "   - Begin with an engaging summary of the theory.\n" +
                    "   - Explain why this theory is significant within the One Piece universe.\n" +
                    "   - Provide a brief outline of what will be covered.\n\n" +
                    "2. **Existing Information**:\n" +
                    "   - List and explain key details from the manga, anime, SBS, databooks, and fan theories.\n" +
                    "   - Highlight specific story arcs, character actions, or historical events that support this theory.\n" +
                    "   - Be specific about quotes, chapter numbers, or notable events.\n\n" +
                    "3. **Theory Development**:\n" +
                    "   - Elaborate on the central idea of the theory.\n" +
                    "   - Explain how this theory logically connects to established story elements.\n" +
                    "   - Explore character motivations, unresolved mysteries, or symbolic connections.\n" +
                    "   - Discuss any implications or predictions related to future story developments.\n" +
                    "   - Use at least two to three examples to solidify the argument.\n\n" +
                    "4. **Conclusion**:\n" +
                    "   - Clearly state whether this theory is plausible or not based on the One Piece universe and its established lore.\n" +
                    "   - If the theory is plausible, explicitly state why it is significant and how it impacts the story, characters, and themes.\n" +
                    "   - If the theory is not plausible, provide clear reasons for its inconsistency and suggest how the inputs could inspire alternative theories.\n" +
                    "   - Reflect on how this theory contributes to fan discussions and the broader understanding of One Piece lore.\n" +
                    "   - Finally, discuss any implications or predictions for future developments in the series." +
                    "Each section must be detailed, logical, and supported by evidence. Avoid overly speculative ideas, and ensure the theory aligns with established One Piece lore. Use a professional and structured tone to deliver a coherent and immersive experience.";


            var request = new ChatRequest
            {
                Model = OpenAI_API.Models.Model.ChatGPTTurbo,
                Messages = new List<ChatMessage>
                {
                    new ChatMessage(ChatMessageRole.System, "You are Eiichiro Oda's storytelling assistant, with an in-depth knowledge of One Piece, including the manga, anime, databooks, SBS, and fan theories. Always generate creative yet plausible theories."),
                    new ChatMessage(ChatMessageRole.User, prompt)
                }
            };

            try
            {
                var response = await _openAiClient.Chat.CreateChatCompletionAsync(request);

                if (response.Choices != null && response.Choices.Count > 0)
                {
                    return response.Choices[0].Message.Content.Trim();
                }

                return "No completion received.";
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"Error: {ex.Message}");
                return "An error occurred while generating the theory.";
            }
        }
    }
}
