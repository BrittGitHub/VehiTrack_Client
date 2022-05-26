import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMaintenance = (data, id, user) => {
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

// export const indexMaintenances = (id, user) => {
//   return axios({
//     method: 'GET',
//     url: apiUrl + '/vehicles/' + id + '/maintenances/',
//     headers: {
//       Authorization: `Token ${user.token}`
//     }
//   })
// }
