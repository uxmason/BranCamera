/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../assets/values/colors';
import {FONTSIZES} from '../assets/values/fontSizes';
import {useTranslation} from 'react-i18next';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {SelectList} from 'react-native-dropdown-select-list';

export default function ManagerSearchMember(props) {
  const [isFocused, setFocused] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const dataBranch = [
    {
      value: '서울',
      key: '36',
    },
    {
      value: '부산',
      key: '21',
    },
    {
      value: '인천',
      key: '34',
    },
    {
      value: '대구',
      key: '35',
    },
    {
      value: '대전',
      key: '18',
    },
    {
      value: '천호',
      key: '02',
    },
    {
      value: '신촌',
      key: '03',
    },
    {
      value: '노원',
      key: '04',
    },
    {
      value: '영등포',
      key: '06',
    },
    {
      value: '분당',
      key: '07',
    },
    {
      value: '성신여대',
      key: '08',
    },
    {
      value: '수원',
      key: '13',
    },
    {
      value: '일산',
      key: '15',
    },
    {
      value: '구리',
      key: '17',
    },
    {
      value: '해운대',
      key: '23',
    },
    {
      value: '부천',
      key: '32',
    },
    {
      value: '안양평촌',
      key: '37',
    },
    {
      value: '청주',
      key: '38',
    },
    {
      value: '천안',
      key: '39',
    },
    {
      value: '서울SC',
      key: '40',
    },
    {
      value: '강남본점',
      key: '52',
    },
  ];
  const [selected, setSelected] = useState(null);
  const [userData, setUserData] = useState([]);
  const {t} = useTranslation('common');
  const abortController = new AbortController();
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setFocused(true);
      const getData = async () => {
        const storageData = await AsyncStorage.getItem('branchCode');
        if (storageData) {
          setSelected(storageData);
        } else {
          setSelected('36');
        }
      };
      getData();
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
    const boostGetUsers = async () => {
      setLoading(true);
      try {
        let json;
        const response = await fetch(
          `http://mc365reviewsystem.koreacentral.cloudapp.azure.com/api/camera/search/users/?keyword=${keyword}&branch=${selected}`,
          {signal: abortController.signal},
        );
        json = await response.json();
        if (json != null) {
          if (json.success) {
            setUserData(json.users);
          } else {
            setUserData([]);
            console.log(json.message);
            Toast.show({
              type: 'error',
              text1: json.message,
            });
          }
        } else {
          setUserData([]);
          console.log(t('server_connect_check'));
          Toast.show({
            type: 'error',
            text1: t('server_connect_check'),
          });
        }
      } catch (e) {
        if (e.name === 'AbortError') {
          return;
        }
        setUserData([]);
        Toast.show({
          type: 'error',
          text1: e.name,
          text2: e.message,
        });
      } finally {
        setLoading(false);
      }
    };
    const setData = async () => {
      await AsyncStorage.setItem('branchCode', selected);
    };
    if (keyword != null && selected != null) {
      boostGetUsers();
      setData();
    }
  }, [keyword, selected]);
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
  const returnBranchName = code => {
    for (let i = 0; i < dataBranch.length; i++) {
      if (dataBranch[i].key === code) {
        return dataBranch[i].value;
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.silver,
      }}>
      <Image
        source={require('../assets/images/back0.jpg')}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.5,
        }}
      />
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            marginTop: 10,
            marginLeft: 15,
            backgroundColor: COLORS.default,
            borderRadius: 10,
            position: 'absolute',
            zIndex: 1,
            width: 130,
          }}>
          {selected != null && selected !== '' && dataBranch !== [] ? (
            <SelectList
              setSelected={val => setSelected(val)}
              data={dataBranch}
              save="서울"
              boxStyles={{
                backgroundColor: COLORS.whiteOpac2,
                padding: 10,
                paddingHorizontal: 20,
                fontWeight: 600,
                borderRadius: 10,
              }}
              search={false}
              defaultOption={{
                key: selected,
                value: returnBranchName(selected),
              }}
            />
          ) : null}
        </View>
        <TextInput
          keyboardType="numeric"
          maxLength={16}
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            marginHorizontal: 15,
            marginTop: 10,
            marginLeft: 160,
            padding: 10,
            borderRadius: 10,
            fontSize: FONTSIZES.large,
            color: COLORS.default,
          }}
          onChangeText={text => {
            abortController.abort();
            setKeyword(text);
          }}
          autoFocus
        />
      </View>
      <View
        style={{
          backgroundColor: COLORS.whiteOpac2,
          margin: 15,
          borderRadius: 20,
          flex: 1,
          overflow: 'hidden',
        }}>
        <FlatList
          data={userData}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ManagerHome', {
                  user: userData[index],
                });
              }}
              style={{
                padding: 20,
                backgroundColor: COLORS.whiteOpac2,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: COLORS.defaultOpac05,
              }}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={{color: COLORS.black, fontSize: FONTSIZES.large}}>
                    {item.PSNAME}
                  </Text>
                  {item.LICENSE != null ? (
                    item.LICENSE.substring(6, 7) === '2' ||
                    item.LICENSE.substring(6, 7) === '4' ||
                    item.LICENSE.substring(6, 7) === '6' ||
                    item.LICENSE.substring(6, 7) === '8' ? (
                      <Text
                        style={{
                          color: COLORS.red,
                          fontSize: FONTSIZES.medium,
                          marginHorizontal: 5,
                        }}>
                        {t('female')}
                      </Text>
                    ) : item.LICENSE.substring(6, 7) === '1' ||
                      item.LICENSE.substring(6, 7) === '3' ||
                      item.LICENSE.substring(6, 7) === '5' ||
                      item.LICENSE.substring(6, 7) === '7' ? (
                      <Text
                        style={{
                          color: COLORS.blue,
                          fontSize: FONTSIZES.medium,
                          marginHorizontal: 5,
                        }}>
                        {t('male')}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: COLORS.yellow,
                          fontSize: FONTSIZES.medium,
                          marginHorizontal: 5,
                        }}>
                        {t('unknown')}
                      </Text>
                    )
                  ) : (
                    <Text
                      style={{
                        color: COLORS.yellow,
                        fontSize: FONTSIZES.medium,
                        marginHorizontal: 5,
                      }}>
                      {t('unknown')}
                    </Text>
                  )}
                  <Text
                    style={{
                      color: COLORS.default,
                      fontSize: FONTSIZES.small,
                      fontWeight: 600,
                    }}>
                    {returnAge(item.LICENSE)}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.defaultOpac5,
                      fontSize: FONTSIZES.small,
                    }}>
                    {t('age_unit')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.defaultOpac3,
                      fontSize: FONTSIZES.smaller,
                    }}>
                    {`${t('psentry')}: `}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.default,
                      fontSize: FONTSIZES.smaller,
                      flex: 1,
                    }}>
                    {item.PSENTRY}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: COLORS.blue,
                  lineHeight: 25,
                  padding: 15,
                  paddingVertical: 7,
                  backgroundColor: COLORS.blueOpac1,
                  borderWidth: 1,
                  borderColor: COLORS.blueOpac4,
                  borderRadius: 10,
                }}>
                {t('select_member')}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
