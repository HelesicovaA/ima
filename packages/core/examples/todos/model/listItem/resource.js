import ns from 'imajs/client/core/namespace';

ns.namespace('App.Model.ListItem');

class Resource {
	constructor() {
		this._items = [
			{
				id: 1,
				title: 'Walk the dog',
				completed: false
			},
			{
				id: 2,
				title: 'Buy milk',
				completed: true
			},
			{
				id: 3,
				title: 'Defeat the Moonmen',
				completed: false
			},
			{
				id: 4,
				title: 'Reverse gravity',
				completed: false
			}
		];

		this._lastId = this._items.slice().pop().id;
	}

	getAll(completed) {
		if (completed === null) {
			return this._items;
		}

		return this._items.filter(item => item.completed === completed);
	}

	add(data) {
		data.id = ++this._lastId;
		this._items.push(data);

		return data.id;
	}

	update(id, data) {
		var index = this._findById(id);

		if (index > -1) {
			Object.assign(this._items[index], data);
		}
	}

	delete(id) {
		var index = this._findById(id);

		if (index > -1) {
			this._items.splice(index, 1);
		}
	}

	_findById(id) {
		var index = -1;

		this._items.some((item, itemIndex) => {
			if (item.id === id) {
				index = itemIndex;
				return true;
			}
		});

		return index;
	}
}

ns.App.Model.ListItem.Resource = Resource;
