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

  getUserPosts = async (id) => {
    return await this.instance.get(`v1/posts/timeline/${id}`);
  };
  updateUser = async (data, id) => {
    return await this.instance.put(`v1/users/${id}`, {
      userId: id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password_hash: data.password_hash,
      job: data.job,
      birthday: data.birthday,
      desc: data.desc,
      gender: data.gender,
      relationships: data.relationships,
      city: data.city,
      from: data.from,
    });
  };

  createPost = async ({ userId, content }) => {
    return await this.instance.post('v1/posts/', {
      userId: userId,
      desc: content,
    });
  };
}

export default new ClientAPI();
