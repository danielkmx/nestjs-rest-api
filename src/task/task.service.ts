import { Injectable } from "@nestjs/common";
import * as dynamoose from 'dynamoose';
import * as aws from 'aws-sdk';
import * as uuid from 'uuid/v1';
import { create } from "domain";
import { Task } from './task';


@Injectable()
export class TaskService {
    private Task: dynamoose.ModelConstructor<any,any>;
    constructor(){
        dynamoose.AWS.config.update({
            accessKeyId: 'AKIAYGCBUBAZZCLXJVUI',
            secretAccessKey: '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',
            region: 'sa-east-1'
          });
          aws.config.update({
            accessKeyId: 'AKIAYGCBUBAZZCLXJVUI',
            secretAccessKey: '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',
            region: 'sa-east-1'
          });

        const taskObj = {ordemId: String,title: String,description: String};
        this.Task = dynamoose.model('table-ordem',taskObj);
    }
    async getTasks(){
        const filter = {
            FilterExpression: 'title = :title',
            ExpressionAttributeValues: {
              ':title': 'teste 1'
            }
          };
          
        return await 
        this.Task.
        scan(filter)
        .exec()
        .then((tasks) => {
            return tasks;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    async getTaskById(id: string)  {
        //     const resp = this.Task.get({ordemId: id}, (err,task) => {
        //     if(err) { return console.log(err);}
        //     console.log(task);
        //     return task;
        //   });
        //     return resp
        const db = new aws.DynamoDB.DocumentClient();
            var params = {
                TableName: 'table-ordem',
                Key:{
                    "ordemId": id
                }
            };
    
    const { Item } = await  db.get(params, function(err, data) {
            if (err) throw err;
        }).promise();
        return Item;
    }
    async createTask(title: string,description: string) {

        const createdTask = new this.Task({
            ordemId: uuid(),
            title,
            description
         });
         await createdTask.save();

        return createdTask;

        
    }
}