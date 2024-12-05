import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import {screens} from '../screens';
import {TabNavigator} from './TabNavigator';

const stack = createBrowserRouter([
  {
    path: '/',
    element: <screens.Onboarding />,
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
  return <RouterProvider router={stack} />;
};
