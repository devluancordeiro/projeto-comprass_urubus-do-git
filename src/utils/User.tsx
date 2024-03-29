import axios from 'axios';
import {Alert} from 'react-native';

export interface User {
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
    return error;
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
    } else {
      const response = await axios.post(
        'https://api.escuelajs.co/api/v1/users/',
        {
          name: name,
          email: email,
          password: password,
          avatar: 'https://100k-faces.glitch.me/random-image',
          role: 'customer',
        },
      );

      console.log(response.data);
      let id = response.data.id;
      return id;
    }
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

export async function fetchUser(id: string) {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/users/${id}`,
    );
    let data: User = response.data;
    return data;
  } catch (error) {
    Alert.alert('Fetch user error', `${error}`);
  }
}

export async function editData(id: string, name: string) {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/users/${id}`,
    );
    let user: User = response.data;
    user.name = name;
    await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, user);
    const editedResponse = await axios.get(
      `https://api.escuelajs.co/api/v1/users/${id}`,
    );
    return editedResponse.data;
  } catch (error) {
    Alert.alert('Edit data error', `${error}`);
  }
}
