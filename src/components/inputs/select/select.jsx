import React, {Component} from 'react';

import './select.scss';

class FormLabelSelect extends Component {
  state = {
    selectedItem: '',
  };

  onItemClick = (value) => {
    this.setState({selectedItem: value});
    this.props.setCurrentSelect('')
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
      <label className={`work-calendar-add-form__label form-label form-label--select${currentSelectOpen === name ? ' active' : ''}`}>
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
          <span
            className={`placeholder${this.state.selectedItem === '' ? '' : ' active'}`}
          >{this.state.selectedItem === '' ? placeholder : this.state.selectedItem}</span>
          <ul className="form-select">
            {listItems}
          </ul>
        </span>
      </label>
    );
  }
}

export default FormLabelSelect;
