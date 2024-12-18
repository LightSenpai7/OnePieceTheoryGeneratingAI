using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePieceTheoryGeneratingAI.Entities.Interface
{
    public interface IOpenAiService
    {
      Task<string> CompleteSentence(string category, string userThoughts);
    }
}
