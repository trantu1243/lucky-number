import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';

import { theme } from "../constants"
import {components} from '../components';
import {text} from '../text';
import {svg} from '../assets/svg';
import { useAppSelector } from "../store";
import { hooks } from "../hooks";
import "../assets/css/loading.css";
import useSocket from "../hooks/useSocket";
import { useLocation } from "react-router-dom";
import { utils } from "../utils";

const networkDescription : { [key: string]: string } = {
    tron: 'TRON(TRC20)',
    eth: 'ETH(ERC20)',
    bsc: 'BSC(BEP20)',
    btc: 'BTC(Bitcoin)',
    ltc: 'LTC(Litecoin)',
    sol: 'SOL(Solana)',
    ada: 'ADA(Cardano)',
    dot: 'DOT(Polkadot)',
    atom: 'ATOM(Cosmos)',
    xmr: 'XMR(Monero)',
    doge: 'DOGE(Dogecoin)',
    xrp: 'XRP(Ripple)',
    algo: 'ALGO(Algorand)',
    near: 'NEAR(Near Protocol)'
};

const SERVER_URL = 'https://api.lucky-number.net';

export const DepositQr: React.FC = () => {
    const {pathname} = useLocation();
    const navigate = hooks.useAppNavigate();

    useEffect(() => {
        setTimeout(() => {
            window.scroll({top: -1, left: 0, behavior: 'smooth'});
        }, 10);
    }, [pathname]);

    const webapp = useAppSelector(state => state.webappSlice.webApp);
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
    const [status, setStatus] = useState<Number>(0);
    const [msg, setMsg] = useState<String>('');
    const [chip, setChip] = useState<Number>(0);

    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                console.log('Connected to server with socket id:', socket.id);
            });
            
            socket.on('paid', (data) => {
                setChip(Number(data.msg));
                setMsg('You have successfully deposited');
                setStatus(2);
            });

            socket.on('paid_over', (data) => {
                setChip(Number(data.msg));
                setMsg('You have already topped up. The system has automatically added more chips to your account.');
                setStatus(2);
            });

            socket.on('cancel', (data) => {
                setChip(Number(data.msg));
                setMsg('Deposit time expired. Please try again.');
                setStatus(3);
            });

            socket.on('wrong_amount', (data) => {
                setChip(Number(data.msg));
                setMsg(`You have underpaid by {data.msg2}. The system will automatically create a new payment to cover the remaining amount.`);
                setStatus(3);
            });
        
            return () => {
                socket.off('nap-tien-thanh-cong');
            };
        }
    }, [socket]);
    
    useEffect(() => {
        const data = webapp?.initDataUnsafe || null;
        
        if (data) {
            const socket = io(SERVER_URL, {
                query: {
                    initDataUnsafe: JSON.stringify(data)
                }
            })

            socket.on('connect', () => {
                console.log('Connected to server with socket id:', socket.id);
            });

            socket.on('error', (error) => {
                console.error('Error from server:', error);
            });

            return () => {
                socket.disconnect();
            };
        }
        
        return () => {};

    }, [webapp]);

    const [checkpaid, setCheckpaid] = useState<boolean>(true);
    
    const checkPayment = useCallback(async () => {
        setStatus(2);
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
                setStatus(1);
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
                    if (data.payment_status === 'confirm_check') setCheckpaid(true);
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
        const network = networkDescription[payment.network] ? ` (${networkDescription[payment.network]})` : payment.network.toUpperCase();
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
                    <components.Countdown expiredAt={payment.expired_at} handle={()=>{navigate('/deposit')}}/>
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
                                paddingLeft: 5
                            }}
                            onClick={() => {
                                    handleCopy(payment.amount)
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
                                    {network}
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
                    <text.T14 style={{
                        fontStyle: 'italic',
                        marginTop: 15
                    }}>* Please send an amount equal to or greater than.</text.T14>           
                  
                </div>
                <ToastContainer />
            </main>
        )
    }
    
    const renderBottom = (): JSX.Element => {
        return (
            <>
                {checkpaid ? (
                    <nav
                        style={{
                            bottom: 0,
                            zIndex: 999,
                            width: '100%',
                            position: 'fixed',
                            maxWidth: '650px',
                            padding: 10,
                            backgroundColor: theme.colors.white,
                
                        }}
                    >
                        <components.Button title="Pending ..."/>
                    </nav>
                ) : (     
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
                )}
            </>
        )
    }

    const renderSuccess = (): JSX.Element => {
        return (
          <main
            className='container'
            style={{justifyContent: 'center'}}
          >
            <svg.TransactionSvg style={{marginBottom: 30}} />
            <text.H2 style={{marginBottom: 30}}>
              Your payment has been {'\n'} processed!
            </text.H2>
            <div style={{marginBottom: 10}}>
              <span
                style={{
                  fontSize: 28,
                  ...theme.fonts.SourceSansPro_400Regular,
                  color: theme.colors.whiteText,
                }}
              >
                {String(chip)}
              </span>
              <span
                style={{
                  fontSize: 16,
                  ...theme.fonts.SourceSansPro_400Regular,
                  color: theme.colors.whiteText,
                }}
              >
                &nbsp;Chip
              </span>
            </div>
            <text.T16 style={{marginBottom: 30}}>
                {msg}
            </text.T16>
            <div style={{...utils.rowCenterSpcBtw()}}>
      
              <components.Button
                title='Done'
                containerStyle={{width: '100%'}}
                onClick={() => navigate('/TabNavigator')}
              />
            </div>
          </main>
        );
    };

      const renderFailure = (): JSX.Element => {
        return (
          <main
            className='container'
            style={{justifyContent: 'center'}}
          >
            <svg.CancelSvg style={{marginBottom: 30}} />
            <text.H2 style={{marginBottom: 30}}>
                Your payment has failed!
            </text.H2>
            <div style={{marginBottom: 10}}>
              <span
                style={{
                  fontSize: 28,
                  ...theme.fonts.SourceSansPro_400Regular,
                  color: theme.colors.whiteText,
                }}
              >
                {String(chip)}
              </span>
              <span
                style={{
                  fontSize: 16,
                  ...theme.fonts.SourceSansPro_400Regular,
                  color: theme.colors.whiteText,
                }}
              >
                &nbsp;Chip
              </span>
            </div>
            <text.T16 style={{marginBottom: 30}}>
                {msg}
            </text.T16>
            <div style={{...utils.rowCenterSpcBtw()}}>
              
              <components.Button
                title='Try Again'
                containerStyle={{width: '100%'}}
                onClick={() => {navigate('/deposit')}}
              />
            </div>
          </main>
        );
    };

    return (
        <div id='screen'>
            {renderHeader()}
            {status === 0 ? (
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
            ) : status === 1 ? (
                <>
                    {renderContent()}
                    {renderBottom()}
                </>
            ) : status === 2 ? (
                <>
                    {renderSuccess()}
                </>
            ) : (
                <>
                    {renderFailure()}
                </>
            )}
        </div>  
    )
}