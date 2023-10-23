let generator = d3.randomUniform(0, 100);
let bar_ages = d3.range(10).map((d, i) => ({ id: i, age: d, height: generator() }));
    
const svg = d3.select("svg");
const barWidth = 30;
    
svg.selectAll("rect")
   .data(bar_ages, d => d.id)
   .enter()
   .append("rect")
   .attr("x", (d, i) => i * barWidth)
   .attr("y", d => 200 - d.height)
   .attr("width", barWidth)
   .attr("height", d => d.height)
   .attr("fill", "blue");
    
function update_data() {
  bar_ages.shift();
      
  let newAge = d3.max(bar_ages, d => d.age) + 1;
  let newHeight = generator();
  bar_ages.push({ id: bar_ages.length, age: newAge, height: newHeight });
      
  const bars = svg.selectAll("rect")
    .data(bar_ages, d => d.id);
      
  bars.exit()
    .transition()
    .duration(1000)
    .attr("width", 0)
    .remove();
      
  bars.enter()
    .append("rect")
    .attr("x", (d, i) => i * barWidth)
    .attr("y", d => 200 - d.height)
    .attr("width", barWidth)
    .attr("height", d => d.height)
    .attr("fill", "blue")
    .attr("width", 0)
    .transition()
    .duration(1000)
    .attr("width", barWidth);
      
  bars.transition()
    .duration(1000)
    .attr("x", (d, i) => i * barWidth)
    .attr("y", d => 200 - d.height)
    .attr("width", barWidth)
    .attr("height", d => d.height);
}
    
d3.select("#updateButton").on("click", update_data);
