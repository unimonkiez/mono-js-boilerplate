export const snooz = snoozeFor => new Promise((res) => {
  setTimeout(res, snoozeFor);
});
