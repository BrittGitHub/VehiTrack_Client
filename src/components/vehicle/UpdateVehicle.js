import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { showVehicle, updateVehicle } from '../../api/vehicle'
import { withRouter } from 'react-router-dom'

class UpdateVehicle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      vYear: '',
      vMake: '',
      vModel: ''
    }
  }

  componentDidMount () {
    const { match, user } = this.props

    showVehicle(match.params.id, user)
      .then(res => this.setState({
        vYear: res.data.vehicle.v_year,
        vMake: res.data.vehicle.v_make,
        vModel: res.data.vehicle.v_model
      }))
  }

    handleChange = (event) =>
      this.setState({
        [event.target.name]: event.target.value
      })

    handleSubmit = event => {
      event.preventDefault()

      const { user, msgAlert, history, match } = this.props

      updateVehicle(this.state, match.params.id, user)
        .then(() => history.push('/vehicles/' + match.params.id))
        .then(() => {
          msgAlert({
            heading: 'Updated Vehicle',
            message: 'Vehicle successfully updated updated',
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

    render () {
      return (
        <div className='forms'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId='vYear'>
              <Form.Label>Vehicle Year</Form.Label>
              <Form.Control
                required
                name='vYear'
                value={this.state.vYear}
                placeholder='Vehicle Year'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='vMake'>
              <Form.Label>Vehicle Make</Form.Label>
              <Form.Control
                required
                name='vMake'
                value={this.state.vMake}
                placeholder='Vehicle Make'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='vModel'>
              <Form.Label>Vehicle Model</Form.Label>
              <Form.Control
                required
                name='vModel'
                value={this.state.vModel}
                placeholder='Vehicle Model'
                onChange={this.handleChange}
              />
              <Button variant='dark' type='submit'>Submit</Button>
            </Form.Group>
          </Form>
        </div>
      )
    }
}

export default withRouter(UpdateVehicle)
