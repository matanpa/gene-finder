export interface IPrefixesTree {
    root?: IPrefixesTreeNode;
    HasValue(value: string): boolean;
}

export interface IPrefixesTreeNode {
    [key: string]: IPrefixesTreeNode 
}

export class PrefixesTree implements IPrefixesTree {
    root: IPrefixesTreeNode;

    constructor() {
        this.root = {};
    }

    HasValue(value: string): boolean {
        let currNode = this.root;
        for (let i = 0; i < value.length; i++) {
            if (currNode[value[i]] === undefined) {
                return false;
            }
            currNode = currNode[value[i]];
        }

        return true;
    }

}