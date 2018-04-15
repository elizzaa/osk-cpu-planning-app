import { ALGORITHMS } from './constants';

export const EXAMPLE = {
  DEFAULT: [
    {
      id: 1,
      arrivalTime: 1,
      burstTime: 10,
      waitingTime: 10,
      processLength: 10,
      priority: 1,
      qValue: 10
    }, {
      id: 2,
      arrivalTime: 2,
      burstTime: 10,
      waitingTime: 10,
      processLength: 10,
      priority: 2,
      qValue: 10
    }, {
      id: 3,
      arrivalTime: 3,
      burstTime: 10,
      waitingTime: 10,
      processLength: 10,
      priority: 3,
      qValue: 10
    }
  ],
  [ALGORITHMS.FCFS]: [],
  [ALGORITHMS.SJF]: [],
  [ALGORITHMS.RR]: [],
  [ALGORITHMS.PRIORITY]: []
};