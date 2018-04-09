export const ALGORITHMS = {
  FCFS: 'first-come-first-served',
  SJF: 'shortest-job-first',
  RR: 'round-robin',
  PRIORITY: 'priority'
};

export const MAX_PROCESS_COUNT = 10;

export const STAGES = {
  READY: {
    key: 'ready',
    label: 'Ready',
    color: 'rgba(255, 255, 255, 0)'
  },
  WAITING: {
    key: 'waiting',
    label: 'Waiting',
    color: '#7a8ea2'
  },
  RUNNING: {
    key: 'running',
    label: 'Running',
    color: '#007bff'
  },
  TERMINATED: {
    key: 'terminated',
    label: 'Terminated',
    color: '#ff415a'
  }
};

