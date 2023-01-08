function getData() {
    // Create an XMLHttpRequest object
    var http = new XMLHttpRequest();

    // Set the API endpoint URL
    var url = "https://my.api.mockaroo.com/countries.json?key=a5f11d90";

    // Open a connection to the API
    http.open("GET", url);

    // Send the request
    http.send();

    // Wait for the response
    http.onreadystatechange = function () {
      // If the request is complete and the status is "OK"
      if (http.readyState == 4 && http.status == 200) {
        // Get the data from the API response and parse it as a JSON object
        const data = JSON.parse(http.responseText);

        // Create a table to display the data
        var table = '<table class="table table-dark" border="1">';
        table +=
          '<tr><th scope="col">Country</th><th scope="col">Population</th><th scope="col">Avarage Life Expectancy</th><th scope="col">Human Capital Index</th><th scope="col">CO2 Emissions</th><th scope="col">Access to Electricity</th><th scope="col">Forest Area (%)</th><th scope="col">Avarage Temperature</th></tr>';

        // Loop through the data and add a row for each item
        for (var i = 0; i < data.length; i++) {
          table += "<tr>";
          table += "<td>" + data[i].Country + "</td>";
          table += "<td>" + data[i].Population + "</td>";
          table += "<td>" + data[i].Avarage_life_expancy + "</td>";
          table += "<td>" + data[i].Human_capital_index + "</td>";
          table += "<td>" + data[i].CO2_emissions + "</td>";
          table += "<td>" + (data[i].Access_to_electricity ? "Yes":"No") + "</td>";
          table += "<td>" + data[i].Forest_area_percent + "</td>";
          table += "<td>" + data[i].Avarage_temperature + "</td>";
          table += "</tr>";
        }

        table += "</table>";

        // Use the innerHTML property to display the table on the page
        document.getElementById("data").innerHTML = table;

        //Chart.js
        const ctxDougnut = document.getElementById('doughnutChart');
        const ctxBar = document.getElementById('barChart');

        //Data for doughnut chart
        let countriesWithAccess=0
        let countriesWithoutAccess=0

        for (var i = 0; i < data.length; i++)
        {
            if(data[i].Access_to_electricity)
            {
                countriesWithAccess++;
            }
            else
            {
                countriesWithoutAccess++;
            }
        }
        //Doghnut chart
        new Chart(ctxDougnut, {
            type: 'doughnut',
            data: {
                labels: ['Access '+countriesWithAccess,'No access '+countriesWithoutAccess],
                datasets: [{
                    label: ['Access','No access'],
                    data: [countriesWithAccess,countriesWithoutAccess],
                    borderWidth: 1,
                    backgroundColor: [
                        'lightblue',
                        'grey',
                      ],
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Ratio between access and no access to electricity'
                    }
                }
            }
        });
        //Data for bar chart
        countries=[];
        for (var i = 0; i < data.length; i++)
        {
            countries[i]=data[i].Country;
        }
        countriesPopulation=[];
        for (var i = 0; i < data.length; i++)
        {
            countriesPopulation[i]=data[i].Population;
        }
        //Bar chart
        new Chart(ctxBar, {
            type: 'bar',
            
            data: {
                labels: countries,
                datasets: [{
                    label: [],
                    data: countriesPopulation,
                    borderWidth: 1,
                    backgroundColor: [ 'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(255, 205, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(201, 203, 207, 0.8)']
                }]
            },
            options: {
                responsive:true,
            maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Population in each countries'
                    },
                    scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                }
            }
        });
        





        }
    };
    
}

  // Call the getData function when the page loads
  window.onload = getData;

  