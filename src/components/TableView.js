import { Table, Toast } from 'reactstrap'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {loadData} from '../data'


class TableView extends Component {


  render() {
    const { data } = this.props

    // for (let col in data.queryData) {
      return (
        <div>
                <Toast className="Table">
                <Table hover>
                <thead>
                  <tr>
                    {/* <th>{col}</th> */}
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
               </Table>
              </Toast>           
            )}
          </div>
          )
  //    }
  } 
}


const mapStateToProps = state => ({
  chat: state.chat,
  data: state.data
})




export default connect(mapStateToProps, null)(TableView)
