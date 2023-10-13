import axios from 'axios';
import {Alert} from 'react-native';

interface User {
  id: number | undefined;
  email: string | undefined;
  password: string | undefined;
  name: string | undefined;
  role: string | undefined;
  avatar: string | undefined;
}

type FormData = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export async function login({email, password}: FormData) {
  try {
    const response = await axios.get('https://api.escuelajs.co/api/v1/users');
    const users: User[] = response.data;

    const authenticatedUser = users.find(
      user => user.email === email && user.password === password,
    );

    if (authenticatedUser) {
      return authenticatedUser.id;
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    Alert.alert('Login error', `${error}`);
  }
}

export async function register({name, email, password}: FormData) {
  try {
    const getUsersResponse = await axios.get(
      'https://api.escuelajs.co/api/v1/users',
    );
    const existingUsers: User[] = getUsersResponse.data;

    const userWithEmailExists = existingUsers.some(
      user => user.email === email,
    );

    if (userWithEmailExists) {
      throw new Error('User with this email already exists');
    }

    const random = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.post(
      'https://api.escuelajs.co/api/v1/users/',
      {
        name: name,
        email: email,
        password: password,
        avatar: `https://api.lorem.space/image/face?w=640&h=480&r=${random}`,
        role: 'customer',
      },
    );

    console.log(response.data);
    let id = response.data.id;
    return id;
  } catch (error) {
    Alert.alert('Registration error', `${error}`);
  }
}

export async function search({email}: FormData) {
  try {
    const getUsersResponse = await axios.get(
      'https://api.escuelajs.co/api/v1/users',
    );
    const users: User[] = getUsersResponse.data;

    const userToUpdate = users.find(user => user.email === email);

    if (!userToUpdate) {
      throw new Error('User with this email does not exist');
    }
    return true;
  } catch (error) {
    Alert.alert('Search email error', `${error}`);
  }
}

export async function resetPassword({email, password}: FormData) {
  try {
    const getUsersResponse = await axios.get(
      'https://api.escuelajs.co/api/v1/users',
    );
    const users: User[] = getUsersResponse.data;

    const userToUpdate = users.find(user => user.email === email);

    if (!userToUpdate) {
      throw new Error('User with this email does not exist');
    }

    userToUpdate.password = password;

    const updateUserResponse = await axios.put(
      `https://api.escuelajs.co/api/v1/users/${userToUpdate.id}`,
      userToUpdate,
    );
    console.log(updateUserResponse.data);
  } catch (error) {
    Alert.alert('Password reset error', `${error}`);
  }
}
