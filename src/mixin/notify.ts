import { INotification, NotificationType } from "@/interfaces/INotification"
import { NOTIFY } from "@/store/mutationTypes"
import { store } from "@/store"


export const notificationMixin = {
    methods: {
        notify(title: string, text: string, type: NotificationType): void {
            const notification: INotification = 
            {
                id: Number(new Date().getTime().toString()),
                title,
                text,
                type,
            }
            
            store.commit(NOTIFY, notification)
        }
    }
}