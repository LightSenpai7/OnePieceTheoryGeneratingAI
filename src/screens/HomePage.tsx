import MontserratText from '../components/MontserratText';
import softwareImage from '../assets/software.svg';

const HomePage = () => {
  const steps = [
    {
      id: 1,
      title: 'Choose a Category',
      description: 'Select the category that interests you (Character, Episode, or Universe).'
    },
    {
      id: 2,
      title: 'Enter Your Thoughts',
      description: 'Share your ideas and thoughts about the theory. The AI will use them to generate a detailed theory.'
    },
    {
      id: 3,
      title: 'Get Your Theory',
      description: 'Receive a complete, well-structured theory based on your input, powered by AI.'
    }
  ];

  const features = [
    {
      icon: "bi bi-lightning-charge-fill",
      title: "AI-Powered Theories",
      description: "The AI generates detailed and well-reasoned theories using OpenAI's GPT-4, tailored to the One Piece universe."
    },
    {
      icon: "bi bi-shield-lock-fill",
      title: "Structured Output",
      description: "Theories are divided into clear sections (Introduction, Existing Information, Theory Development, Conclusion) for a professional and logical flow."
    },
    {
      icon: "bi bi-file-earmark-code-fill",
      title: "Open Source",
      description: "The project is licensed under the MIT License. Feel free to contribute and modify as you wish."
    },

  ];
  return (
    <>

      <div className="row">
        <div className="col-11 col-md-6">
          <img
            src={softwareImage}
            alt="Software"
            className="img-fluid"
          />
        </div>

        <div
          className="col-11 col-md-5 "
          style={{
            marginTop: '12%',
            marginBottom: '15%',
            marginLeft: '5%'
          }}
        >
          <MontserratText uniquifier="title" fontSize="50px" lineHeight="normal" marginBottom="20px" weight={800}>
            One Piece Theory Generator
          </MontserratText>
          <p>Unleash the power of AI to create detailed, logical One Piece fan theories. Powered by OpenAI's GPT-4</p>
          <div className="d-flex justify-content-left mt-3"><a href="/ai-theory-generator" className="btn btn-primary btn-lg mx-2">Get Started</a><a href="https://github.com/LightSenpai7/OnePieceTheoryGeneratingAI" target="_blank" rel="noopener noreferrer" className="btn btn-light btn-lg mx-2">View on GitHub</a></div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row mb-4 text-center">
          <h2 className="fw-bold">How It Works</h2>
          <p>Follow these steps to get started</p>
        </div>

        <div className="row justify-content-center">
          {steps.map((step) => (
            <div key={step.id} className="col-12 col-sm-6 col-lg-4 mb-4">
              <div className="process-item border border-1 shadow-sm rounded p-4 text-center">
                <div
                  className="process-item-counter bg-primary text-white rounded-circle mx-auto mb-3 d-flex justify-content-center align-items-center"
                  style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
                >
                  {step.id}
                </div>
                <h3 className="process-item-heading item-heading-large fw-bold">{step.title}</h3>
                <p className="process-item-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Key Features</h2>
          <p className="text-muted">Discover what makes us unique</p>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-1 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className={`${feature.icon} text-primary fs-1 mb-3`}></i>
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text text-muted">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="text-center mb-5 mt-5">
        <h2 className="text-primary mb-3">MIT License</h2>
        <p>
          This project is licensed under the <a href="https://github.com/LightSenpai7/OnePieceTheoryGeneratingAI" target="_blank" rel="noopener noreferrer">MIT License</a>.
          You are free to use, modify, and distribute the code.
        </p>
      </section>

    </>
  );
};

export default HomePage;
