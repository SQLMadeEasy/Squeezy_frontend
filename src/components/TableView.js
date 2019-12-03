import { Table, Toast, Input, Row, Label } from 'reactstrap'
import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import {loadData} from '../data'
import { 
  useTable,
  useGroupBy,
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
    // // We don't want to render all 2000 rows for this example, so cap
    // // it at 20 for this use case

    const initialState = {}
    columns[0].columns.forEach(col => {
      initialState[col.accessor] = true
    })

    console.log('INITIALSTATE', initialState)

    const [displayedCol, setdisplayedCol] = useState(initialState)

  
  return (
      <>
        <Row>
          <div className="checkboxes">
          {columns[0].columns.map(col => {
            console.log('COLUMNS',columns)
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

{/* 
      <Row>
        <div className="checkboxes">
         {['three', 'two', 'one'].map(str => {
          return (
        <Label check>
          <Input type="checkbox"/>{str}
        </Label>
          )
        })}
        </div>
      </Row> */}
  
 
  
      <table {...getTableProps()}> 
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.filter(column => {
                  console.log('sdfnsdf', column.Header)
                  console.log('STATE', displayedCol)
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
                          ? ' 🔽'
                          : ' 🔼'
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
                    {row.cells.map(cell => {
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
        <div>Showing the first 20 results of {rows.length} rows</div>
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
  
  
    return (
      <Table hover>
        <TableLayout className="Table" columns={columns} data={props.data.queryData} /> 
      </Table>   
     
    )
  }


const mapStateToProps = state => ({
  chat: state.chat,
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  loadData: (query) => dispatch(loadData(query))
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateTable)
