import { Table, Toast } from 'reactstrap'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {loadData} from '../data'


class TableView extends Component {



createTable = () => {
  const { data } = this.props
  let table = []

  for (let i = 0; i < data.queryData.length; i++) {
    var children = []
    let curRow = data.queryData[i]

    for (var key in curRow) {
    children.push(<td>{curRow[key]}</td>)
    }
    table.push(<tr>{children}</tr>)
  }
  return table
}



  render() {
    return (
          <Toast className="Table">
                <Table hover>
                {this.createTable()}
               </Table>
              </Toast> 
      )
  } 
}


const mapStateToProps = state => ({
  chat: state.chat,
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  loadData: (query) => dispatch(loadData(query))
})


export default connect(mapStateToProps, mapDispatchToProps)(TableView)
