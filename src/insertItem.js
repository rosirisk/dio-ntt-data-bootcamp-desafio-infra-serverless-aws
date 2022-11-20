"use strict";

const AWS = require("aws-sdk")

const insertItem = async (event) => {
//module.exports.insertItem = async (event) => {

  const {item} = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = AWS.util.uuid.v4();


  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const newItem = {
    id,
    item,
    createdAt,
    itemStatus: false
  }

  await dynamodb.put({
    TableName: "BookTable",
    Item: newItem
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify(newItem),
  };
};


module.exports = {
    handler:insertItem
}


