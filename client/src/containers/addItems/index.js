import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCategories } from './../../selectors';
import { fetchCategories, sendAdToServer } from './../../actions';
import * as R from 'ramda';
import Gallery from 'react-grid-gallery';
import InputMask from 'react-input-mask';
import './style.css';
import { browserHistory } from 'react-router';

class AddItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: [],
			imagePreviewUrl: [],
			name: '',
			description: '',
			price: '',
			categoriesid: '',
			tel: '',
			email: '',
		};
		this.sendAdToServer = this.props.sendAdToServer.bind(this);
	}

	componentDidMount() {
		this.props.fetchCategories();
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
		e.preventDefault();

		const {
			name,
			description,
			price,
			categoriesid,
			file,
			email,
			tel
		} = this.state;

		if (name && description && categoriesid) {

			const nItem = {
				name: name,
				description: description,
				price: price,
				categoryId: categoriesid,
				img: file,
				email: email,
				tel: tel,
			};
			this.sendAdToServer(nItem);
			browserHistory.push('/adboard');
		} else {
			alert('Не заполненны основные поля!')
		}
	}

	handleChangeTel(e) {
		this.setState({ tel: e.target.value });
	}

	render() {

		const IMAGES = R.not(R.isEmpty(this.state.imagePreviewUrl)) &&
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
			<div className="container mt-5 pt-5 text-center">
				<h1>Добавление нового объявления</h1>
			
        <div className="row add_item_container">
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
									<h5>Заполните данными форму:</h5>
								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<span className="input-group-text">Название</span>
									</div>
									<input
										type="text"
										className="form-control"
										onChange={e => this.handleChangeName(e)}
										id="inputName"
									/>
								</div>

								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<span className="input-group-text">Описание</span>
									</div>
									<textarea
										className="form-control"
										rows="3"
										onChange={e => this.handleChangeDescription(e)}
									/>
								</div>

								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<span className="input-group-text">Цена</span>
									</div>
									<input
										type="number"
										className="form-control"
										id="inputPrice"
										onChange={e => this.handleChangePrice(e)}
									/>
								</div>

								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<span className="input-group-text">E-mail</span>
									</div>
									<input
										type="email"
										className="form-control"
										id="inputPrice"
										onChange={e => this.handleChangeEmail(e)}
									/>
								</div>

								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<span className="input-group-text">Телефон</span>
									</div>

									<InputMask
										mask="+7 (999) 999-99-99"
										value={this.state.tel}
										onChange={e => this.handleChangeTel(e)}
										className="form-control"
									/>
								</div>
								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<span className="input-group-text">Категория</span>
									</div>
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
								<button
									type="submit"
									className="btn btn-success  btn-lg btn-block"
									id="successAddItems"
								>
									Добавить в базу
                </button>
								<Link
									to="/adboard"
									id="backLink"
									className="btn btn-inverse btn-block btn-lg"
								>
									Назад
                </Link>
							</div>


						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	categores: getCategories(state),
});

const mapDispatchToProps = {
	sendAdToServer,
	fetchCategories,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddItems);
