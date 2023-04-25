import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

interface SaveMoodItem  {
    id: string,
    mood: string,
    createdAt: string
}

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    // @ts-ignore
    const { id } = event.pathParameters;

    const request = {
        TableName: 'mood-table',
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': "id",
        },
    };

        try {
            const response = await dynamoDb.query(request).promise();
            const items = response.Items?.map(r => r as SaveMoodItem)

            return {
                statusCode: 200,
                body: JSON.stringify({
                    items: items
                }),
            };
        } catch (error) {
            console.error(error);

            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: 'Cannot retrieve the data. See logs for error.',
                }),
            };
        }
};
