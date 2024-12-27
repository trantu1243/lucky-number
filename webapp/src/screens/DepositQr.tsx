import { theme } from "../constants"
import {components} from '../components';
import { ToastContainer, toast } from 'react-toastify';
import {text} from '../text';
import {svg} from '../assets/svg';

export const DepositQr: React.FC = () => {
    const address = `bc1q6ty5nrhs407wca55tuj4d9h0rr80e0tpj0zx4x`;

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

    const renderHeader = (): JSX.Element => {
        return (
            <components.Header
                title='Open deposit'
                goBack={true}
            />
        );
    };

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
                }}
            >
                <components.Button title="Cancel" style={{background: theme.colors.main2Dark}} />
            </nav>
        )
    }

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
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAAC5CAIAAAD7zwkLAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAD4UlEQVR4nO3dy46dOBRA0a5W//8vp+cMrG3hBxWtNc0N3Iq2rBPKwM+fP3/+geDf21+AX0MrVFqh0gqVVqi0QqUVKq1QaYVKK1RaodIKlVaotEKlFSqtUGmFSitUWqH6781f/vn5WfU9xsabgh9fY+rDb77G1KH2faspb7ZXW1eotEKlFSqtUL2abR8W3pY2nvX2DbPj6XXqvOOvMf67x/4lp1hXqLRCpRUqrVCtnG0fFl7WXHiiqfNOjbpTR55y7F9yzLpCpRUqrVBphWrjbLvPvr0BD2+m12PbDI6xrlBphUorVFqh+pWz7Zu9AfsO9fD3PTjYukKlFSqtUGmFauNse2y4G8+nCzfn7tvYu/DD+1hXqLRCpRUqrVCtnG1v/RZ+apjd96dT32rsm/sZrCtUWqHSCpVWqF7Nth+5nrhwX8G+UXfqvN9kXaHSCpVWqLRCtfH5th/ZG/D48NTl1G8+qWvhjzDFukKlFSqtUGmFauN126ln1L458rFR99gUOT7ywh9/inWFSitUWqHSCtXPr7j4+Ma+Nyy8OdRH7n+bYl2h0gqVVqi0QnXtnbu3roFOfY19Twgb+8gw+2BdodIKlVaotEL1lXfuHnvl18IjL9yru2/brz0JXKAVKq1QaYVq5Z6E56HXPe914e/op7zZSDA+1Bu3riZbV6i0QqUVKq1QvZptv7nBduq8xy4Bv5mLFx7ZdVtO0AqVVqi0QrXxuu3zTN/YDPBmIN1n3yVgsy0XaIVKK1RaoVp5L9nCK4bHnlew78NvfoSF/+HwnAQu0AqVVqi0QnVtv+2+C7XHhtnx15g60b4r0VOHGrOuUGmFSitUWqHaeN12PL4de8Dr2LEX9N668Wwh6wqVVqi0QqUVqnP7bZ8nPnVP18PC68Vvjjx13ls3jz1YV6i0QqUVKq1QrXxOwsIR7Njv6McW7hH+yG1p9iRwglaotEKlFapr123f2LdJ9pt7IW5N6w/WFSqtUGmFSitU1965O2Xfq7cWzqdvrttO/Qi3tu5aV6i0QqUVKq1QfeWduw8fudXqzcg5Zd88bk8CF2iFSitUWqFaOds+fORGrKkTHRsbP7LNYIp1hUorVFqh0grVxtl2n4VP21q4wfbYe3PHPCeB+7RCpRUqrVD9ytl23yMIFu573bdHeMxzErhPK1RaodIK1cbZ9tgbz/a9TGz84VuPMbs1NVtXqLRCpRUqrVCtnG2PPTZhfN59LwRbuOtg3waGfawrVFqh0gqVVqh+5fNtucK6QqUVKq1QaYVKK1RaodIKlVaotEKlFSqtUGmFSitUWqHSCpVWqLRCpRUqrVD9D/kOTWmhiGyUAAAAAElFTkSuQmCC" />              

                    </div>
                    <components.Countdown expiredAt={1735198133} />
                    <text.H3
                        style={{
                            textAlign: 'center',
                            margin: 15
                        }}
                    >
                        10.0000 USDT
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
                                    TRON(TRC20)
                                </text.T16>
                            </div>
                            <div style={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                            }}>
                                <svg.CopySvg />
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
                                    {address.replace(/^(.{5}).+(.{5})$/, '$1*****$2')}
                                </text.T16>
                            </div>
                            <div 
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onClick={() => {
                                    handleCopy(address)
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
    return (
        <div id='screen'>
            {renderHeader()}
            {renderContent()}
            {renderBottom()}
        </div>  
    )
}