# Azure Function: HTTP Trigger with External API Call

This project contains an Azure Function implemented in TypeScript. It processes HTTP POST requests, reads the correlation ID from the request body, fetches categories from an external API, and returns a structured JSON response.

## Prerequisites

- Node.js
- Azure Functions Core Tools
- Azure Subscription
- `axios` library

## Project Structure

- `index.ts`: The main Azure Function implementation.
- `package.json`: Contains the dependencies and scripts for the project.

## Installation

1. **Clone the repository**:
    ```sh
    git clone <repository_url>
    cd <repository_name>
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

## Function Description

This Azure Function is an HTTP trigger that performs the following steps:

1. **Processes the HTTP Request**:
    - Reads and parses the request body to extract the correlation ID.
2. **Fetches Categories**:
    - Makes an HTTP GET request to `https://dummyjson.com/products/categories` to fetch product categories.
3. **Builds the Response**:
    - Constructs a JSON response including the correlation ID and fetched categories.
4. **Returns the Response**:
    - Returns the structured JSON response with HTTP status 200.

## Detailed Code Explanation

### Key Components

1. **Claims Class**:
    - Represents the claims with optional `CorrelationId`, `DateOfBirth`, `ApiVersion`, `CustomRoles`, and `Categories`.

2. **Action Class**:
    - Represents an action containing claims.

3. **Data Class**:
    - Represents the data containing actions.

4. **ResponseContent Class**:
    - Represents the response content containing data.

5. **httpTrigger Function**:
    - Processes the HTTP request.
    - Reads and parses the request body to extract the `correlationId`.
    - Fetches categories from the external API.
    - Constructs the response content.
    - Returns the response with status 200.

### Installation of Axios

Ensure `axios` is installed as a dependency:

```sh
npm install axios
```

### Deployment

1. **Deploy to Azure**:
    - Ensure you have the Azure Functions Core Tools installed.
    - Log in to your Azure account using the Azure CLI:
        ```sh
        az login
        ```
    - Deploy the function to Azure:
        ```sh
        func azure functionapp publish <Your_Function_App_Name>
        ```
