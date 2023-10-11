import React, {useState} from 'react';
import {View, Text, StatusBar, Image, StyleSheet, Switch} from 'react-native';
import {Colors} from '../constants/styles';
import Icon from 'react-native-vector-icons/Feather';

const Profile = () => {
  const [on, setOn] = useState(false);
  const toggleOn = () => setOn(!on);

  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
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
          <Icon name={'chevron-up'} size={25} />
        </View>
        <View style={styles.viewTopics}>
          <Text style={styles.textTopics}>Log out</Text>
          <Icon name={'log-out'} size={20} />
        </View>
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
});
