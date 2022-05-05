import axios from 'axios';

class ClientAPI {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080',
    });
  }
  getData = async (url, token) => {
    const res = await this.instance.get(`/v1/users/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res;
  };

  postData = async (url, post, token) => {
    const res = await this.instance.post(`/v1/auth/${url}`, post, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res;
  };
}

export default new ClientAPI();
