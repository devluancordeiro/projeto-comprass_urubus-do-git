import React, {useState, useContext} from 'react';
import {Image, Text, View} from 'react-native';
import {Colors} from '../../constants/styles';
import {User, fetchUser} from '../../utils/User';
import {AuthContext} from './AuthContext';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

function AuthWelcome() {
  const {t} = useTranslation();
  const [data, setData] = useState<User | undefined>(undefined);
  const ctx = useContext(AuthContext);

  async function loadData() {
    try {
      const userData = await fetchUser(ctx.id);
      setData(userData);
    } catch {}
  }

  if (ctx.isLogged) {
    loadData();
    if (data) {
      return (
        <View style={styles.welcomeWrapper}>
          <Image
            source={{
              uri: data.avatar,
            }}
            style={styles.userAvatar}
          />
          <Text style={styles.userName}>
            {t('Hello')}, {data.name}
          </Text>
        </View>
      );
    }
  }
}

export default AuthWelcome;

const styles = StyleSheet.create({
  welcomeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: 22,
    padding: 2,
    paddingRight: 10,
    gap: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    position: 'absolute',
    marginTop: 16,
    marginLeft: 16,
  },
  userAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  userName: {
    color: Colors.black,
    fontSize: 12,
  },
});
