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
            var prompt = $"Category: {category}\n" +
                $"User's thoughts: {userThoughts}\n" +
                "Based on the given category and user's input, craft a plausible One Piece theory that:\n" +
                "- Aligns with the established One Piece universe, including manga, anime, SBS, and databooks.\n" +
                "- References relevant story arcs, characters, and events logically.\n" +
                "- Explains characters' motivations and actions in a realistic way.\n" +
                "- Avoids impossible or overly speculative scenarios, focusing on grounded possibilities.\n" +
                "- Integrates recent manga revelations and fan-supported ideas creatively.\n" +
                "- Balances originality with acknowledgment of popular fan theories.\n" +
                "- Provides clear reasoning and connects seamlessly with existing story elements.\n" +
                "Deliver a detailed and thoughtful theory that enhances the One Piece experience.";


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
