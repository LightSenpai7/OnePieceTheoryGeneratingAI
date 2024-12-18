using OnePieceTheoryGeneratingAI.Api.Configurations;
using OnePieceTheoryGeneratingAI.Api.Services;
using OnePieceTheoryGeneratingAI.Entities.Interface;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddSwaggerGen(); 
builder.Services.Configure<OpenAiConfig>(builder.Configuration.GetSection("OpenAI"));

builder.Services.AddScoped<IOpenAiService, OpenAiService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); 
    app.UseSwaggerUI();  
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
