import { NotificationType } from "@/interfaces/INotification"
import { store } from "@/store"
import { NOTIFY } from "@/store/mutationTypes"

type Notification = {
    notify: (title: string, text: string, type: NotificationType) =>  void
}


export default (): Notification => {
    const notify = (title: string, text: string, type: NotificationType): void => {
        store.commit(NOTIFY, {
            title,
            text,
            type
        })
    }
    return { notify }
}