import * as d3 from "d3";

const drawChart = (element, data) => {
  const colors = ["#573498", "#D38DDF"];
  const boxSize = 500;

  d3.select(element).select("svg").remove(); // Remove the old svg
  // Create new svg
  const svg = d3
    .select(element)
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    .append("g")
    .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);

    const arcGenerator = d3.arc().cornerRadius(10).padAngle(0.02).innerRadius(150).outerRadius(250);

  const pieGenerator = d3.pie().value((d) => d.value);

  const arcs = svg.selectAll().data(pieGenerator(data)).enter();
  arcs
  .append("path")
  .attr("d", arcGenerator)
  .style("fill", (d, i) => colors[i % data.length])
  .transition()
  .duration(700)
  .attrTween("d", function (d){
    const i = d3.interpolate(d.startAngle, d.endAngle);
    return function(t){
      d.endAngle = i(t);
      return arcGenerator(d)
    }
  })


  arcs
    .append("text")
    .attr("text-anchor", "middle")
    .text((d)=> `${d.data.value}%`)
    .style("fill", "#fff")
    .style("font-size", "30px")
    .attr("transform", (d)=>{
       const [x, y] = arcGenerator.centroid(d)
       return `translate(${x}, ${y})`
    })
    .style("font-size",0)
    .transition()
    .duration(700)
    .style("font-size", "26px")
};

export default drawChart;