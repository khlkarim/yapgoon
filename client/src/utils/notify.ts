import { toast } from "react-toastify";

type NotificationStatus = "success" | "error" | "info" | "warning";

interface NotificationParams {
    status: NotificationStatus;
    message: string;
}

export function notify({ status, message }: NotificationParams) {
    toast(
        message,
        { type: status }
    );
}