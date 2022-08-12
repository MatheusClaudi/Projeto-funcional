import { Component, OnInit } from '@angular/core';
import { ICommit } from 'src/app/_dataModels/commit';
import { ICommitPath } from 'src/app/_dataModels/commitPath';
import { SharedStateService } from '../_services/shared-state.service';

class NodeData {
  id: string;
  label: string;
  url: string

  constructor(id: string, label: string, url: string) {
    this.id = id;
    this.label = label;
    this.url = url;
  }
}

class EdgeData {
  target: string;
  source: string;

  constructor(target: string, source: string) {
    this.target = target;
    this.source = source;
  }
}

@Component({
  selector: 'app-commits-graph',
  templateUrl: './commits-graph.component.html',
  styleUrls: ['./commits-graph.component.css']
})
export class CommitsGraphComponent implements OnInit {

  rawCommitData: any = [];
  nodes: any = [];
  edges: any = [];

  constructor(
    private stateService: SharedStateService
  ) {
    this.stateService.rawCommits.subscribe(
      (data) => {
        this.handleNewRawData(data)
      });
  }

  ngOnInit(): void {
    this.stateService.updateCurrentSection('Árvore de evolução de commits');
    this.stateService.getCommitsFromAPI();
  }

  handleNewRawData(data: Array<ICommit>) {
    this.rawCommitData = data;
    this.loadGraphData();
  }

  async loadGraphData() {
    this.nodes = this.getNodesFromRawCommits(this.rawCommitData);
    this.getEdgesFromRawCommits(this.rawCommitData, this.nodes)
      .then( edges => this.edges = edges);
  }

  getNodesFromRawCommits(rawCommits: Array<ICommit>) {
    return rawCommits
      .map((data: ICommit) => 
        new NodeData(data.sha, data.commit.author.name, data.url))
  }

  async getEdgesFromRawCommits(rawCommits: Array<ICommit>, nodes: Array<NodeData>) {
    return rawCommits
      .reduce(async (acc: any, data: ICommit) =>
        [ ...await acc, 
          ...this.getEdgesFromCommitParents(data.parents, data.sha, nodes)
        ], Promise.resolve([]))
  }

  getEdgesFromCommitParents(
    parents: Array<ICommitPath>,
    childrenSha: string,
    nodes: Array<NodeData>
  ) {
    let nodesSHA: Array<string> = nodes
      .map((data: any) => data.id);
    let parentsPresentInNodes = parents
      .filter((data: ICommitPath) => 
        nodesSHA.includes(data.sha));
    return parentsPresentInNodes
      .reduce((acc: Array<EdgeData>, data: ICommitPath) => 
          [...acc, new EdgeData(childrenSha, data.sha)],
        [])
  }
}
