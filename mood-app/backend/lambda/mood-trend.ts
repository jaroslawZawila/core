import {APIGatewayEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {DynamoDB} from 'aws-sdk';
import {MoodItem, MoodLevel} from "./Model";
import { TrendResponse } from 'mood-shared';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    // @ts-ignore
    console.log("Event: "+ JSON.stringify(event))
    console.log("Context: "+ JSON.stringify(context))
    console.log("Path: "+ JSON.stringify(event.pathParameters))
    const { userId } = event.pathParameters;

    const request = {
        TableName: 'mood-table',
        IndexName: "userId-index",
        KeyConditionExpression: 'userId = :id',
        ExpressionAttributeValues: {
            ':id': userId,
        },
    };

    try {
        const response = await dynamoDb.query(request).promise();
        const itemss: Map<string, number[]> = new Map();

        response.Items?.map(r => r as MoodItem).map(i => {
            i.createdAt = i.createdAt.split('T')[0];
            return i
        }).reduce(reducer, itemss)

        const itemsss = Array.from(itemss.entries())
            .map(([key, value]) => {
                console.log('Key:' + key)
                console.log('numbers: ' + JSON.stringify(value) )
                return [key, ((value.reduce((a, b) => {return a + b}, 0)) / value.length).toFixed(1)]
            });
        const items = new Map(itemsss);

        const apiResponse = {
            id: userId,
            dates: [...items.keys()],
            values: [...items.values()]
        } as TrendResponse;

        return {
            statusCode: 200,
            body: JSON.stringify(apiResponse),
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

//TODO: Re-do this
const reducer = (acc: Map<string, number[]>, moodItem: MoodItem) => {
    const key = moodItem.createdAt;
    if (!acc.get(key)) {
        acc.set(key, [])
    }

    acc.set(key, [ moodToNumber(moodItem.mood), ...acc.get(key)])

    return acc;
}

function moodToNumber(mood: MoodLevel): number {
    switch (mood) {
        case MoodLevel.Depressed:
            return 1;
        case MoodLevel.Down:
            return 2;
        case MoodLevel.Normal:
            return 3;
        case MoodLevel.Up:
            return 4;
        case MoodLevel.Excited:
            return 5;
        default:
            return 0;
    }
}
