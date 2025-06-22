import type { IPartialChannel } from "../../types/IChannel";
import ChatLog from "./view/ChatLog";
import Input from "./view/Input";

interface ViewProps {
    selectedChannel: IPartialChannel | null;
}

function View({ selectedChannel }: ViewProps){
    return (
        <div className="box view flex column">
            {
                selectedChannel?
                    <>
                        <ChatLog selectedChannel={selectedChannel} />
                        <Input selectedChannel={selectedChannel} />                    
                    </>
                    :
                    <div>
                        <p style={{textAlign: 'center'}}>No Channel is selected</p>
                    </div>
            }
        </div>
    );
}

export default View;