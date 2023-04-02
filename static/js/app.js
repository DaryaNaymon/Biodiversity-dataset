const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Promise Pending
function init() {
    let bardata = [{
        x: [1,2,3,4,5] ,
        y: ["a", "b", "c", "d", "e"],
        type: "bar", orientation:"h"
      }];
      let bubbledata =[{
        x: [1,2,3,4,5],
        y: [1,2,3,4,5],
        mode: "markers", 
        marker: {
            size:[10,20,30,40,50],
            color:[100,200,300,400,500],
            colorscale:"Earth"
        }
        }]
        Plotly.newPlot("bubble",bubbledata);
    Plotly.newPlot("bar",bardata);
  }
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
d3.select("#selDataset").selectAll("myoptions").data(data["metadata"])
.enter().append("option").text(function (d){return d["id"];}).attr("value",function (d){return parseInt( d["id"]);})
d3.selectAll("#selDataset").on("change", updatePlotly);
    // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
          // Initialize x and y arrays
    let x = [];
    let y = [];
    let bubblex = [];
    let bubbley= [];
    let bubblesize=[];
    let bubblecolor=[];
    var location=0;
    console.log(dataset);
    console.log(data["samples"].length)
        for (let i=0;i <data["samples"].length;i++){
      if (parseInt(data["samples"][i]["id"])==dataset)
    location=i;
    }
    let demographics =d3.select("#sample-metadata");
    let id=dataset;
    let ethnicity=data["metadata"][location]["ethnicity"];
    let gender=data["metadata"][location]["gender"];
    let age=data["metadata"][location]["age"];
    let personlocation=data["metadata"][location]["location"];
    let bbtype=data["metadata"][location]["bbtype"];
    let wfreq=data["metadata"][location]["wfreq"];
    demographics.html("id:"+id+"<br>ethnicity:"+ethnicity+"<br>gender:"+gender+"<br>age:"+age+"<br>location:"+personlocation+"<br>bbtype:"+bbtype+"<br>wfreq:"+wfreq)
    console.log(location);
    for (let i=0; i<10;i++){
        x.push(data["samples"][location]["sample_values"][i]);
        y.push("OTU "+data["samples"][location]["otu_ids"][i]);
    }
    for (let i=0; i<data["samples"][location]["sample_values"].length;i++){
        bubbley.push(data["samples"][location]["sample_values"][i]);
        bubblex.push(data["samples"][location]["otu_ids"][i]);
        bubblesize.push(data["samples"][location]["sample_values"][i]);
        bubblecolor.push(data["samples"][location]["otu_ids"][i])
    }
    console.log(x);
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
    Plotly.restyle("bubble","x",[bubblex])
    Plotly.restyle("bubble","y",[bubbley])
    Plotly.restyle("bubble","marker.size",[bubblesize])
    Plotly.restyle("bubble","marker.color",[bubblecolor])
  }
   });
  
  init();
