/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState, useContext} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  Pressable,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../assets/values/colors';
import {useTranslation} from 'react-i18next';
import {
  Camera,
  getCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {
  SensorTypes,
  accelerometer,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import {FONTSIZES} from '../assets/values/fontSizes';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Orientation from 'react-native-orientation-locker';
import {AppContext} from '../App';

export default function ManagerTakePicture(props) {
  const [data, setData] = useState([
    {
      list: [
        require('../assets/images/pose_stomach_0.png'),
        require('../assets/images/pose_stomach_1.png'),
        require('../assets/images/pose_stomach_2.png'),
        require('../assets/images/pose_stomach_3.png'),
        require('../assets/images/pose_stomach_4.png'),
        require('../assets/images/pose_stomach_5.png'),
        require('../assets/images/pose_stomach_6.png'),
        require('../assets/images/pose_stomach_7.png'),
        require('../assets/images/pose_stomach_8.png'),
        require('../assets/images/pose_stomach_9.png'),
        require('../assets/images/pose_stomach_10.png'),
        require('../assets/images/pose_stomach_11.png'),
        require('../assets/images/pose_whole_0.png'),
        require('../assets/images/pose_whole_1.png'),
        require('../assets/images/pose_whole_2.png'),
        require('../assets/images/pose_whole_3.png'),
        require('../assets/images/pose_whole_4.png'),
      ],
      zoom: [3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1],
      bodyPart: [
        19, 21, 20, 22, 17, 18, 8, 10, 9, 11, 6, 7, 29, 30, 31, 310, 28,
      ],
      bodyComment: [
        '복부정면',
        '복부좌측45도',
        '복부좌측',
        '복부후면',
        '복부우측',
        '복부우측45도',
        '러브핸들정면',
        '러브핸들좌측45도',
        '러브핸들좌측',
        '러브핸들후면',
        '러브핸들우측',
        '러브핸들우측45도',
        '전신정면',
        '전신좌측',
        '전신후면',
        '(팔 벌려)',
        '전신우측',
      ],
      partName: 'stomach',
    },
    {
      list: [
        require('../assets/images/pose_thigh_0.png'),
        require('../assets/images/pose_thigh_3.png'),
        require('../assets/images/pose_thigh_4.png'),
        require('../assets/images/pose_thigh_5.png'),
        require('../assets/images/pose_thigh_6.png'),
        require('../assets/images/pose_thigh_7.png'),
        require('../assets/images/pose_thigh_8.png'),
        require('../assets/images/pose_thigh_1.png'),
        require('../assets/images/pose_whole_0.png'),
        require('../assets/images/pose_thigh_2.png'),
        require('../assets/images/pose_whole_1.png'),
        require('../assets/images/pose_whole_2.png'),
        require('../assets/images/pose_whole_3.png'),
        require('../assets/images/pose_thigh_9.png'),
        require('../assets/images/pose_whole_4.png'),
      ],
      zoom: [2, 2, 2, 3, 2, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1],
      bodyPart: [
        50, 51, 53, 530, 531, 532, 48, 500, 29, 52, 30, 31, 310, 49, 28,
      ],
      bodyComment: [
        '허벅지정면.1',
        '허벅지좌측',
        '허벅지후면.1',
        '허벅지후면.2',
        '허벅지후면.3',
        '허벅지후면.4',
        '허벅지우측',
        '허벅지정면.2',
        '전신정면',
        '허벅지좌측45도',
        '전신좌측',
        '전신후면',
        '(팔 벌려)',
        '허벅지우측45도',
        '전신우측',
      ],
      partName: 'thigh',
    },
    {
      list: [
        require('../assets/images/pose_calf_0.png'),
        require('../assets/images/pose_calf_1.png'),
        require('../assets/images/pose_calf_2.png'),
        require('../assets/images/pose_calf_3.png'),
        require('../assets/images/pose_calf_4.png'),
        require('../assets/images/pose_calf_5.png'),
        require('../assets/images/pose_calf_6.png'),
        require('../assets/images/pose_whole_0.png'),
        require('../assets/images/pose_whole_1.png'),
        require('../assets/images/pose_whole_2.png'),
        require('../assets/images/pose_whole_3.png'),
        require('../assets/images/pose_whole_4.png'),
      ],
      zoom: [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1],
      bodyPart: [34, 36, 35, 37, 370, 38, 39, 29, 30, 31, 310, 28],
      bodyComment: [
        '종아리정면',
        '종아리좌측45도',
        '종아리좌측',
        '종아리후면',
        '(발꿈치 들고)',
        '종아리우측',
        '종아리우측45도',
        '전신정면',
        '전신좌측',
        '전신후면',
        '(팔 벌려)',
        '전신우측',
      ],
      partName: 'calf',
    },
    {
      list: [
        require('../assets/images/pose_arm_0.png'),
        require('../assets/images/pose_arm_1.png'),
        require('../assets/images/pose_arm_2.png'),
        require('../assets/images/pose_arm_3.png'),
        require('../assets/images/pose_arm_5.png'),
        require('../assets/images/pose_arm_6.png'),
        require('../assets/images/pose_arm_7.png'),
        require('../assets/images/pose_arm_8.png'),
        require('../assets/images/pose_arm_9.png'),
        require('../assets/images/pose_arm_10.png'),
        require('../assets/images/pose_whole_0.png'),
        require('../assets/images/pose_whole_1.png'),
        require('../assets/images/pose_whole_2.png'),
        require('../assets/images/pose_whole_3.png'),
        require('../assets/images/pose_arm_4.png'),
        require('../assets/images/pose_whole_4.png'),
      ],
      zoom: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
      bodyPart: [2, 4, 3, 5, 47, 46, 0, 1, 41, 42, 29, 30, 31, 310, 11, 28],
      bodyComment: [
        '가슴정면',
        '가슴좌측45도',
        '가슴좌측',
        '가슴후면',
        '팔후면(왼팔)',
        '팔후면(오른팔)',
        '가슴우측',
        '가슴우측45도',
        '팔정면(오른팔)',
        '팔정면(왼팔)',
        '전신정면',
        '전신좌측',
        '전신후면',
        '(팔 벌려)',
        '(팔 벌려)',
        '전신우측',
      ],
      partName: 'arm',
    },
    {
      list: [
        require('../assets/images/pose_arm_0.png'),
        require('../assets/images/pose_arm_1.png'),
        require('../assets/images/pose_arm_2.png'),
        require('../assets/images/pose_arm_3.png'),
        require('../assets/images/pose_arm_7.png'),
        require('../assets/images/pose_arm_8.png'),
        require('../assets/images/pose_whole_0.png'),
        require('../assets/images/pose_whole_1.png'),
        require('../assets/images/pose_whole_2.png'),
        require('../assets/images/pose_whole_3.png'),
        require('../assets/images/pose_arm_4.png'),
        require('../assets/images/pose_whole_4.png'),
      ],
      zoom: [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
      bodyPart: [2, 4, 3, 5, 0, 1, 29, 30, 31, 310, 11, 28],
      bodyComment: [
        '가슴정면',
        '가슴좌측45도',
        '가슴좌측',
        '가슴후면',
        '가슴우측',
        '가슴우측45도',
        '전신정면',
        '전신좌측',
        '전신후면',
        '(팔 벌려)',
        '(팔 벌려)',
        '전신우측',
      ],
      partName: 'breast',
    },
    {
      list: [
        require('../assets/images/pose_whole_0.png'),
        require('../assets/images/pose_whole_1.png'),
        require('../assets/images/pose_whole_2.png'),
        require('../assets/images/pose_whole_3.png'),
        require('../assets/images/pose_whole_4.png'),
      ],
      zoom: [1, 1, 1, 1, 1],
      bodyPart: [29, 30, 31, 310, 28],
      bodyComment: [
        '전신정면',
        '전신좌측',
        '전신후면',
        '(팔 벌려)',
        '전신우측',
      ],
      partName: 'whole_body',
    },
  ]);
  const camera = useRef(null);
  const devices = Camera.getAvailableCameraDevices();
  const device = getCameraDevice(devices, 'back', {
    physicalDevices: ['wide-angle-camera'],
  });
  const format = useCameraFormat(device, [
    // {photoAspectRatio: 3 / 4},
    // {videoAspectRatio: 3 / 4},
    // {photoHdr: true},
  ]);
  const [isLoading, setLoading] = useState(false);
  const [isFocused, setFocused] = useState(true);
  const [isGuideline, setGuideline] = useState(true);
  const [rotateDeviceSide, setRotateDeviceSide] = useState(0);
  const [rotateDeviceFlip, setRotateDeviceFlip] = useState(0);
  const {t} = useTranslation('common');
  const [isTorch, setIsTorch] = useState(false);
  const [imageData, setImageData] = useState();
  const {height, width} = Dimensions.get('window');
  const [screenRatio, setScreenRatio] = useState(null);
  const [rotateString, setRotateString] = useState('');
  const [childIndex, setChildIndex] = useState(0);

  setUpdateIntervalForType(SensorTypes.accelerometer, 300);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      if (height / width > 16 / 9) {
        setScreenRatio(16 / 9);
      } else {
        setScreenRatio(4 / 3);
      }
      setFocused(true);
      setChildIndex(props.route.params.childIndex);

      const boostUploadImage = async () => {
        const formData = new FormData();
        formData.append('branch', props.route.params.psEntry.substring(0, 2));
        formData.append('psEntry', props.route.params.psEntry);
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
          json = await response.json();
          if (json != null) {
            Toast.show({
              type: 'success',
              text1: '연결 성공',
            });
          } else {
            Toast.show({
              type: 'error',
              text1: t('server_connect_check'),
            });
          }
        } catch (e) {
          Toast.show({
            type: 'error',
            text1: e.name,
            text2: e.message,
          });
        } finally {
          setLoading(false);
        }
      };
      boostUploadImage();
    });
    return unsubscribe;
  }, [props.navigation]);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      setFocused(false);
      setScreenRatio(null);
      // Orientation.unlockAllOrientations();
      Orientation.lockToLandscape();
    });
    return unsubscribe;
  }, [props.navigation]);
  // useEffect(() => {
  //   if (isFocused) {
  //     Orientation.lockToLandscape();
  //   }
  // }, [isFocused]);
  useEffect(() => {
    data[props.route.params.parentIndex] &&
    data[props.route.params.parentIndex].zoom[childIndex] === 1
      ? Orientation.lockToPortrait()
      : Orientation.lockToLandscape();
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      let tempRotateValue;
      let tempRotateValueFlip;
      if (
        data[props.route.params.parentIndex] &&
        data[props.route.params.parentIndex].zoom[childIndex] === Number(1)
      ) {
        //세로모드
        if (x >= 0 && x < 10) {
          if (y >= 0 && y < 10) {
            tempRotateValue = 90 - x * 9;
            tempRotateValueFlip = 90 - z * 9;
          } else {
            tempRotateValue = x * 9 + 270;
            tempRotateValueFlip = 270 + z * 9;
          }
        } else {
          if (y >= 0 && y < 10) {
            tempRotateValue = 90 - x * 9;
            tempRotateValueFlip = 90 - z * 9;
          } else {
            tempRotateValue = x * 9 + 270;
            tempRotateValueFlip = 270 + z * 9;
          }
        }
      } else {
        //가로모드
        if (x >= 0 && x < 10) {
          if (y >= 0 && y < 10) {
            tempRotateValue = 90 + y * 9;
          } else {
            tempRotateValue = 0 + x * 9;
          }
          tempRotateValueFlip = 90 - z * 9;
        } else {
          if (y >= 0 && y < 10) {
            tempRotateValue = 180 - x * 9;
          } else {
            tempRotateValue = 270 - y * 9;
          }
          tempRotateValueFlip = 270 + z * 9;
        }
      }
      setRotateDeviceSide(tempRotateValue);
      setRotateDeviceFlip(tempRotateValueFlip);
    });
    return () => subscription.unsubscribe();
  }, [childIndex]);

  useEffect(() => {
    if (rotateDeviceFlip >= 0 && rotateDeviceFlip < 60) {
      setRotateString('카메라가 바닥을 향함');
    }
    if (rotateDeviceFlip >= 60 && rotateDeviceFlip < 120) {
      if (
        (rotateDeviceSide >= 0 && rotateDeviceSide < 20) ||
        (rotateDeviceSide >= 340 && rotateDeviceSide < 360)
      ) {
        setRotateString('왼쪽으로 뒤집힘');
      }
      if (rotateDeviceSide >= 20 && rotateDeviceSide < 70) {
        setRotateString('왼쪽으로 기울어짐');
      }
      if (rotateDeviceSide >= 70 && rotateDeviceSide < 110) {
        setRotateString('촬영가능');
      }
      if (rotateDeviceSide >= 110 && rotateDeviceSide < 160) {
        setRotateString('오른쪽으로 기울어짐');
      }
      if (rotateDeviceSide >= 160 && rotateDeviceSide < 200) {
        setRotateString('오른쪽으로 뒤집힘');
      }
    }
    if (rotateDeviceFlip >= 120 && rotateDeviceFlip < 180) {
      setRotateString('카메라가 하늘로 향함');
    }
  }, [rotateDeviceFlip, rotateDeviceSide]);

  const handleCameraShutter = async () => {
    if (!isLoading) {
      setLoading(true);
      const photo = await camera.current.takePhoto();
      setImageData(photo);
    }
  };
  const {boostAppUploadPhoto} = useContext(AppContext);
  useEffect(() => {
    if (imageData) {
      boostAppUploadPhoto(
        data,
        imageData,
        props.route.params.psEntry,
        props.route.params.parentIndex,
        childIndex,
      );
      setLoading(false);
      if (props.route.params.parentIndex != null) {
        if (childIndex < data[props.route.params.parentIndex].list.length - 1) {
          setChildIndex(childIndex + 1);
          Toast.show({
            type: 'success',
            text1: '사진이 저장되었고, 다음 포즈 촬영을 시작합니다.',
          });
        } else {
          props.navigation.goBack();
          Toast.show({
            type: 'success',
            text1: '이후 촬영할 포즈가 없어 첫화면으로 넘어갑니다.',
          });
        }
      } else {
        props.navigation.goBack();
      }
    }
  }, [imageData]);

  const returnDigitDual = n => {
    if (n < 10) {
      return '0' + n;
    } else {
      return n;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.black,
        }}
      />
      <View
        style={{
          width:
            data[props.route.params.parentIndex] &&
            data[props.route.params.parentIndex].zoom[childIndex] === 1
              ? width
              : '100%',
          height:
            data[props.route.params.parentIndex] &&
            data[props.route.params.parentIndex].zoom[childIndex] === 1
              ? 1000
              : null,
        }}>
        <View
          style={{
            width:
              data[props.route.params.parentIndex] &&
              data[props.route.params.parentIndex].zoom[childIndex] === 1
                ? '100%'
                : '100%',
            height:
              data[props.route.params.parentIndex] &&
              data[props.route.params.parentIndex].zoom[childIndex] === 1
                ? '100%'
                : '100%',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          {screenRatio && isFocused && width ? (
            <View
              style={{
                bottom:
                  data[props.route.params.parentIndex] &&
                  data[props.route.params.parentIndex].zoom[childIndex] === 1
                    ? 140
                    : 0,
                left:
                  data[props.route.params.parentIndex] &&
                  data[props.route.params.parentIndex].zoom[childIndex] === 1
                    ? 70
                    : 100,
                width:
                  data[props.route.params.parentIndex] &&
                  data[props.route.params.parentIndex].zoom[childIndex] === 1
                    ? 660
                    : 880,
                height:
                  data[props.route.params.parentIndex] &&
                  data[props.route.params.parentIndex].zoom[childIndex] === 1
                    ? 880
                    : 660,
                borderRadius: 30,
                overflow: 'hidden',
              }}>
              <Camera
                ref={camera}
                photo
                device={device}
                isActive
                focusable
                zoom={
                  props.route.params.parentIndex
                    ? data[props.route.params.parentIndex].zoom[childIndex]
                    : null
                }
                style={{width: '100%', height: '100%'}}
                torch={isTorch ? 'on' : 'off'}
                format={format}
              />
              {props.route.params.parentIndex != null &&
              childIndex != null &&
              isGuideline ? (
                <Image
                  style={{
                    position: 'absolute',
                    width:
                      data[props.route.params.parentIndex] &&
                      data[props.route.params.parentIndex].zoom[childIndex] ===
                        1
                        ? 660
                        : 880,
                    height:
                      data[props.route.params.parentIndex] &&
                      data[props.route.params.parentIndex].zoom[childIndex] ===
                        1
                        ? 880
                        : 660,
                    alignSelf: 'center',
                  }}
                  source={
                    data[props.route.params.parentIndex] &&
                    data[props.route.params.parentIndex].list[childIndex]
                  }
                />
              ) : null}

              {data[props.route.params.parentIndex] &&
              data[props.route.params.parentIndex].zoom[childIndex] === 1 ? (
                rotateString === '촬영가능' ? (
                  <View
                    style={{
                      position: 'absolute',
                      borderWidth: width > 600 ? 10 : 6,
                      borderColor: COLORS.green,
                      width: '100%',
                      height: '100%',
                      borderRadius: 30,
                    }}
                  />
                ) : null
              ) : rotateString === '촬영가능' ? (
                <View
                  style={{
                    position: 'absolute',
                    borderWidth: width > 600 ? 10 : 6,
                    borderColor: COLORS.green,
                    width: '100%',
                    height: '100%',
                    borderRadius: 30,
                  }}
                />
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top:
            data[props.route.params.parentIndex] &&
            data[props.route.params.parentIndex].zoom[childIndex] === 1
              ? null
              : 6,
          bottom:
            data[props.route.params.parentIndex] &&
            data[props.route.params.parentIndex].zoom[childIndex] === 1
              ? 50
              : null,
          width:
            data[props.route.params.parentIndex] &&
            data[props.route.params.parentIndex].zoom[childIndex] === 1
              ? 660
              : 240,
          height:
            data[props.route.params.parentIndex] &&
            data[props.route.params.parentIndex].zoom[childIndex] === 1
              ? 240
              : 660,
          right:
            data[props.route.params.parentIndex] &&
            data[props.route.params.parentIndex].zoom[childIndex] === 1
              ? 70
              : 100,
          padding: 20,
          backgroundColor: COLORS.whiteOpac1,
          borderRadius: 30,
          flexDirection:
            data[props.route.params.parentIndex] &&
            data[props.route.params.parentIndex].zoom[childIndex] === 1
              ? 'row'
              : null,
        }}>
        <View
          style={{
            width:
              data[props.route.params.parentIndex] &&
              data[props.route.params.parentIndex].zoom[childIndex] === 1
                ? 80
                : 200,
            height:
              data[props.route.params.parentIndex] &&
              data[props.route.params.parentIndex].zoom[childIndex] === 1
                ? 80
                : 90,
            backgroundColor:
              rotateDeviceSide >= 70 &&
              rotateDeviceSide < 110 &&
              rotateDeviceFlip < 120 &&
              rotateDeviceFlip >= 60
                ? COLORS.greenOpac3
                : COLORS.redOpac3,
            borderRadius: 20,
            borderWidth: 1,
            borderColor:
              rotateDeviceSide >= 70 &&
              rotateDeviceSide < 110 &&
              rotateDeviceFlip < 120 &&
              rotateDeviceFlip >= 60
                ? COLORS.green
                : COLORS.red,
            marginBottom: 20,
            top:
              data[props.route.params.parentIndex] &&
              data[props.route.params.parentIndex].zoom[childIndex] === 1
                ? 5
                : null,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight:
              data[props.route.params.parentIndex] &&
              data[props.route.params.parentIndex].zoom[childIndex] === 1
                ? 20
                : 0,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              transform: [
                {
                  rotateZ:
                    data[props.route.params.parentIndex] &&
                    data[props.route.params.parentIndex].zoom[childIndex] === 1
                      ? 90 - rotateDeviceSide + 'deg'
                      : 90 - rotateDeviceSide + 'deg',
                },
              ],
            }}>
            <View
              style={{
                position: 'absolute',
                width: 60,
                height: 60,
                borderWidth: 1,
                borderColor: COLORS.whiteOpac5,
                borderRadius: 30,
              }}
            />
            <View
              style={{
                position: 'absolute',
                width: 60,
                height: 1,
                backgroundColor: COLORS.whiteOpac5,
              }}
            />
            <View
              style={{
                position: 'absolute',
                width: 1,
                height: 60,
                backgroundColor: COLORS.whiteOpac5,
              }}
            />
            <View
              style={{
                position: 'absolute',
                width: 40,
                height: 40,
                backgroundColor: COLORS.whiteOpac1,
                borderWidth: 1,
                borderColor: COLORS.white,
                borderRadius: 20,
                transform: [
                  {
                    rotateX:
                      data[props.route.params.parentIndex] &&
                      data[props.route.params.parentIndex].zoom[childIndex] ===
                        1
                        ? 90 - rotateDeviceFlip + 'deg'
                        : 90 - rotateDeviceFlip + 'deg',
                  },
                ],
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            bottom:
              data[props.route.params.parentIndex] &&
              data[props.route.params.parentIndex].zoom[childIndex] === 1
                ? 55
                : null,
          }}>
          <View
            style={{
              width: 90,
              height: 80,
              backgroundColor:
                rotateDeviceSide >= 70 && rotateDeviceSide < 110
                  ? COLORS.greenOpac3
                  : COLORS.redOpac3,
              borderRadius: 20,
              borderWidth: 1,
              borderColor:
                rotateDeviceSide >= 70 && rotateDeviceSide < 110
                  ? COLORS.green
                  : COLORS.red,
              marginRight: 10,
            }}>
            <Image
              style={[
                {
                  width: 40,
                  height: 40,
                  margin: 20,
                  marginHorizontal: 25,
                  tintColor: COLORS.white,
                  transform: [
                    {
                      rotateZ:
                        data[props.route.params.parentIndex] &&
                        data[props.route.params.parentIndex].zoom[
                          childIndex
                        ] === 1
                          ? 90 - rotateDeviceSide + 'deg'
                          : 0 - rotateDeviceSide + 'deg',
                    },
                  ],
                },
              ]}
              source={require('../assets/images/iconMobileFront.png')}
            />
          </View>
          <View
            style={{
              width: 90,
              height: 80,
              backgroundColor:
                rotateDeviceFlip >= 60 && rotateDeviceFlip < 120
                  ? COLORS.greenOpac3
                  : COLORS.redOpac3,
              borderRadius: 20,
              borderWidth: 1,
              borderColor:
                rotateDeviceFlip >= 60 && rotateDeviceFlip < 120
                  ? COLORS.green
                  : COLORS.red,
              marginLeft: 10,
            }}>
            <Image
              style={[
                {
                  width: 40,
                  height: 40,
                  margin: 20,
                  marginHorizontal: 25,
                  tintColor: COLORS.white,
                  transform: [
                    {
                      rotateZ:
                        data[props.route.params.parentIndex] &&
                        data[props.route.params.parentIndex].zoom[
                          childIndex
                        ] === 1
                          ? 90 - rotateDeviceFlip + 'deg'
                          : 90 - rotateDeviceFlip + 'deg',
                    },
                  ],
                },
              ]}
              source={require('../assets/images/iconMobileSide.png')}
            />
          </View>
        </View>
        {props.route.params.parentIndex != null && childIndex != null ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop:
                data[props.route.params.parentIndex] &&
                data[props.route.params.parentIndex].zoom[childIndex] === 1
                  ? 20
                  : 30,
              left:
                data[props.route.params.parentIndex] &&
                data[props.route.params.parentIndex].zoom[childIndex] === 1
                  ? 120
                  : 0,
            }}>
            <Text
              style={{
                lineHeight: 45,
                fontSize: width > 600 ? FONTSIZES.large : FONTSIZES.small,
              }}>
              {t('guideline')}:
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (isGuideline) {
                  setGuideline(false);
                } else {
                  setGuideline(true);
                }
              }}
              style={{
                marginLeft: 5,
                padding: 5,
                width: 110,
                height: 50,
                borderRadius: 25,
                backgroundColor: isGuideline ? COLORS.green : COLORS.red,
                flexDirection: 'row',
              }}>
              {!isGuideline ? (
                <Text
                  style={{
                    lineHeight: width > 600 ? 35 : 25,
                    textAlign: 'center',
                    flex: 1,
                    fontSize: width > 600 ? FONTSIZES.large : FONTSIZES.small,
                    fontWeight: 800,
                    color: COLORS.white,
                  }}>
                  {t('on')}
                </Text>
              ) : null}
              <View
                style={{
                  width: width > 600 ? 40 : 30,
                  height: width > 600 ? 40 : 30,
                  borderRadius: width > 600 ? 20 : 15,
                  backgroundColor: COLORS.white,
                }}
              />
              {isGuideline ? (
                <Text
                  style={{
                    lineHeight: width > 600 ? 35 : 25,
                    textAlign: 'center',
                    flex: 1,
                    fontSize: width > 600 ? FONTSIZES.large : FONTSIZES.small,
                    fontWeight: 800,
                    color: COLORS.white,
                  }}>
                  {t('off')}
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        ) : null}
        <View
          style={{
            top:
              data[props.route.params.parentIndex] &&
              data[props.route.params.parentIndex].zoom[childIndex] === 1
                ? 115
                : 30,
            flexDirection: 'row',
            right:
              data[props.route.params.parentIndex] &&
              data[props.route.params.parentIndex].zoom[childIndex] === 1
                ? 500
                : 0,
          }}>
          {data[props.route.params.parentIndex] ? (
            childIndex <
            data[props.route.params.parentIndex].list.length - 1 ? (
              <>
                <Text style={{lineHeight: 70, width: 120}}>
                  {`${t('next_camera_pose')}:`}
                </Text>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: COLORS.whiteOpac5,
                    backgroundColor: COLORS.whiteOpac1,
                  }}
                  source={
                    data[props.route.params.parentIndex].list[childIndex + 1]
                  }
                />
              </>
            ) : (
              <Text
                style={{
                  lineHeight: 70,
                  textAlign: 'center',
                  flex:
                    data[props.route.params.parentIndex] &&
                    data[props.route.params.parentIndex].zoom[childIndex] === 1
                      ? null
                      : 1,
                }}>
                {t('next_camera_pose_comment')}
              </Text>
            )
          ) : (
            <Text
              style={{
                lineHeight: 70,
                textAlign: 'center',
                flex:
                  data[props.route.params.parentIndex] &&
                  data[props.route.params.parentIndex].zoom[childIndex] === 1
                    ? null
                    : 1,
              }}>
              {t('random_camera_pose_comment')}
            </Text>
          )}
        </View>
        {data[props.route.params.parentIndex] ? (
          <Text
            style={{
              width: 220,
              padding:
                data[props.route.params.parentIndex] &&
                data[props.route.params.parentIndex].zoom[childIndex] === 1
                  ? 20
                  : 5,
              paddingVertical: 5,
              lineHeight: 20,
              color: COLORS.red,
              top:
                data[props.route.params.parentIndex] &&
                data[props.route.params.parentIndex].zoom[childIndex] === 1
                  ? 115
                  : 50,
              flexDirection: 'row',
              right:
                data[props.route.params.parentIndex] &&
                data[props.route.params.parentIndex].zoom[childIndex] === 1
                  ? 500
                  : 0,
            }}>
            {`"${t('prevent_continuous_comment')}"`}
          </Text>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: 20,
            right: 20,
          }}>
          {rotateString === '촬영가능' ? (
            <Pressable
              onPress={() => {
                if (!isLoading) {
                  handleCameraShutter();
                }
              }}
              style={{
                padding: 30,
                backgroundColor: COLORS.blue,
                width: 200,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 600,
                  fontSize: width > 600 ? FONTSIZES.largest : null,
                }}>
                {t('take_pictures')}
              </Text>
            </Pressable>
          ) : (
            <Text
              style={{
                padding: 30,
                width: 200,
                textAlign: 'center',
                backgroundColor: COLORS.whiteOpac2,
                borderRadius: 20,
                color: COLORS.white,
                fontWeight: 600,
                alignSelf: 'center',
                fontSize: width > 600 ? FONTSIZES.largest : null,
              }}>
              {rotateString}
            </Text>
          )}
        </View>
      </View>
      {isLoading || device == null ? (
        <>
          <ActivityIndicator
            style={{
              position: 'absolute',
              backgroundColor: COLORS.blackOpac7,
              width: '100%',
              height: '100%',
            }}
            animating
            size={360}
          />
          <Text
            style={{
              position: 'absolute',
              width: 300,
              textAlign: 'center',
              left: width / 2 - 150,
              fontSize: FONTSIZES.larger,
              fontWeight: 600,
            }}>
            서버에 업로드 중입니다.
          </Text>
        </>
      ) : null}
    </View>
  );
}
