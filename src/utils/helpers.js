export function sortByArrivalTime(a, b) {
  const x = parseInt(a.arrivalTime, 10);
  const y = parseInt(b.arrivalTime, 10);

  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

export function sortByArrivalTimeDesc(a, b) {
  const x = a.arrivalTime;
  const y = b.arrivalTime;

  return ((x > y) ? -1 : ((x < y) ? 1 : 0));
}

export function sortByArrivalTimeAsc(a, b) {
  const x = a.arrivalTime;
  const y = b.arrivalTime;

  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

export function sortByBurstTime(a, b) {
  const x = parseInt(a.burstTime, 10);
  const y = parseInt(b.burstTime, 10);

  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}
