using Microsoft.AspNetCore.Mvc;
using OnePieceTheoryGeneratingAI.Entities.Interface;
using OnePieceTheoryGeneratingAI.Entities.ViewModels;
using System.Threading.Tasks;

namespace OnePieceTheoryGeneratingAI.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheoryController : ControllerBase
    {
        private readonly IOpenAiService _openAiService;

        public TheoryController(IOpenAiService openAiService)
        {
            _openAiService = openAiService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateTheory([FromBody] TheoryRequestViewModel request)
        {
            if (string.IsNullOrEmpty(request.Category) || string.IsNullOrEmpty(request.UserThoughts))
            {
                return BadRequest("Category and user thoughts cannot be empty.");
            }

            try
            {
                var theory = await _openAiService.CompleteSentence(request.Category, request.UserThoughts);

                var response = new TheoryResponse
                {
                    Theory = theory
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        public class TheoryResponse
        {
            public string Theory { get; set; }
        }

    }
}
