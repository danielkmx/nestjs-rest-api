import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './model/CreateTaskDTo';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService){}

    @Get()
    getTasks() {
        return this.taskService.getTasks();
    }
    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        //const resp = await this.taskService.getTaskById(id);
       // console.log(resp);
       return  await this.taskService.getTaskById(id);
    }
    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        return await this.taskService.createTask(createTaskDto.title,createTaskDto.description);
    }
  
}
