interface Props {
	id: number | string,
	parent: number | string,
	type?: string | null
}

class TreeStore {
	items: Array<Props>;
	constructor(items: Array<Props>) {
		this.items = items;
	}

	getAll(): Array<Props> {
		return this.items;
	}

	getItem(id: number | string): Props | undefined {
		return this.items.find(i => i.id === id);
	}

	getChildren(id: number | string): Array<Props> {
		return this.items.filter(i => i.parent === id);
	}

	getAllChildren(id: number | string): Array<Props> {
		const allChildren: Array<Props> = [];
		const currentArr: Array<Props> = this.getChildren(id);

		if (currentArr.length) {
			currentArr.forEach(i => {
				allChildren.push(i);
				this.getAllChildren(i.id).forEach(j => allChildren.push(j));
			});
		}

		return allChildren;
	}

	getAllParents(id: number | string): any {
		const allParents: Array<Props> = [];
		if (id) {
			let item: Props | undefined = this.getItem(id);
			if (item) {
				return item.parent ? [item, ...this.getAllParents(item.parent)] : false;
			}
		}
		return allParents;
	}
}

const items: Array<Props> = [
	{ id: 1, parent: 'root' },
	{ id: 2, parent: 1, type: 'test' },
	{ id: 3, parent: 1, type: 'test' },

	{ id: 4, parent: 2, type: 'test' },
	{ id: 5, parent: 2, type: 'test' },
	{ id: 6, parent: 2, type: 'test' },

	{ id: 7, parent: 4, type: null },
	{ id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);
