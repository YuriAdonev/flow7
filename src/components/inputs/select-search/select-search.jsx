import React, {Component} from 'react';

import './select-search.scss';

class FormLabelSelectSearch extends Component {
  state = {
    selectedItem: '',
    searchValue: ''
  };

  onItemClick = (value) => {
    this.setState({selectedItem: value, searchValue: value});
    this.props.setCurrentSelect('');
  };

  handleChange = (value) => {
    this.setState({searchValue: value});
  };

  render() {
    const {name, desc, placeholder, selectList, setCurrentSelect, currentSelectOpen} = this.props;

    const listItems = selectList.map((item) => {
      return (
        <li
          key={item.name}
          className={`form-select__item${this.state.selectedItem === item.name ? ' selected' : ''}`}
          onClick={() => this.onItemClick(item.name)}
        >{item.name}</li>
      )
    });

    return (
      <label className={`work-calendar-add-form__label form-label form-label--select-search${currentSelectOpen === name ? ' active' : ''}`}>
        <span className="work-calendar-add-form__desc form-desc">{desc}</span>
        <span
          className="work-calendar-add-form__input form-input"
          onClick={() => setCurrentSelect(name)}
        >
          <span className="form-input__drop">
            <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Введите и выберите объект строильства"
            value={this.state.searchValue}
            onChange={(evt) => this.handleChange(evt.target.value)}
          />
          <ul className="form-select-search">
            {listItems}
          </ul>
        </span>
      </label>
    );
  }
}

export default FormLabelSelectSearch;
