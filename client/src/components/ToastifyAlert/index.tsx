import { toast, TypeOptions, ToastPosition, Theme } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastifyAlertProps {
  text?: string;
  timer?: number;
  type?: TypeOptions;
  position?: ToastPosition;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: Theme;
}

const ToastifyAlert = ({
  text = "Hecho",
  timer = 3000,
  type = "success",
  position = "top-right",
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = false,
  draggable = false,
  theme = "light",
}: ToastifyAlertProps) => {
  return toast(text, {
    type,
    position,
    autoClose: timer,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress: undefined,
    theme,
  });
};

export default ToastifyAlert;
