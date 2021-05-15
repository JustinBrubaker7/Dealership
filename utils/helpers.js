const { User } = require("../models");

module.exports = {
  get_emoji: () => {
    const randomNum = Math.random();
    let book = "📗";

    if (randomNum > 0.7) {
      book = "📘";
    } else if (randomNum > 0.4) {
      book = "📙";
    }

    return `<span for="img" aria-label="book">${book}</span>`;
    // Comment
  },

  display_name: (reviewData, userData) => {
    let userName;

    console.log(userData);
    console.log(reviewData);

    for (i = 0; i < userData.length; i++) {
      if ((userData[i].id = reviewData)) {
        userName = userData[i].username;
      }
    }
    return userName;
  },
};
