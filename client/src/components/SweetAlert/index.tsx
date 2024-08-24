import swal, { SweetAlertResult } from 'sweetalert2';
import style from './styles.module.scss';

type Icons = 'warning' | 'error' | 'success' | 'info' | 'question';

interface SweetAlertProps {
  title?: string;
  text?: string;
  icon?: Icons;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  timer?: number;
  showConfirmButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
}

const SweetAlert = ({
  title = 'Hecho',
  text = 'Hecho',
  icon = 'success',
  confirmButtonText = 'Aceptar',
  showCancelButton = false,
  showConfirmButton = true,
  cancelButtonText = 'Cancelar',
  timer = 9999999,
  confirmButtonColor = '#1a75ff',
  cancelButtonColor = '#f4002c'
}: SweetAlertProps): Promise<SweetAlertResult> => {
  return swal.fire({
    customClass: {
      container: style.my_swal
    },
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    cancelButtonText,
    confirmButtonText,
    timer,
    showConfirmButton
  });
};

export default SweetAlert;
