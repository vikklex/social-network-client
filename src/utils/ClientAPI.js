import axios from 'axios';

class ClientAPI {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080',
      responseType: 'json',
    });
    this.instance.interceptors.request.use((config) => {
      config.headers.Authorization = localStorage.getItem('token');
      return config;
    });
  }

  login = async ({ email, password_hash }) => {
    return await this.instance.post('/v1/auth/login', {
      email: email,
      password_hash: password_hash,
    });
  };

  register = async ({ first_name, last_name, email, password_hash }) => {
    return await this.instance.post('/v1/auth/registration', {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password_hash: password_hash,
    });
  };

  logout = async () => {
    return await this.instance.post('/v1/auth/logout');
  };

  searchUser = async (username) => {
    return await this.instance.get(
      `/v1/users/search/search?username=${username}`,
    );
  };

  getUser = async (id) => {
    return await this.instance.get(`/v1/users/${id}`);
  };
}

export default new ClientAPI();
