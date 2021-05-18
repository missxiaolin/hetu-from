export const reactTemplate = `
import React, {Component} from 'react'
class <%-className%> extends Component {
  constructor(props) {
    super(props);
    this.state = {
      <% state.forEach(function(item){%><%-item%>,
      <% }) %>
    }
  }
  render() {
    return (
      <%-code%>
    )
  }
  <% events.forEach(function(item){%><%-item%>
  <% }) %>
}
export <%-className%>
`
