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

  getAllUsers(data) {
    return this.instance.post(`/v1/users/${data.id}/all`, {
      user: data,
    });
  }

  getUserPosts(id) {
    return this.instance.get(`v1/posts/timeline/${id}`);
  }

  getFriendsPosts(id) {
    return this.instance.get(`v1/posts/friendsPosts/${id}`);
  }

  updateUser(data) {
    return this.instance.put(`v1/users/${data.id}`, {
      userId: data.id,
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
      status: data.status,
      posts_visibility: data.posts_visibility,
      friends_visibility: data.friends_visibility,
      album_visibility: data.album_visibility,
    });
  }

  addFriend(data) {
    return this.instance.put(`v1/users/${data.profile.id}/follow`, {
      userId: data.user.id,
    });
  }

  deleteFriend(data) {
    return this.instance.put(`v1/users/${data.profile.id}/unfollow`, {
      userId: data.user.id,
    });
  }

  updateAvatar(data) {
    return this.instance.put(
      `v1/users/${data.user.id}/user-profile`,
      data.formData,
      data.config,
    );
  }

  updateAlbum(data) {
    return this.instance.put(
      `v1/users/${data.user.id}/user-album`,
      data.formData,
      data.config,
    );
  }

  deleteAvatar(user) {
    return this.instance.delete(`v1/users/${user.id}/user-avatar`, user);
  }

  deleteImageFromAlbum(data) {
    return this.instance.delete(`v1/users/${data.profile.id}/album-image`, {
      data: { data: data.src },
    });
  }

  deleteUser(user) {
    return this.instance.delete(`v1/users/${user.id}`, user);
  }

  createPost(data) {
    return this.instance.post('v1/posts/', {
      userId: data.userId,
      desc: data.content,
    });
  }

  updatePost(data) {
    return this.instance.put(`v1/posts/${data.postId}`, {
      userId: data.userId,
      desc: data.text,
    });
  }

  updatePostImage(data) {
    return this.instance.put(
      `v1/posts/${data.postId}/post-image`,
      data.formData,
      data.config,
    );
  }

  deletePost(data) {
    return this.instance.delete(`v1/posts/${data.post.id}`, {
      data: { user: data.profile },
    });
  }

  createComment(data) {
    return this.instance.post('v1/comments/', {
      userId: data.userId,
      postAuthor: data.postUserId,
      postId: data.postId,
      desc: data.content,
    });
  }

  getComments(id) {
    return this.instance.get(`v1/comments/timeline/${id}`);
  }

  updateComment(data) {
    return this.instance.put(`v1/comments/${data.id}`, {
      userId: data.userId,
      desc: data.desc,
    });
  }

  deleteComment(id, userId) {
    return this.instance.delete(`v1/comments/${id}`, { userId });
  }

  createReaction(data) {
    return this.instance.post('v1/reactions/', {
      reactionType: data.reactionType,
      contentType: data.contentType,
      userId: data.userId,
      likedUser: data.likedUser,
      postId: data.postId,
    });
  }

  getAllPostReactions(postId) {
    return this.instance.get(`v1/reactions/${postId}`);
  }

  getAllReactionsForUser(likedUser) {
    return this.instance.get(`v1/reactions/likedUser/${likedUser}`);
  }

  getReactionsFromDate(data) {
    return this.instance.post(`v1/reactions/date/${data.id}`, {
      id: data.id,
      startDate: data.startDate,
      endDate: data.endDate,
    });
  }

  getUsersFromRegisterDate(data) {
    return this.instance.post(`v1/users/date-statistics/`, {
      startDate: data.startDate,
      endDate: data.endDate,
    });
  }

  createMeeting(data) {
    return this.instance.post('v1/meetings/', {
      userId: data.userId,
      participants: [...data.participants, data.userId],
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

  updateMeeting(data) {
    return this.instance.put(`v1/meetings/${data.id}`, {
      id: data.id,
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

  deleteMeeting(data) {
    return this.instance.delete(`v1/meetings/${data.id}`);
  }
}

export default new ClientAPI();
