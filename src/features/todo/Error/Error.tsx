import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

type ErrorType = {
    error: string;
}

const Error: React.FC<ErrorType> = ({ error }) => {
    return <MuiAlert elevation={6} variant="filled" severity="error" >{error}</MuiAlert>;
}

export default Error;