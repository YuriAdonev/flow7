import React, {Component} from 'react';

import './work-calendar-add-second.scss';

import FormLabelSelect from '../../../../components/inputs/select/select';

class WorkCalendarAddSecond extends Component {
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
          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Изделие #1:</span>
            <span className="work-calendar-add-form__input form-input">
              <span className="form-input__drop">
                <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>
                </svg>
              </span>
              <input type="text" placeholder="Введите и выберите изделие"/>
            </span>
          </label>
          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Изделие #2:</span>
            <span className="work-calendar-add-form__input form-input">
              <span className="form-input__drop">
                <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>
                </svg>
              </span>
              <input type="text" placeholder="Введите и выберите изделие"/>
            </span>
          </label>
          <FormLabelSelect
            name="technology"
            desc="Технология:"
            placeholder="Выберите выполняемые работ"
            selectList={[
              {
                name: 'Технология 1',
                value: ''
              },
              {
                name: 'Технология 2',
                value: ''
              },
              {
                name: 'Технология 3',
                value: ''
              },
              {
                name: 'Технология 4',
                value: ''
              },
            ]}
            currentSelectOpen={this.state.currentSelectOpen}
            setCurrentSelect={this.setCurrentSelect}
          />
          <FormLabelSelect
            name="technologyCard"
            desc="Технологическая карта:"
            placeholder="Выберите выполняемые работ"
            selectList={[
              {
                name: 'Технологическая карта 1',
                value: ''
              },
              {
                name: 'Технологическая карта 2',
                value: ''
              },
              {
                name: 'Технологическая карта 3',
                value: ''
              },
              {
                name: 'Технологическая карта 4',
                value: ''
              },
            ]}
            currentSelectOpen={this.state.currentSelectOpen}
            setCurrentSelect={this.setCurrentSelect}
          />
          <FormLabelSelect
            name="methodWelding"
            desc="Способ сварки:"
            placeholder="Выберите выполняемые работ"
            selectList={[
              {
                name: 'Способ сварки 1',
                value: ''
              },
              {
                name: 'Способ сварки 2',
                value: ''
              },
              {
                name: 'Способ сварки 3',
                value: ''
              },
            ]}
            currentSelectOpen={this.state.currentSelectOpen}
            setCurrentSelect={this.setCurrentSelect}
          />
          <FormLabelSelect
            name="positionWelding"
            desc="Положение при сварке:"
            placeholder="Выберите выполняемые работ"
            selectList={[
              {
                name: 'Положение при сварке 1',
                value: ''
              },
              {
                name: 'Положение при сварке 2',
                value: ''
              },
            ]}
            currentSelectOpen={this.state.currentSelectOpen}
            setCurrentSelect={this.setCurrentSelect}
          />

          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Температура просушки:</span>
            <span className="work-calendar-add-form__input form-input">
              <input type="text" placeholder="Введите температуру прогрева, если нет то 0"/>
            </span>
          </label>
          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Маркa сварочных материалов:</span>
            <span className="work-calendar-add-form__input form-input">
              <input type="text" placeholder="Введите и выберите изделие"/>
            </span>
          </label>
          <FormLabelSelect
            name="receptionist"
            desc="Регистратор:"
            placeholder="Выберите регистратор"
            selectList={[
              {
                name: 'Регистратор 1',
                value: ''
              },
              {
                name: 'Регистратор 2',
                value: ''
              },
            ]}
            currentSelectOpen={this.state.currentSelectOpen}
            setCurrentSelect={this.setCurrentSelect}
          />
          <label className="work-calendar-add-form__label form-label">
            <span className="work-calendar-add-form__desc form-desc">Посты:</span>
            <span className="work-calendar-add-form__input form-input">
              <span className="form-input__drop">
                <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>
                </svg>
              </span>
              <input type="text" placeholder="Выберите посты (множественный выбор)"/>
            </span>
          </label>
          <label className="work-calendar-add-form__checkbox form-checkbox">
            <input type="checkbox" className="checkbox"/>
            <span className="new-checkbox"></span>
            <span className="work-calendar-add-form__desc form-desc">Сварочное соединение выполнено в две смены</span>
          </label>
          <FormLabelSelect
            name="postsSecond"
            desc="Посты:"
            placeholder="Посты во второй смене:"
            selectList={[
              {
                name: 'Пост 1',
                value: ''
              },
              {
                name: 'Пост 2',
                value: ''
              },
              {
                name: 'Пост 3',
                value: ''
              },
            ]}
            currentSelectOpen={this.state.currentSelectOpen}
            setCurrentSelect={this.setCurrentSelect}
          />
          <button className="work-calendar-add-form__next btn btn--blue">Сохранить</button>
        </div>
      </div>
    );
  }
}

export default WorkCalendarAddSecond;
