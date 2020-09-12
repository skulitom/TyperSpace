const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

let server = app.listen(PORT);
let AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

let dynamodb = new AWS.DynamoDB();

const params = {
    TableName : "Users",
    KeySchema: [
        { AttributeName: "money", KeyType: "HASH"},  //Partition key
        { AttributeName: "userName", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "money", AttributeType: "N" },
        { AttributeName: "userName", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

app.get('/', (req, res) => {
    res.send('Hello Typer Space!');
});

app.get('/getUserDetails/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        userName: 'Skulitom',
        money: 999
    }));
});

app.get('/createTable', (req, res) => {
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
});