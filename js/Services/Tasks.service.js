import { createXMLHttpRequest } from '../createXMLHttpRequest.js'
import { Task } from '../Model/Task.model.js'

const urlUsers = "http://localhost:3000/users"
const urlTasks = "http://localhost:3000/tasks"

export default class TasksService {
    constructor() {
        this.tasks = []
    }

    add(task, cb, userId) {
        if (!task instanceof Task) {
            throw TypeError("task precisa ser uma instancia de Task")
        }

        const fn = (_task) => {
            const { title, completed, createdAt, updatedAt } = _task
            // this.tasks.push(new Task(title, completed, createdAt, updatedAt))
            this.getTasks(userId, cb)
        }

        createXMLHttpRequest("POST", `${urlUsers}/${userId}/tasks`, fn, JSON.stringify(task))

    }

    getTasks(userId, cb) {
        const fn = (arrTasks) => {
            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })
            if (typeof cb === "function") cb(this.tasks)
        }
        createXMLHttpRequest("GET", `${urlUsers}/${userId}/tasks`, fn)
    }

    remove(id, cb, userId) {
        const fn = () => {
            this.getTasks(userId, cb)
        }

        createXMLHttpRequest("DELETE", `${urlTasks}/${id}`, fn)
    }
} 