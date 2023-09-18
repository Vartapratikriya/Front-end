fetch("https://vartapratikriya-api.vercel.app/config")
  .then((response) => response.json())
  .then((data) => {
    const titleElements = document.querySelectorAll(".department .title");

    titleElements.forEach((element, index) => {
      const category = data.categories[index];
      const capitalizedCategory =
        category.charAt(0).toUpperCase() + category.slice(1);

      // Create an <a> element with the appropriate href attribute
      const categoryLink = document.createElement("a");
      categoryLink.textContent = capitalizedCategory;
      categoryLink.href = `language.html?category=${category.toLowerCase()}`;

      element.innerHTML = ""; // Clear the existing content
      element.appendChild(categoryLink);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

fetch("https://vartapratikriya-api.vercel.app/articles/top_keywords", {
  method: "GET",
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const keyValuePairs = Object.entries(data.articles[0]);
    keyValuePairs.sort((a, b) => b[1] - a[1]);
    const vals = [];
    const sortedKeys = keyValuePairs.map((pair) => pair[0]).slice(0, 5);

    for (const key of sortedKeys) {
      vals.push(data.articles[0][key]);
    }
    var chrt = document.getElementById("trending-chart").getContext("2d");
    const container = document.getElementById("top-keywords");
    var chartId = new Chart(chrt, {
      type: "doughnut",
      data: {
        labels: sortedKeys,
        datasets: [
          {
            label: "online tutorial subjects",
            data: vals,
            backgroundColor: ["blue", "orange", "red", "lightgreen", "violet"],
            hoverOffset: 5,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
    sortedKeys.forEach((keyword) => {
      const div = document.createElement("div");
      div.classList.add("mb-4", "cursor-pointer", "hover:bg-gray-400");

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
      arrowNode.classList.add("fa-solid", "fa-arrow-trend-up");
      arrowNode.setAttribute("style", "color: #4560ff;");
      innerDiv.appendChild(arrowNode);

      const hr = document.createElement("hr");
      hr.classList.add("border-[#000]", "border-opacity-100", "h-px");

      div.appendChild(innerDiv);
      div.appendChild(hr);

      container.appendChild(div);
    });
  });

fetch("https://vartapratikriya-api.vercel.app/config")
  .then((response) => response.json())
  .then((data) => {
    const languages = Object.keys(data.outlets);
    const languageTitleContainer = document.getElementById("language_title");

    if (languageTitleContainer) {
      languages.forEach((language) => {
        const languageBlock = document.createElement("div");
        languageBlock.classList.add(
          "d-flex",
          "align-items-stretch",
          "p-2",
          "language-block"
        );
        languageBlock.innerHTML = `
          <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
            <h4 class="title"><a href="language.html?language=${language}">${language}</a></h4>
          </div>
        `;
        languageTitleContainer.appendChild(languageBlock);
      });

      $(languageTitleContainer).owlCarousel({});
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

fetch("https://vartapratikriya-api.vercel.app/config")
  .then((response) => response.json())
  .then((data) => {
    const channels = Object.values(data.outlets);
    const channelTitleContainer = document.getElementById("channel_title");

    if (channelTitleContainer) {
      channels.forEach((channel) => {
        const channelBlock = document.createElement("div");
        channelBlock.classList.add(
          "d-flex",
          "align-items-stretch",
          "p-2",
          "language-block"
        );
        channelBlock.innerHTML = `
          <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
            <h4 class="title"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">${channel}</a></h4>
          </div>
        `;
        channelTitleContainer.appendChild(channelBlock);
      });

      $(channelTitleContainer).owlCarousel({});
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
