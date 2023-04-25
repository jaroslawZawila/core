import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';


const dynamoDb = new DynamoDB.DocumentClient();

interface SaveMoodRequest   {
    userId: string,
    mood: string
}

interface SaveMoodItem  {
    id: string,
    userId: string,
    mood: string,
    createdAt: string
}

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    // console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    // console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    if (event.body !== null) {
        const body = JSON.parse(event.body) as SaveMoodRequest
        const uuid = uuidv4();
        const item = {
            createdAt: new Date().toISOString(),
            id: uuid,
            ...body
        } as SaveMoodItem
        const request = {
            TableName: 'mood-table',
            Item: item,
        }

        try {
            console.log("Request: " + JSON.stringify(request))
            console.log("Body: " + JSON.stringify(body))
            await dynamoDb.put(request).promise();
            return {
                statusCode: 200,
                body: JSON.stringify({
                    mood: body.mood,
                    type: 'acknowledge'
                }),
            };
        } catch (error) {
            console.error(error);

            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: 'Cannot save the request. See logs for error.',
                }),
            };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'Body has to be provided',
            }),
        };
    }
};
