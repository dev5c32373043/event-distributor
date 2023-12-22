# Simple Event Distributor Concept

This API service demonstrates the distribution of events across various destinations while utilizing JWT user authentication.

To submit events, the endpoint `[POST] /api/events` expects an event adhering to this specific schema:

```js
{
   "payload": {...},
   "possibleDestinations": [{ "destination1": true }, { "destination2": false }],
   "strategy": "ANY" // Options: ALL | ANY | Custom client function returning an array with matched destination names: (possibleDestinations) => {...}, Default: ALL
}
```

The event distribution is determined by the chosen strategy. The ALL strategy routes the event to a destination if all specified intents for that destination are true. Meanwhile, the ANY strategy routes the event to a destination if any of the specified intents are true.

Upon applying the strategy, the system retrieves the complete configuration object for all matched destinations. This object contains a transport property that defines the transporter method (e.g., http, console) and its specific action (e.g., get, post, put, patch, delete for http).

Upon completion of the transport process, the service returns a response detailing the destinations utilized in handling the event.

```json
{
  "delivered": ["destination1"]
}
```

## Getting started

To start the project install all dependencies in requirements section.
Add `.env` file in each project (`.env.example` as an example)

Install npm packages:

```
npm install
```

And finally execute the following command to run dev server:

```
npm run start:dev
```

Or if you prefer Docker, this command will suffice:

```
docker compose up
```

To enable the functionality of custom client functions, it's necessary to create an AWS Lambda function coupled with an API Gateway POST endpoint. This endpoint should be authorized using an API token present in the header (x-api-key).

The Lambda function's basic structure might resemble the following (please note: this example is not a production-ready solution):

```js
export const handler = async event => {
  if (!Array.isArray(event.data) || !event.code) {
    return { statusCode: 400 };
  }

  try {
    const result = eval(`const fn = ${event.code}; fn(${JSON.stringify(event.data)})`);
    if (!Array.isArray(result) || result.some(el => typeof el !== 'string')) {
      return {
        statusCode: 400,
        error: 'Result type is not string[]'
      };
    }

    return {
      result,
      statusCode: 200
    };
  } catch (error) {
    return {
      error,
      statusCode: 500
    };
  }
};
```

[API DOCUMENTATION](https://documenter.getpostman.com/view/467381/2s9YkrbfSu)

## Requirements

- [Node.js][node] 20.10.0+
- [MongoDB][mongo] 5.0.2+

[node]: https://nodejs.org/
[mongo]: https://www.mongodb.com/
