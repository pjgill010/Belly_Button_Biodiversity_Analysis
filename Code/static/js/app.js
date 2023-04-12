const URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


function updateMenu() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    d3.json(URL).then(function(data) {
        console.log(data);
        names = data.names

        names.forEach((x)=>{
            dropdownMenu.append("option").text(x).property("value",x);
        })
        charts(names[0])
        table(names[0])
      });


  }

  function optionChanged(name) {
    charts(name)
    table(name)
  }

  function table(name) {
    let metadataTable = d3.select("#sample-metadata");
    metadataTable.html("")
    d3.json(URL).then(function(data) {
    samples = data.metadata
    sampleResults = samples.filter(x=>x.id==name)[0]

    Object.entries(sampleResults).forEach(entry => {
        const [key, value] = entry;
        metadataTable.append("h5").text(` ${key}: ${value}`)
        console.log(key, value);
      });
    });

  }

  function charts(name) {

    d3.json(URL).then(function(data) {
        console.log(data);
        samples = data.samples

       sampleResults = samples.filter(x=>x.id==name)[0]
       otu_ids= sampleResults.otu_ids

       sample_values= sampleResults.sample_values

       otu_labels= sampleResults.otu_labels

       var bar_data = [{
        type: 'bar',
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map((item) => `OTU ${item}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        orientation: 'h'
      }];

      var bar_layout = {
        title: 'Colored Bar Chart',
     
      };
      
      Plotly.newPlot('bar', bar_data, bar_layout);

      var bubble_data = [{
        x: otu_ids,
        y: sample_values,
        text:otu_labels,
        mode: 'markers',
        marker: {
          color:otu_ids,
          size: sample_values
        }
      }];
      
      
      var bubble_layout = {
        title: 'Marker Size and Color',
        
      };
      
      Plotly.newPlot('bubble', bubble_data, bubble_layout);

      });
  }

  updateMenu()