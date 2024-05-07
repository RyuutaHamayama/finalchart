import React, { Component } from "react";
import "./App.css";
import Child1 from "./Child1";
import Child2 from "./Child2";
import * as d3 from "d3";
import sampleData from "./SampleDataset.csv";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      options: ["A", "B", "C"]
    };    
  }
  
  componentDidMount() {
    var self = this;
    d3.csv(sampleData, function (d) {
      return {
        x: parseInt(d.x),
        y: parseInt(d.y),
        category: d.category,
      };
    })
      .then(function (csv_data) {
        var columns = Object.keys(csv_data[0]).filter(column => ["x", "y", "category"].includes(column));
        self.setState({ data: csv_data, columns: columns });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="parent">
        <div style={{ display: "center", justifyContent: "space-around" }}>
          <select onChange={this.handleSelectChange}>
            {this.state.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="child1">
          <Child1 data1={this.state.data}></Child1>
        </div>
        <div className="child2">
          <Child2 data1={this.state.data}></Child2>
        </div>
      </div>
    );
  }
}

export default App;
