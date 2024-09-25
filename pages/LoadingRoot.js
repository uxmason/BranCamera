/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import RNRestart from 'react-native-restart';
import {COLORS} from '../assets/values/colors';
import {useTranslation} from 'react-i18next';
import { FONTSIZES } from '../assets/values/fontSizes';

export default function LoadingRoot(props) {
  const {t} = useTranslation('common');
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
        <Text style={{textAlign:'center', lineHeight:90, color:COLORS.default, fontSize:FONTSIZES.large}}>유효성 검사중입니다.</Text>
        <TouchableOpacity
            onPress={() => {RNRestart.Restart();}}
            style={{
              padding: 30,
              paddingVertical: 15,
              backgroundColor: COLORS.defaultOpac1,
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
              {t('do_reload')}
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
