/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../assets/values/colors';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import ManagerSearchMember from './ManagerSearchMember';
import {FONTSIZES} from '../assets/values/fontSizes';
import ManagerHome from './ManagerHome';
import ManagerAgreePrivacy from './ManagerAgreePrivacy';
import ManagerPhotoList from './ManagerPhotoList';
import ManagerTakePicture from './ManagerTakePicture';
import ManagerPhotoListDetail from './ManagerPhotoListDetail';
import ManagerPhotoListFreeCut from './ManagerPhotoListFreeCut';

const Stack = createStackNavigator();

export default function ManagerContainer(props) {
  const {t} = useTranslation('common');
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}>
        <Stack.Screen
          name="ManagerHome"
          component={ManagerHome}
          options={{
            headerShown: false,
            title: t('app_name'),
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerTitleStyle: {
              fontSize: FONTSIZES.large,
            },
          }}
        />
        <Stack.Screen
          name="ManagerAgreePrivacy"
          component={ManagerAgreePrivacy}
          options={{
            title: t('do_agree_privacy'),
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ManagerHome')}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  source={require('../assets/images/ic_arrow_light_left.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ManagerHome')}>
                <Image
                  style={{
                    width: 22,
                    height: 22,
                    right: 15,
                  }}
                  source={require('../assets/images/ic_close_big.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="ManagerSearchMember"
          component={ManagerSearchMember}
          options={{
            title: t('search_member'),
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ManagerHome')}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  source={require('../assets/images/ic_arrow_light_left.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ManagerHome')}>
                <Image
                  style={{
                    width: 22,
                    height: 22,
                    right: 15,
                  }}
                  source={require('../assets/images/ic_close_big.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="ManagerPhotoList"
          component={ManagerPhotoList}
          options={{
            headerShown: false,
            title: t('photos_taken_today'),
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="ManagerPhotoListDetail"
          component={ManagerPhotoListDetail}
          options={{
            headerShown: false,
            title: t('photos_taken_today'),
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="ManagerPhotoListFreeCut"
          component={ManagerPhotoListFreeCut}
          options={{
            headerShown: false,
            title: t('photos_taken_today'),
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="ManagerTakePicture"
          component={ManagerTakePicture}
          options={{
            title: t('take_pictures'),
            headerStyle: {
              backgroundColor: COLORS.black,
            },
            headerTitleStyle: {color: COLORS.white},
            headerLeft: () => (
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  source={require('../assets/images/ic_arrow_light_left.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
}
