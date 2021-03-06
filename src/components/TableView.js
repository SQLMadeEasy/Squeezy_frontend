import { Table, Toast, Input, Row, Label, Button } from 'reactstrap'
import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {loadData, loadAllData} from '../data'
import { 
  useTable,
  useFilters,
  useSortBy,
 } from "react-table";


  function TableLayout({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      {
        columns,
        data,
      },
      useFilters,
      useSortBy
    )

    const firstPageRows = rows.slice(0, 20)


    const initialState = {}
    const columnNames = []

    columns[0].columns.forEach(col => {
      initialState[col.accessor] = true
      columnNames.push(col.accessor)
    })

    const [displayedCol, setdisplayedCol] = useState(initialState)

  if (data.length  === 0) {
    return null
  }
  return (
      <>
        <Row>
          <div className="checkboxes">
          {columns[0].columns.map(col => {
            console.log('COLUMNS',columns[0].columns)
          return (
        <Label check>
          <Input onChange={(evt) => {
                    setdisplayedCol({...displayedCol, [col.accessor]: !displayedCol[col.accessor]}) 
                    }} type="checkbox" />{col.accessor}
        </Label>
          )
        })} 
          </div> 
        </Row>
   
  
      <table {...getTableProps()}> 
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.filter(column => {
                  return displayedCol[column.Header]
                }).map(column => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ⬇️'
                          : ' ⬆️'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map(
              (row, i) => {
                prepareRow(row);

      
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.filter((cell, idx) => {
                      return displayedCol[columnNames[idx]]  
                    }).map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )}
            )}
          </tbody>
        </table>
        
        <br />
        <div className="bold">Click on a Checkbox to Filter or Click a Column to Sort</div>
        <div className="bold">Showing the first 20 results of {rows.length} rows</div>
        <Link to="/chat">
            <Button className="bold"> Back to Chat </Button>
        </Link>  
        <Link to="/chart">
            <Button className="bold"> See Graph Data</Button>
        </Link>
      </>
    )
  }
  




  function CreateTable(props) {

  function createHeader () {
       const singleRow = props.data.queryData[0]
       const columnObj = [{Header: 'Table Information',columns: []}]

       for (let col in singleRow) {
         const column = 
         {
          Header: col,
          accessor: `${col}`
         }
         columnObj[0].columns.push(column)
       }
       return columnObj
     }


    const columns = React.useMemo(
       createHeader,
       []
    )
  
    if (props.data.queryData.length === 0) {
      return null
    }
  
    return (
      <Table className="Table" hover>
        <TableLayout columns={columns} data={props.data.queryData} /> 
      </Table>   
     
    )
  }


const mapStateToProps = state => ({
  chat: state.chat,
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  loadData: (query) => dispatch(loadData(query)),
  loadAllData: (table) => dispatch(loadAllData(table))
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateTable)
