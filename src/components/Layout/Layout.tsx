import { useSelector } from 'react-redux';
import Header from './Header';
import { type ReactNode } from 'react';
// import BackdropLoading from '../common/BackdropLoading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
    children: ReactNode
}

export default function Layout ({ children }: LayoutProps) {

    return (
        <>
            {/* <BackdropLoading/> */}
            <div className={'w-full m-0 p-0 h-full'}>
                <Header/>                
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}
