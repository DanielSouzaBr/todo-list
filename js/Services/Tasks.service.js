import { createXMLHttpRequest } from '../createXMLHttpRequest.js'
import { Task } from '../Model/Task.model.js'
import { urlTasks, urlUsers } from '../config.js'

export default class TasksService {

    constructor() {
        this.tasks = []
    }

    add(task, cb, userId) {
        const fn = (_task) => {
            const { title, completed, createdAt, updatedAt } = _task
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

    update(task, cb, userId) {
        task.updatedAt = Date.now()
        const fn = () => {
            this.getTasks(userId, cb)
        }

        createXMLHttpRequest("PATCH", `${urlTasks}/${task.id}`, fn, JSON.stringify(task))
    }

    getById(id) {
        return this.tasks.find(tasks => parseInt(tasks.id) === id)
    }

} 