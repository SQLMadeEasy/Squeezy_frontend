import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {connect} from 'react-redux'
import {loadAllData} from '../data'




const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class Chart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';



  render() {

  const data = [
  { name: 'Queried Total Rows', value: +this.props.rowCount[0].count},
  { name: 'Other Rows', value: +this.props.rowCount[0].count - this.props.data.queryData.length},
  ];


    return (
      <PieChart className="PieChart" width={400} height={400}>
        <Pie
          width={1000}
          height={1000}
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Legend/>
      </PieChart>
    );
  }
}



const mapStateToProps = state => ({
  data: state.data,
  rowCount: state.data.rowCount
})


const mapDispatchToProps = dispatch => ({
  loadAllData: (table) => dispatch(loadAllData())
})




export default connect(mapStateToProps, mapDispatchToProps)(Chart)
