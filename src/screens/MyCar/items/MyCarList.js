import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {AppIcon, AppText} from '../../../elements';
import {FetchApi, Sizes, useAppLanguage, useAppTheme} from '../../../utils';
import {ModalCustomServices} from '../../../utils/modules/ModalCustom/ModalCustomServices';

const MyCarList = ({selectedCar, setSelectedCar, refetch, data}) => {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();

  const Item = ({item, index, last}) => {
    const isRegistryDeadline =
      dayjs(item.registryDeadline, 'DD/MM/YYYY').diff(dayjs(), 'days') <= 28;
    const isSelected = selectedCar?.id === item?.id;

    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomWidth: last ? 3 : 1,
          borderColor: last ? '#f5f7fb' : Colors.greyThin,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (item.id === selectedCar?.id) {
              setSelectedCar();
              return;
            }
            setSelectedCar(item);
          }}
          style={{
            width: '82%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: Sizes.padding,
            paddingHorizontal: Sizes.padding,
          }}>
          <AppText
            style={{
              fontWeight: isRegistryDeadline || isSelected ? 'bold' : null,
              color:
                isRegistryDeadline || isSelected ? Colors.primary : Colors.text,
            }}>
            {index + 1}. {item.name}
          </AppText>
          <AppText
            style={{
              fontWeight: isRegistryDeadline || isSelected ? 'bold' : null,
              color:
                isRegistryDeadline || isSelected ? Colors.primary : Colors.text,
            }}>
            {item.license_plates}
          </AppText>
        </TouchableOpacity>
        <AppIcon
          onPress={() => {
            Alert.alert('Bạn có chắc chắn muốn xoá xe không?', '', [
              {
                text: 'Huỷ',
                style: 'cancel',
              },
              {
                text: 'Xoá',
                onPress: async () => {
                  const result = await FetchApi.deleteMyCar(item.id);
                  if (result._msg_code == 1) {
                    refetch();
                  } else {
                    ModalCustomServices.set({
                      title: Strings.Error,
                      titleStyle: {color: 'red'},
                      description: result?.message || Strings.something_wrong,
                    });
                  }
                },
              },
            ]);
          }}
          icon="closecircle"
          type="AntDesign"
          color={isSelected ? Colors.primary : Colors.greyThin}
          size={Sizes.h3}
          style={{marginRight: 10}}
        />
        <AppIcon
          onPress={() => {
            setSelectedCar(item);
          }}
          icon="edit"
          type="FontAwesome"
          color={isSelected ? Colors.primary : Colors.greyThin}
          size={Sizes.h2}
        />
      </View>
    );
  };

  return (
    <View>
      {data.map((item, index) => {
        return (
          <Item
            key={`${item.id}`}
            index={index}
            item={item}
            last={index === data.length - 1}
          />
        );
      })}
    </View>
  );
};

export default MyCarList;
