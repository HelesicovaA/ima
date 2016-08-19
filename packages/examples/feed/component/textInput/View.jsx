import ns from 'ima/namespace';
import AbstractComponent from 'ima/page/AbstractComponent';
import React from 'react';

ns.namespace('app.component.textInput');

/**
 * Feed input box for messaging.
 * @class View
 * @extends ima.page.AbstractComponent
 * @namespace app.component.textInput
 * @module app
 * @submodule app.component
 */
class View extends AbstractComponent {

	constructor(props) {
		super(props);

		this.state = {
			checkedCategory: this.getDefaultCategory(props)
		};
	}

	render() {
		let placeholder = this.utils.$Dictionary.get('home.placeHolder');
		let sendText = this.utils.$Dictionary.get('home.sendText');
		let radioCategories = this.getRadioCategories(
				this.props.categories, this.props.currentCategory);

		return (
			<div className="text-input">
				<input
						type="text"
						ref="textInput"
						className="form-text-input"
						placeholder={placeholder}
						onKeyPress={(e)=>this.sendTextByKeys(e)} />
				<button
						className="form-button"
						onClick={(e)=>this.sendText(e)} >
					{sendText}
				</button>
				<div className="form-categories" ref="categories">
					{radioCategories}
				</div>
			</div>
		);
	}

	getRadioCategories(categoryListEntity, currentCategory) {
		if (currentCategory) {
			return '';
		}

		if (categoryListEntity) {
			let categories = categoryListEntity.getCategories();
			return categories.map((category, index) => {
				return (
					<div
						className="radio-button" key={'radio-category-' + category.getId()} >
						<input
								id={'radio' + category.getId()}
								type='radio'
								name='radio-categories'
								defaultValue={category.getId()}
								onChange={(e)=>this.setCheckedCategory(e)}
								defaultChecked={index === 0 ? true : false} />
						<label htmlFor={'radio' + category.getId()}>
							{category.getName()}
						</label>
					</div>
				);
			});
		}

		return '';
	}

	sendText(e) {
		let text = this.refs.textInput.value.trim();
		this.refs.textInput.value = '';

		let category = this.state.checkedCategory;
		if (!category) {
			category = this.getDefaultCategory(this.props);
		}

		this.utils.$EventBus.fire(e.target, 'addItemToFeed', {
			content: text,
			category: category ? Number(category.getId()) : null
		});
	}

	getDefaultCategory(props) {
		if (props.currentCategory) {
			return props.currentCategory;
		}

		if (props.categories) {
			let categories = props.categories.getCategories();
			if (categories.length > 0) {
				return categories[0];
			}
		}

		return null;
	}

	setCheckedCategory(e) {
		let checkedCategoryId = parseInt(e.currentTarget.value, 10);
		let category = this.props.categories.getCategoryById(checkedCategoryId);
		this.setState({ checkedCategory: category });
	}

	sendTextByKeys(e) {
		e.stopPropagation();
		if (e.which === 13 || e.keyCode === 13) {
			e.preventDefault();
			this.sendText(e);
		}
	}
}

ns.app.component.textInput.View = View;
