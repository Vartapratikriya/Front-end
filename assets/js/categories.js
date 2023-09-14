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
