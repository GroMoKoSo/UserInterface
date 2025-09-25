import { notifications } from '@mantine/notifications';



export function notificationLoading(title: string, message: string) {
    return notifications.show({
        title: title,
        message: message,

        loading: true,
        radius: 'md',
        position: 'top-right',
    })
}

export function notificationSuccess(id: string, title: string, message: string) {
    notifications.update({
        id,
        title: title,
        message: message,

        loading: false,
        radius: 'md',
        position: 'top-right',
        color: 'green',
        autoClose: 3000,
    })
}

export function notificationError(id: string, title: string, message: string) {
    notifications.update({
        id,
        title: title,
        message: message,
        radius: 'md',
        position: 'top-right',
        color: 'red',
        autoClose: 3000,
    });
}

export function notificationInfo(title: string, message: string) {
    return notifications.show({
        title: title,
        message: message,

        radius: 'md',
        position: 'top-right',
    })
}

export function notificationInfoWithColor(title: string, message: string, color: string) {
    return notifications.show({
        title: title,
        message: message,
        color: color,
        radius: 'md',
        position: 'top-right',
    })
}