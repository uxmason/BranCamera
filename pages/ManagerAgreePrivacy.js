/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useRef, useState} from 'react';
import {FONTSIZES} from '../assets/values/fontSizes';
import {COLORS} from '../assets/values/colors';
import {useTranslation} from 'react-i18next';
import SignatureScreen from 'react-native-signature-canvas';
import WebView from 'react-native-webview';

export default function ManagerAgreePrivacy(props) {
  const ref = useRef();
  const {t} = useTranslation('common');
  const [isLoading, setLoading] = useState(false);
  const [isAgree, setAgree] = useState(false);
  const boostSetInfoSigniture = async image64 => {
    props.navigation.navigate('ManagerHome', {agree: isAgree});
  };
  const handleOnDefault = () => {
    setAgree(false);
    ref.current.clearSignature();
  };
  const handleOnSave = () => {
    ref.current.readSignature();
  };
  const handleOK = signature => {
    // setLoading(true);
    boostSetInfoSigniture(signature);
  };
  const style = `.m-signature-pad {box-shadow: none; border: none; } 
                  .m-signature-pad--body {border: none;}
                  .m-signature-pad--footer {display: none; margin: 0px;}
                  body,html {height: 240px;}`;
  return (
    <>
      <WebView
        source={{
          uri: 'http://mc365reviewsystem.koreacentral.cloudapp.azure.com/api/camera/terms/privacy/',
        }}
      />
      <View
        style={{
          alignSelf: 'flex-end',
          bottom: 10,
          right: 10,
          borderRadius: 30,
          width: 340,
          height: 320,
          position: 'absolute',
          backgroundColor: COLORS.blackOpac1,
          overflow: 'hidden',
        }}>
        <View
          style={{
            height: 200,
            width: 300,
            margin: 20,
            alignSelf: 'flex-end',
          }}>
          <SignatureScreen
            ref={ref}
            webStyle={style}
            onOK={handleOK}
            onBegin={() => {
              setAgree(true);
            }}
            style={{
              overflow: 'hidden',
              borderRadius: 20,
            }}
          />
          <Text
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: '50%',
              fontSize: FONTSIZES.bigger,
              color: COLORS.blackOpac2,
              fontWeight: 600,
              marginTop: -15,
            }}>
            {t('sign_pad')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginBottom: 20,
            marginHorizontal: 20,
            width: 300,
          }}>
          <TouchableOpacity
            style={{alignSelf: 'center', margin: 5}}
            onPress={handleOnDefault}>
            <Text
              style={{
                width: 140,
                lineHeight: 50,
                textAlign: 'center',
                borderRadius: 15,
                overflow: 'hidden',
                backgroundColor: COLORS.defaultOpac2,
                color: COLORS.white,
                fontSize: FONTSIZES.large,
                fontWeight: 600,
              }}>
              {t('set_default_sign')}
            </Text>
          </TouchableOpacity>
          {isAgree ? (
            <TouchableOpacity
              style={{alignSelf: 'center', margin: 5}}
              onPress={handleOnSave}>
              <Text
                style={{
                  width: 140,
                  lineHeight: 50,
                  textAlign: 'center',
                  borderRadius: 15,
                  overflow: 'hidden',
                  backgroundColor: COLORS.blue,
                  color: COLORS.white,
                  fontSize: FONTSIZES.large,
                  fontWeight: 600,
                }}>
                {t('agree')}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                alignSelf: 'center',
                margin: 5,
                width: 140,
                lineHeight: 50,
                textAlign: 'center',
                borderRadius: 15,
                overflow: 'hidden',
                backgroundColor: COLORS.defaultOpac5,
                color: COLORS.white,
                fontSize: FONTSIZES.large,
                fontWeight: 600,
              }}>
              {t('agree')}
            </Text>
          )}
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          animating
          size={'large'}
        />
      ) : null}
    </>
  );
}
