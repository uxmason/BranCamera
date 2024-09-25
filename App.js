/* eslint-disable react-native/no-inline-styles */
import React, {createContext, useState} from 'react';
import GlobalFunctions from './class/GlobalFunctions';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import Root from './pages/Root';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18n from 'i18next';
import commonKr from './assets/i18n/kr.json';
import {BackHandler, Text, View} from 'react-native';
import {FONTSIZES} from './assets/values/fontSizes';
import axios from 'axios';
import PreventRoot from './pages/PreventRoot';
import LoadingRoot from './pages/LoadingRoot';
// import eventBus from './class/EventBus';

i18n.init({
  compatibilityJSON: 'v3',
  lng: 'kr',
  fallbackLng: 'en',
  debug: true,
  resources: {
    kr: {common: commonKr},
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export const AppContext = createContext();

export default function App() {
  const [isAllClear, setAllClear] = useState(false);
  const [isLoaded, setLoaded] = useState(true);
  DeviceInfo.getUniqueId().then(uniqueId => {
    GlobalFunctions.device = uniqueId;
    axios.get('https://api64.ipify.org?format=json')
    .then(response => {
      boostCheckVersion(response.data.ip);
    })
    .catch(error => {
      console.error('Unable to get IP address', error);
    });

    const boostCheckVersion = async (ip) => {
      try {
        let json;
        let url =
          `http://mc365reviewsystem.koreacentral.cloudapp.azure.com/api/app/checkVersion/?ip=${ip}`;
        const response = await fetch(url, {
          method: 'GET',
        });
        if (response.ok) {
          json = await response.json();
          if (json != null) {
            if (json.success) {
              setAllClear(json.version === DeviceInfo.getVersion());
              setLoaded(false);
            } else {
              Toast.show({
                type: 'error',
                text1: json.message,
              });
              // setTimeout(() => {
              //   BackHandler.exitApp();
              // }, 5000);
            }
          } else {
            Toast.show({
              type: 'error',
              text1: t('server_connect_check'),
            });
            setLoaded(false);
          }
        } else {
          Toast.show({
            type: 'error',
            text1: '서버 응답 오류',
            text2: response.statusText,
          });
          setLoaded(false);
        }
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: e.name,
          text2: e.message,
        });
        console.log(e.message);
        setCountUploading([]);
      }
    }
  });
  const [countUploading, setCountUploading] = useState([]);
  const {t} = useTranslation('common');

  // const handleLoadPictures = () => {
  //   eventBus.emit('loadPictures');
  // };

  const boostAppUploadPhoto = (
    data,
    imageData,
    psEntry,
    parentIndex,
    childIndex,
  ) => {
    const boostUploadImage = async () => {
      if (imageData) {
        setCountUploading(prevItems => [...prevItems, imageData.path]);
        const formData = new FormData();
        const now = new Date();
        formData.append('photo', {
          type: 'image/jpeg',
          uri: 'file://' + imageData.path,
          name:
            now.getFullYear().toString() +
            returnDigitDual(now.getMonth() + 1) +
            returnDigitDual(now.getDate()),
        });
        formData.append('branch', psEntry.substring(0, 2));
        formData.append('psEntry', psEntry);
        formData.append('imagePath', imageData.path);
        if (parentIndex != null && childIndex != null) {
          formData.append('bodyPart', data[parentIndex].bodyPart[childIndex]);
        }
        try {
          let json;
          let url =
            'http://mc365reviewsystem.koreacentral.cloudapp.azure.com/api/camera/upload/';
          const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.ok) {
            json = await response.json();
            if (json != null) {
              if (json.success) {
                console.log('성공');
                // handleLoadPictures();
              } else {
                Toast.show({
                  type: 'error',
                  text1: json.message,
                });
              }
              setCountUploading(prevItems =>
                prevItems.filter(i => i !== json.imagePath),
              );
            } else {
              Toast.show({
                type: 'error',
                text1: t('server_connect_check'),
              });
            }
          } else {
            Toast.show({
              type: 'error',
              text1: '서버 응답 오류',
              text2: response.statusText,
            });
          }
        } catch (e) {
          Toast.show({
            type: 'error',
            text1: e.name,
            text2: e.message,
          });
          console.log(e.message);
          setCountUploading([]);
        } finally {
          // setLoading(false);
        }
      }
    };
    boostUploadImage();
  };

  const returnDigitDual = n => {
    if (n < 10) {
      return '0' + n;
    } else {
      return n;
    }
  };

  return (
    <AppContext.Provider value={{boostAppUploadPhoto}}>
      <I18nextProvider i18n={i18n}>
        {isAllClear ? <Root /> : isLoaded ? <LoadingRoot /> : <PreventRoot />}
        <Toast
          config={{
            position: 'bottom',
            bottomOffset: 60,
          }}
        />
        {countUploading.length > 0 ? (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}>
            <Text
              style={{
                textAlign: 'center',
                lineHeight: 30,
                paddingVertical: 10,
                fontSize: FONTSIZES.large,
              }}>{`${countUploading.length} 개 이미지 업로드 중..`}</Text>
          </View>
        ) : null}
      </I18nextProvider>
    </AppContext.Provider>
  );
}
