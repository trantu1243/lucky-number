import axios from 'axios';
import {useLocation} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

import {URLS} from '../../config';
import {items} from '../../items';
import {hooks} from '../../hooks';
import {custom} from '../../custom';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {components} from '../../components';
import {TransactionType, UserType, OperationType} from '../../types';
import { useAppSelector } from '../../store';

const cards = [
  {
    id: 1,
    cardUrl: '/images/Home/1-lucky-number-game-min.png',
  },
  {
    id: 2,
    cardUrl: '/images/Home/2-even-odd-game-min.png',
  },
  {
    id: 3,
    cardUrl: '/images/Home/3-over-under-game-min.png',
  },
  {
    id: 4,
    cardUrl: '/images/Home/4-lucky-lottery-min.png',
  },
  {
    id: 5,
    cardUrl: '/images/Home/5-poke-play-game-min.png',
  },
  
];

const operations: OperationType[] = [
  {
    id: 1,
    title: 'Deposit',
    icon: <svg.ReceiveSvg />,
    url: '/deposit',
  },
  {
    id: 2,
    title: 'Withdraw',
    icon: <svg.DollarSignSvg />,
    url: '/FundTransfer',
  },
];

const operations2: OperationType[] = [
  {
    id: 1,
    title: 'Gift Code',
    icon: <svg.RepeatSvg />,
    url: '/FundTransfer',
  },
  {
    id: 2,
    title: 'Join Telegram',
    icon: <svg.TelegramSvg />,
    url: '/FundTransfer',
  },
];

export const Dashboard: React.FC = () => {
  const navigate = hooks.useAppNavigate();
  const teleUser = useAppSelector(state => state.webappSlice.user);


  const {pathname} = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0; // Для совместимости с мобильными браузерами
    };

    scrollToTop();
  }, [pathname]);

  const [loading, setLoading] = useState<boolean>(true);
  const [usersData, setUsersData] = useState<UserType[]>([]);
  const [transactionsData, setTransactionsData] = useState<TransactionType[]>(
    [],
  );

  const getData = async () => {
    setLoading(true);

    try {
      const results = await Promise.allSettled([
        axios.get(URLS.GET_USERS),
        axios.get(URLS.GET_TRANSACTIONS),
      ]);

      const usersResponse = results[0];
      const transactionsResponse = results[1];

      if (usersResponse.status === 'fulfilled') {
        setUsersData(usersResponse.value.data.users);
      } else {
        console.error('Error fetching users:', usersResponse.reason);
      }

      if (transactionsResponse.status === 'fulfilled') {
        setTransactionsData(transactionsResponse.value.data.transactions);
      } else {
        console.error(
          'Error fetching transactions:',
          transactionsResponse.reason,
        );
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        user={true}
        creditCard={true}
      />
    );
  };

  const renderCards = (): JSX.Element => {
    return (
      <div style={{marginBottom: 8, marginTop: 4}}>
        <Swiper
          spaceBetween={14}
          slidesPerView={'auto'}
          pagination={{clickable: true}}
        >
          {cards.map((item: any, index: number, array: any[]) => {
            return (
              <SwiperSlide
                key={item.id}
                style={{
                  height: 190,
                  width: 310,
                  borderRadius: 14,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate('/CardDetails');
                }}
              >
                <img
                  src={item.cardUrl}
                  alt='card'
                  style={{width: 310, height: 190, borderRadius: 14}}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };

  const renderNotification = (): JSX.Element => {
    return (
      <components.NotificationLine />
    )
  }

  const renderOperations = (): JSX.Element => {
    return (
      <div style={{marginBottom: 10}}>
        <custom.ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
          {operations.map((operation, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <items.Operation
                isLast={isLast}
                operation={operation}
                key={operation.id || index}
              />
            );
          })}
        </custom.ScrollView>
      </div>
    );
  };
  const renderOperations2 = (): JSX.Element => {
    return (
      <div style={{marginBottom: 10}}>
        <custom.ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
          {operations2.map((operation, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <items.Operation
                isLast={isLast}
                operation={operation}
                key={operation.id || index}
              />
            );
          })}
        </custom.ScrollView>
      </div>
    );
  };


  const renderLatestTransactions = (): JSX.Element => {
    return (
      <components.WinnerList />
    )
  }


  // const renderLatestTransactions = (): JSX.Element => {
  //   return (
  //     <div className='container'>
  //       <components.BlockHeading
  //         title='Latest transactions'
  //         rightIcon={<svg.SearchSvg />}
  //         containerStyle={{marginBottom: 14}}
  //       />
  //       <div>
  //         {transactionsData?.map((transaction, index, array) => {
  //           const isLast = index === array.length - 1;
  //           return (
  //             <items.Transaction
  //               isLast={isLast}
  //               transaction={transaction}
  //               key={transaction.id || index}
  //             />
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // };

  const renderBottomTabBar = () => {
    return <components.BottomTabBar />;
  };

  const renderContent = (): JSX.Element => {
    if (loading) return <components.TabLoader />;

    return (
      <main style={{marginTop: 52, paddingBottom: 100}}>
        {renderCards()}
        {renderNotification()}
        {renderOperations()}
        {renderOperations2()}
        {renderLatestTransactions()}
      </main>
    );
  };

  return (
    <div id='screen'>
      <components.ScrollToTop />
      {renderHeader()}
      {renderContent()}
      {renderBottomTabBar()}
    </div>
  );
};
