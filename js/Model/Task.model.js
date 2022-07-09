export function Task(title, completed, createdAt, updatedAt, id) {

    if (!title) {
        throw new Error("Task needs a required parameter: title")
    }

    this.title = title
    this.completed = completed || false
    this.createdAt = createdAt || Date.now()
    this.updatedAt = updatedAt || null
    this.id = id || null

    this.toggleDone = function () {
        this.completed = !this.completed
    }

}