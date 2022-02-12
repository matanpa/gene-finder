import express from 'express';
import { IPrefixesTree } from './dataStructures/PrefixesTree';
import { readGeneData } from './preprocessing';
import { GENE_PREFIX } from './consts';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const port = 3000;
let genes : IPrefixesTree;

readGeneData(process.env.DATA_FILE_PATH)
  .then(res=> {
    genes = res;
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  }).catch(e => console.error(e));

app.get('/genes/find/:gene', (req, res) => {
  const gene: string = req.params.gene;
  if (!gene.startsWith(GENE_PREFIX)) {
    res.status(400);
    res.send('Bad gene provided');
  }
  else {
    let searchableGene=gene.slice(GENE_PREFIX.length);
    if (genes.HasValue(searchableGene)) {
      res.status(200);
      res.send(`Found gene ${gene}`);
    }
    else {
      res.status(404);
      res.send(`Gene ${gene} not found`);
    }
  }
});
