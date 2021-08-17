import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const MsgSnackBar = forwardRef((props, ref) => {
    const [open, setOpen] = useState(true);

    useImperativeHandle(ref, () => ({
        showMessage(){
            setOpen(true);
        },
    }));

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <Snackbar open={open} autoHideDuration={props.duration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.type}>
                {props.message}
            </Alert>
        </Snackbar>
    );
});

export default MsgSnackBar;