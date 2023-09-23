const urlParams = {};
const url = new URL(window.location.href);
const params = url.searchParams;
for (const [key, value] of params) {
  urlParams[key] = value;
}

fetch(
  "https://vartapratikriya-api.vercel.app/articles/sentiment?filter_by=language"
)
  .then((response) => response.json())
  .then((data) => {
    var chrt = document.getElementById("sentiment-chart").getContext("2d");
    var chartId = new Chart(chrt, {
      type: "bar",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Sentiment Index",
            data: Object.values(data),
            backgroundColor: [
              "lightblue",
              "aqua",
              "blue",
              "orange",
              "red",
              "lightgreen",
              "violet",
            ],
            borderColor: [
              "lightblue",
              "aqua",
              "blue",
              "orange",
              "red",
              "lightgreen",
              "violet",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  });

fetch("https://vartapratikriya-api.vercel.app/articles/categories")
  .then((response) => response.json())
  .then((data) => {
    const counts = {};
    data.articles.forEach((obj) => {
      const value = obj["category"];
      if (counts[value]) {
        counts[value]++;
      } else {
        counts[value] = 1;
      }
    });
    var chrt = document.getElementById("category-chart").getContext("2d");
    var chartId = new Chart(chrt, {
      type: "pie",
      data: {
        labels: Object.keys(counts),
        datasets: [
          {
            label: "online tutorial subjects",
            data: Object.values(counts),
            backgroundColor: [
              "lightblue",
              "aqua",
              "blue",
              "orange",
              "red",
              "lightgreen",
              "violet",
            ],
            hoverOffset: 5,
          },
        ],
      },
      options: {
        responsive: false,
      },
    });
  });

// JS file for the language page
fetch(
  `https://vartapratikriya-api-rumbleftw.vercel.app/articles/headlines?language=${urlParams["language"]}`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const container = document.getElementById("fact-check-list");
    data.articles.forEach((article) => {
      const listItem = document.createElement("li");
      listItem.className =
        "fact-check-item py-3 mb-2 flex flex-col lg:flex-row border-gray-800 border-b";

      const image = document.createElement("img");
      image.src = article.urlToImage;
      image.className =
        "w-96 object-cover rounded-lg flex-grow-0 flex-shrink-0 justify-center lg:w-[20%] lg:mr-4 h-28 rounded-lg";
      image.alt = "newsmobile.in";

      const contentContainer = document.createElement("div");
      contentContainer.className = "flex flex-col flex-grow";

      const heading = document.createElement("h3");
      heading.className = "text-sm font-semibold my-2 hover:text-[#FF4560]";
      const anchor = document.createElement("a");
      anchor.href = article.url;
      anchor.textContent = article.title;
      heading.appendChild(anchor);

      const claimDate = document.createElement("p");
      claimDate.className = "text-gray-800 text-xs mb-2";
      claimDate.textContent = `Published on: ${article.publishedAt}`;

      const claimant = document.createElement("p");
      claimant.className = "text-xs lg:text-[10px] mb-2";
      claimant.textContent = `Source: ${article.source.name}`;

      const rating = document.createElement("p");
      rating.className = "text-xs lg:text-sm display-font mb-2";
      rating.innerHTML = `<strong>Sentiment:</strong> ${
        article.sentiment.label.charAt(0).toUpperCase() +
        article.sentiment.label.slice(1)
      }<br>
      <strong>FactChecker:</strong>`;

      contentContainer.appendChild(heading);
      contentContainer.appendChild(claimDate);
      contentContainer.appendChild(claimant);
      contentContainer.appendChild(rating);
      listItem.appendChild(image);
      listItem.appendChild(contentContainer);

      container.appendChild(listItem);
    });
  });

// JS file for the category page
fetch(
  `https://vartapratikriya-api-rumbleftw.vercel.app/articles/categories?category=${urlParams["category"]}`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const container = document.getElementById("fact-check-list");
    data.articles.forEach((article) => {
      const listItem = document.createElement("li");
      listItem.className =
        "fact-check-item py-3 mb-2 flex flex-col lg:flex-row border-gray-800 border-b";

      const image = document.createElement("img");
      image.src = article.urlToImage;
      image.className =
        "w-96 object-cover rounded-lg flex-grow-0 flex-shrink-0 justify-center lg:w-[20%] lg:mr-4 h-28 rounded-lg";
      image.alt = "newsmobile.in";

      const contentContainer = document.createElement("div");
      contentContainer.className = "flex flex-col flex-grow";

      const heading = document.createElement("h3");
      heading.className = "text-sm font-semibold my-2 hover:text-[#FF4560]";
      const anchor = document.createElement("a");
      anchor.href = article.url;
      anchor.textContent = article.title;
      heading.appendChild(anchor);

      const claimDate = document.createElement("p");
      claimDate.className = "text-gray-800 text-xs mb-2";
      claimDate.textContent = `Published on: ${article.publishedAt}`;

      const claimant = document.createElement("p");
      claimant.className = "text-xs lg:text-[10px] mb-2";
      claimant.textContent = `Source: ${article.source.name}`;

      const rating = document.createElement("p");
      rating.className = "text-xs lg:text-sm display-font mb-2";
      rating.innerHTML = `<strong>Sentiment:</strong> ${
        article.sentiment.label.charAt(0).toUpperCase() +
        article.sentiment.label.slice(1)
      }<br>
      <strong>FactChecker:</strong> ${
        article.factChecker.label.charAt(0) +
        article.factChecker.label.slice(1).toLowerCase()
      }`;

      contentContainer.appendChild(heading);
      contentContainer.appendChild(claimDate);
      contentContainer.appendChild(claimant);
      contentContainer.appendChild(rating);

      listItem.appendChild(image);
      listItem.appendChild(contentContainer);

      container.appendChild(listItem);
    });
  });
