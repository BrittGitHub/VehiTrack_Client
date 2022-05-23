import apiUrl from '../apiConfig'
import axios from 'axios'

export const createVehicle = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/vehicles/',
    // vehicle: { v_year: '2002', v_make: 'ford', v_model: 'Raptor'}
    data: {
      vehicle: data
    },
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const indexVehicles = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/vehicles',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const showVehicle = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/vehicles/' + id,
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const deleteVehicle = (id, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/vehicles/' + id,
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const updateVehicle = (id, user, data) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/vehicles/' + id,
    data: {
      vehicle: {
        title: data.title,
        director: data.director
      }
    },
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
