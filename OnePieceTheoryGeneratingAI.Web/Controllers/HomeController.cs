using System.Diagnostics;
using System.Net.Http;
using System.Text.Json;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using OnePieceTheoryGeneratingAI.Web.Models;
using OnePieceTheoryGeneratingAI.Entities.ViewModels;

namespace OnePieceTheoryGeneratingAI.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHttpClientFactory _httpClientFactory;

        public HomeController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;

        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(string category, string userThoughts)
        {
            if (string.IsNullOrEmpty(category) || string.IsNullOrEmpty(userThoughts))
            {
                ViewBag.Error = "Please fill out all fields.";
                return View("Index");
            }

            try
            {
                var client = _httpClientFactory.CreateClient();
                var requestUrl = "http://localhost:5127/api/Theory/generate";

                var requestData = new
                {
                    category,
                    userThoughts
                };

                var content = new StringContent(
                    JsonSerializer.Serialize(requestData),
                    Encoding.UTF8,
                    "application/json"
                );

                var response = await client.PostAsync(requestUrl, content);

                if (!response.IsSuccessStatusCode)
                {
                    ViewBag.Error = $"API Error: {response.ReasonPhrase}";
                    return View("Index");
                }

                var responseData = await response.Content.ReadAsStringAsync();
                var theoryResponse = JsonSerializer.Deserialize<TheoryResponseViewModel>(responseData);

                return Json(new { success = true, theory = theoryResponse?.theory ?? "No theory generated." });

            }
            catch (Exception ex)
            {
                ViewBag.Error = $"An error occurred: {ex.Message}";
            }

            return View("Index");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
