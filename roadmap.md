# InQuest Project

## Project Overview

**InQuest** is an AI-powered debugging assistant designed to help developers quickly identify issues in their code and receive actionable fixes with detailed explanations. The project aims to streamline the debugging process, allowing developers to focus on building instead of spending time figuring out error messages.

**Objective:**
- Build an API that can analyze code for issues.
- Provide clear, actionable fixes for the issues.
- Offer explanations of these fixes for educational purposes.
- Support multiple programming languages (starting with Python and JavaScript).

## Technical Architecture

**Backend:**
- **Language:** Python (using FastAPI for API development).
- **AI Integration:** OpenAI Codex/ChatGPT API for code analysis and fix suggestions.
- **Database:** PostgreSQL for user management, session tracking, and logging.
- **Deployment:** Docker, AWS, or DigitalOcean for hosting and cloud integration.

**Frontend (optional for MVP):**
- Command Line Interface (CLI) or a simple React front-end for visualizing the fixes.
- Could later expand to integrate with code editors like VSCode.

## Database Design

The database needs to store user information, code analysis history, and user interactions with the debugging assistant. The MVP can use a simple schema that you can expand upon later.

**Entities:**
- **User**: Store basic information about users.
  - Fields: `id`, `email`, `password_hash`, `created_at`
- **Code Analysis**: Store the code the user uploaded, and the analysis results.
  - Fields: `id`, `user_id`, `code`, `analysis_results`, `fix_suggestions`, `created_at`, `updated_at`
- **Session**: Track user sessions and interactions.
  - Fields: `id`, `user_id`, `session_start`, `session_end`, `interactions_count`

## API Design

The API will provide endpoints for analyzing code, getting fixes, and offering explanations. These endpoints will communicate with the OpenAI API to generate code fixes.

**Endpoints:**
1. **POST /analyze**
   - **Description:** Analyze the provided code and return the identified issues.
   - **Body:**
     ```json
     {
       "language": "python", 
       "code": "print('Hello World')"
     }
     ```
   - **Response:**
     ```json
     {
       "issues": ["IndentationError: unexpected indent"],
       "suggestions": ["Fix indentation"]
     }
     ```

2. **POST /fix**
   - **Description:** Get detailed fix suggestions and explanations.
   - **Body:**
     ```json
     {
       "language": "python",
       "code": "print('Hello World')",
       "issue": "IndentationError"
     }
     ```
   - **Response:**
     ```json
     {
       "fix": "Add proper indentation before the print statement.",
       "explanation": "Python relies on indentation to define code blocks, and the incorrect indentation results in an error."
     }
     ```

## Integration with OpenAI

OpenAI's Codex or ChatGPT API will be used to analyze code and suggest fixes. The API can be called asynchronously from the backend.

**Setup:**
1. Install the OpenAI Python package:
   ```bash
   pip install openai
   ```
2. Configure the OpenAI API key securely in the project:
   - Use environment variables or a secrets management system to store the API key.
3. Example API call:
   ```python
   import openai

   openai.api_key = "YOUR_API_KEY"

   def get_code_fix(code, language):
       response = openai.Completion.create(
           model="code-davinci-002",  # Codex model
           prompt=f"Fix the following code in {language}: {code}",
           max_tokens=150
       )
       return response.choices[0].text.strip()
   ```

## Backend Development (FastAPI)

FastAPI Setup:
1. Install FastAPI and Uvicorn:
   ```bash
   pip install fastapi uvicorn
   ```
2. Example FastAPI setup for handling code analysis:
   ```python
   from fastapi import FastAPI
   from pydantic import BaseModel
   import openai

   app = FastAPI()

   class CodeRequest(BaseModel):
       language: str
       code: str

   @app.post("/analyze")
   async def analyze_code(request: CodeRequest):
       issues = get_code_issues(request.code)
       suggestions = get_code_fix(request.code, request.language)
       return {"issues": issues, "suggestions": suggestions}
   ```

## Deployment

1. **Dockerize the Application**
   Use Docker to containerize both the backend and the frontend (if built).
   - **Dockerfile for FastAPI**:
     ```dockerfile
     FROM python:3.9-slim

     WORKDIR /app

     COPY . /app

     RUN pip install -r requirements.txt

     CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
     ```

2. **Cloud Deployment (AWS, DigitalOcean, or Heroku):**
   - Use a platform like Heroku for quick deployment in the MVP phase.
   - For more control, use AWS EC2 or DigitalOcean to deploy the app.

## Testing and Quality Assurance

- **Unit Tests**: Write unit tests for the backend logic, especially for analyzing code and generating fixes. Use `pytest` for testing.
- **API Testing**: Use Postman or `requests` in Python to test API endpoints.
- **Performance Testing**: Test the application under load to ensure it can handle multiple concurrent requests.
