import ns from 'imajs/client/core/namespace.js';
import component from 'imajs/client/core/component.js';

component.add((utils) => {

	ns.namespace('App.Component.TextInput');

	/**
	 * Feed input box for messaging.
	 * @class View
	 * @namespace App.Component.TextInput
	 * @module App
	 * @submodule Component
	 */
	class View extends React.Component {

		constructor(props) {
			super(props);

			this.state = {
				checkedCategory: this.getDefaultCategory(props)
			};
		}

		render() {
			var placeholder = utils.$Dictionary.get('home.placeHolder');
			var sendText = utils.$Dictionary.get('home.sendText');
			var radioCategories = this.getRadioCategories(
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
				var categories = categoryListEntity.getCategories();
				return categories.map((category, index) => {

					return (
						<div 
							className="radio-button" key={"radio-category-"+category.getId()} >
							<input 
									id={"radio" + category.getId()}
									type="radio"
									name="radio-categories"
									value={category.getId()}
									onChange={(e)=>this.setCheckedCategory(e)}
									defaultChecked={index==0?true:false} />
							<label htmlFor={"radio" + category.getId()}>
								{category.getName()}
							</label>
						</div>
					);
				});
			}

			return '';
		}
		
		sendText(e) {
			var text = this.refs.textInput.getDOMNode().value.trim();
			this.refs.textInput.getDOMNode().value = '';

			var category = this.state.checkedCategory;
			if (!category) {
				category = this.getDefaultCategory(this.props);
			}
			
			utils.$EventBus.fire(e.target, 'addItemToFeed', {
				content: text,
				category: category?Number(category.getId()):null
			});
		}

		getDefaultCategory(props) {
			if (props.currentCategory) {
				return props.currentCategory;
			}

			if (props.categories) {
				var categories = props.categories.getCategories();
				if (categories.length > 0) {
					return categories[0];
				}
			}

			return null;
		}

		setCheckedCategory(e) {
			var checkedCategoryId = e.currentTarget.value;
			var category = this.props.categories.getCategoryById(checkedCategoryId);
			this.setState({ checkedCategory: category });
		}

		sendTextByKeys(e) {
			e.stopPropagation();
			if (e.which == 13 || e.keyCode == 13) {
				e.preventDefault();
		        this.sendText(null, null);
		    }
		}
	}

	ns.App.Component.TextInput.View = View;
});
