const timetable = {
  5: [6, 17, 28, 37, 45, 52, 59],
  6: [8, 14, 19, 25, 30, 35, 40, 45, 50, 55, 59],
  7: [3, 7, 11, 15, 19, 23, 26, 30, 33, 37, 40, 43, 45, 48, 50, 52, 54, 56, 58],
  8: [0, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58],
  9: [0, 2, 4, 7, 9, 11, 13, 15, 17, 20, 22, 24, 26, 28, 30, 33, 35, 38, 40, 42, 45, 47, 50, 52, 55, 58],
  10: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58],
  11: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58],
  12: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58],
  13: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58],
  14: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58],
  15: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58],
  16: [1, 4, 6, 9, 12, 15, 18, 21, 24, 27, 30, 32, 35, 37, 39, 42, 44, 46, 48, 51, 53, 55, 57],
  17: [0, 2, 4, 6, 9, 11, 13, 15, 18, 20, 22, 24, 27, 29, 31, 33, 36, 38, 40, 42, 45, 47, 49, 51, 54, 56, 58],
  18: [0, 3, 5, 7, 9, 12, 14, 16, 18, 21, 23, 25, 27, 30, 32, 34, 36, 39, 41, 43, 45, 48, 50, 52, 54, 57, 59],
  19: [1, 4, 6, 9, 11, 14, 16, 19, 21, 24, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59],
  20: [2, 6, 9, 12, 16, 19, 22, 26, 29, 32, 36, 39, 42, 46, 49, 52, 55, 59],
  21: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 43, 47, 52, 56],
  22: [1, 5, 10, 14, 18, 23, 27, 31, 36, 40, 44, 49, 53, 57],
  23: [2, 6, 10, 14, 18, 23, 27, 32, 36, 40, 46, 51, 56],
  0: [2, 7, 13, 17]
}
function trainfo(timetable) {
  const now = new Date();
  const nowtrain = timetable[now.getHours() + 9].filter(v => v > now.getMinutes());
  const nextrain = timetable[now.getHours() + 10];
  if (!nowtrain && !nextrain) {
    return null;
  }
  if (nowtrain.length > 5) {
    return nowtrain.slice(0, 5).map(v => `${format(now.getHours() + 9)}:${format(v)}`);
  } else {
    const result = nowtrain.slice(0, 5).map(v => `${format(now.getHours() + 9)}:${format(v)}`);
    nextrain ? nextrain.slice(0, 5 - nowtrain.length).forEach(v => result.push(`${format(now.getHours() + 10)}:${format(v)}`)) : null;
    return result
  }
}
function format(str) {
  return `0${str}`.slice(-2)
}

module.exports = async robot => {
  robot.respond(/電車/i, (msg) => {
    const next = trainfo(timetable);
    if(!next) {
      msg.send("ないです");
      return;
    }
    msg.send(`${next.join("/")}`);
  });
};

