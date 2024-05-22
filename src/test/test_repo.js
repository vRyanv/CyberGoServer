const rating_list = [
  {
    start: 5,
    user: "khang",
  },
  {
    start: 1,
    user: "triet",
  },
  {
    start: 3,
    user: "kien",
  },
];

const total_star = rating_list.reduce((accumulator, curVal) => {
    console.log(accumulator)
  return accumulator + curVal.start;
});

console.log(total_star)
