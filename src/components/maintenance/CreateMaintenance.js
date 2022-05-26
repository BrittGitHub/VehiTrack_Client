import React, { Component } from 'react'
import { createMaintenance } from '../../api/maintenance'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'

class CreateMaintenance extends Component {
  constructor (props) {
    super(props)

    this.state = {
      type: '',
      date: '',
      cost: '',
      notes: ''
      // vehicleId: props.match.params.id
    }
  }

    handleChange = (event) =>
      this.setState({
        [event.target.name]: event.target.value
      })

    handleSubmit = (event) => {
      event.preventDefault()

      const { user, msgAlert, history, match } = this.props
      console.log(user)

      createMaintenance(this.state, match.params.id, user)
        .then(() => history.push('/vehicles/' + match.params.id))
        .then(() => {
          msgAlert({
            heading: 'Maintenance created successfully',
            message: 'Maintenance created!',
            variant: 'success'
          })
        })
        .catch((error) => {
          msgAlert({
            heading: 'Failed to create a maintenance memo on vehicle',
            message: 'Create maintenance memo error: ' + error.message,
            variant: 'danger'
          })
        })
    }

    render () {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='type'>
            <Form.Label>Maintenance Type</Form.Label>
            <Form.Control
              required
              name='type'
              value={this.state.type}
              placeholder='Maintenance type'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='date'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              required
              name='date'
              type='date'
              value={this.state.date}
              placeholder='Add date here'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='cost'>
            <Form.Label>Cost</Form.Label>
            <Form.Control
              required
              name='cost'
              value={this.state.cost}
              placeholder='Add cost here'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='notes'>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              required
              name='notes'
              value={this.state.notes}
              placeholder='Add notes here'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      )
    }
}

export default withRouter(CreateMaintenance)
