import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {AppContainer} from '../../elements';
import {
  Convert,
  FetchApi,
  FirebasePushNotificationHelper,
  useFocusRefetch,
} from '../../utils';

import CaronWallet from './items/CaronWallet';
import FavoriteServices from './items/FavoriteServices';
import Banner from './items/Banner';
import CaronServices from './items/CaronServices';
import Suggestions from './items/Suggestions';
import {useNotificationBadge} from '../../hooks';
import {useQuery} from 'react-query';

const TopPage = ({navigation}) => {
  const [isRefreshing, setIsRefreshing] = useState();
  const timeout = useRef();

  const {badge, setBadge} = useNotificationBadge();
  const {data} = useQuery([`useGetListNotification-${1}`], () =>
    FetchApi.getListNoti(),
  );
  useFocusRefetch(`useGetListNotification-${1}`);

  useEffect(() => {
    if (Array.isArray(data?._data)) {
      let countNoti = 0;
      data?._data.forEach(item => {
        if (item.status === 0) {
          countNoti = countNoti + 1;
        }
      });
      const newBadge = {...badge, all: countNoti};
      setBadge(newBadge);
    }
  }, [data]);

  useEffect(() => {
    FirebasePushNotificationHelper.requestUserPermission();
    FirebasePushNotificationHelper.notificationListener(e => {
      console.log('e', e);
      if (e?.body?.data?.id) {
        navigation.push('NotificationDetail', {dataProps: id});
        return;
      }
      navigation.push('Notification');
    });
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  const DataRendering = [
    {
      component: ScrollView,
      config: {
        contentContainerStyle: {paddingBottom: 80},
        refreshControl: (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              timeout.current = setTimeout(() => {
                setIsRefreshing(false);
              }, 2000);
            }}
          />
        ),
      },
      children: [
        {
          component: CaronWallet,
          config: {isRefreshing: isRefreshing},
        },
        {
          component: FavoriteServices,
          config: {navigation: navigation},
        },
        {
          component: Banner,
          config: {isRefreshing: isRefreshing},
        },
        {
          component: CaronServices,
        },
        {
          component: Suggestions,
          config: {isRefreshing: isRefreshing},
        },
        // {
        //   component: FloatMenu,
        //   config: {navigation: navigation},
        // },
      ],
    },
  ];

  return (
    <AppContainer style={{marginBottom: 0}}>
      {DataRendering.map((item, index) => {
        const Component = item.component;
        const children = Convert.dataRenderingChildren({item});
        return (
          <Component key={`${index}`} {...item.config}>
            {children}
          </Component>
        );
      })}
    </AppContainer>
  );
};

export default TopPage;
