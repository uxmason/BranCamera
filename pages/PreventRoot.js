/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {COLORS} from '../assets/values/colors';
import {useTranslation} from 'react-i18next';
import { FONTSIZES } from '../assets/values/fontSizes';

export default function PreventRoot(props) {
  const {t} = useTranslation('common');
  const openBrowser = async () => {
    const url = 'http://mc365reviewsystem.koreacentral.cloudapp.azure.com/app/branchCamera/';
    await Linking.openURL(url);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.silver,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar hidden />
      <Image
        source={require('../assets/images/back0.jpg')}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 1,
        }}
      />
      <View
        style={{
          width: 360,
          height: 200,
          backgroundColor: COLORS.whiteOpac2,
          borderRadius: 30,
        }}>
          <Text style={{textAlign:'center', lineHeight:90, color:COLORS.default, fontSize:FONTSIZES.large}}>서비스 버전이 아닙니다.</Text>
          <TouchableOpacity
            onPress={openBrowser}
            style={{
              padding: 30,
              paddingVertical: 15,
              backgroundColor: COLORS.green,
              borderRadius: 15,
              width:250,
              alignSelf:'center',
            }}>
            <Text
              style={{
                color: COLORS.white,
                fontWeight: 600,
                fontSize: FONTSIZES.large,
                textAlign: 'center',
              }}>
              {t('new_version_download')}
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
