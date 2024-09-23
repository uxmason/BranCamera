/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {COLORS} from '../assets/values/colors';
import {useTranslation} from 'react-i18next';
import {SensorTypes, setUpdateIntervalForType} from 'react-native-sensors';
import {FONTSIZES} from '../assets/values/fontSizes';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export default function ManagerPhotoList(props) {
  const [thumb, setThumb] = useState([]);
  const [thumbNothing, setThumbNothing] = useState([]);
  const [data, setData] = useState([
    {
      list: [
        require('../assets/images/pose_stomach_0.png'),
        require('../assets/images/pose_stomach_2.png'),
        require('../assets/images/pose_stomach_3.png'),
        require('../assets/images/pose_stomach_4.png'),
        require('../assets/images/pose_stomach_1.png'),
        require('../assets/images/pose_stomach_5.png'),
        require('../assets/images/pose_whole_0.png'),
        require('../assets/images/pose_whole_2.png'),
        require('../assets/images/pose_whole_1.png'),
        require('../assets/images/pose_whole_4.png'),
      ],
      zoom: [3, 3, 3, 3, 3, 3, 1, 1, 1, 1],
      isEssential: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      bodyPart: [
        19, 20, 22, 17, 21, 18, 29, 31, 30, 28,
      ],
      bodyComment: [
        '복부정면',
        '복부좌측',
        '복부후면',
        '복부우측',
        '복부좌측45도',
        '복부우측45도',
        '전신정면',
        '전신후면',
        '전신좌측',
        '전신우측',
      ],
      partName: 'stomach',
    },
    {
      list: [
        require('../assets/images/pose_thigh_3.png'),
        require('../assets/images/pose_thigh_6.png'),
        require('../assets/images/pose_thigh_8.png'),
        require('../assets/images/pose_thigh_1.png'),
        require('../assets/images/pose_whole_0.png'),
        require('../assets/images/pose_whole_2.png'),
        require('../assets/images/pose_whole_1.png'),
        require('../assets/images/pose_whole_4.png'),
      ],
      zoom: [2, 2, 2, 2, 1, 1, 1, 1],
      isEssential: [1, 1, 1, 1, 0, 0, 0, 0],
      bodyPart: [
        51, 53, 48, 50, 29, 31, 30, 28,
      ],
      bodyComment: [
        '허벅지좌측',
        '허벅지후면',
        '허벅지우측',
        '허벅지정면',
        '전신정면',
        '전신후면',
        '전신좌측',
        '전신우측',
      ],
      partName: 'thigh',
    },
    {
      list: [
        require('../assets/images/pose_calf_0.png'),
        require('../assets/images/pose_calf_2.png'),
        require('../assets/images/pose_calf_3.png'),
        require('../assets/images/pose_calf_5.png'),
        require('../assets/images/pose_whole_0.png'),
        require('../assets/images/pose_whole_2.png'),
        require('../assets/images/pose_whole_1.png'),
        require('../assets/images/pose_whole_4.png'),
      ],
      zoom: [2, 2, 2, 2, 1, 1, 1, 1],
      isEssential: [1, 1, 1, 1, 0, 0, 0, 0],
      bodyPart: [34, 35, 37, 38, 29, 31, 30, 28],
      bodyComment: [
        '종아리정면',
        '종아리좌측',
        '종아리후면',
        '종아리우측',
        '전신정면',
        '전신후면',
        '전신좌측',
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
        require('../assets/images/pose_arm_7.png'),
        require('../assets/images/pose_arm_8.png'),
        require('../assets/images/pose_whole_3.png'),
        require('../assets/images/pose_whole_0.png'),
        require('../assets/images/pose_whole_2.png'),
        require('../assets/images/pose_whole_1.png'),
        require('../assets/images/pose_whole_4.png'),
        require('../assets/images/pose_arm_9.png'),
        require('../assets/images/pose_arm_10.png'),
        require('../assets/images/pose_arm_5.png'),
        require('../assets/images/pose_arm_6.png'),
      ],
      zoom: [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2],
      isEssential: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      bodyPart: [2, 4, 3, 5, 0, 1, 310, 29, 31, 30, 28, 41, 42, 47, 46],
      bodyComment: [
        '가슴정면',
        '가슴좌측45도',
        '가슴좌측',
        '가슴후면',
        '가슴우측',
        '가슴우측45도',
        '(팔 벌려)',
        '전신정면',
        '전신후면',
        '전신좌측',
        '전신우측',
        '팔정면(오른팔)',
        '팔정면(왼팔)',
        '팔후면(왼팔)',
        '팔후면(오른팔)',
      ],
      partName: 'arm',
    },
    {
      list: [
        require('../assets/images/pose_arm_0.png'),
        require('../assets/images/pose_arm_1.png'),
        require('../assets/images/pose_arm_2.png'),
        require('../assets/images/pose_arm_7.png'),
        require('../assets/images/pose_arm_8.png'),
        require('../assets/images/pose_whole_0.png'),
        require('../assets/images/pose_whole_2.png'),
        require('../assets/images/pose_whole_1.png'),
        require('../assets/images/pose_whole_4.png'),
      ],
      zoom: [2, 2, 2, 2, 2, 1, 1, 1, 1],
      isEssential: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      bodyPart: [2, 4, 3, 0, 1, 29, 31, 30, 28],
      bodyComment: [
        '가슴정면',
        '가슴좌측45도',
        '가슴좌측',
        '가슴우측',
        '가슴우측45도',
        '전신정면',
        '전신후면',
        '전신좌측',
        '전신우측',
      ],
      partName: 'breast',
    }
  ]);
  const [part, setPart] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isFocused, setFocused] = useState(true);
  const {t} = useTranslation('common');
  const [imageData, setImageData] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  setUpdateIntervalForType(SensorTypes.accelerometer, 300);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setFocused(true);
      boostGetImages();
    });
    return unsubscribe;
  }, [props.navigation]);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      setFocused(false);
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    const boostUploadImage = async () => {
      if (imageData) {
        setLoading(true);
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
        formData.append('branch', props.route.params.psEntry.substring(0, 2));
        formData.append('psEntry', props.route.params.psEntry);
        formData.append('bodyPart', data[part].bodyPart[selectedImageIndex]);

        try {
          let json;
          const response = await fetch(
            'http://mc365reviewsystem.koreacentral.cloudapp.azure.com/api/camera/upload/',
            {
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          );
          json = await response.json();
          if (json != null) {
            if (json.success) {
              boostGetImages();
            } else {
              console.log('false', json.message);
              Toast.show({
                type: 'error',
                text1: json.message,
              });
            }
          } else {
            console.log(t('server_connect_check'));
            Toast.show({
              type: 'error',
              text1: t('server_connect_check'),
            });
          }
        } catch (e) {
          console.log(e);
          Toast.show({
            type: 'error',
            text1: e.name,
            text2: e.message,
          });
        } finally {
          setLoading(false);
        }
      }
    };
    boostUploadImage();
  }, [imageData]);
  const boostGetImages = async () => {
    setLoading(true);
    try {
      let json;
      const now = new Date();
      const response = await fetch(
        `http://mc365reviewsystem.koreacentral.cloudapp.azure.com/api/camera/user/lastPhotos/?psentry=${
          props.route.params.psEntry
        }&filmingDate=${
          now.getFullYear().toString() +
          returnDigitDual(now.getMonth() + 1) +
          returnDigitDual(now.getDate())
        }`,
      );
      json = await response.json();
      if (json != null) {
        if (json.success) {
          setThumb(json.data);
          setThumbNothing(json.dataNothing);
        } else {
          setThumb([]);
          setThumbNothing([]);
          console.log(json.message);
          Toast.show({
            type: 'error',
            text1: json.message,
          });
        }
      } else {
        setThumb([]);
        setThumbNothing([]);
        console.log(t('server_connect_check'));
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

  const returnAge = v => {
    if (v != null && v.length > 0) {
      let prefix = '';
      if (
        v.substring(6, 7) === '1' ||
        v.substring(6, 7) === '2' ||
        v.substring(6, 7) === '5' ||
        v.substring(6, 7) === '6'
      ) {
        prefix = '19';
      }
      if (
        v.substring(6, 7) === '3' ||
        v.substring(6, 7) === '4' ||
        v.substring(6, 7) === '7' ||
        v.substring(6, 7) === '8'
      ) {
        prefix = '20';
      }
      const date = new Date(
        prefix +
          v.substring(0, 2) +
          '-' +
          v.substring(2, 4) +
          '-' +
          v.substring(4, 6),
      );
      return getWesternAge(date);
    } else {
      return 0;
    }
  };
  const getWesternAge = birthday => {
    let today = new Date();
    let birthDay = new Date(birthday);
    let age = today.getFullYear() - birthDay.getFullYear();
    let todayMonth = today.getMonth() + 1;
    let birthMonth = birthDay.getMonth() + 1;
    if (
      birthMonth > todayMonth ||
      (birthMonth === todayMonth && birthDay.getDate() >= today.getDate())
    ) {
      age--;
    }
    return age;
  };

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
      }}>
      <StatusBar hidden />
      <Image
        source={require('../assets/images/back0.jpg')}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />

      <ScrollView>
        <View style={{marginTop: 135}}>
          <Text
            style={{
              flexDirection: 'row',
              textAlign: 'center',
              color: COLORS.default,
              fontSize: FONTSIZES.larger,
            }}>
            <Text>{t('photo_situation_comment_0')}</Text>
            <Text style={{fontWeight: 800}}>{props.route.params.name}</Text>
            <Text>{t('photo_situation_comment_1')}</Text>
            <Text
              style={{fontSize: FONTSIZES.medium, color: COLORS.defaultOpac5}}>
              ㅤ{t('photo_situation_comment_2')}
            </Text>
          </Text>
          <View
            style={{
              padding: 50,
              paddingVertical: 15,
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 230,
                height: 400,
                backgroundColor: 'rgba(237,107,91,.1)',
                borderRadius: 20,
                margin: 15,
              }}
              onPress={() => {
                props.navigation.navigate('ManagerPhotoListDetail', {
                  category: 'stomach',
                  psEntry: props.route.params.psEntry,
                  branch: props.route.params.branch,
                  name: props.route.params.name,
                  licence: props.route.params.licence,
                });
              }}>
              <View
                style={{
                  backgroundColor: COLORS.whiteOpac3,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  alignSelf: 'center',
                  marginTop: 25,
                  borderWidth: 5,
                  borderColor: COLORS.defaultOpac1,
                }}>
                <Image
                  style={{width: 60, height: 60, borderRadius: 30}}
                  source={require('../assets/images/ic_part_stomach.png')}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.default,
                  marginTop: 10,
                  fontSize: FONTSIZES.large,
                  fontWeight: 600,
                }}>
                {t('stomach')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 27.5,
                  width: 230,
                  height: 200,
                }}>
                {data[0].list.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: 30,
                      height: 30,
                      margin: 2.5,
                    }}>
                    {thumb[0] && thumb[0][index] ? (
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: data[0].isEssential[index] === 1 ? COLORS.redOpac3 : COLORS.defaultOpac1,
                        }}
                        source={{
                          uri: `http://112.219.241.228:8080/thumb/120/baps/${props.route.params.psEntry.substring(
                            0,
                            2,
                          )}/${props.route.params.psEntry}/${thumb[0][index]}`,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: data[0].isEssential[index] === 1 ? COLORS.redOpac3 : COLORS.defaultOpac1,
                        }}
                      />
                    )}
                  </View>
                ))}
              </View>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: COLORS.green,
                  textAlign: 'center',
                  color: COLORS.white,
                  width: 120,
                  alignSelf: 'center',
                  borderRadius: 10,
                  fontWeight: 600,
                }}>
                {t('view_detail')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 230,
                height: 400,
                backgroundColor: 'rgba(56,171,190,.1)',
                borderRadius: 20,
                margin: 15,
              }}
              onPress={() => {
                props.navigation.navigate('ManagerPhotoListDetail', {
                  category: 'thigh',
                  psEntry: props.route.params.psEntry,
                  branch: props.route.params.branch,
                  name: props.route.params.name,
                  licence: props.route.params.licence,
                });
              }}>
              <View
                style={{
                  backgroundColor: COLORS.whiteOpac3,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  alignSelf: 'center',
                  marginTop: 25,
                  borderWidth: 5,
                  borderColor: COLORS.defaultOpac1,
                }}>
                <Image
                  style={{width: 60, height: 60, borderRadius: 30}}
                  source={require('../assets/images/ic_part_thigh.png')}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.default,
                  marginTop: 10,
                  fontSize: FONTSIZES.large,
                  fontWeight: 600,
                }}>
                {t('thigh')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 27.5,
                  width: 230,
                  height: 200,
                }}>
                {data[1].list.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: 30,
                      height: 30,
                      margin: 2.5,
                    }}>
                    {thumb[1] && thumb[1][index] ? (
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: data[1].isEssential[index] === 1 ? COLORS.redOpac3 : COLORS.defaultOpac1,
                        }}
                        source={{
                          uri: `http://112.219.241.228:8080/thumb/120/baps/${props.route.params.psEntry.substring(
                            0,
                            2,
                          )}/${props.route.params.psEntry}/${thumb[1][index]}`,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: data[1].isEssential[index] === 1 ? COLORS.redOpac3 : COLORS.defaultOpac1,
                        }}
                      />
                    )}
                  </View>
                ))}
              </View>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: COLORS.green,
                  textAlign: 'center',
                  color: COLORS.white,
                  width: 120,
                  alignSelf: 'center',
                  borderRadius: 10,
                  fontWeight: 600,
                }}>
                {t('view_detail')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 230,
                height: 400,
                backgroundColor: 'rgba(91,135,237,.1)',
                borderRadius: 20,
                margin: 15,
              }}
              onPress={() => {
                props.navigation.navigate('ManagerPhotoListDetail', {
                  category: 'calf',
                  psEntry: props.route.params.psEntry,
                  branch: props.route.params.branch,
                  name: props.route.params.name,
                  licence: props.route.params.licence,
                });
              }}>
              <View
                style={{
                  backgroundColor: COLORS.whiteOpac3,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  alignSelf: 'center',
                  marginTop: 25,
                  borderWidth: 5,
                  borderColor: COLORS.defaultOpac1,
                }}>
                <Image
                  style={{width: 60, height: 60, borderRadius: 30}}
                  source={require('../assets/images/ic_part_calf.png')}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.default,
                  marginTop: 10,
                  fontSize: FONTSIZES.large,
                  fontWeight: 600,
                }}>
                {t('calf')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 27.5,
                  width: 230,
                  height: 200,
                }}>
                {data[2].list.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: 30,
                      height: 30,
                      margin: 2.5,
                    }}>
                    {thumb[2] && thumb[2][index] ? (
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: data[2].isEssential[index] === 1 ? COLORS.redOpac3 : COLORS.defaultOpac1,
                        }}
                        source={{
                          uri: `http://112.219.241.228:8080/thumb/120/baps/${props.route.params.psEntry.substring(
                            0,
                            2,
                          )}/${props.route.params.psEntry}/${thumb[2][index]}`,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: data[2].isEssential[index] === 1 ? COLORS.redOpac3 : COLORS.defaultOpac1,
                        }}
                      />
                    )}
                  </View>
                ))}
              </View>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: COLORS.green,
                  textAlign: 'center',
                  color: COLORS.white,
                  width: 120,
                  alignSelf: 'center',
                  borderRadius: 10,
                  fontWeight: 600,
                }}>
                {t('view_detail')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 230,
                height: 400,
                backgroundColor: 'rgba(21,207,143,.1)',
                borderRadius: 20,
                margin: 15,
              }}
              onPress={() => {
                props.navigation.navigate('ManagerPhotoListDetail', {
                  category: 'arm',
                  psEntry: props.route.params.psEntry,
                  branch: props.route.params.branch,
                  name: props.route.params.name,
                  licence: props.route.params.licence,
                });
              }}>
              <View
                style={{
                  backgroundColor: COLORS.whiteOpac3,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  alignSelf: 'center',
                  marginTop: 25,
                  borderWidth: 5,
                  borderColor: COLORS.defaultOpac1,
                }}>
                <Image
                  style={{width: 60, height: 60, borderRadius: 30}}
                  source={require('../assets/images/ic_part_arm.png')}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.default,
                  marginTop: 10,
                  fontSize: FONTSIZES.large,
                  fontWeight: 600,
                }}>
                {t('arm')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 27.5,
                  width: 230,
                  height: 200,
                }}>
                {data[3].list.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: 30,
                      height: 30,
                      margin: 2.5,
                    }}>
                    {thumb[3] && thumb[3][index] ? (
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: data[3].isEssential[index] === 1 ? COLORS.redOpac3 : COLORS.defaultOpac1,
                        }}
                        source={{
                          uri: `http://112.219.241.228:8080/thumb/120/baps/${props.route.params.psEntry.substring(
                            0,
                            2,
                          )}/${props.route.params.psEntry}/${thumb[3][index]}`,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: data[3].isEssential[index] === 1 ? COLORS.redOpac3 : COLORS.defaultOpac1,
                        }}
                      />
                    )}
                  </View>
                ))}
              </View>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: COLORS.green,
                  textAlign: 'center',
                  color: COLORS.white,
                  width: 120,
                  alignSelf: 'center',
                  borderRadius: 10,
                  fontWeight: 600,
                }}>
                {t('view_detail')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 230,
                height: 400,
                backgroundColor: 'rgba(85,218,242,.15)',
                borderRadius: 20,
                margin: 15,
              }}
              onPress={() => {
                props.navigation.navigate('ManagerPhotoListDetail', {
                  category: 'breast',
                  psEntry: props.route.params.psEntry,
                  branch: props.route.params.branch,
                  name: props.route.params.name,
                  licence: props.route.params.licence,
                });
              }}>
              <View
                style={{
                  backgroundColor: COLORS.whiteOpac3,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  alignSelf: 'center',
                  marginTop: 25,
                  borderWidth: 5,
                  borderColor: COLORS.defaultOpac1,
                }}>
                <Image
                  style={{width: 60, height: 60, borderRadius: 30}}
                  source={require('../assets/images/ic_part_breast.png')}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.default,
                  marginTop: 10,
                  fontSize: FONTSIZES.large,
                  fontWeight: 600,
                }}>
                {t('breast')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 27.5,
                  width: 230,
                  height: 200,
                }}>
                {data[4].list.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: 30,
                      height: 30,
                      margin: 2.5,
                    }}>
                    {thumb[4] && thumb[4][index] ? (
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: data[4].isEssential[index] === 1 ? COLORS.redOpac3 : COLORS.defaultOpac1,
                        }}
                        source={{
                          uri: `http://112.219.241.228:8080/thumb/120/baps/${props.route.params.psEntry.substring(
                            0,
                            2,
                          )}/${props.route.params.psEntry}/${thumb[4][index]}`,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: data[4].isEssential[index] === 1 ? COLORS.redOpac3 : COLORS.defaultOpac1,
                        }}
                      />
                    )}
                  </View>
                ))}
              </View>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: COLORS.green,
                  textAlign: 'center',
                  color: COLORS.white,
                  width: 120,
                  alignSelf: 'center',
                  borderRadius: 10,
                  fontWeight: 600,
                }}>
                {t('view_detail')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              width: 1270,
              backgroundColor: COLORS.defaultOpac05,
              borderRadius: 20,
              margin: 30,
              marginTop: 0,
              flexDirection: 'row',
            }}
            onPress={() => {
              props.navigation.navigate('ManagerPhotoListFreeCut', {
                psEntry: props.route.params.psEntry,
                branch: props.route.params.branch,
                name: props.route.params.name,
                licence: props.route.params.licence,
              });
            }}>
            <Text
              style={{
                color: COLORS.default,
                fontSize: FONTSIZES.large,
                fontWeight: 600,
                lineHeight: 90,
                paddingLeft: 30,
              }}>
              {t('free_cut')}
            </Text>
            <Text
              style={{
                color: COLORS.defaultOpac5,
                lineHeight: 90,
                paddingLeft: 10,
              }}>
              {t('free_cut_comment')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 32.5,
                width: 740,
              }}>
              {thumbNothing.length > 0 &&
                thumbNothing.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: 30,
                      height: 30,
                      margin: 2.5,
                    }}>
                    {item ? (
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: COLORS.defaultOpac1,
                        }}
                        source={
                          item
                            ? {
                                uri: `http://112.219.241.228:8080/thumb/120/baps/${props.route.params.psEntry.substring(
                                  0,
                                  2,
                                )}/${props.route.params.psEntry}/${
                                  item.filename
                                }`,
                              }
                            : item
                        }
                      />
                    ) : null}
                  </View>
                ))}
            </View>
            <Text
              style={{
                padding: 10,
                backgroundColor: COLORS.green,
                textAlign: 'center',
                color: COLORS.white,
                width: 120,
                alignSelf: 'center',
                borderRadius: 10,
                fontWeight: 600,
              }}>
              {t('view_detail')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          width: '100%',
          position: 'absolute',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            width: 160,
            margin: 20,
            marginRight: 0,
            borderRadius: 15,
            flexDirection: 'row',
            overflow: 'hidden',
            backgroundColor: COLORS.defaultOpac2,
          }}
          onPress={() => props.navigation.navigate('ManagerHome')}>
          <Image
            source={require('../assets/images/ic_arrow_light_left.png')}
            style={{
              width: 40,
              height: 40,
              margin: 15,
              resizeMode: 'contain',
              backgroundColor: COLORS.default,
              borderRadius: 20,
              tintColor: COLORS.white,
            }}
          />
          <Text
            style={{
              lineHeight: 60,
              fontSize: FONTSIZES.large,
              color: COLORS.default,
              fontWeight: 600,
            }}>
            {t('select_customer')}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            height: 70,
            backgroundColor: COLORS.whiteOpac1,
            margin: 20,
            borderRadius: 15,
            paddingHorizontal: 10,
            overflow: 'hidden',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 600,
                fontSize: FONTSIZES.larger,
              }}>
              {props.route.params.name}
            </Text>
            {props.route.params.licence != null &&
            (props.route.params.licence.substring(6, 7) === '2' ||
              props.route.params.licence.substring(6, 7) === '4' ||
              props.route.params.licence.substring(6, 7) === '6' ||
              props.route.params.licence.substring(6, 7) === '8') ? (
              <Text
                style={{
                  color: COLORS.red,
                  marginHorizontal: 5,
                }}>
                {t('female')}
              </Text>
            ) : props.route.params.licence.substring(6, 7) === '1' ||
              props.route.params.licence.substring(6, 7) === '3' ||
              props.route.params.licence.substring(6, 7) === '5' ||
              props.route.params.licence.substring(6, 7) === '7' ? (
              <Text
                style={{
                  color: COLORS.blue,
                  marginHorizontal: 5,
                }}>
                {t('male')}
              </Text>
            ) : (
              <Text
                style={{
                  color: COLORS.yellow,
                  marginHorizontal: 5,
                }}>
                {t('unknown')}
              </Text>
            )}
            <Text
              style={{
                color: COLORS.default,
                fontWeight: 600,
              }}>
              {returnAge(props.route.params.licence)}
            </Text>
            <Text
              style={{
                color: COLORS.defaultOpac5,
              }}>
              {t('age_unit')}
            </Text>
            <Text
              style={{
                color: COLORS.green,
                marginLeft: 5,
                fontWeight: 500,
              }}>
              {props.route.params.branch}
            </Text>
            <Text
              style={{
                marginLeft: 25,
                color: COLORS.defaultOpac3,
                fontSize: FONTSIZES.smaller,
              }}>
              {`${t('psentry')}: `}
            </Text>
            <Text
              style={{
                flex: 1,
                color: COLORS.default,
              }}>
              {props.route.params.psEntry}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            margin: 20,
            marginLeft: 0,
            overflow: 'hidden',
            borderRadius: 15,
            paddingHorizontal: 10,
            height: 70,
          }}>
          <TouchableOpacity
            style={{
              margin: 10,
              marginLeft: 0,
              padding: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
            onPress={() => {
              props.navigation.navigate('ManagerPhotoListDetail', {
                category: 'stomach',
                psEntry: props.route.params.psEntry,
                branch: props.route.params.branch,
                name: props.route.params.name,
                licence: props.route.params.licence,
              });
            }}>
            <Text
              style={{
                lineHeight: 20,
                fontWeight: 600,
                color: COLORS.default,
                fontSize: FONTSIZES.large,
              }}>
              {t('stomach')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
              marginLeft: 0,
              padding: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
            onPress={() => {
              props.navigation.navigate('ManagerPhotoListDetail', {
                category: 'thigh',
                psEntry: props.route.params.psEntry,
                branch: props.route.params.branch,
                name: props.route.params.name,
                licence: props.route.params.licence,
              });
            }}>
            <Text
              style={{
                lineHeight: 20,
                fontWeight: 600,
                color: COLORS.default,
                fontSize: FONTSIZES.large,
              }}>
              {t('thigh')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
              marginLeft: 0,
              padding: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
            onPress={() => {
              props.navigation.navigate('ManagerPhotoListDetail', {
                category: 'calf',
                psEntry: props.route.params.psEntry,
                branch: props.route.params.branch,
                name: props.route.params.name,
                licence: props.route.params.licence,
              });
            }}>
            <Text
              style={{
                lineHeight: 20,
                fontWeight: 600,
                color: COLORS.default,
                fontSize: FONTSIZES.large,
              }}>
              {t('calf')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
              marginLeft: 0,
              padding: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
            onPress={() => {
              props.navigation.navigate('ManagerPhotoListDetail', {
                category: 'arm',
                psEntry: props.route.params.psEntry,
                branch: props.route.params.branch,
                name: props.route.params.name,
                licence: props.route.params.licence,
              });
            }}>
            <Text
              style={{
                lineHeight: 20,
                fontWeight: 600,
                color: COLORS.default,
                fontSize: FONTSIZES.large,
              }}>
              {t('arm')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
              marginLeft: 0,
              padding: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
            onPress={() => {
              props.navigation.navigate('ManagerPhotoListDetail', {
                category: 'breast',
                psEntry: props.route.params.psEntry,
                branch: props.route.params.branch,
                name: props.route.params.name,
                licence: props.route.params.licence,
              });
            }}>
            <Text
              style={{
                lineHeight: 20,
                fontWeight: 600,
                color: COLORS.default,
                fontSize: FONTSIZES.large,
              }}>
              {t('breast')}
            </Text>
          </TouchableOpacity>
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
    </View>
  );
}
