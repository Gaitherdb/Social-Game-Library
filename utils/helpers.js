module.exports = {
  // the helper method 'format_time' will take in a timestamp and return a string with only the time
  format_time: (date) => {
    // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  },
  //helper method 'star_rating' renders a certain amount of stars based on user input
  star_rating: (rating) => {
    star_amount = []  ;
    for (i=0; i < rating; i++){
      star_amount += `<img src="../images/star.png" class="star-sizing" alt="star rating">`
    }
    return star_amount;
  },
};
