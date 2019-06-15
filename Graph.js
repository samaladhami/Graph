class Node {
    constructor(value) {
      this.value = value;
      this.edges = [];
      this.searched = false;
      this.parent = null;
    }
    
    addEdge(node) {
      if(!node) return;
      this.edges.push(node);
      node.edges.push(this);
    }
    removeEdge(node) {
      for (let i = 0; i < this.edges.length; i++) {
        if(this.edges[i].value === node.value) {
          this.edges.splice(i, 1);
          node.removeEdge(this)
        }
      }
    }
  }
  class Graph {
    constructor() {
      this.nodes = [];
      this.graph = {}
    }
    addNode(value) {
      if(this.graph[value]) return;
      let node = new Node(value);
      this.graph[value] = node
      this.nodes.push(node)
    }
    removeNode(node) {
      if(!node) return;
      if(this.graph[node.value]) {
        delete this.graph[node.value];
      }
      this.nodes.forEach((curNode, i) => {
        if(node.value === curNode.value) {
          this.nodes.splice(i, 1)
        }
      });
      this.nodes.forEach((curNode, i) => {
        curNode.edges.forEach((edge, j) => {
          if(edge.value === node.value) {
             curNode.edges.splice(j, 1)
          }
        })
        if(node.value === curNode.value) {
          this.nodes.splice(i, 1)
        }
      })
    }
    hasNode(node) {
      if(!node) return
      return !!this.graph[node.value]
    }
    reset() {
      this.nodes.forEach(node => {
        node.searched = false;
        node.parent = null;
      })
    }
    
    bFS(startFrom, lookFor) {
      this.reset();
      startFrom.searched = true;
      const queue = [startFrom];
      
      while(queue.length) {
        let currNode = queue.shift();
        if(currNode.value === lookFor.value) {
          return this.printPath(currNode)
        } else {
          currNode.edges.forEach(edge  => {
            if(!edge.searched) {
              edge.searched = true;
              edge.parent = currNode;
              queue.push(edge)
            }
          })
        }
      }
      return this.printPath();
    }
    
    printPath(node) {
      if(!node) return 'Infinity'
      if(!node.parent) {
        return `It is the same node`
      }
      let count = 0
      let currNode = node;
      let path = '';
      while(currNode.parent) {
        if(path) {
          path = `${currNode.value} --> ${path}`;
        } else {
          path = `${currNode.value}`;
        }
        currNode = currNode.parent;
        count++
      }
      return `${currNode.value} --> ${path} | ${count -1} nodes`;
    }
    
    dFS(startFrom, lookFor) {
      this.reset()
      const dfsCallBack = () => {
        const stack = [startFrom];
        let currNode = null;
        while(stack.length) {
          let parent = currNode
          currNode = stack.pop();
          if (!currNode.searched) {
            currNode.searched = true;
            currNode.parent = parent
            if(currNode.value === lookFor.value) {
              return this.printPath(currNode);
            }
            currNode.edges.forEach(edge => {
              stack.push(edge)
            })
          }
        }
        return this.printPath()
      }
      return dfsCallBack()
     }
  }
  
  let g = new Graph();
  
  g.addNode('poul');
  g.addNode('john');
  g.addNode('mena');
  g.addNode('elina');
  g.addNode('robert');
  g.addNode('jeff');
  g.addNode('jennifer');
  g.addNode('joe');
  g.addNode('mark');
  g.addNode('test');
  g.addNode('test2');
  g.addNode('zac');
  
  g.graph.poul.addEdge(g.graph.john);
  g.graph.john.addEdge(g.graph.mena);
  g.graph.mena.addEdge(g.graph.elina);
  g.graph.poul.addEdge(g.graph.robert);
  g.graph.john.addEdge(g.graph.jeff);
  g.graph.robert.addEdge(g.graph.jeff);
  g.graph.joe.addEdge(g.graph.jennifer);
  g.graph.mark.addEdge(g.graph.elina);
  g.graph.joe.addEdge(g.graph.Mena);
  g.graph.jennifer.addEdge(g.graph.mark);
  g.graph.jennifer.addEdge(g.graph.test);
  g.graph.zac.addEdge(g.graph.john);
  
  
  
  g.removeNode(g.graph.test);
  
  'DFS'
  g.bFS(g.graph.joe, g.graph.test2);
  g.bFS(g.graph.jennifer, g.graph.poul);
  g.bFS(g.graph.zac, g.graph.poul);
  g.bFS(g.graph.mena, g.graph.mena);
  '********************************************'
  'BFS'
  g.dFS(g.graph.robert, g.graph.zac);
  g.dFS(g.graph.joe, g.graph.elina);
  g.dFS(g.graph.jeff, g.graph.mark);
  g.dFS(g.graph.john, g.graph.jeff);
  g.graph.john.removeEdge(g.graph.jeff);
  'removeEdge'
  g.dFS(g.graph.john, g.graph.jeff);