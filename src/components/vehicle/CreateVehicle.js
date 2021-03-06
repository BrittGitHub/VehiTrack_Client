import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createVehicle } from '../../api/vehicle'
import { withRouter } from 'react-router-dom'

class CreateVehicle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vYear: '',
      vMake: '',
      vModel: ''
    }
  }

    handleChange = (event) =>
      this.setState({
        [event.target.name]: event.target.value
      })

    handleSubmit = event => {
      event.preventDefault()

      const { user, msgAlert, history } = this.props

      createVehicle(this.state, user)
        .then(() => history.push('/vehicles/'))
        .then(() => {
          msgAlert({
            heading: 'Vehicle Created!',
            message: 'Created!',
            variant: 'success'
          })
        })
        .catch(error => {
          msgAlert({
            heading: 'Vehicle Creation Failed',
            message: 'Vehicle error: ' + error.message,
            variant: 'danger'
          })
        })
    }

    render () {
      return (
        <div className='forms'>
          <Form
            onSubmit={this.handleSubmit}
          >
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

export default withRouter(CreateVehicle)
