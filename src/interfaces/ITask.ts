import IProject from "./IProject"

export default interface ITask {
    timeInSeconds: number
    description: string
    project: IProject
    id: number
}