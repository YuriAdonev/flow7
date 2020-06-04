import React, {Component} from 'react';

import './table-select-child.scss';

class TableSelectChild extends Component {
  state = {
    selectedItem: '',
  };

  componentDidMount() {
    if (this.props.currentValue !== undefined) {
      if (this.props.currentValue === '' || this.props.currentValue === 0) {
        this.setState({selectedItem: ''});
      } else {
        const currentItem = this.props.selectList.find((item) => item.id == this.props.currentValue);
        this.setState({selectedItem: currentItem.attributes.name});
      }
    }
  }

  onItemClick = (value, id) => {
    this.setState({selectedItem: value});
    this.props.setItem(this.props.index, id, this.props.name, this.props.parent);
    this.props.setCurrentSelect('');
  };

  render() {
    const { name, placeholder, selectList, setCurrentSelect, currentSelectOpen } = this.props;

    const listItems = selectList.map((item) => {
      return (
        <li
          key={item.id}
          className={`table-select__item${this.state.selectedItem === item.attributes.name ? ' selected' : ''}`}
          onClick={() => this.onItemClick(item.attributes.name, this.props.name === 'unit_id' ? +item.id : item.id)}
        >{item.attributes.name}</li>
      )
    });

    return (
      <div className={`table-select${currentSelectOpen === this.props.parent + '-' + this.props.index + '-' + name ? ' active' : ''}`}>
        <span
          className="table-select__desc"
          onClick={() => setCurrentSelect(this.props.parent + '-' + this.props.index + '-' + name)}
        >
          <span
            className={`table-select__placeholder${this.state.selectedItem === '' ? '' : ' active'}`}
          >{this.state.selectedItem === '' ? placeholder : this.state.selectedItem}</span>
          <span className="table-select__drop">
            <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>
            </svg>
          </span>
          <ul className="table-select__list">
            {listItems}
          </ul>
        </span>
      </div>
    );
  }
}

export default TableSelectChild;
