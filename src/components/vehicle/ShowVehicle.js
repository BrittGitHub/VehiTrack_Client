import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { deleteVehicle, showVehicle } from '../../api/vehicle'
import Button from 'react-bootstrap/Button'

class ShowVehicle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      vehicle: null
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props

    showVehicle(match.params.id, user)
      .then(res => this.setState({
        vehicle: {
          vYear: res.data.vehicle.v_year,
          vMake: res.data.vehicle.v_make,
          vModel: res.data.vehicle.v_model
        }
      }))
      .then(() => {
        msgAlert({
          heading: 'Show vehicle success',
          message: 'Woot success',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Show failed',
          message: 'Error message: ' + error.message,
          variant: 'danger'
        })
      })
  }

    handleDelete = () => {
      const { match, user, msgAlert, history } = this.props

      deleteVehicle(match.params.id, user)
        .then(() => history.push('/vehicles'))
        .then(() => {
          msgAlert({
            heading: 'Deleted vehicle success',
            message: 'Vehicle deleted',
            variant: 'success'
          })
        })
        .catch(error => {
          msgAlert({
            heading: 'Delete fail',
            message: 'Delete error: ' + error.message,
            variant: 'danger'
          })
        })
    }

    render () {
      if (this.state.vehicle === null) {
        return 'Loading...'
      }

      const { vYear, vMake, vModel, owner } = this.state.vehicle
      const { user, history, match } = this.props

      return (
        <div className="show-vehicle">
          <h4>{vModel}</h4>
          <p>Year: {vYear}</p>
          <p>Make: {vMake}</p>
          {user._id === owner && (
            <>
              <Button variant='dark'
                onClick={this.handleDelete}>Delete Vehicle</Button>
              <Button variant='dark'
                onClick={() => history.push(`/vehicles/${match.params.id}/edit`)}>Update Vehicle</Button>
            </>
          )}
          <Button variant='dark'
            onClick={() =>
              history.push(`/vehicles/${match.params.id}/create-maintenance`)
            }>
            Add Maintenance Memo
          </Button>
          <Button variant='dark'
            onClick={() =>
              history.push(`/vehicles/${match.params.id}/maintenances`)
            }>
            Show All Maintenance Memos
          </Button>
        </div>
      )
    }
}

export default withRouter(ShowVehicle)
