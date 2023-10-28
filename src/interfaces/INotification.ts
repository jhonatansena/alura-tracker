export enum NotificationType  {
    SUCCESS,
    WARNING,
    DANGER
}

export interface INotification {
    title: string
    text: string
    type: NotificationType
    id: number
}