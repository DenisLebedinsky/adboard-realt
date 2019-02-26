import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../../components/categoryForm'
import CategoryItem from '../../components/categoryItem'
import {
	addCategory,
	deleteCategory,
	updateCategory,
	fetchCategories
} from './../../actions'
import { getCategories, getToken } from "../../selectors";

class EditCategory extends PureComponent {

	static getDerivedStateFromProps({ items }, { prevOriginalItems }) {

		if (items !== prevOriginalItems) {
			return {
				prevOriginalItems: items,
				items
			};
		}

		return null;
	}

	constructor(props) {
		super(props);

		const { items } = this.props;

		this.state = {
			items: items,
			prevOriginalItems: items
		}

		this.onAdd = this.onAdd.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	onAdd(value) {

		const id = String(Date.now());
		const { token } = this.props;

		this.props.addCategory({ id: id, name: value }, token);

		let newItems = this.state.items.slice()
		newItems.push({id:id, name:value})

		this.setState({items:newItems})
	}

	onSave(id, value) {

		const { token } = this.props;
		const name = value;
		this.props.updateCategory({ id, name }, token);
	}

	onDelete(id) {

		const { token } = this.props;
		const { items } = this.state;

 		this.props.deleteCategory(id, token);

		let newItems = items.slice();
		newItems.splice(newItems.findIndex(e => e.id === id), 1)
		this.setState({ items: newItems })
	}

	componentDidMount() {

		const { items } = this.props;

		if (items && items.length === 0) {
			this.props.fetchCategories();
		}
	}

	render() {

		const { items } = this.state;

		return (
			<div className="d-flex flex-column justify-content-center mt-4">
				<div className="col-md-6">
					<h2>Категории</h2>
					<CategoryForm onAdd={this.onAdd} />
					{items && items.map(item => {
						return (
							<CategoryItem
								key={item.id}
								item={item}
								onSave={this.onSave}
								onDelete={this.onDelete}
							/>)
					}
					)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		items: getCategories(state),
		token: getToken(state)
	}
};
const mapDispatchToProps = {
	addCategory,
	deleteCategory,
	updateCategory,
	fetchCategories
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditCategory)
