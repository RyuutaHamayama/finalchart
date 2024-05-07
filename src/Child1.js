import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.svgRef = React.createRef();
  }

  componentDidUpdate() {
    const data = this.props.data1;
    const svg = d3.select(this.svgRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
  
    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);
  
    const g = svg.selectAll("g").data([null]).join("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    const sumValues = d3.rollups(data, v => v.length, d => d.category);
    const categories = sumValues.map(([key, value]) => ({ category: key, value }));
  
    x.domain(categories.map(d => d.category));
    y.domain([0, d3.max(categories, d => d.value)]);
  
    g.selectAll(".axis.axis--x").data([null]).join("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  
    g.selectAll(".bar")
      .data(categories)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.category))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", "gray");
  
    g.selectAll(".bar-value")
      .data(categories)
      .join("text")
      .attr("class", "bar-value")
      .attr("x", d => x(d.category) + x.bandwidth() / 2)
      .attr("y", d => y(d.value) - 10)
      .text(d => d.value)
      .attr("text-anchor", "middle")
      .attr("fill", "black");
  }

  render() {
    return (
      <div>
        <svg className="child1_svg" ref={this.svgRef} width="960" height="500">
          <g className="g_1"></g>
        </svg>
      </div>
    );
  }
}

export default Child1;