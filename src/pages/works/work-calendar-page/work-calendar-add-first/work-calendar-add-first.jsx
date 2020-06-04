import React, {Component} from 'react';

import './work-calendar-add-first.scss';

import FormLabelSelect from '../../../../components/inputs/select/select';
import FormLabelSelectSearch from '../../../../components/inputs/select-search/select-search';

class WorkCalendarAddFirst extends Component {
  state = {
    currentSelectOpen: ''
  };

  setCurrentSelect = (name) => {
    if (this.state.currentSelectOpen === name) {
      this.setState({currentSelectOpen: ''})
    } else {
      this.setState({currentSelectOpen: name})
    }
  };

  render() {
    return (
      <div className="work-calendar-add-content__item">
        <div className="work-calendar-add-form">
          <FormLabelSelect
            name="work"
            desc="Выполняемые работы:"
            placeholder="Выберите выполняемые работ"
            selectList={[
              {
                name: 'Работа 1',
                value: ''
              },
              {
                name: 'Работа 2',
                value: ''
              },
              {
                name: 'Работа 3',
                value: ''
              },
            ]}
            currentSelectOpen={this.state.currentSelectOpen}
            setCurrentSelect={this.setCurrentSelect}
          />
          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Дата выполнения работ:</span>
            <span className="work-calendar-add-form__input form-input">
              <input type="text" placeholder="Дата выполнения"/>
            </span>
          </label>
          <FormLabelSelectSearch
            name="constructionObject"
            desc="Объект строительства:"
            placeholder="Выберите выполняемые работ"
            selectList={[
              {
                name: 'Объект 1',
                value: ''
              },
              {
                name: 'Объект 2',
                value: ''
              },
              {
                name: 'Объект 3',
                value: ''
              },
            ]}
            currentSelectOpen={this.state.currentSelectOpen}
            setCurrentSelect={this.setCurrentSelect}
          />
          {/*<label className="work-calendar-add-form__label form-label form-label--select-search">*/}
          {/*  <span className="work-calendar-add-form__desc form-desc">Объект строительства:</span>*/}
          {/*  <span className="work-calendar-add-form__input form-input">*/}
          {/*    <span className="form-input__drop">*/}
          {/*      <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">*/}
          {/*        <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>*/}
          {/*      </svg>*/}
          {/*    </span>*/}
          {/*    <input type="text" placeholder="Введите и выберите объект строильства"/>*/}
          {/*    <ul className="form-select-search">*/}
          {/*      <li className="form-select-search__item">Объект 1</li>*/}
          {/*      <li className="form-select-search__item">Объект 2</li>*/}
          {/*      <li className="form-select-search__item">Объект 3</li>*/}
          {/*      <li className="form-select-search__item">Объект 4</li>*/}
          {/*    </ul>*/}
          {/*  </span>*/}
          {/*</label>*/}
          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Пикет или узел:</span>
            <span className="work-calendar-add-form__input form-input">
              <input type="text" placeholder="Введите пикет или узел"/>
            </span>
          </label>
          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Номер:</span>
            <span className="work-calendar-add-form__input form-input">
              <input type="text" placeholder="Введите номер соединения"/>
            </span>
          </label>
          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Шифр:</span>
            <span className="work-calendar-add-form__input form-input">
              <input type="text" placeholder="Введите шифр соединения"/>
            </span>
          </label>
          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Дополнительная маркировка:</span>
            <span className="work-calendar-add-form__input form-input">
              <input type="text" placeholder="Введите шифр соединения"/>
            </span>
          </label>
          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Бригада:</span>
            <span className="work-calendar-add-form__input form-input">
              <input type="text" placeholder="Название бригады"/>
            </span>
          </label>
          <FormLabelSelect
            name="workShift"
            desc="Смена:"
            placeholder="Утро / Вечер"
            selectList={[
              {
                name: 'Утро',
                value: ''
              },
              {
                name: 'Вечер',
                value: ''
              },
            ]}
            currentSelectOpen={this.state.currentSelectOpen}
            setCurrentSelect={this.setCurrentSelect}
          />
          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Последовательность соединения в смене:</span>
            <span className="work-calendar-add-form__input form-input">
              <input type="text" placeholder="1, 2, 3 какое по счету соединение"/>
            </span>
            <span className="work-calendar-add-form__info form-info">Если исполнитель за период работ выполнил несколько сварочных соединений, то необходимо указать какое по счету было данное соединение</span>
          </label>
          <button
            className="work-calendar-add-form__next btn btn--blue"
            onClick={this.props.onNextClick}
          >Продолжить</button>
        </div>
      </div>
    );
  }
}

export default WorkCalendarAddFirst;
