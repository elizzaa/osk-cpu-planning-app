export function sortByArrivalTime(a, b) {
  const x = a.arrivalTime;
  const y = b.arrivalTime;

  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

export function sortByArrivalTimeDesc(a, b) {
  const x = a.arrivalTime;
  const y = b.arrivalTime;

  return ((x > y) ? -1 : ((x < y) ? 1 : 0));
}