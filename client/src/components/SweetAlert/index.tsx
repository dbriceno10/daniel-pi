import swal, { SweetAlertResult } from 'sweetalert2';
import style from './styles.module.scss';

type Icons = 'warning' | 'error' | 'success' | 'info' | 'question';

export interface AlertProps {
  title?: string;
  text?: string;
  icon?: Icons;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  timer?: number;
  showConfirmButton?: boolean;
}

const SweetAlert = ({
  title = 'Hecho',
  text = 'Hecho',
  icon = 'success',
  confirmButtonText = 'Aceptar',
  showCancelButton = false,
  cancelButtonText = 'Cancelar',
  timer = 9999999,
  showConfirmButton = true
}: AlertProps): Promise<SweetAlertResult> => {
  return swal.fire({
    customClass: {
      container: style.my_swal
    },
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor: '#1a75ff',
    cancelButtonColor: '#f4002c',
    cancelButtonText,
    confirmButtonText,
    timer,
    showConfirmButton
  });
};

export default SweetAlert;
