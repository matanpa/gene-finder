# Gene-Finder

This is a playground exercise to find substrings within a long character sequence 

## Getting Started

### Installing & Running

* git clone
* npm install
* Modify .env file to include a path to the data set
* npm run prod
* Search for a certain gene within data, via http://localhost:3000/genes/find/<gene>

## Going Fwd

* Writing prefixes-tree to DB instead of running in-memory
* Splitting tree to partitions by prefixes and storing each separately
* Using map-reduce to process different portions of the data in a distributed manner