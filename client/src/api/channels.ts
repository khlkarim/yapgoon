import type { IPartialChannel } from "../types/IChannel"
import type { IPartialUser } from "../types/IUser";
import { api } from "./methods";

interface Params {
    channel: IPartialChannel;
    user: IPartialUser;
}

function createChannel({channel, user}: Params){
    if(channel && user) {
        channel.owner = user.id;
        api.post({endpoint: 'channels', body: (channel as object)});
    }
}

function joinChannel({channel, user}: Params){
    
}

function updateChannel({channel, user}: Params){
    
}

function deleteChannel({channel, user}: Params){
    
}

export const channels = {
    createChannel,
    joinChannel,
    updateChannel,
    deleteChannel
}