import apiUrl from '../apiConfig'
import axios from 'axios'

export const createVehicle = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/vehicles/',
    data: {
      vehicle: {
        v_year: data.vYear,
        v_make: data.vMake,
        v_model: data.vModel
      }
    },
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const indexVehicles = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/vehicles/',
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

export const updateVehicle = (data, id, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/vehicles/' + id + '/',
    data: {
      vehicle: {
        v_year: data.vYear,
        v_make: data.vMake,
        v_model: data.vModel
      }
    },
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
