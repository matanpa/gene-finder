import * as fs from 'fs';
import { IPrefixesTree, PrefixesTree, IPrefixesTreeNode } from './dataStructures/PrefixesTree';
import { GENE_PREFIX } from './consts';

export function readGeneData(filePath: string | undefined) : Promise<IPrefixesTree> {
  if (filePath === undefined) { 
    throw new Error("DATA_FILE_PATH should be defined in .env");
  }

  return new Promise<IPrefixesTree>((res)=> {
      const tree: IPrefixesTree = new PrefixesTree();
      const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
      let streamStr = "";
      let isFirst = true;
    
      readStream.on('error', (error: Error) => {
          console.error(`error: ${error.message}`);
      })
    
      readStream.on('data', (chunk: string) => {
        console.log(`chunk received: ${chunk}`);
          streamStr += chunk;
          let genes = streamStr.split(GENE_PREFIX);
    
          while (genes.length > 1) {
            if (isFirst) {
              // ignore the sequence that preceded the first prefix
              isFirst = false;
            }
            else {
              AddGene(genes[0], tree.root!);
            }
            genes.splice(0, 1);
          }
    
          streamStr = genes.join('');
      });
      
      readStream.on('end', (chunk: string) => {
        if (!isFirst) {
          AddGene(streamStr, tree.root!);
        }
        console.log('end of file');
        res(tree);
      });

    });
  }
  
  function AddGene(gene: string, root: IPrefixesTreeNode): void {
    console.log(`Added ${gene}`);
    let currNode: IPrefixesTreeNode = root;
    for (let i=0; i < gene.length; i++) {
      if (!currNode[gene[i]]) {
        currNode[gene[i]] = {};
      }
      currNode = currNode[gene[i]];
    }
  }
  