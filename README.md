# One Piece Theory Generating AI

## Description
This project is a web application that generates theories related to the One Piece universe using OpenAI's API. It provides an interactive interface for users to input their thoughts and receive detailed theories structured in a coherent format.

## Technologies Used
- **ReactJS**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Bootstrap**: A front-end framework for developing responsive and mobile-first websites.
- **OpenAI API**: Used to generate theories based on user input.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/LightSenpai7/OnePieceTheoryGeneratingAI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd OnePieceTheoryGeneratingAI
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your OpenAI API key:
   ```plaintext
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_OPENAI_API_URL=https://api.openai.com/v1/chat/completions
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Once the development server is running, you can access the application at `http://localhost:3000`. The application allows users to input a category and their thoughts, and it generates a detailed theory based on the One Piece universe.

## File Structure

- **src/**
  - **api/**: Contains API calls to OpenAI.
  - **components/**: Contains reusable components like `Layout` and `Modal`.
  - **screens/**: Contains different screens like `Home` and `AITheoryGenerator`.
  - **routes/**: Defines the application routes.
  - **types/**: TypeScript interfaces for type safety.
  - **index.css**: Global styles for the application.
  - **App.tsx**: Main application component.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [MIT License](https://github.com/LightSenpai7/OnePieceTheoryGeneratingAI/blob/master/LICENSE) file for details.
