import axios from 'axios';
import { storage } from 'storage';

class ClientAPI {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      responseType: 'json',
    });
    this.instance.interceptors.request.use((config) => {
      config.headers.Authorization = storage.accessToken.Get();
      return config;
    });
  }

  login({ email, password_hash }) {
    return this.instance.post('/v1/auth/login', {
      email: email,
      password_hash: password_hash,
    });
  }

  register({ first_name, last_name, email, password_hash }) {
    return this.instance.post('/v1/auth/registration', {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password_hash: password_hash,
    });
  }

  logout() {
    return this.instance.post('/v1/auth/logout');
  }

  searchUser(value, id) {
    return this.instance.put(`/v1/users/search/search?username=${value}`, {
      userId: id,
    });
  }

  getUser(id) {
    let d = this.instance.get(`/v1/users/${id}`);
    return d;
  }

  getUserPosts(id) {
    return this.instance.get(`v1/posts/timeline/${id}`);
  }

  getFriendsPosts(id) {
    return this.instance.get(`v1/posts/friendsPosts/${id}`);
  }

  updateUser(
    id,
    first_name,
    last_name,
    email,
    password_hash,
    job,
    birthday,
    desc,
    gender,
    relationships,
    city,
    from,
    status,
    posts_visibility,
    friends_visibility,
    album_visibility,
  ) {
    return this.instance.put(`v1/users/${id}`, {
      userId: id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password_hash: password_hash,
      job: job,
      birthday: birthday,
      desc: desc,
      gender: gender,
      relationships: relationships,
      city: city,
      from: from,
      status: status,
      posts_visibility: posts_visibility,
      friends_visibility: friends_visibility,
      album_visibility: album_visibility,
    });
  }

  addFriend(id, userId) {
    return this.instance.put(`v1/users/${id}/follow`, { userId: userId });
  }

  deleteFriend(id, userId) {
    return this.instance.put(`v1/users/${id}/unfollow`, { userId: userId });
  }

  updateAvatar(id, data, config) {
    return this.instance.put(`v1/users/${id}/user-profile`, data, config);
  }

  updateAlbum(id, data, config) {
    return this.instance.put(`v1/users/${id}/user-album`, data, config);
  }

  createPost({ userId, content }) {
    return this.instance.post('v1/posts/', {
      userId: userId,
      desc: content,
    });
  }

  updatePost(id, userId, desc) {
    return this.instance.put(`v1/posts/${id}`, userId, desc);
  }

  updatePostImage(id, data, config) {
    return this.instance.put(`v1/posts/${id}/post-image`, data, config);
  }

  deletePost(id, userId) {
    return this.instance.delete(`v1/posts/${id}`, userId);
  }

  createComment({ data }) {
    return this.instance.post('v1/comments/', {
      userId: data.userId,
      postAuthor: data.postAuthor,
      postId: data.postId,
      desc: data.desc,
    });
  }

  getComments(id) {
    return this.instance.get(`v1/comments/timeline/${id}`);
  }

  updateComment(id, userId, desc) {
    return this.instance.put(`v1/comments/${id}`, userId, desc);
  }

  deleteComment(id, userId) {
    return this.instance.delete(`v1/comments/${id}`, { userId });
  }

  createReaction({ reactionType, contentType, userId, likedUser, postId }) {
    return this.instance.post('v1/reactions/', {
      reactionType: reactionType,
      contentType: contentType,
      userId: userId,
      likedUser: likedUser,
      postId: postId,
    });
  }

  getAllPostReactions(postId) {
    return this.instance.get(`v1/reactions/${postId}`);
  }

  getAllReactionsForUser(likedUser) {
    return this.instance.get(`v1/reactions/likedUser/${likedUser}`);
  }

  getReactionsFromDate({ data }) {
    return this.instance.put(`v1/reactions/date/${data.id}`, {
      startDate: data.startDate,
      endDate: data.endDate,
    });
  }

  createMeeting({ data }) {
    return this.instance.post('v1/meetings/', {
      userId: data.userId,
      participants: data.participants,
      title: data.title,
      description: data.description,
      importance: data.importance,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    });
  }

  getMeetings(id) {
    return this.instance.get(`v1/meetings/${id}`);
  }

  updateMeeting(id, data) {
    return this.instance.put(`v1/meetings/${id}`, {
      userId: data.userId,
      participants: data.participants,
      title: data.title,
      description: data.description,
      importance: data.importance,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    });
  }

  deleteMeeting(id, userId) {
    return this.instance.delete(`v1/meetings/${id}`, userId);
  }
}

export default new ClientAPI();
