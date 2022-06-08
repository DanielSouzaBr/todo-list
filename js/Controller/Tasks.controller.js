import { Task } from "../Model/Task.model.js"

export default class TasksController {
    constructor(service, view) {
        this.service = service
        this.view = view
    }

    add(title, userId) {
        this.service.add(new Task(title), () => this.view.render(this.service.tasks), userId)
    }

    remove(id, userId) {
        this.service.remove(id, () => this.view.render(this.service.tasks), userId)
    }
}