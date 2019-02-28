import React, { Component } from 'react';
import { getItemById, getCategories, getToken } from './../../selectors';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
	fetchCategories,
	patchonServer,
	fetchItemByID,
	delItem,
} from './../../actions';
import * as R from 'ramda';
import Gallery from 'react-grid-gallery';
import InputMask from 'react-input-mask';
import Switch from '@material-ui/core/Switch';

class EditItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first: true,
			id: this.props.params.id,
			file: [],
			imagePreviewUrl: [],
			name: '',
			description: '',
			price: '',
			categoriesid: '',
			tel: '',
			email: '',
			checked: [],
		};

		this.patchonServer = this.props.patchonServer.bind(this);
		this.delItem = this.props.delItem.bind(this);
	}

	componentDidMount() {
		this.props.fetchItemByID(this.props.params.id);
		this.props.fetchCategories();
	}

	componentWillUpdate(nextProps) {
		if (this.state.first && nextProps.item !== undefined) {
			let st = [];
			if (nextProps.item.status) {
				st = ['statusTrue'];
			}
			this.setState({
				name: nextProps.item.name,
				description: nextProps.item.description,
				price: nextProps.item.price,
				categoriesid: nextProps.item.categoryId,
				tel: nextProps.item.tel,
				email: nextProps.item.email,
				checked: st,
				first: false,
			});
		}
	}

	handleImageChange(e) {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({
				file: this.state.file.concat(file),
				imagePreviewUrl: this.state.imagePreviewUrl.concat(reader.result),
			});
		};
		reader.readAsDataURL(file);
	}

	handleImageDell() {
		let arrfile = this.state.file;
		arrfile.pop();
		let arrimg = this.state.imagePreviewUrl;
		arrimg.pop();
		this.setState({ fiel: arrfile, imagePreviewUrl: arrimg });
	}

	handleChangeName(e) {
		this.setState({ name: e.target.value });
	}

	handleChangeDescription(e) {
		this.setState({ description: e.target.value });
	}

	handleChangePrice(e) {
		this.setState({ price: e.target.value });
	}

	handleChangeCategories(e) {
		this.setState({ categoriesid: e.target.value });
	}

	handleChangeEmail(e) {
		this.setState({ email: e.target.value });
	}

	handleSubmit(e) {
		const nItem = {
			id: this.props.params.id,
			name: this.state.name,
			description: this.state.description,
			price: this.state.price,
			categoryId: this.state.categoriesid,
			img: this.state.file,
			email: this.state.email,
			tel: this.state.tel,
			status: this.state.checked.indexOf('statusTrue') !== -1,
		};
		this.patchonServer(nItem, this.props.token);
		e.preventDefault();
		browserHistory.push('/check');
	}

	handleDellItem() {
		this.delItem(this.state.id, this.props.token);
		browserHistory.push('/check');
	}

	handleToggle = value => () => {
		const { checked } = this.state;
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({
			checked: newChecked,
		});
	};

	handleChangeTel(e) {
		this.setState({ tel: e.target.value });
	}

	render() {
		const IMAGES =
			R.not(R.isEmpty(this.state.imagePreviewUrl)) &&
			this.state.imagePreviewUrl.map(src => {
				return {
					src: src,
					thumbnail: src,
					thumbnailWidth: 320,
					thumbnailHeight: 174,
					isSelected: false,
					caption: '',
				};
			});

		return (
			<div className="view-container mt-5 pt-5 text-center">
				<div className="container">
					<div className="row">
						<h1>Редактирование объвления</h1>
						<form className="col-lg-12" onSubmit={e => this.handleSubmit(e)}>
							<div className="form-group row">
								
								
								<div className="col-md-6">
									<h5>Фото:</h5>

									<div className="previewComponent">
										{(Array.isArray(IMAGES) && IMAGES.length !== 0) &&
											(<Gallery images={IMAGES} enableImageSelection={false} />)}
									</div>

									<div className="btn-group btn-group-lg">
										<label className="btn btn-secondary">+
											<input
												className="fileInput"
												name="file"
												type="file"
												accept="image/*,image/jpeg"
												onChange={e => this.handleImageChange(e)}
											/>
										</label>
										<label className="btn btn-secondary">-
											<input
												className="fileDel"
												type="button"
												onClick={e => this.handleImageDell(e)}
											/>
										</label>
									</div>
								</div>

								<div className="col-md-6">
									<div className="form-group row mt-2">
										<label for="inputName" className="col-sm-2 col-form-label">Название</label>
										<div className="col-sm-10">
											<input
												type="text"
												className="form-control"
												onChange={e => this.handleChangeName(e)}
												id="inputName"
												value={this.state.name}
											/>
										</div>
									</div>

									<div className="form-group row mt-2">
										<label for="Description" className="col-sm-2 col-form-label">Описание</label>
										<div className="col-sm-10">
											<textarea
												className="form-control"
												rows="3"
												onChange={e => this.handleChangeDescription(e)}
												value={this.state.description}
											/>
										</div>
									</div>

									<div className="form-group row mt-2">
										<label for="inputPrice" className="col-sm-2 col-form-label">Цена</label>
										<div className="col-sm-10">
											<input
												type="number"
												className="form-control"
												id="inputPrice"
												onChange={e => this.handleChangePrice(e)}
												value={this.state.price}
											/>
										</div>
									</div>
									<div className="form-group row mt-2">
										<label for="inputEmail" className="col-sm-2 col-form-label">Email</label>
										<div className="col-sm-10">
											<input
												type="email"
												className="form-control"
												id="inputPrice"
												onChange={e => this.handleChangeEmail(e)}
												value={this.state.email}
											/>
										</div>
									</div>
									<div className="form-group row mt-2">
										<label for="phone" className="col-sm-2 col-form-label">Телефон</label>
										<div className="col-sm-10">

											<InputMask
												mask="+7 (999) 999-99-99"
												value={this.state.tel}
												onChange={e => this.handleChangeTel(e)}
											/>
										</div>
									</div>
									<div className="form-group row mt-2">
										<label for="select" className="col-sm-2 col-form-label">Категория</label>
										<div className="col-sm-10">
											<select
												className="form-control"
												onChange={e => this.handleChangeCategories(e)}
												value={this.state.categoriesid}
											>
												{this.props.categores.map(data => (
													<option key={data.id} value={data.id}>
														{data.name}
													</option>
												))}
											</select>
										</div>
									</div>

									<div className="form-group has-success">
										<label className="control-label" htmlFor="inputSuccess">
											Показывать объвление всем
                    </label>
										<Switch
											onChange={this.handleToggle('statusTrue')}
											checked={this.state.checked.indexOf('statusTrue') !== -1}
										/>
									</div>
									<button
										type="submit"
										className="btn btn-success  btn-lg btn-block"
										id="successAddItems"
									>
										Изменить
                  </button>
									<Link
										to="/adboard"
										id="backLink"
										className="btn btn-inverse btn-block btn-lg"
									>
										Назад
                  </Link>
									<p>Внимание удаление элемента безвозвратно!!!</p>
									<button
										type="button"
										className="btn btn-danger btn-block"
										id="Del_btn"
										onClick={() => this.handleDellItem()}
									>
										Удалить
                  </button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		item: getItemById(state, state.itemPage.id),
		categores: getCategories(state),
		token: getToken(state)
	};
};

const mapDispatchToProps = {
	fetchItemByID,
	fetchCategories,
	patchonServer,
	delItem,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditItem);
