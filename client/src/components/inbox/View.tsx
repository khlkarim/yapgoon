import ChatLog from "./view/ChatLog";
import Input from "./view/Input";

function View(){
    return (
        <div className="box view flex column">
            <ChatLog />
            <Input />
        </div>
    );
}

export default View;