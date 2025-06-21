import { cssTransition, ToastContainer } from "react-toastify";

function NotificationSystem() { 
    const Transition = cssTransition({
        enter: 'enter',
        exit: 'exit',
    });

    return (
        <ToastContainer
          toastClassName={() => 'box notif'}
          hideProgressBar
          icon={false}
          transition={Transition}
          theme='dark'  
          autoClose={2000}
          closeButton={false}
          closeOnClick
          newestOnTop
          position="bottom-right"
        />
    );
}

export default NotificationSystem;