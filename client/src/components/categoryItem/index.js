import React, { PureComponent } from 'react';

class CategoryItem extends PureComponent {

	static getDerivedStateFromProps(item, prevOriginalValue) {

		if (item.name !== prevOriginalValue) {
			return {
				originalValue: item.name,
				item
			};
		}

		return null;
	}


	constructor(props) {
		super(props);

		const name = this.props.item.name ? this.props.item.name : '';

		this.state = {
			name: name
		};

		this.onSave = this.onSave.bind(this);
		this.changeValue = this.changeValue.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}


	onSave() {

		const { onSave, item } = this.props;
		const { name } = this.state;
		const id = item.id;

		if (typeof onSave === 'function') {
			onSave(id, name);
		}
	}

	onDelete() {

		const { onDelete, item } = this.props;

		if (typeof onDelete === 'function') {
			const id = item.id;
			onDelete(id)
		}
	}

	changeValue(e) {

		const newValue = e.target.value;

		this.setState({ name: newValue })
	}

	render() {

		const { name } = this.state;

		return (
			<div className="input-group mb-3">
				<input value={name} onChange={this.changeValue} className="form-control" />
				<div className="input-group-append">
					<button className="input-group-text" onClick={this.onSave}>Сохранить</button>
					<button className="input-group-text" onClick={this.onDelete}>Удалить</button>
				</div>
			</div>
		)
	}

}

export default CategoryItem;
