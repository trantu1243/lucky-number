import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {theme} from '../constants';
import {components} from '../components';

const onboarding = [
  {
    id: 1,
    title1: 'Welcome to Apitex',
    title2: 'bank app!',
    image: require('../assets/onboarding/01.png'),
    description:
      'Labore sunt culpa excepteur culpa ipsum. Labore occaecat ex nisi mollit.',
  },
  {
    id: 2,
    title1: 'Get a new card in a',
    title2: 'few clicks!',
    image: require('../assets/onboarding/01.png'),
    description:
      'Labore sunt culpa excepteur culpa ipsum. Labore occaecat ex nisi mollit.',
  },
  {
    id: 3,
    title1: 'Easy payments all',
    title2: 'over the world!',
    image: require('../assets/onboarding/01.png'),
    description:
      'Labore sunt culpa excepteur culpa ipsum. Labore occaecat ex nisi mollit.',
  },
];

export const Onboarding: React.FC = () => {
  const location = useLocation();
  const {pathname} = useLocation();

  const navigate = hooks.useAppNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const handleSlideChange = () => {
    if (emblaApi) {
      setActiveIndex(emblaApi.selectedScrollSnap());
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (location.pathname.includes('Onboarding')) {
      metaThemeColor?.setAttribute('content', '#040325');
    } else {
      metaThemeColor?.setAttribute('content', '#ffffff');
    }
  }, [location]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', handleSlideChange);
    }
  }, [emblaApi]);

  const renderSlider = (): JSX.Element => {
    return (
      <div
        className='embla'
        ref={emblaRef}
        style={{
          position: 'relative',
          height: '100%',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className='embla__container'>
          {onboarding.map((item: any, index: any, array: any) => {
            return (
              <div
                key={item.id}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                }}
                className='embla__slide'
              >
                <img
                  src={item.image}
                  alt='Carousel'
                  style={{
                    maxWidth: 251,
                    width: '64%',
                    margin: '0 auto',
                    objectFit: 'contain',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTitle = (): JSX.Element => {
    return (
      <div style={{marginBottom: 14, marginLeft: 20}}>
        <text.H1
          style={{
            color: theme.colors.white,
            textAlign: 'left',

            whiteSpace: 'pre-line',
          }}
        >
          {onboarding[activeIndex].title1}
        </text.H1>
        <text.H1
          style={{
            color: theme.colors.white,
            textAlign: 'left',
            whiteSpace: 'pre-line',
          }}
        >
          {onboarding[activeIndex].title2}
        </text.H1>
      </div>
    );
  };

  const renderDescription = (): JSX.Element => {
    return (
      <div style={{marginLeft: 20, marginBottom: '8%'}}>
        <text.T16
          style={{
            textAlign: 'left',
            whiteSpace: 'pre-line',
            color: '#B4B4C6',
          }}
        >
          {onboarding[activeIndex].description}
        </text.T16>
      </div>
    );
  };

  const renderDots = (): JSX.Element => {
    return (
      <div
        className='container'
        style={{...utils.rowCenter({gap: 10}), marginBottom: '8%'}}
      >
        {onboarding.map((item: any, index: number) => {
          const isSelected = index === activeIndex;
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: isSelected ? theme.colors.white : '#4F4F66',
                width: 20,
                height: 2,
                borderRadius: 4,
              }}
            />
          );
        })}
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='Get started'
        colorScheme='light'
        containerStyle={{
          width: '44%',
          margin: '0 20px 20px 20px',
        }}
        onClick={() => navigate('/SignIn')}
      />
    );
  };

  return (
    <div
      id='screen'
      style={{backgroundColor: theme.colors.mainDark}}
    >
      {renderSlider()}
      {renderTitle()}
      {renderDescription()}
      {renderDots()}
      {renderButton()}
    </div>
  );
};
