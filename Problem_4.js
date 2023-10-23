// 初始化数据
let generator = d3.randomUniform(0, 100);
let bar_ages = d3.range(10).map((d, i) => ({ id: i, age: d, height: generator() }));
    
// 创建初始条形图
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
    
// 更新数据的函数
function update_data() {
  // 移除最旧的数据
  bar_ages.shift();
      
  // 添加新的数据
  let newAge = d3.max(bar_ages, d => d.age) + 1;
  let newHeight = generator();
  bar_ages.push({ id: bar_ages.length, age: newAge, height: newHeight });
      
  // 更新可视化
  const bars = svg.selectAll("rect")
    .data(bar_ages, d => d.id);
      
  // 退出旧数据
  bars.exit()
    .transition()
    .duration(1000)
    .attr("width", 0)
    .remove();
      
  // 进入新数据
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
      
  // 更新现有数据
  bars.transition()
    .duration(1000)
    .attr("x", (d, i) => i * barWidth)
    .attr("y", d => 200 - d.height)
    .attr("width", barWidth)
    .attr("height", d => d.height);
}
    
// 绑定按钮点击事件
d3.select("#updateButton").on("click", update_data);