import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';
import React, { Component } from 'react';
import './PieChart.css';
  
const COLORS = ['#4682b4', '#00C49F', '#CC66FF','#6A5ACD', '#FFBB28','#dc143c','#FF8042'];

class MakePieChart extends Component{
    constructor(props){
        super(props);
    }
    clacResult = () =>{
        if(this.props.data[0].value + this.props.data[1].value === 0){
            return "　";
        }else{
            return this.props.data[0].value + this.props.data[1].value + this.props.data[2].value + this.props.data[3].value + this.props.data[4].value;
        }
    }
    render(){
        return(
            <div className="chart-container">
                <p>年間<span className='chart-container-span'>約{this.clacResult()}万円</span>の社会保険料を支払っています</p>
                <PieChart className='test' width={window.innerWidth > 1024 ?  400 : 300} height={window.innerWidth > 1024 ?  330 : 450}>
                    <Pie data={this.props.data} cx="50%" cy="50%" outerRadius={100} label dataKey="value" startAngle={90} endAngle={-270}>
                        {this.props.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth='0.65'/>
                        ))}
                    </Pie>
                    <Legend
                    content={(props) => {
                        // props.payload は Recharts が生成した順序になる
                        // → 無視して this.props.data の順番で新しい配列を作る
                        const { payload } = props;
                        return (
                        <ul style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            margin: 0,
                            padding: 0,
                            listStyle: 'none',
                            justifyContent: 'center'
                        }}>
                        {this.props.data.map((entry, index) => {
                            return (
                                <li key={`item-${index}`} style={{ marginRight: 10 }}>
                                <span
                                    style={{
                                    display: 'inline-block',
                                    width: 10,
                                    height: 10,
                                    backgroundColor: COLORS[index],
                                    marginRight: 4
                                    }}
                                />
                                {entry.name}
                                </li>
                            );
                        })}
                        </ul>
                        );
                    }}
                    />
                    <Tooltip/>
                </PieChart>
            </div>
        )
    }
}
export default MakePieChart;