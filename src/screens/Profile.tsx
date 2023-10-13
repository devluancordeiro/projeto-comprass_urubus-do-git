import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Colors} from '../constants/styles';
import Icon from 'react-native-vector-icons/Feather';
import RedButton from '../components/ui/RedButton';

const Profile = () => {
  const [on, setOn] = useState(false);
  const toggleOn = () => setOn(!on);
  const [logged, setLogged] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const show = () => setOpenModal(true);
  const hide = () => setOpenModal(false);
  const [pressLanguage1, setPressLanguage1] = useState(false);
  const [pressLanguage2, setPressLanguage2] = useState(false);

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
            <Text style={styles.modalTitle}>Languages</Text>
          </View>
          <TouchableOpacity
            style={
              pressLanguage1 ? styles.languageButtonP : styles.languageButton
            }
            onPress={() => {
              setPressLanguage1(true);
              setPressLanguage2(false);
            }}>
            <Text
              style={
                pressLanguage1 ? styles.languageTextP : styles.languageText
              }>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              pressLanguage2 ? styles.languageButtonP : styles.languageButton
            }
            onPress={() => {
              setPressLanguage2(true);
              setPressLanguage1(false);
            }}>
            <Text
              style={
                pressLanguage2 ? styles.languageTextP : styles.languageText
              }>
              Portuguese - Brazil
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  if (logged) {
    return (
      <>
        <StatusBar
          backgroundColor={Colors.white}
          translucent={false}
          barStyle={'dark-content'}
        />
        <View style={styles.titleView}>
          <Text style={styles.title}>My profile</Text>
        </View>
        <View style={styles.imageView}>
          <Image
            source={require('../assets/images/picProfile.png')}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileInfo}>
          <View>
            <Text style={styles.name}>Juliane Gonçalves Freitas</Text>
            <Text style={styles.email}>matildabrown@mail.com</Text>
          </View>
        </View>
        <View>
          <View style={styles.viewTopics}>
            <Text style={styles.textTopics}>Edit informations</Text>
            <Switch
              trackColor={{false: Colors.white, true: Colors.red_500}}
              thumbColor={on ? Colors.gray_200 : Colors.gray_200}
              value={on}
              onValueChange={toggleOn}
            />
          </View>
          <View style={styles.viewTopics}>
            <Text style={styles.textTopics}>Language</Text>
            <TouchableOpacity onPress={show}>
              <Icon name={'chevron-up'} size={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewTopics}>
            <Text style={styles.textTopics}>Log out</Text>
            <TouchableOpacity
              onPress={() => {
                setLogged(false);
              }}>
              <Icon name={'log-out'} size={20} />
            </TouchableOpacity>
          </View>
          {modalHandler()}
        </View>
      </>
    );
  }
  return (
    <>
      <StatusBar
        backgroundColor={Colors.white}
        translucent={false}
        barStyle={'dark-content'}
      />
      <View style={styles.titleView}>
        <Text style={styles.title}>My profile</Text>
      </View>
      <View style={styles.notLogInfo}>
        <Text style={styles.textLog}>
          You need to log in to see your details
        </Text>
        <View style={styles.logInButton}>
          <RedButton
            children={'login'}
            onPress={() => {
              setLogged(true);
            }}
          />
        </View>
      </View>
      <View style={styles.viewTopics}>
        <Text style={styles.textTopics}>Language</Text>
        <TouchableOpacity onPress={show}>
          <Icon name={'chevron-up'} size={25} />
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
  profileImage: {
    height: 150,
    width: 150,
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
    hieght: 50,
  },
  languageButtonP: {
    backgroundColor: Colors.red_500,
    hieght: 50,
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
