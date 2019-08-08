function chart(method) {
  let res = null;
  if (method === "GET") {
    res = [20, 50, 10, 70, 40, 30];
  } else {
    res = null;
  }
  return res;
}

module.exports = chart;
