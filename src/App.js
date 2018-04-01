import React, { Component } from 'react';
import ProcessItem from './components/ProcessItem';
import ProcessInputForm from './components/ProcessInputForm';
import FCFSVisualization from './components/FCFSVisualization';
import SJFVisualization from './components/SJFVisualization';
import RRVisualization from './components/RRVisualization';
import PriorityVisualization from './components/PriorityVisualization';
import { ALGORITHMS, MAX_PROCESS_COUNT } from './constants';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      processes: [],
      algorithm: ALGORITHMS.FCFS
    };
  }

  /**
   * Set selected algorithm
   * @param algorithm
   */
  setAlgorithm = (algorithm) => {
    this.setState({
      algorithm
    });
  };

  /**
   * Add new process
   * @param process
   */
  addProcess = (process) => {
    let processes = this.state.processes.slice();

    processes.push(process);

    this.setState({
      processes
    })
  };

  /**
   * Delete existing process
   */
  deleteProcess = (processID) => {
    let processes = this.state.processes.slice();

    const index = processes.map(process => process.id).indexOf(processID);
    processes.splice(index, 1);

    this.setState({
      processes
    })
  };

  render() {
    const { processes, algorithm } = this.state;

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="jumbotron custom-jumbo">
            <h1 className="display-4">CPU plānošanas vizualizācija dažādiem plānošanas algoritmiem</h1>
          </div>

          {/*processes*/}
          <section className="md-vertical-space">
            <h1 className="display-4 border-bottom">Procesi</h1>

            {
              processes.map(process => (
                <ProcessItem
                  key={process.id}
                  process={process}
                  delete={this.deleteProcess.bind(this)}
                />
              ))
            }

            {
              (processes.length < MAX_PROCESS_COUNT) &&
              <ProcessInputForm
                processes={processes}
                algorithm={algorithm}
                addProcess={this.addProcess}
              />
            }

          </section>
          {/*end processes*/}

          {/*planing algorithms*/}
          <section className="lg-vertical-space">
            <h1 className="display-4 border-bottom">Algoritmi</h1>

            <ul className="nav nav-pills nav-justified nav-vertical-space" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="pills-fcfs-tab" onClick={() => this.setAlgorithm(ALGORITHMS.FCFS)} data-toggle="pill" href="#pills-fcfs" role="tab" aria-controls="pills-fcfs" aria-selected="true">First Come, First Served</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-sjf-tab" onClick={() => this.setAlgorithm(ALGORITHMS.SJF)} data-toggle="pill" href="#pills-sjf" role="tab" aria-controls="pills-sjf" aria-selected="false">Shortest Job First</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-rr-tab" onClick={() => this.setAlgorithm(ALGORITHMS.RR)} data-toggle="pill" href="#pills-rr" role="tab" aria-controls="pills-rr" aria-selected="false">Round Robin</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-p-tab" onClick={() => this.setAlgorithm(ALGORITHMS.PRIORITY)} data-toggle="pill" href="#pills-p" role="tab" aria-controls="pills-p" aria-selected="false">Priority</a>
              </li>
            </ul>

            <div className="tab-content vertical-space" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-fcfs" role="tabpanel" aria-labelledby="pills-fcfs-tab">
                <FCFSVisualization
                  processes={processes}
                />
              </div>

              <div className="tab-pane fade" id="pills-sjf" role="tabpanel" aria-labelledby="pills-sjf-tab">
                <SJFVisualization
                  processes={processes}
                />
              </div>

              <div className="tab-pane fade" id="pills-rr" role="tabpanel" aria-labelledby="pills-rr-tab">
                <RRVisualization
                  processes={processes}
                />
              </div>

              <div className="tab-pane fade" id="pills-p" role="tabpanel" aria-labelledby="pills-p-tab">
                <PriorityVisualization
                  processes={processes}
                />
              </div>
            </div>
          </section>
          {/*end planing algorithms*/}
        </div>
      </div>
    );
  }
}

export default App;
