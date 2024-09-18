/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import {COLORS} from '../assets/values/colors';
import {useTranslation} from 'react-i18next';
import {FONTSIZES} from '../assets/values/fontSizes';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';

export default function ManagerHome(props) {
  const {height, width} = Dimensions.get('window');
  const [isFocused, setFocused] = useState(true);
  const [isLoading, setLoading] = useState(false);
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
  const [selectedUser, setSelectedUser] = useState();
  const [opdate, setOpdate] = useState();
  const [branch, setBranch] = useState();
  const [branchCode, setBranchCode] = useState('');
  const [isAgree, setAgree] = useState(false);
  const {t} = useTranslation('common');
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setFocused(true);
      const getData = async () => {
        const storageData = await AsyncStorage.getItem('branchCode');
        if (storageData) {
          setBranchCode(storageData);
        } else {
          setBranchCode('36');
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
    const setData = async () => {
      await AsyncStorage.setItem('branchCode', branchCode);
    };
    if (branchCode != null) {
      setData();
    }
  }, [branchCode]);
  useEffect(() => {
    if (props.route.params) {
      if (props.route.params.user) {
        setSelectedUser(props.route.params.user);
        setBranch(returnPSEntry(props.route.params.user.PSENTRY));
        setAgree(false);
        const boostGetUsers = async () => {
          setLoading(true);
          try {
            let json;
            const response = await fetch(
              `http://mc365reviewsystem.koreacentral.cloudapp.azure.com/api/camera/user/lastOpdate/?psentry=${props.route.params.user.PSENTRY}`,
            );
            json = await response.json();
            if (json != null) {
              if (json.success) {
                setOpdate(json.data.OPDATE);
              } else {
                setOpdate(null);
                console.log(json.message);
                Toast.show({
                  type: 'error',
                  text1: json.message,
                });
              }
            } else {
              setOpdate(null);
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
        boostGetUsers();
      }
      if (props.route.params.agree) {
        setAgree(props.route.params.agree);
      }
    }
  }, [props.route.params]);
  useEffect(() => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      // PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]).then(statuses => {
      if (
        statuses[PERMISSIONS.ANDROID.CAMERA] !== 'granted'
        //  || statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] !== 'granted'
      ) {
        Toast.show({
          type: 'error',
          text1: '권한설정이 제대로 안됨',
        });
      }
    });
  }, []);
  const returnBranchName = code => {
    for (let i = 0; i < dataBranch.length; i++) {
      if (dataBranch[i].key === code) {
        return dataBranch[i].value;
      }
    }
  };
  const returnPSEntry = v => {
    const code = v.substring(0, 2);
    if (code === '18') {
      return '대전';
    }
    if (code === '21') {
      return '부산';
    }
    if (code === '34') {
      return '인천';
    }
    if (code === '35') {
      return '대구';
    }
    if (code === '36') {
      return '서울';
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
          minHeight: 300,
          backgroundColor: COLORS.whiteOpac2,
          borderRadius: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: COLORS.defaultOpac05,
          }}>
          <Text
            style={{
              color: COLORS.default,
              fontSize: FONTSIZES.medium,
              padding: 20,
              paddingVertical: 30,
              fontWeight: 600,
            }}>
            <Text style={{color: COLORS.defaultOpac3}}>
              {t('branch_of_search')}
            </Text>
            {`: ${returnBranchName(branchCode)}(${branchCode})`}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 20,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: COLORS.defaultOpac05,
            flexDirection: 'row',
          }}
          onPress={() => {
            props.navigation.navigate('ManagerSearchMember');
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.defaultOpac05,
              marginRight: 15,
              padding: 10,
              borderRadius: 15,
              flexDirection: 'row',
            }}>
            {selectedUser ? (
              <View style={{width: 195}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderColor: COLORS.defaultOpac1,
                  }}>
                  <Text style={{color: COLORS.black, fontWeight: 600}}>
                    {selectedUser.PSNAME}
                  </Text>
                  {selectedUser.LICENSE != null &&
                  (selectedUser.LICENSE.substring(6, 7) === '2' ||
                    selectedUser.LICENSE.substring(6, 7) === '4' ||
                    selectedUser.LICENSE.substring(6, 7) === '6' ||
                    selectedUser.LICENSE.substring(6, 7) === '8') ? (
                    <Text
                      style={{
                        color: COLORS.red,
                        fontSize: FONTSIZES.medium,
                        marginHorizontal: 5,
                      }}>
                      {t('female')}
                    </Text>
                  ) : selectedUser.LICENSE.substring(6, 7) === '1' ||
                    selectedUser.LICENSE.substring(6, 7) === '3' ||
                    selectedUser.LICENSE.substring(6, 7) === '5' ||
                    selectedUser.LICENSE.substring(6, 7) === '7' ? (
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
                  )}
                  <Text
                    style={{
                      color: COLORS.default,
                      fontSize: FONTSIZES.small,
                      fontWeight: 600,
                    }}>
                    {returnAge(selectedUser.LICENSE)}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.defaultOpac5,
                      fontSize: FONTSIZES.small,
                    }}>
                    {t('age_unit')}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.green,
                      fontSize: FONTSIZES.medium,
                      flex: 1,
                      marginLeft: 5,
                      fontWeight: 500,
                    }}>
                    {branch}
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
                    }}>
                    {selectedUser.PSENTRY}
                  </Text>
                </View>
              </View>
            ) : (
              <Text
                style={{
                  padding: 3,
                  color: COLORS.defaultOpac5,
                  fontSize: FONTSIZES.medium,
                }}>
                {t('not_selected_user')}
              </Text>
            )}
          </View>
          {selectedUser ? (
            <View
              style={{
                padding: 15,
                paddingVertical: 10,
                backgroundColor: COLORS.yellowOpac1,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.yellowOpac5,
              }}>
              <Text
                style={{
                  color: COLORS.orange,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>
                {t('modify_member')}
              </Text>
            </View>
          ) : (
            <View
              style={{
                padding: 15,
                paddingVertical: 10,
                backgroundColor: COLORS.blueOpac1,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.blueOpac4,
              }}>
              <Text
                style={{
                  color: COLORS.blue,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>
                {t('search_member')}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {selectedUser ? (
          <>
            <TouchableOpacity
              style={{
                padding: 20,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: COLORS.defaultOpac05,
                flexDirection: 'row',
              }}
              onPress={() => {
                props.navigation.navigate('ManagerAgreePrivacy');
              }}>
              {isAgree ? (
                <View
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: COLORS.greenOpac1,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: COLORS.green,
                    marginRight: 10,
                    marginTop: 2.5,
                  }}>
                  <Image
                    style={{
                      width: 10,
                      height: 10,
                      margin: 8.5,
                      tintColor: COLORS.green,
                    }}
                    source={require('../assets/images/ic_check_small.png')}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: COLORS.defalut,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: COLORS.defaultOpac2,
                    marginRight: 10,
                    marginTop: 2.5,
                  }}>
                  <Image
                    style={{
                      width: 10,
                      height: 10,
                      margin: 8.5,
                      tintColor: COLORS.defaultOpac2,
                    }}
                    source={require('../assets/images/ic_check_small.png')}
                  />
                </View>
              )}
              <Text
                style={{
                  color: COLORS.defaultOpac5,
                  fontSize: FONTSIZES.medium,
                  flex: 1,
                }}>
                {t('do_agree_privacy')}
              </Text>
              {selectedUser ? (
                <View
                  style={{
                    padding: 15,
                    paddingVertical: 10,
                    backgroundColor: COLORS.blueOpac1,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: COLORS.blueOpac4,
                  }}>
                  <Text
                    style={{
                      color: COLORS.blue,
                      fontWeight: 600,
                      textAlign: 'center',
                    }}>
                    {t('do_read')}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    padding: 15,
                    paddingVertical: 10,
                    backgroundColor: COLORS.defaultOpac05,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: COLORS.defaultOpac1,
                    color: COLORS.defaultOpac3,
                    fontWeight: 600,
                    textAlign: 'center',
                  }}>
                  {t('inactived')}
                </Text>
              )}
            </TouchableOpacity>
            {isAgree ? (
              <View
                style={{
                  padding: 20,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                {opdate != null && opdate !== '' ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: width > 500 ? 'row' : null,
                    }}>
                    <Text
                      style={{
                        color: COLORS.defaultOpac5,
                        fontSize: FONTSIZES.medium,
                      }}>{`${t('last_filming_date')}: `}</Text>
                    <Text style={{color: COLORS.black, fontWeight: 600}}>
                      {opdate.substring(0, 4) +
                        '.' +
                        opdate.substring(4, 6) +
                        '.' +
                        opdate.substring(6, 8)}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      color: COLORS.defaultOpac5,
                      fontSize: FONTSIZES.medium,
                      flex: 1,
                    }}>
                    {t('not_take_picture')}
                  </Text>
                )}
                {selectedUser && isAgree ? (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('ManagerPhotoList', {
                        psEntry: selectedUser.PSENTRY,
                        branch: branch,
                        name: selectedUser.PSNAME,
                        licence: selectedUser.LICENSE,
                      });
                    }}
                    style={{
                      padding: 30,
                      paddingVertical: 15,
                      backgroundColor: COLORS.green,
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontWeight: 600,
                        fontSize: FONTSIZES.large,
                        textAlign: 'center',
                      }}>
                      {t('picture_reg')}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      padding: 30,
                      paddingVertical: 15,
                      backgroundColor: COLORS.defaultOpac3,
                      borderRadius: 15,
                      color: COLORS.white,
                      fontWeight: 600,
                      fontSize: FONTSIZES.large,
                      textAlign: 'center',
                    }}>
                    {t('picture_reg')}
                  </Text>
                )}
              </View>
            ) : null}
          </>
        ) : null}
        <View
          style={{
            backgroundColor: COLORS.default,
            position: 'absolute',
            zIndex: 10,
            width: 130,
            top: 20,
            right: 20,
            borderRadius: 10,
          }}>
          {branchCode != null && branchCode !== '' && dataBranch !== [] ? (
            <SelectList
              setSelected={val => setBranchCode(val)}
              data={dataBranch}
              save="서울"
              boxStyles={{
                backgroundColor: COLORS.whiteOpac1,
                padding: 10,
                paddingHorizontal: 20,
                fontWeight: 600,
                borderRadius: 10,
              }}
              search={false}
              defaultOption={{
                key: branchCode,
                value: returnBranchName(branchCode),
              }}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}
