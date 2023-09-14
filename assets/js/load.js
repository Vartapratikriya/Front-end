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

fetch(
  "https://vartapratikriya-api-rumbleftw.vercel.app/articles/top_keywords",
  {
    method: "GET",
  }
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const container = document.getElementById("top-keywords");
    const keyValuePairs = Object.entries(data.articles[0]);
    keyValuePairs.sort((a, b) => b[1] - a[1]);
    const sortedKeys = keyValuePairs.map((pair) => pair[0]);
    sortedKeys.forEach((keyword) => {
      const div = document.createElement("div");
      div.classList.add("mb-4", "cursor-pointer", "hover:bg-gray-700");

      const innerDiv = document.createElement("div");
      innerDiv.classList.add(
        "flex",
        "justify-between",
        "items-center",
        "px-4",
        "py-1",
        "opacity-70",
        "font-bold",
        "text-black"
      );
      const textNode = document.createTextNode(keyword);
      innerDiv.appendChild(textNode);
      innerDiv.style.fontSize = `${data.articles[0][keyword] * 2}px`;

      const arrowNode = document.createElement("i");
      arrowNode.classList.add("fa-solid", "fa-arrow-trend-down");
      arrowNode.setAttribute("style", "color: #ff4560;");
      innerDiv.appendChild(arrowNode);

      const hr = document.createElement("hr");
      hr.classList.add("border-[#000]", "border-opacity-100", "h-px");

      div.appendChild(innerDiv);
      div.appendChild(hr);

      container.appendChild(div);
    });
  });

// var url = 'https://vartapratikriya-api.vercel.app/config'
// fetch(url)
//   .then((resp) => resp.json())
//   .then(function(data){
//       // console.log('Data:',data)
//       var option = data
//       console.log(Object.keys(option.outlets))
//       console.log(Object.values(option.outlets))

//   })

fetch("https://vartapratikriya-api.vercel.app/config")
  .then((response) => response.json())
  .then((data) => {
    const outlets = Object.keys(data.outlets);
    document.querySelectorAll(".channel h3").forEach((h3, index) => {
      h3.textContent = outlets[index] || h3.textContent;
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
