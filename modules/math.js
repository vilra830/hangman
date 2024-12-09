import data from "./example-words.json" with {type: "json"};
console.log(data, "data");


export const getRandomWord = () => {
  const i = Math.floor(Math.random() * data.length);

  return data[i];
};


