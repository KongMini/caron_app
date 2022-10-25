//import liraries
import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-ui-lib';

import {
  FetchApi,
  ResetFunction,
  Sizes,
  useAppLanguage,
  useAppTheme,
  AccountService,
  ModalBase,
} from '../../../utils';
import {
  AppButton,
  AppContainer,
  AppImage,
  AppInput,
  AppText,
} from '../../../elements';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LanguageSetting} from './LanguageSetting';
import {useNavigation} from '@react-navigation/native';

export function FormLogin() {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const insert = useSafeAreaInsets();
  const {navigate} = useNavigation();

  const {control, handleSubmit} = useForm({
    mode: 'all',
  });

  const [submiting, setSubmiting] = useState(false);

  const LOGO = require('../../../utils/images/background_image_login.png');

  const INPUT = [
    {
      label: Strings.Phone_number,
      rules: {required: {value: true, message: Strings.This_field_is_required}},
      name: 'phone',
      keyboardType: 'number-pad',
    },
    {
      label: Strings.Password,
      rules: {required: {value: true, message: Strings.This_field_is_required}},
      name: 'password',
      secureTextEntry: true,
    },
  ];

  const onSubmit = async data => {
    try {
      setSubmiting(true);
      const {password, phone} = data;
      const result = await FetchApi.login({
        username: phone,
        password: password,
      });
      if (result._msg_code === 1) {
        AccountService.set(result._data);
        ResetFunction.resetToHome();
      } else if (
        result.message ===
        'Đăng nhập thất bại. Hãy kiểm tra lại tên đăng nhập và mật khẩu'
      ) {
        ModalBase.error({
          message: Strings.Wrong_login,
        });
      } else if (result.code >= 500) {
        ModalBase.error({
          message: Strings.Server_error,
        });
      } else {
        ModalBase.error({
          message: Strings.Have_an_error + ` (${result.code || 0})`,
        });
      }
    } catch (err) {
      console.log('err', err);
    }
    setSubmiting(false);
  };

  const onForgotPassword = () => {
    navigate('ForgotPassword');
  };
  const onCreateNewAccount = () => {
    navigate('Register');
  };

  return (
    <AppContainer style={{marginTop: insert.top}}>
      <KeyboardAwareScrollView automaticallyAdjustContentInsets={false}>
        <AppImage
          source={LOGO}
          style={{
            width: Sizes.device_width,
            height: (Sizes.device_width * 706) / 1208,
          }}
        />
        <LanguageSetting />

        {INPUT.map(item => (
          <AppInput
            containerStyle={{
              paddingHorizontal: Sizes.padding * 3,
              marginBottom: 10,
            }}
            style={{borderWidth: 0}}
            inputStyle={{
              borderBottomWidth: 1,
              paddingLeft: 0,
              borderColor: Colors.borderColorGrey,
              paddingBottom: 2,
            }}
            eyeStyle={{right: 4, bottom: -14}}
            placeholderTextColor={Colors.borderColorGrey}
            key={item.name}
            placeholder={item.label}
            control={control}
            name={item.name}
            rules={item.rules}
            secureTextEntry={item.secureTextEntry}
            keyboardType={item.keyboardType}
          />
        ))}

        <AppButton
          style={{marginTop: Sizes.padding}}
          control={control}
          title={Strings.Login}
          type="primary"
          onPress={handleSubmit(onSubmit)}
          disabled={submiting}
          // loading={submiting}
          // loading={true}
        />

        <View style={{marginVertical: Sizes.padding * 2.5}}>
          <AppButton
            control={control}
            title={Strings.Forgot_password}
            onPress={onForgotPassword}
          />
        </View>
        <AppButton
          type="primary"
          style={{backgroundColor: '#202680', borderColor: '#202680'}}
          control={control}
          title={Strings.Create_new_account_caron}
          onPress={onCreateNewAccount}
        />
      </KeyboardAwareScrollView>

      <AppText
        style={{
          paddingTop: Sizes.padding,
          fontStyle: 'italic',
          textAlign: 'center',
        }}>
        {Strings.Description_bottom_login}
      </AppText>
    </AppContainer>
  );
}
