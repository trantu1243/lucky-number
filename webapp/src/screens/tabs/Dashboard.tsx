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

const cards = [
  {
    id: 1,
    cardUrl: 'https://george-fx.github.io/apitex/cards/01.jpg',
  },
  {
    id: 2,
    cardUrl: 'https://george-fx.github.io/apitex/cards/02.jpg',
  },
];

const operations: OperationType[] = [
  {
    id: 1,
    title: 'Receive \n Payment',
    icon: <svg.ReceiveSvg />,
    url: '/CreateInvoice',
  },
  {
    id: 2,
    title: 'Money \n Transfer',
    icon: <svg.RepeatSvg />,
    url: '/FundTransfer',
  },
  {
    id: 3,
    title: 'Make a \n Payment',
    icon: <svg.DollarSignSvg />,
    url: '/Payments',
  },
];

export const Dashboard: React.FC = () => {
  const navigate = hooks.useAppNavigate();

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
      <div style={{marginBottom: 16, marginTop: 4}}>
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

  const renderOperations = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
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

  const renderQuickMoneyTransfer = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <components.BlockHeading
          title='Quick money transfer to:'
          containerStyle={{margin: '0 20px 14px 20px'}}
        />

        <custom.ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
          {usersData?.map((user, index, array) => {
            return (
              <items.User
                user={user}
                key={user.id || index}
              />
            );
          })}
          <div
            style={{
              maxWidth: 55,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                marginBottom: 4,
                borderRadius: 20,
                backgroundColor: '#FFD9C3',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <svg.PlusSvg />
            </div>
            <span
              style={{
                fontSize: 12,
                color: theme.colors.bodyTextColor,
                ...theme.fonts.SourceSansPro_400Regular,
              }}
            >
              Choose
            </span>
          </div>
        </custom.ScrollView>
      </div>
    );
  };

  const renderLatestTransactions = (): JSX.Element => {
    return (
      <div className='container'>
        <components.BlockHeading
          title='Latest transactions'
          rightIcon={<svg.SearchSvg />}
          containerStyle={{marginBottom: 14}}
        />
        <div>
          {transactionsData?.map((transaction, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <items.Transaction
                isLast={isLast}
                transaction={transaction}
                key={transaction.id || index}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderBottomTabBar = () => {
    return <components.BottomTabBar />;
  };

  const renderContent = (): JSX.Element => {
    if (loading) return <components.TabLoader />;

    return (
      <main style={{marginTop: 52, paddingBottom: 100}}>
        {renderCards()}
        {renderOperations()}
        {renderQuickMoneyTransfer()}
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
