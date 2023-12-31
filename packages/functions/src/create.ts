import { Table } from 'sst/node/table';
import * as uuid from 'uuid';
import handler from '@notes/core/handler';
import dynamoDb from '@notes/core/dynamodb';

export const main = handler(async (event: any) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});

// import * as uuid from 'uuid';
// import AWS from 'aws-sdk';
// import { Table } from 'sst/node/table';

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// export async function main(event: { body: any }) {
//   // Request body is passed in as a JSON encoded string in 'event.body'
//   const data = JSON.parse(event.body);

//   const params = {
//     TableName: Table.Notes.tableName,
//     Item: {
//       // The attributes of the item to be created
//       userId: '123', // The id of the author
//       noteId: uuid.v1(), // A unique uuid
//       content: data.content, // Parsed from request body
//       attachment: data.attachment, // Parsed from request body
//       createdAt: Date.now(), // Current Unix timestamp
//     },
//   };

//   try {
//     await dynamoDb.put(params).promise();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(params.Item),
//     };
//   } catch (e: any) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: e.message }),
//     };
//   }
// }
