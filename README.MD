# Hawkeye

Hawkeye is a project designed to manage organizations and repositories, and to perform secure code reviews using AI models.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

## Installation

1. Clone the repository:
    ```sh
    git clone 
    cd coderobot
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the necessary environment variables (see Environment Variables).

4. Start the application:
    ```sh
    npm start
    ```

## Usage

The application exposes several API endpoints to manage organizations and repositories, and to perform secure code reviews. You can use tools like Postman or cURL to interact with the API.

## API Endpoints

### Organization

- **Create Organization**
    ```http
    POST /organization/create
    ```
    Request Body:
    ```json
    {
        "name": "Organization Name",
        "url": "https://github.com/org",
        "key": "org-key",
        "apiKey": "your-api-key"
    }
    ```

- **Get All Organizations**
    ```http
    GET /organization/get
    ```

- **Get Organization by ID**
    ```http
    GET /organization/get/:id
    ```

- **Update Organization**
    ```http
    PUT /organization/update/:id
    ```
    Request Body:
    ```json
    {
        "name": "Updated Organization Name",
        "url": "https://github.com/org",
        "key": "org-key",
        "apiKey": "your-api-key"
    }
    ```

- **Delete Organization**
    ```http
    DELETE /organization/delete/:id
    ```

### Repository

- **Create Repository**
    ```http
    POST /repository/create
    ```
    Request Body:
    ```json
    {
        "name": "Repository Name",
        "slug": "repo-slug",
        "url": "https://github.com/org/repo",
        "repositoryId": 123456,
        "organization": "org-id",
        "ignore": ["node_modules", "dist"]
    }
    ```

- **Get All Repositories**
    ```http
    GET /repository/get
    ```

- **Get Repository by ID**
    ```http
    GET /repository/get/:id
    ```

- **Update Repository**
    ```http
    PUT /repository/update/:id
    ```
    Request Body:
    ```json
    {
        "name": "Updated Repository Name",
        "slug": "updated-repo-slug",
        "url": "https://github.com/org/repo",
        "repositoryId": 123456,
        "organization": "org-id",
        "ignore": ["node_modules", "dist"]
    }
    ```

- **Sync Repository**
    ```http
    PUT /repository/sync/:id
    ```

- **Delete Repository**
    ```http
    DELETE /repository/delete/:id
    ```

### Agent

- **Check for False Positives**
    ```http
    POST /agent/checkForFalsePositives
    ```
    Request Body:
    ```json
    {
        "repositoryId": "repo-id",
        "sarifContent": {}
    }
    ```

## Environment Variables

Create a [.env](http://_vscodecontentref_/2) file in the root directory and add the following environment variables:

```env
SUPABASE_SERVICE_KEY=your-supabase-service-key
SUPABASE_URL=your-supabase-url
OPENAI_API_KEY=your-openai-api-key
OLLAMA_BASE_URL=your-ollama-base-url
MODEL_TYPE=openai or ollama