import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMaintenance = (data, id, user) => {
  console.log(data)
  return axios({
    method: 'POST',
    url: apiUrl + '/vehicles/' + id + '/maintenances/',
    data: {
      maintenance: {
        type: data.type,
        date: data.date,
        cost: data.cost,
        notes: data.notes
      }
    },
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const indexMaintenances = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/vehicles/' + id + '/maintenances/',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// export const showMaintenance = (id, user) => {
//   return axios({
//     method: 'GET',
//     url: apiUrl + '/vehicles/' + id + '/maintenances/' + id,
//     headers: {
//       Authorization: `Token ${user.token}`
//     }
//   })
// }

// export const updateMaintenance = (data, id, user, maintenanceId) => {
//   return axios({
//     url: apiUrl + '/vehicles/' + id + '/maintenances/' + maintenanceId,
//     method: 'patch',
//     data: { maintenance: data },
//     headers: {
//       Authorization: `Token ${user.token}`
//     }
//   })
// }

// export const deleteMaintenance = (data, id, maintenanceId, user) => {
//   return axios({
//     method: 'DELETE',
//     url: apiUrl + '/vehicles/' + id + '/maintenances/' + maintenanceId,
//     data: {
//       maintenance: { vehicleId: data }
//     },
//     headers: {
//       Authorization: `Token ${user.token}`
//     }
//   })
// }
