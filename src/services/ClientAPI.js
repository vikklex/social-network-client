import axios from 'axios';
import { storage } from '../storage';

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

  login({ email, password }) {
    return this.instance.post('/v1/auth/login', {
      email,
      password_hash: password,
    });
  }

  register({ first_name, last_name, email, password }) {
    return this.instance.post('/v1/auth/registration', {
      first_name,
      last_name,
      email,
      password_hash: password,
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
    return this.instance.get(`/v1/users/${id}`);
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

  deleteAvatar(user) {
    return this.instance.delete(`v1/users/${user.id}/user-avatar`, user);
  }

  deleteImageFromAlbum(id, path) {
    return this.instance.delete(`v1/users/${id}/album-image`, {
      data: { path },
    });
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

  createComment(userId, desc, postId, postAuthor) {
    return this.instance.post('v1/comments/', userId, postAuthor, postId, desc);
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
      reactionType,
      contentType,
      userId,
      likedUser,
      postId,
    });
  }

  getAllPostReactions(postId) {
    return this.instance.get(`v1/reactions/${postId}`);
  }

  getAllReactionsForUser(likedUser) {
    return this.instance.get(`v1/reactions/likedUser/${likedUser}`);
  }

  getReactionsFromDate(id, startDate, endDate) {
    return this.instance.post(`v1/reactions/date/${id}`, {
      id,
      startDate,
      endDate,
    });
  }

  createMeeting(
    userId,
    participants,
    title,
    description,
    importance,
    date,
    startTime,
    endTime,
  ) {
    return this.instance.post(
      'v1/meetings/',
      userId,
      participants,
      title,
      description,
      importance,
      date,
      startTime,
      endTime,
    );
  }

  getMeetings(id) {
    return this.instance.get(`v1/meetings/${id}`);
  }

  updateMeeting(
    id,
    userId,
    participants,
    title,
    description,
    importance,
    date,
    startTime,
    endTime,
  ) {
    return this.instance.put(`v1/meetings/${id}`, {
      id,
      userId,
      participants,
      title,
      description,
      importance,
      date,
      startTime,
      endTime,
    });
  }

  deleteMeeting(id, userId) {
    return this.instance.delete(`v1/meetings/${id}`, userId);
  }
}

export default new ClientAPI();
