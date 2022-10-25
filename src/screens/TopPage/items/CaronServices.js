import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {AppButton, AppImage, AppText} from '../../../elements';
import {Sizes, Svgs, useAppLanguage, useAppTheme} from '../../../utils';

const CaronServices = () => {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const {navigate} = useNavigation();
  const MENU = [
    {
      label: Strings.My_car,
      icon: <Svgs.XeCuaToi />,
      action: () => navigate('MyCar'),
    },
    {
      label: Strings.Announce_service_price,
      icon: <Svgs.BaoGiaDichVu />,
      action: () => navigate('AnnouncePriceServices'),
    },
    {
      label: Strings.Service_at_home,
      icon: <Svgs.DichVuTaiNha />,
      action: () => navigate('HomeService'),
    },
    {
      label: Strings.Promotions,
      icon: <Svgs.KhuyenMai />,
      action: () => navigate('Promotion'),
    },
    {
      label: Strings.Vehicle_inspection,
      icon: <Svgs.DinhGiaXe />,
      action: () => navigate('CarAppraisal'),
    },
    {
      label: Strings.Find_accessary,
      icon: <Svgs.PhuTung />,
      action: () => navigate('FindAccessory'),
    },
    {
      label: Strings.Buy_sell_old,
      icon: <Svgs.ChoXe />,
      action: () => navigate('CarMarket'),
    },
    {
      label: Strings.News_and_blog,
      icon: <Svgs.TinTuc />,
      action: () => navigate('NewAndBlog'),
    },
    {
      label: Strings.Buy_insurance,
      icon: <Svgs.MuaBaoHiem />,
      action: () => navigate('BuyInsurance'),
    },
  ];

  return (
    <View style={{borderBottomWidth: 1, borderColor: Colors.borderColorGrey}}>
      <AppText
        style={{
          textAlignVertical: 'center',
          fontWeight: 'bold',
          paddingHorizontal: Sizes.padding,
          paddingVertical: 12,
        }}>
        {Strings.Caron_services}
      </AppText>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10}}>
        {MENU.map((item, index) => {
          return (
            <AppButton
              key={`${index}`}
              style={{
                width: Sizes.width(100 / 3),
                borderColor: Colors.greyThin,
              }}
              onPress={item.action}
              renderItem={() => {
                return (
                  <View
                    key={`${index}`}
                    style={{
                      paddingBottom: 6,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={{marginVertical: 10}}>{item.icon}</View>
                    <AppText style={{textAlign: 'center'}}>
                      {item.label}
                    </AppText>
                  </View>
                );
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default CaronServices;
