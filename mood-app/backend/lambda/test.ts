#!ts-node

import {DynamoDB} from "aws-sdk";
import {MoodItem, MoodLevel} from "./Model";
import {v4 as uuidv4} from "uuid";

const dynamoDb = new DynamoDB.DocumentClient();

console.log("Hello world")

const request = {
    TableName: 'mood-table',
    IndexName: "userId-index",
    KeyConditionExpression: 'userId = :id',
    ExpressionAttributeValues: {
        ':id': 'future-id',
    },
};

function moodToNumber(mood: MoodLevel): number {
    console.log("Mod: " + mood)
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

// const id = uuidv4();
// const item = {
//     createdAt: new Date().toISOString(),
//     id: id,
//     mood: 'Normal',
//     userId: 'future-id'
//
// } as MoodItem
// const setRequest = {
//     TableName: 'mood-table',
//     Item: item,
// }

// async function f() {
//     return await dynamoDb.put(setRequest).promise();
// }
//
// f();

const a = dynamoDb.query(request, (err, data) =>{
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(err));

        const items: Map<string, number> = new Map();

        data.Items?.map(r => r as MoodItem).map(i => {
            i.createdAt = i.createdAt.split('T')[0];
            return i
            // }).reduce(reducer(response.Items?.length), items)
        }).reduce((acc: Map<string, number>, moodItem: MoodItem, index: number) => {
            const key = moodItem.createdAt;
            console.log("KEY: " + key)
            if (!acc.get(key)) {
                acc = acc.set(key, moodToNumber(moodItem.mood))
                console.log("ACC1: " + JSON.stringify(items))
            } else {
                // @ts-ignore
                acc = acc.set(key, moodToNumber(moodItem.mood) + acc.get(key))
                console.log("ACC2: " + JSON.stringify(items))
            }
            if(index + 1 == data.Items?.length) {
                // @ts-ignore
                acc =  acc.set(key, (acc.get(key) / (index + 1)).toFixed(1))
                console.log("ACC3: " + JSON.stringify(items))
            }
            console.warn(JSON.stringify(items))
            return acc;
        }, items)


        console.error("D" + JSON.stringify(data.Items));
        console.error("I" + JSON.stringify(items));


        console.log(items)

    });


