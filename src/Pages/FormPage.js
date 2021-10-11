import Cuestionario from '../Components/Cuestionario/cuestionario';
import {useSnackbar} from 'react-simple-snackbar';
import Util from '../Backend/util/Util';

export default function FormPage() {
  const [open] = useSnackbar(Util.snackbarConfig.options);

  
  return (
    <div className="col pt-4">
      <Cuestionario snackbar={open}></Cuestionario>
    </div>
  );
}
