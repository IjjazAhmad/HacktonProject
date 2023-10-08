import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PrivateRoutes from '../components/PrivateRoutes';
import Auth from  './Auth'
import Dashboard from  './Dashboard'
import '../config/global';
import { useAuthContext } from './Contaxt/AuthContaxt'
export default function Index() {
    const {isAuth} = useAuthContext()
    return (
        <>
           
                <Routes>
                <Route path='/*' element={<PrivateRoutes Component={Dashboard} />}/>
                    <Route path='/auth/*' element={!isAuth? <Auth/> : <Navigate to='/' /> }/>
                </Routes>
            
           
            <ToastContainer />
        </>
    )
}
