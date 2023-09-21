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
          "language-block",
          'mx-1',
          'bg-gray-800',
          'rounded-lg',
          'items-center',
          'hover:bg-gray-600',
        );
        languageBlock.innerHTML = `
        <div class="swiper-slider p-0" style="flex: 1 0 auto;">
        <a href="language.html?language=${language}">
          <div class="filter overflow-hidden bg-[gray-300] flex items-center justify-center">
            <h4 class="title text-white">${language}</h4>
          </div>
          </a>
        </div>
        `;
        languageTitleContainer.appendChild(languageBlock);
      });

      $(languageTitleContainer).owlCarousel({
      items: 4, // Number of cards shown in each slide
      loop: true, // Enable looping
      autoplay: true, // Auto-play the carousel
      autoplayTimeout: 3000, // Time between slides in milliseconds (3 seconds in this example)
      responsive: {
        0: {
          items: 1, // Number of cards shown in the carousel for smaller screens
        },
        768: {
          items: 2, // Number of cards shown in the carousel for medium screens
        },
        992: {
          items: 4, // Number of cards shown in the carousel for large screens
        },
      },});
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
          'mx-1',
          'flex',
          'bg-gray-800',
          'rounded-lg',
          'items-center',
          'hover:bg-gray-600',
        );
        channelBlock.innerHTML = `
        <div class="p-2 lg:p-3">
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="flex items-center space-x-2 ">
          <img src="/assets/img/news.jpg" alt="News" class="lg:h-8 lg:w-8 h-8 w-8 object-cover">
          <h3 class=" leading-5 font-medium text-white flex text-[11px] whitespace-nowrap">${channel}</h3>
          <i class="fa-regular fa-circle-dot fa-beat-fade fa-xs" style="color: #f50000;"></i>
        </a>
      </div>

        `;
        channelTitleContainer.appendChild(channelBlock);
      });

      $(channelTitleContainer).owlCarousel({
      items: 4, // Number of cards shown in each slide
      loop: true, // Enable looping
      autoplay: true, // Auto-play the carousel
      autoplayTimeout: 3000, // Time between slides in milliseconds (3 seconds in this example)
      responsive: {
        0: {
          items: 1, // Number of cards shown in the carousel for smaller screens
        },
        768: {
          items: 2, // Number of cards shown in the carousel for medium screens
        },
        992: {
          items: 4, // Number of cards shown in the carousel for large screens
        },
      },});
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
