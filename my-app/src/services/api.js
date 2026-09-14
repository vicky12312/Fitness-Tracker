import axios from 'axios';
const API_BASE_URL =process.env.REACT_APP_API_BASE_URL;
const api=axios.create({
    baseURL:API_BASE_URL,
    headers:{
        'Content-Type':'application/json'
    },
});
export const register = (username, password) => {
  return api.post('/users/register', { username, password });
};

export const login = (username, password) => {
  return api.post('/users/login', { username, password });
};

// ========== PROFILE ==========
export const createProfile = (userId, profileData) => {
  return api.post(`/profile/create/${userId}`, profileData);
};

export const getProfile = (userId) => {
  return api.get(`/profile/user/${userId}`);
};

export const updateProfile = (profileData) => {
  return api.post('/profile/update', profileData);
};

// ========== CALORIES ==========
export const addCalorie = (calorieData) => {
  return api.post('/calories/add', calorieData);
};

export const getCalories = (userlogId) => {
  return api.get(`/calories/user/${userlogId}`);
};

export const getCaloriesByDate = (userlogId, date) => {
  return api.get(`/calories/user/${userlogId}/date/${date}`);
};

// ========== ACTIVITY ==========
export const addActivity = (activityData) => {
  return api.post('/activity/add', activityData);
};

export const getActivities = (userlogId) => {
  return api.get(`/activity/user/${userlogId}`);
};

// ========== WORKOUT ==========
export const addWorkout = (workoutData) => {
  return api.post('/workout/add', workoutData);
};

export const getWorkouts = (userlogId) => {
  return api.get(`/workout/user/${userlogId}`);
};
export default api;