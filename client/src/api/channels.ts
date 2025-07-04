import type { IPartialChannel } from "../types/IChannel"
import { notify } from "../utils/notify";
import { api } from "./methods";

interface Params {
    channel: IPartialChannel;
}

function createChannel({ channel }: Params){
    api.post({endpoint: 'channels', body: (channel as object)})
    .then(() => {
        notify({status: "success", message: "Channel Created Successfully"});
    }).catch((error: unknown) => {
        let message = "Failed To Create Channel";
        if(error instanceof Error) {
            message = error.message;
        }
        notify({ status: "error", message: message.charAt(0).toUpperCase() + message.slice(1) });
    });
}

function joinChannel({ channel }: Params){
    api.patch({endpoint:'channels/join/'+channel.id})
    .then(() => {
        notify({status: "success", message: "Channel Joined Successfully"});
    }).catch(() => {
        notify({status: "error", message: "Failed To Join Channel"});
    });
}

function leaveChannel({ channel }: Params){
    api.patch({endpoint:'channels/leave/'+channel.id})
    .then(() => {
        notify({status: "success", message: "Left Channel"});
    }).catch(() => {
        notify({status: "error", message: "Failed To Leave Channel"});
    });
}

function updateChannel({ channel }: Params){
    api.patch({endpoint: 'channels', body: (channel as object)})
    .then(() => {
        notify({status: "success", message: "Channel Updated Successfully"});
    }).catch((error: unknown) => {
        let message = "Failed To Update Channel";
        if(error instanceof Error) {
            message = error.message;
        }
        notify({ status: "error", message: message.charAt(0).toUpperCase() + message.slice(1) });
    });
}

function deleteChannel({ channel }: Params){
    api.del({endpoint: 'channels/'+channel.id})
    .then(() => {
        notify({status: "success", message: "Channel Deleted Successfully"});
    }).catch(() => {
        notify({status: "error", message: "Failed To Delete Channel"});
    });
}

export const channels = {
    createChannel,
    joinChannel,
    leaveChannel,
    updateChannel,
    deleteChannel
}