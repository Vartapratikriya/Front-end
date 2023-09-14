fetch("https://vartapratikriya-api.vercel.app/config")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const titleElements = document.querySelectorAll(".department .title");

    titleElements.forEach((element, index) => {
      const category = data.categories[index];
      const capitalizedCategory =
        category.charAt(0).toUpperCase() + category.slice(1);
      element.querySelector("a").textContent = capitalizedCategory;
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });


fetch("https://vartapratikriya-api.vercel.app/articles/top_keywords", {
    method: 'GET',
  }).then((response)=>{
          return response.json();
      }).then((data)=>{
        const keyValuePairs = Object.entries(data.articles[0]);
        keyValuePairs.sort((a, b) => b[1] - a[1]);
        const vals = [];
        const sortedKeys = keyValuePairs.map(pair => pair[0]).slice(0, 5);

        for (const key of sortedKeys) {
          vals.push(data.articles[0][key]);
        }
          var chrt = document.getElementById("trending-chart").getContext("2d");
          const container = document.getElementById('top-keywords');
          var chartId = new Chart(chrt, {
            type: 'doughnut',
            data: {
               labels: sortedKeys,
               datasets: [{
               label: "online tutorial subjects",
               data: vals,
               backgroundColor: ['blue', 'orange', 'red', 'lightgreen', 'violet'],
               hoverOffset: 5
               }],
            },
            options: {
               responsive: false,
            },
         });
          sortedKeys.forEach(keyword => {
              const div = document.createElement('div');
              div.classList.add('mb-4', 'cursor-pointer', 'hover:bg-gray-400');

              const innerDiv = document.createElement('div');
              innerDiv.classList.add('flex', 'justify-between', 'items-center', 'px-4', 'py-1', 'opacity-70', 'font-bold', 'text-black');
              const textNode = document.createTextNode(keyword);
              innerDiv.appendChild(textNode);
              innerDiv.style.fontSize = `${data.articles[0][keyword]*2}px`;

              const arrowNode = document.createElement('i');
              arrowNode.classList.add('fa-solid', 'fa-arrow-trend-down');
              arrowNode.setAttribute('style', 'color: #ff4560;');
              innerDiv.appendChild(arrowNode);

              const hr = document.createElement('hr');
              hr.classList.add('border-[#000]', 'border-opacity-100', 'h-px');

              div.appendChild(innerDiv);
              div.appendChild(hr);

              container.appendChild(div);
    });
});
