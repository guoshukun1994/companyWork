export function timestampToTime(timestamp = "") {
  var time;
  if (timestamp == "" || timestamp == null) {
    return "";
  } else {
    time = new Date(timestamp * 1000);
  }
  var year = time.getFullYear();
  var month =
    time.getMonth() + 1 < 10
      ? "0" + (time.getMonth() + 1)
      : time.getMonth() + 1;
  var date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  var hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  var minutes =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  var secounds =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  return (
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    secounds
  );
}
