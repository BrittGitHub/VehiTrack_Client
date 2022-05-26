import React, { Component } from 'react'
import { indexMaintenances } from '../../api/maintenance'
import { Link } from 'react-router-dom'

class indexMaintenance extends Component {
  constructor (props) {
    super(props)

    this.state = {
      type: '',
      cost: '',
      date: '',
      notes: '',
      vehicleId: props.match.params.id,
      maintenanceId: props.match.params.maintenanceId
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexMaintenances(this.state.vehicle, user)
      .then((res) => {
        return res.data.maintenances.filter((maintenance) =>
          maintenance.vehicle_id === this.state.vehicle
        )
      })
      .then((filteredRes) => this.setState({ maintenances: filteredRes }))
      .then(() => {
        msgAlert({
          heading: 'Index My maintenances Success',
          message: 'maintenances successfully shown!',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Indexing My maintenances Failed',
          message: 'Index error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { maintenances, vehicle } = this.state

    if (maintenances === null) {
      return 'Loading...'
    }

    let maintenanceJSX
    if (maintenances.length === 0) {
      maintenanceJSX = 'No maintenances, create some'
    } else {
      maintenanceJSX = maintenances.map((maintenance) => (
        <li key={maintenance.id}>
          <Link to={`/vehicles/${vehicle.id}/maintenances/${maintenance.id}`}>{maintenance.type}</Link>
        </li>
      ))
    }
    return (
      <>
        <h3>My maintenances:</h3>
        <ul>{maintenanceJSX}</ul>
      </>
    )
  }
}

export default indexMaintenance
