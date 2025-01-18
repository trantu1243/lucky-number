import React, { useEffect } from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import {screens} from '../screens';
import {TabNavigator} from './TabNavigator';
import { useAppDispatch } from '../store';
import { setWebApp } from '../store/slices/webappSlice';
import useSocket from '../hooks/useSocket';

const stack = createBrowserRouter([
    {
        path: '/',
        element: <screens.Onboarding />,
    },
    {
        path: '/deposit',
        element: <screens.Deposit/>,
    },
    {
        path: '/withdraw',
        element: <screens.Withdraw/>,
    },
    {
        path: '/add-payout',
        element: <screens.AddPayout/>,
    },
    {
        path: '/add-email',
        element: <screens.AddEmail/>,
    },
    {
        path: '/lucky-number',
        element: <screens.LuckyNumber/>,
    },
    {
        path: '/payment/qrcode',
        element: <screens.DepositQr/>,
    },
    {
        path: '/SignIn',
        element: <screens.SignIn />,
    },
    {
        path: '/SignUp',
        element: <screens.SignUp />,
    },
    {
        path: '/VerifyYourPhoneNumber',
        element: <screens.VerifyYourPhoneNumber />,
    },
    {
        path: '/InvoiceSent',
        element: <screens.InvoiceSent />,
    },
    {
        path: '/FundTransfer',
        element: <screens.FundTransfer />,
    },
    {
        path: '/OpenNewLoan',
        element: <screens.OpenNewLoan />,
    },
    {
        path: '/CardMenu',
        element: <screens.CardMenu />,
    },
    {
        path: '/ForgotPassword',
        element: <screens.ForgotPassword />,
    },
    {
        path: '/CreateInvoice',
        element: <screens.CreateInvoice />,
    },
    {
        path: '/Statistics',
        element: <screens.Statistics />,
    },
    {
        path: '/OpenDeposit',
        element: <screens.OpenDeposit />,
    },
    {
        path: '/OpenMoneybox',
        element: <screens.OpenMoneybox />,
    },
    {
        path: '/SignUpAccountCreated',
        element: <screens.SignUpAccountCreated />,
    },
    {
        path: '/ConfirmationCode',
        element: <screens.ConfirmationCode />,
    },
    {
        path: '/PaymentFailed',
        element: <screens.PaymentFailed />,
    },
    {
        path: '/PrivacyPolicy',
        element: <screens.PrivacyPolicy />,
    },
    {
        path: '/TransactionDetails',
        element: <screens.TransactionDetails />,
    },
    {
        path: '/ChangePINCode',
        element: <screens.ChangePINCode />,
    },
    {
        path: '/IBANPayment',
        element: <screens.IBANPayment />,
    },
    {
        path: '/FAQ',
        element: <screens.FAQ />,
    },
    {
        path: '/EditPersonalInfo',
        element: <screens.EditPersonalInfo />,
    },
    {
        path: '/PaymentSuccess',
        element: <screens.PaymentSuccess />,
    },
    {
        path: '/OpenNewCard',
        element: <screens.OpenNewCard />,
    },
    {
        path: '/Payments',
        element: <screens.Payments />,
    },
    {
        path: '/MobilePayment',
        element: <screens.MobilePayment />,
    },
    {
        path: '/CardDetails',
        element: <screens.CardDetails />,
    },
    {
        path: '/TopUpPayment',
        element: <screens.TopUpPayment />,
    },
    {
        path: '/NewPassword',
        element: <screens.NewPassword />,
    },
    {
        path: '/ForgotPasswordSentEmail',
        element: <screens.ForgotPasswordSentEmail />,
    },
    {
        path: '/Profile',
        element: <screens.Profile />,
    },
    {
        path: '/TabNavigator',
        element: <TabNavigator />,
    },
]);

export const StackNavigator: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const app = (window as any).Telegram?.WebApp;
        try{
            if (app) {
                app.ready();
                console.log(app)
                dispatch(setWebApp(app));
            }
        } catch (e) {
            console.log(e)
        }
    }, [dispatch]);

    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('paid_payout', (data) => {
                toast.success(`You have successfully withdrawn ${Math.floor(data.msg)} Chip.`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "dark",
                });
            });

            socket.on('fail_payout', (data) => {
                toast.error(`Withdrawing ${Math.floor(data.msg)} Chip failed. Please try again.`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "dark",
                });
            });

            socket.on('system_fail_payout', (data) => {
                toast.error(`Withdrawing ${Math.floor(data.msg)} Chip failed. A system error has occurred.`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "dark",
                });
            });
        
            socket.on('check', (data) => {
                toast.info(`Withdrawing ${Math.floor(data.msg)} Chip. The payout is under verification.`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "dark",
                });
            });

            socket.on('cancel_payout', (data) => {
                toast.error(`Withdrawing ${Math.floor(data.msg)} Chip. Payout cancelled.`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "dark",
                });
            });
        
            return () => {
                socket.off('nap-tien-thanh-cong');
            };
        }
    }, [socket]);
    

    return (
        <>
            <RouterProvider router={stack} />
            <ToastContainer />
        </>)
};
