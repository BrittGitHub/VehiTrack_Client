import React, { Component } from 'react'
import { indexVehicles } from '../../api/vehicle'
import { Link } from 'react-router-dom'

class indexVehicle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      vehicles: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexVehicles(user)
      .then((res) => {
        return res.data.vehicles.filter((vehicle) =>
          vehicle.owner._id === user._id
        )
      })
      .then((filteredRes) => this.setState({ vehicles: filteredRes }))
      .then(() => {
        msgAlert({
          heading: 'Index My Vehicles Success',
          message: 'Vehicles successfully shown!',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Indexing My Vehicles Failed',
          message: 'Index error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { vehicles } = this.state

    if (vehicles === null) {
      return 'Loading...'
    }

    let vehicleJSX
    if (vehicles.length === 0) {
      vehicleJSX = 'No vehicles, create some'
    } else {
      vehicleJSX = vehicles.map((vehicle) => (
        <li key={vehicle.id}>
          <Link to={`/vehicles/${vehicle.id}`}>{vehicle.v_model}</Link>
        </li>
      ))
    }
    return (
      <div className='index-vehicles'>
        <h3>My Vehicles:</h3>
        <ul>{vehicleJSX}</ul>
      </div>
    )
  }
}

export default indexVehicle
