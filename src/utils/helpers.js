export function sortByArrivalTime(a, b) {
  const x = parseInt(a.arrivalTime);
  const y = parseInt(b.arrivalTime);

  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

export function sortByArrivalTimeDesc(a, b) {
  const x = a.arrivalTime;
  const y = b.arrivalTime;

  return ((x > y) ? -1 : ((x < y) ? 1 : 0));
}

export function sortByBurstTime(a, b) {
  const x = parseInt(a.burstTime);
  const y = parseInt(b.burstTime);

  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}
