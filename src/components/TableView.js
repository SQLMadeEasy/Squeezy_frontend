import { Table, Toast } from 'reactstrap'
import React, { Component } from 'react'
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
      useSortBy
    )
  
    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    const firstPageRows = rows.slice(0, 20)
  
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
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
       const columnObj = [{Header: 'User Information',columns: []}]

       for (let col in singleRow) {
         const column = 
         {
          Header: col.toUpperCase(),
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

    console.log(createHeader())
  
  
    return (
      <Table hover className="Table">
        <TableLayout columns={columns} data={props.data.queryData} /> 
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
