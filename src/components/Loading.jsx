import * as React from 'react';
import { useSelector } from 'react-redux'; // `useSelector` import edilmelidir
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
    // Redux store'dan loading durumunu alıyoruz
    const loading = useSelector((store) => store.product.loading);

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={loading} // `Loading` yerine `loading` kullanılmalı
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
