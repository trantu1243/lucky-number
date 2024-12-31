import { theme } from "../constants"
import {components} from '../components';
import { ToastContainer, toast } from 'react-toastify';
import {text} from '../text';
import {svg} from '../assets/svg';
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../store";
import { hooks } from "../hooks";
import "../assets/css/loading.css";

export const DepositQr: React.FC = () => {

    const webapp = useAppSelector(state => state.webappSlice.webApp);
    const navigate = hooks.useAppNavigate();
    const [payment, setPayment] = useState({
        address: '',
        address_qr_code: '',
        amount: '',
        expired_at: 0,
        payment_status: '',
        url: '',
        network: '',
        currency: '',
        _id: ''
    });
    const [loading, setLoading] = useState(true);
    
    const checkPayment = useCallback(async () => {
        setLoading(true);
        const body = webapp?.initDataUnsafe || {};
        const urlWithParams = `https://api.lucky-number.net/v1/payment/check`;
    
        fetch(urlWithParams, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({initData: body})
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.status) {
                    navigate("/deposit");
                }
                setPayment(data.payment);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    
    }, [webapp, navigate]);

    useEffect(() => {
        checkPayment();
    }, [checkPayment])

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
        });
    };

    const handleCancelButton = async () => {
        const body = webapp?.initDataUnsafe || {};
        const urlWithParams = `https://api.lucky-number.net/v1/payment/cancel`;
    
        fetch(urlWithParams, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({initData: body, id: payment._id})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status) {
                    navigate("/deposit");
                    toast.success('Payment canceled successfully!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        theme: "dark",
                    });
                }
            })
            .catch((error) => console.error(error));
    } 

    const handlePaidButton = async () => {
        const body = webapp?.initDataUnsafe || {};
        console.log(JSON.stringify({initData: body}));
        const urlWithParams = `https://api.lucky-number.net/v1/payment/check-paid`;
    
        fetch(urlWithParams, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({initData: body, id: payment._id})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status) {
                    toast.success('Paid Successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        theme: "dark",
                    });
                    navigate("/deposit");
                } else {
                    toast.error('Payment Pending...', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        theme: "dark",
                    });
                }
            })
            .catch((error) => console.error(error));
    } 

    const renderHeader = (): JSX.Element => {
        return (
            <components.Header
                title='Open deposit'
                goBack={true}
            />
        );
    };

    const renderContent = (): JSX.Element => {
        return (
            <main
                style={{marginTop: 40, paddingBottom: 100}}
                className='container'
            >
                <div
                    style={{
                        borderRadius: 10,        
                        marginBottom: 10,
                        paddingTop: 20,
                    }}
                >
                    {/* <div style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <text.H4 style={{fontWeight: 'bold'}}>10.0 USDT - TRON(TRC20)</text.H4>
                    </div> */}
                    
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: 10
                        }}
                    >
                        <img 
                            style={{
                                backgroundColor: theme.colors.whiteText,
                                borderRadius: 10
                            }} 
                            alt="" 
                            src={payment.address_qr_code} />              

                    </div>
                    <components.Countdown expiredAt={payment.expired_at} />
                    <text.H3
                        style={{
                            textAlign: 'center',
                            margin: 15
                        }}
                    >
                        {parseFloat(payment.amount).toString()} {payment.currency}
                        <span
                            style={{
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                    handleCopy(payment.network)
                                }}>
                            <svg.CopySvg />
                        </span>
                    </text.H3>
                    
                    <div
                        style={{
                            borderRadius: 10,
                            border: '1px solid gray', 
                            padding: 20,

                        }}
                    >
                          <div
                            style={{
                                borderBottom: '1px solid gray',
                                paddingBottom: 10,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div>
                                <text.T12
                                    style={{
                                        color: 'gray',
                                        fontWeight: '600',
                                        paddingBottom: 5
                                    }}
                                >
                                    Network
                                </text.T12>
                                <text.T16
                                    style={{
                                        color: theme.colors.whiteText,
                                        fontWeight: '600',
                                    }}
                                >
                                    {payment.network}
                                </text.T16>
                            </div>             
                        </div>
                        <div
                            style={{
                                paddingTop: 10,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div>
                                <text.T12
                                    style={{
                                        color: 'gray',
                                        fontWeight: '600',
                                        paddingBottom: 5
                                    }}
                                >
                                    Deposit Address
                                </text.T12>
                                <text.T16
                                    style={{
                                        color: theme.colors.whiteText,
                                        fontWeight: '600',
                                    }}
                                >
                                    {payment.address.replace(/^(.{5}).+(.{5})$/, '$1*****$2')}
                                </text.T16>
                            </div>
                            <div 
                                style={{
                                    margin: 7,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onClick={() => {
                                    handleCopy(payment.address)
                                }}
                            >
                                <svg.CopySvg />
                            </div>
                            
                        </div>
                        
                    </div>
                   
                  
                </div>
                <ToastContainer />
            </main>
        )
    }
    
    const renderBottom = (): JSX.Element => {
        return (
            <nav
                style={{
                    bottom: 0,
                    zIndex: 999,
                    width: '100%',
                    position: 'fixed',
                    maxWidth: '650px',
                    padding: 10,
                    backgroundColor: theme.colors.white,
                    display: 'grid',
                    gridTemplateColumns: '49% 49%',
                    gap: 5,
        
                }}
            >
                <components.Button title="Cancel" style={{background: theme.colors.main2Dark}} onClick={handleCancelButton}/>
                <components.Button title="Paid" onClick={handlePaidButton}/>
            </nav>
        )
    }

    return (
        <div id='screen'>
            {renderHeader()}
            {loading ? (
                <div 
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        height: '100vh'   
                    }}
                >
                    <span className="loader"></span>
                </div>
            ) : (     
                <>
                    {renderContent()}
                    {renderBottom()}
                </>
            )}
        </div>  
    )
}