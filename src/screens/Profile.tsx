import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import {Colors} from '../constants/styles';
import Icon from 'react-native-vector-icons/Feather';
import RedButton from '../components/ui/RedButton';
import i18next from '../utils/i18next';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../components/auth/AuthContext';
import {User, editData, fetchUser} from '../components/api/User';
import IconFAB from '../components/ui/IconFAB';

const Profile = () => {
  const {t} = useTranslation();
  const changeLanguage = (value: any) => {
    i18next.changeLanguage(value);
  };
  const [on, setOn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const show = () => setOpenModal(true);
  const hide = () => setOpenModal(false);
  const [pressLanguage1, setPressLanguage1] = useState(false);
  const [pressLanguage2, setPressLanguage2] = useState(false);
  const [name, setName] = useState('');
  const [data, setData] = useState<User | undefined>(undefined);
  const navigation = useNavigation();
  const ctx = useContext(AuthContext);

  const modalHandler = () => {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <Modal
          visible={openModal}
          animationType="fade"
          transparent={true}
          onRequestClose={hide}>
          <View style={styles.viewTransparent}>
            <TouchableOpacity onPress={hide} style={styles.pressOutside} />
          </View>
        </Modal>
        <View style={styles.viewTeste}>
          <View style={styles.modalHeader}>
            <View style={styles.grayLine} />
            <Text style={styles.modalTitle}>{t('Languages')}</Text>
          </View>
          <TouchableOpacity
            style={
              pressLanguage1 ? styles.languageButtonP : styles.languageButton
            }
            onPress={() => {
              setPressLanguage1(true);
              setPressLanguage2(false);
              changeLanguage('en');
            }}>
            <Text
              style={
                pressLanguage1 ? styles.languageTextP : styles.languageText
              }>
              {t('English')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              pressLanguage2 ? styles.languageButtonP : styles.languageButton
            }
            onPress={() => {
              setPressLanguage2(true);
              setPressLanguage1(false);
              changeLanguage('pt');
            }}>
            <Text
              style={
                pressLanguage2 ? styles.languageTextP : styles.languageText
              }>
              {t('Portuguese - Brazil')}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  async function loadData() {
    try {
      const userData = await fetchUser(ctx.id);
      setData(userData);
    } catch (error) {
      Alert.alert(t('Error trying to load user data'), `${error}`);
    }
  }

  const toggleOn = () => {
    if (data?.name !== name) {
      if (on) {
        Alert.alert(t('Warning'), t('Do you want to abandon your changes?'), [
          {
            text: t('Yes'),
            onPress: () => {
              setOn(!on);
            },
          },
          {text: t('No')},
        ]);
      } else {
        setOn(!on);
      }
    } else {
      setOn(!on);
    }
  };

  async function changeData() {
    try {
      const userData = await editData(ctx.id, name);
      if (data !== userData) {
        Alert.alert(
          t('Do you realy want to change your data?'),
          t('You can reverse it later'),
          [
            {
              text: t('Yes'),
              onPress: () => {
                setData(userData);
                setOn(false);
              },
            },
            {text: t('No')},
          ],
        );
      } else {
        setOn(false);
      }
    } catch (error) {
      Alert.alert(t('Error changing Data'), `${error}`);
    }
  }

  if (ctx.isLogged) {
    loadData();
    if (data) {
      return (
        <>
          <StatusBar
            backgroundColor={Colors.white}
            translucent={false}
            barStyle={'dark-content'}
          />
          {on && (
            <View style={styles.fabCheck}>
              <IconFAB
                onPress={changeData}
                color={Colors.green_900}
                icon="check"
                size={50}
              />
            </View>
          )}
          <View style={styles.titleView}>
            <Text style={styles.title}>{t('My Profile')}</Text>
          </View>
          <View style={styles.imageView}>
            <Image source={{uri: data.avatar}} style={styles.profileImage} />
            {on && (
              <View style={styles.fabEdit}>
                <IconFAB
                  onPress={() => {}}
                  color={Colors.red_500}
                  icon="edit-2"
                  size={40}
                />
              </View>
            )}
          </View>
          <View style={styles.profileInfo}>
            <View>
              {on ? (
                <TextInput
                  style={styles.name}
                  defaultValue={data.name}
                  onChangeText={setName}
                />
              ) : (
                <Text style={styles.name}>{data.name}</Text>
              )}

              <Text style={styles.email}>{data.email}</Text>
            </View>
          </View>
          <View>
            <View style={styles.viewTopics}>
              <Text style={styles.textTopics}>{t('Edit informations')}</Text>
              <Switch
                trackColor={{false: Colors.white, true: Colors.red_500}}
                thumbColor={on ? Colors.gray_200 : Colors.gray_200}
                value={on}
                onValueChange={toggleOn}
              />
            </View>
            <View style={styles.viewTopics}>
              <Text style={styles.textTopics}>{t('Language')}</Text>
              <TouchableOpacity onPress={show}>
                <Icon
                  name={openModal ? 'chevron-down' : 'chevron-up'}
                  size={25}
                  color={Colors.gray_500}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.viewTopics}>
              <Text style={styles.textTopics}>{t('Log out')}</Text>
              <TouchableOpacity
                onPress={() => {
                  ctx.authLogout();
                  navigation.navigate('Home' as never);
                }}>
                <Icon name={'log-out'} size={20} color={Colors.gray_500} />
              </TouchableOpacity>
            </View>
            {modalHandler()}
          </View>
        </>
      );
    }
  }
  return (
    <>
      <StatusBar
        backgroundColor={Colors.white}
        translucent={false}
        barStyle={'dark-content'}
      />
      <View style={styles.titleView}>
        <Text style={styles.title}>{t('My Profile')}</Text>
      </View>
      <View style={styles.notLogInfo}>
        <Text style={styles.textLog}>
          {t('You need to log in to see your details')}
        </Text>
        <View style={styles.logInButton}>
          <RedButton
            children={t('login')}
            onPress={() => navigation.navigate('auth' as never)}
          />
        </View>
      </View>
      <View style={styles.viewTopics}>
        <Text style={styles.textTopics}>{t('Language')}</Text>
        <TouchableOpacity onPress={show}>
          <Icon
            name={openModal ? 'chevron-down' : 'chevron-up'}
            size={25}
            color={Colors.gray_500}
          />
        </TouchableOpacity>
        {modalHandler()}
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  titleView: {
    marginTop: 64,
    marginLeft: 16,
  },
  title: {
    color: Colors.black,
    fontSize: 36,
    fontFamily: 'OpenSans-ExtraBold',
  },
  imageView: {
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabEdit: {
    position: 'absolute',
    top: 0,
    right: '30%',
  },
  fabCheck: {
    position: 'absolute',
    top: '2%',
    right: '7%',
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  profileInfo: {
    alignItems: 'center',
    textAlign: 'left',
    marginBottom: 16,
  },
  notLogInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '22%',
    marginBottom: '25%',
  },
  textLog: {
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.black,
    marginBottom: 18,
    marginHorizontal: 18,
    textAlign: 'center',
  },
  logInButton: {
    width: '35%',
  },
  name: {
    marginVertical: 4,
    color: Colors.black,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 26,
  },
  email: {
    marginVertical: 4,
    color: Colors.gray_500,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  textTopics: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: Colors.black,
  },
  viewTopics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
    paddingHorizontal: 16,
    paddingVertical: 25,
    borderBottomColor: Colors.gray_200,
    borderBottomWidth: 1,
  },
  viewTransparent: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  viewTeste: {
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: Colors.white,
    width: '100%',
    height: '35%',
    marginTop: '140%',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 34,
  },
  modalTitle: {
    color: Colors.black,
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  grayLine: {
    width: 60,
    height: 6,
    backgroundColor: Colors.gray_500,
    borderRadius: 3,
    marginVertical: 16,
  },
  pressOutside: {
    width: '100%',
    height: '100%',
  },
  viewLanguages: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  languageButton: {
    backgroundColor: 'transparent',
  },
  languageButtonP: {
    backgroundColor: Colors.red_500,
  },
  languageText: {
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.black,
    fontSize: 18,
    paddingVertical: 15,
    paddingLeft: 16,
  },
  languageTextP: {
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.white,
    fontSize: 18,
    paddingVertical: 15,
    paddingLeft: 16,
  },
});
