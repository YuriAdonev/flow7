import {Component} from "react";
import {addMonths, eachDay, endOfMonth, format, isToday, startOfMonth, subMonths} from "date-fns";
import React from "react";
// import 'popper.js';
// import 'bootstrap';

import queryString from "query-string";
var ru = require('date-fns/locale/ru');

class DeviceCalendar extends Component {
    constructor(props) {
        super(props);
        this.weekLabelWidth = 20;

        this.montsCount = Math.floor((props.wrapper.offsetWidth - (this.weekLabelWidth * 2)) / 138);
        this.yIndents = [144, 0, 24, 48, 72, 96, 120];
        this.wDaylabels = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
        this.yStep = 24;
        this.xStep = 24;
        this.days = [];
        this.state = {
            error: null,
            isLoaded: false,
            startDate: startOfMonth(subMonths(new Date(), this.montsCount - 1)),
            data: {},
            width: props.wrapper.offsetWidth,
            maxValue: 0
        };

        this.goPrev = this.goPrev.bind(this);
        this.goNext = this.goNext.bind(this);
        this.daySelect = this.daySelect.bind(this);

    }


    buildCalendar() {
        let self = this;
        const calendar = [];
        this.buildCalArray(this.state.startDate, this.endDate());
        let freeWidth = ((this.state.width - (this.weekLabelWidth * 2)) - (this.weeksCount * this.xStep));
        let marginsCount = this.montsCount + 1;
        this.monthMargin = Math.floor(freeWidth / marginsCount);
        let balance = Math.floor((freeWidth % marginsCount) / 2);
        self.weekX += (this.monthMargin + balance);

        this.calArr.forEach(function (m, i) {
            calendar.push(<foreignObject x={self.weekX + self.yStep} y={5} key={i} width='100' height='22'><span
                className={"hotmap-month-label" + (m[0][0].getMonth() === new Date().getMonth() ? " hotmap-month-label-current-month" : "")}>{format(m[0][0], 'MMMM YYYY', {locale: ru})}</span></foreignObject>);
            calendar.push(self.buildMonth(m));
        });
        self.weekX += balance;
        return (calendar);
    }

    buildMonth(m) {
        let self = this;

        let res = [];
        m.forEach(function (w, i) {
            res.push(<g key={i} transform={"translate(" + self.weekX + "," + 60 + ")"}>{self.buildWeek(w)}</g>);
            self.weekX = self.weekX + self.xStep;
        });
        self.weekX += this.monthMargin;
        return (res);
    }

    buildWeek(w) {
        let self = this;

        let res = [];
        w.forEach(function (d, i) {
            let classes = ['hotmap-day'];
            let worksCount = self.state.data[format(d, 'YYYY-MM-DD')];
            if (isToday(d)) {
                classes.push('hotmap-today');
            } else if (worksCount && worksCount <= 5) {
                classes.push('hotmap-a');
            } else if (worksCount && worksCount <= 10) {
                classes.push('hotmap-b');
            } else if (worksCount && worksCount <= 15) {
                classes.push('hotmap-c');
            } else if (worksCount && worksCount > 15) {
                classes.push('hotmap-d');
            } else {
                classes.push('hotmap-empty');
            }

            let title = format(d, 'DD.MM.YYYY');
            if (worksCount && worksCount > 0) {
                title += "<br/>Регистраторов: " + worksCount
            } else {
                title += "<br/>Работ нет"
            }

            res.push(<g className={classes.join(" ")} key={i}>
                <rect className='down'
                      y={self.yIndents[d.getDay()] + 2} height="21"
                      width="21">h
                </rect>
                <text x="10" y={self.yIndents[d.getDay()] + 16} textAnchor="middle">{d.getDate()}</text>
                <rect className='up'
                      data-date={d}
                      title={title}
                      onClick={self.daySelect} x="0"
                      y={self.yIndents[d.getDay()] + 2} height="21"
                      width="21">h
                </rect>
            </g>)
        });
        return (res);

    }

    componentDidUpdate() {
        this.buildTooltips();
        this.loadData();
    }

    componentDidMount() {
        this.buildTooltips();
        this.loadData();

    }

    buildTooltips() {
        // $(function () {
        //     $('.hotmap-day rect.up').tooltip('dispose').tooltip({offset: "0,15", delay: 0, html: true});
        // })
    }

    buildCalArray(startMonth, endMonth) {
        let cal = [[[]]];
        let weeksCount = 1;

        const days = eachDay(startOfMonth(startMonth), endOfMonth(endMonth));
        days.forEach(function (day, i) {
                cal[cal.length - 1][cal[cal.length - 1].length - 1].push(day);
                if (days.length > (i + 1)) {
                    if (days[i + 1].getDate() === 1) {
                        cal.push([[]]);
                        weeksCount += 1;
                    } else if (days[i + 1].getDay() === 1) {
                        cal[cal.length - 1].push([]);
                        weeksCount += 1;
                    }

                }
            }
        );

        this.weeksCount = weeksCount;
        this.calArr = cal;
    }

    weekLabels(x, y) {
        let res = [];
        this.wDaylabels.forEach((label, i) => {
            res.push(<text key={i} x="0" y={this.yIndents[i]} className="hotmap-week-day-label">{label}</text>)
        });
        this.weekX += this.weekLabelWidth;
        return (<g transform={"translate(" + x + "," + y + ")"}>{res}</g>)
    }

    daySelect(e) {
        e.preventDefault();
        //console.log(e.currentTarget.dataset);
        const searchObj = queryString.parse(this.props.location.search, {arrayFormat: 'bracket'});
        searchObj.from = format(new Date(e.currentTarget.dataset.date), 'YYYY-MM-DD');
        this.props.history.push({search: '?' + queryString.stringify(searchObj, {arrayFormat: 'bracket'})})
    }

    loadData() {
        const searchObj = queryString.parse(this.props.location.search, {arrayFormat: 'bracket'});
        searchObj.from = format(this.state.startDate, 'YYYY-MM-DD');
        searchObj.to = format(this.endDate(), 'YYYY-MM-DD');
        const params = queryString.stringify(searchObj, {arrayFormat: 'bracket'});
        if (this.lastParams === params) {
            return;
        }
        this.lastParams = params;
        fetch(this.props.url + "?" + params)
            .then(res => res.json())
            .then(
                (result) => {
                    let maxValue = 0;
                    const dataKeys = Object.keys(result.hotmap_data);
                    dataKeys.forEach((key) => {
                        if (result.hotmap_data[key] > maxValue) {
                            maxValue = result.hotmap_data[key];
                        }
                    });

                    this.setState({
                        data: result.hotmap_data,
                        isLoaded: true,
                        maxValue: maxValue
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    endDate() {
        return endOfMonth(addMonths(this.state.startDate, this.montsCount - 1));
    }


    goPrev() {
        this.setState({data: {}, startDate: startOfMonth(subMonths(this.state.startDate, this.montsCount))}, () => {
            //this.loadData();
        });

    }

    goNext() {
        this.setState({data: {}, startDate: startOfMonth(addMonths(this.state.startDate, this.montsCount))}, () => {
            //this.loadData();
        });
    }


    renderCalendar() {
        this.weekX = 0;
        return (<g>
            {this.weekLabels(0, 76)}
            {this.buildCalendar()}
            {this.weekLabels(this.weekX, 76)}
            <foreignObject width={24} height={24} x={0} y={4}>
                <a onClick={this.goPrev}>
                    <span className="hotmap-calendar-nav material-icons">chevron_left</span>
                </a>
            </foreignObject>
            <foreignObject width={24} height={24} x={this.weekX - this.weekLabelWidth - 4} y={4}>
                <a onClick={this.goNext}>
                    <span className="hotmap-calendar-nav material-icons">chevron_right</span>
                </a>
            </foreignObject>
        </g>);

    }

    render() {
        return (
            <div>
                <svg width={this.weekX} height={230}>
                    {this.renderCalendar()}
                </svg>
                <div className='hotmap-legend'>
                    <span className='material-icons a-legend'>fiber_manual_record</span>
                    до 5 сварочных агрегатов
                    <span className='material-icons b-legend'>fiber_manual_record</span>
                    6 — 10 сварочных агрегатов
                    <span className='material-icons c-legend'>fiber_manual_record</span>
                    11 — 15 сварочных агрегатов
                    <span className='material-icons d-legend'>fiber_manual_record</span>
                    более 15 сварочных агрегатов
                    <span className='material-icons today-legend'>fiber_manual_record</span>
                    Текущая дата

                </div>
            </div>

        );
    }

}

export default DeviceCalendar;
