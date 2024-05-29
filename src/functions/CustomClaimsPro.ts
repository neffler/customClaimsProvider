import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import axios from 'axios';

// Class to represent the claims
class Claims {
    correlationId?: string;
    dateOfBirth: string;
    apiVersion: string;
    customRoles: string[];
    Categories?: string[];

    // Constructor to initialize the claims
    constructor(correlationId?: string, categories?: string[]) {
        this.correlationId = correlationId;
        this.dateOfBirth = "01/01/2000";
        this.apiVersion = "1.0.0";
        this.customRoles = ["Writer", "Editor"];
        this.Categories = categories;
    }
}

// Class to represent an action containing claims
class Action {
    "@odata.type": string;
    claims: Claims;

    // Constructor to initialize the action with claims
    constructor(correlationId?: string, categories?: string[]) {
        this["@odata.type"] = "microsoft.graph.tokenIssuanceStart.provideClaimsForToken";
        this.claims = new Claims(correlationId, categories);
    }
}

// Class to represent the data containing actions
class Data {
    "@odata.type": string;
    actions: Action[];

    // Constructor to initialize the data with actions
    constructor(correlationId?: string, categories?: string[]) {
        this["@odata.type"] = "microsoft.graph.onTokenIssuanceStartResponseData";
        this.actions = [new Action(correlationId, categories)];
    }
}

// Class to represent the response content
class ResponseContent {
    data: Data;

    // Constructor to initialize the response content with data
    constructor(correlationId?: string, categories?: string[]) {
        this.data = new Data(correlationId, categories);
    }
}

// HTTP trigger function to handle the request
async function httpTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log("TypeScript HTTP trigger function processed a request.");

    // Read and parse the request body
    const requestBody = await request.text();
    const data = JSON.parse(requestBody);

    // Read the correlation ID from the Microsoft Entra request    
    const correlationId = data?.data?.authenticationContext?.correlationId;

    // Fetch categories from the external endpoint
    let categories: string[] = [];
    try {
        const response = await axios.get('https://dummyjson.com/products/category-list');
        categories = response.data;
    } catch (error) {
        context.log("Error fetching categories:", error);
    }

    // Build response content
    const responseContent = new ResponseContent(correlationId, categories);

    // Return the response
    return {
        status: 200,
        jsonBody: responseContent
    };
}

// Register the HTTP trigger function with Azure Functions
app.http('httpTrigger', {
    methods: ['POST'],
    authLevel: 'function',
    handler: httpTrigger
});