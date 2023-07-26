// Function to update the charts and display sample metadata based on the selected sample ID
function optionChanged(sampleId) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(function(data) {
        // Extract the data for the selected sample ID
        var samples = data.samples;
        var selectedSample = samples.filter(sample => sample.id === sampleId)[0];
  
        // Take the top 10 values, IDs, and labels for the bar chart
        var sampleValues = selectedSample.sample_values.slice(0, 10).reverse();
        var otuIds = selectedSample.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
        var otuLabels = selectedSample.otu_labels.slice(0, 10).reverse();
  
        // Create the bar chart
        var barTrace = {
          x: sampleValues,
          y: otuIds,
          text: otuLabels,
          type: "bar",
          orientation: "h"
        };
  
        var barLayout = {
          title: "Top 10 OTUs",
          xaxis: { title: "Sample Values" },
          yaxis: { title: "OTU IDs" }
        };
  
        Plotly.newPlot("bar", [barTrace], barLayout);
  
        // Retrieve the required data for the bubble chart
      var otuIdsBubble = selectedSample.otu_ids;
      var sampleValuesBubble = selectedSample.sample_values;
      var otuLabelsBubble = selectedSample.otu_labels;
  
      // Create the bubble chart
      var bubbleTrace = {
        x: otuIdsBubble,
        y: sampleValuesBubble,
        text: otuLabelsBubble,
        mode: 'markers',
        marker: {
          size: sampleValuesBubble,
          color: otuIdsBubble,
          colorscale: 'Earth'
        }
      };
  
      var bubbleLayout = {
        title: 'Samples',
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' }
      };
  
      Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);
  
  
      // Retrieve the metadata for the selected sample ID
      var metadata = data.metadata;
      var selectedMetadata = metadata.filter(meta => meta.id === parseInt(sampleId))[0];
  
      // Clear the existing metadata
      var metadataPanel = d3.select("#sample-metadata");
      metadataPanel.html("");
  
      // Display each key-value pair from the metadata JSON object
      Object.entries(selectedMetadata).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
      });
  
      // Update the gauge chart with the washing frequency
      var wfreq = selectedMetadata.wfreq;
      updateGaugeChart(wfreq);
    })
    .catch(function(error) {
      console.log("Error loading the JSON file:", error);
    });
        }