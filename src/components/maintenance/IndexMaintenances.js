import React, { Component } from 'react'
import { indexMaintenances } from '../../api/maintenance'
import { withRouter } from 'react-router-dom'

class IndexMaintenance extends Component {
  constructor (props) {
    super(props)

    this.state = {
      maintenances: null
    }

    this.vehicleId = props.match.params.id
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    indexMaintenances(this.vehicleId, user)
      .then((res) => {
        // console.log('vehicle id = ' + this.vehicleId)
        // console.log('response = ' + res)
        return res.data.maintenances.filter((maintenance) =>
          maintenance.vehicle === Number(this.vehicleId)
        )
      })
      .then((filteredRes) => this.setState({ maintenances: filteredRes }))
      .then(() => {
        msgAlert({
          heading: 'Index maintenances Success',
          message: 'Vehicle\'s maintenances successfully shown',
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
    const { maintenances } = this.state

    if (maintenances === null) {
      return 'Loading...'
    }

    // console.log('maintenances= ' + JSON.stringify(maintenances))

    let maintenanceJSX
    if (maintenances.length === 0) {
      maintenanceJSX = 'No maintenances, create some'
    } else {
      maintenanceJSX = maintenances.map((maintenance) => (
        <li key={maintenance.id}>
          <div>{maintenance.type}    {maintenance.cost}    {maintenance.date}</div>
        </li>
      ))
    }
    return (
      <>
        <h3>Maintenances:</h3>
        <ul>{maintenanceJSX}</ul>
      </>
    )
  }
}

export default withRouter(IndexMaintenance)
