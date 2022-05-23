import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createVehicle } from '../../api/vehicle'

class CreateVehicle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      v_year: '',
      v_make: '',
      v_model: ''
    }
  }

    handleChange = (event) =>
      this.setState({
        [event.target.name]: event.target.value
      })

    handleSubmit = event => {
      event.preventDefault()

      const { user, msgAlert } = this.props

      createVehicle(this.state, user)
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='v_year'>
            <Form.Label>Vehicle Year</Form.Label>
            <Form.Control
              required
              name='v_year'
              value={this.state.v_year}
              placeholder='Vehicle Year'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='v_make'>
            <Form.Label>Vehicle Make</Form.Label>
            <Form.Control
              required
              name='v_make'
              value={this.state.v_make}
              placeholder='Vehicle Make'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='v_model'>
            <Form.Label>Vehicle Model</Form.Label>
            <Form.Control
              required
              name='v_model'
              value={this.state.v_model}
              placeholder='Vehicle Model'
              onChange={this.handleChange}
            />
            <Button variant='primary' type='submit'>Submit</Button>
          </Form.Group>
        </Form>
      )
    }
}

export default CreateVehicle
