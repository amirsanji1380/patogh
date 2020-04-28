//node_modules\devextreme\core\utils\date.js
//E:\project\bstcspa\client\node_modules\devextreme\ui\calendar\ui.calendar.views.js
//import moment from "moment-jalaali";
import moment from "moment-jalaali";
/*import fa from "moment/src/locale/fa";
moment.locale("fa", fa);
moment.loadPersian()
*/

import $ from 'jquery'
const weekdaysMin = ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
import dateUtils from 'devextreme/core/utils/date'
import uiDateUtils from 'devextreme/core/utils/date'
import typeUtils from 'devextreme/core/utils/type'
import Views from 'devextreme/ui/calendar/ui.calendar.views'
import Calendar from 'devextreme/ui/calendar/ui.calendar'
import dateLocalization from "devextreme/localization/date";
import DateBox from "devextreme/ui/date_box/ui.date_box.base"
var DxfaDate = {
    init: function () {
        const months_format_fa = [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند"
        ]
        Calendar.prototype._renderSpecificView = function (date) {
            var specificView = Views[this.option("zoomLevel")];
            var $view = $("<div>").appendTo(this._$viewsWrapper);
            var config = this._viewConfig(date);
            if (this.option('elementAttr.jalaali') === '1') {
                config.jalaali = '1'
            }
            return new specificView($view, config)
        }
        DateBox.prototype._getDisplayedText = function (value) {
            var mode = this.option("mode");
            var displayedText;
            if ("text" === mode) {
                var displayFormat = this._strategy.getDisplayFormat(this.option("displayFormat"));
                displayedText = dateLocalization.format(value, displayFormat)
                if (value && this.option('calendarOptions.elementAttr.jalaali') === '1') {
                    // 'billions' | 'currency' | 'day' | 'decimal' | 'exponential' | 'fixedPoint' | 'largeNumber' | 'longDate' | 'longTime' | 'millions' | 'millisecond' | 'month' | 'monthAndDay' | 'monthAndYear' | 'percent' | 'quarter' | 'quarterAndYear' | 'shortDate' | 'shortTime' | 'thousands' | 'trillions' | 'year' | 'dayOfWeek' | 'hour' | 'longDateLongTime' | 'minute' | 'second' | 'shortDateShortTime'
                    const formatmap = {
                        'shortdateshorttime': 'jYYYY/jMM/jDD HH:mm',
                        'shortdate': 'jYYYY/jMM/jDD'
                    }
                    if (displayFormat && formatmap[displayFormat])
                        displayFormat = formatmap[displayFormat]
                    displayedText = moment(value).format(displayFormat ? displayFormat : 'jYYYY/jMM/jDD');
                }
            } else {
                var format = this._getFormatByMode(mode);
                if (format) {
                    displayedText = dateLocalization.format(value, format)
                } else {
                    displayedText = uiDateUtils.toStandardDateFormat(value, mode)
                }
            }
            return displayedText
        }
        //locale("fa-IR");
        var isDefined = typeUtils.isDefined;
        dateUtils.getFirstMonthDate = function (date) {
            console.log('getFirstMonthDate getFirstMonthDate');
            if (!isDefined(date)) {
                return
            }
            var newDate = new Date(date.getFullYear(), date.getMonth(), 1);
            return newDate
        }
        dateUtils.getFirstMonthDateJalaali = function (date) {
            console.log('getFirstMonthDateJalali');
            if (!isDefined(date)) {
                return
            }
            const startOfMonth = moment(date).startOf('Jmonth').format('YYYY-MM-DD hh:mm');
            // const endOfMonth = moment().endOf('month').format('YYYY-MM-DD hh:mm');
            //var newDate = new Date(date.getFullYear(), date.getMonth(), 1);
            //newDate.setDate(newDate.getDate() + -11);
            return new Date(startOfMonth)
        }

        /* getLastMonthDate = function(date) {
             if (!isDefined(date)) {
                 return
             }
             var newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
             return newDate
         }
         */
        dateUtils.getLastMonthDateJalaali = function (date) {
            if (!isDefined(date)) {
                return
            }
            const endOfMonth = moment(date).endOf('Jmonth').getDate();
            endOfMonth.setDate(date.getDate() + 1);
            return endOfMonth
        };

        /* var getLastMonthDay = function(date) {
             var resultDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
             return resultDate.getDate()
         };
         */
        dateUtils.getLastMonthDay = function (date) {
            var endOfMonth = moment(date).endOf('Jmonth').getDate();
            endOfMonth.setDate(date.getDate() + 1);
            return endOfMonth
        };

        dateUtils.getViewLastCellDate = function (viewType, date) {
            if ("month" === viewType) {
                return new Date(date.getFullYear(), date.getMonth(), getLastMonthDay(date))
            }
            if ("year" === viewType) {
                return new Date(date.getFullYear(), 11, date.getDate())
            }
            if ("decade" === viewType) {
                return new Date(getFirstYearInDecade(date) + 9, date.getMonth(), date.getDate())
            }
            if ("century" === viewType) {
                return new Date(getFirstDecadeInCentury(date) + 90, date.getMonth(), date.getDate())
            }
        };

        Views.month.prototype.getNavigatorCaption = function () {
            if (this.option('jalaali') === '1') {
                let jalalicellDate = moment(this.option("date"));
                return months_format_fa[jalalicellDate.jMonth()] + ' ' + jalalicellDate.jYear();
            }
            return dateLocalization.format(this.option("date"), "monthandyear")
        }
        Views.month.prototype._getCellText = function (cellDate) {
            if (this.option('jalaali') === '1') {
                return moment(cellDate).jDate();
            }
            return dateLocalization.format(cellDate, "d")
        }
        Views.month.prototype._getDayCaption = function (day) {
            //console.log('month _getDayCaption');
            var daysInWeek = this.option("colCount");
            if (this.option('jalaali') === '1') {
                return weekdaysMin[day % daysInWeek];
            }
            return dateLocalization.getDayNames("abbreviated")[day % daysInWeek]
        }

        Views.month.prototype._getFirstCellData = function () {

            if (this.option('jalaali') === '1') {
                var firstDay = dateUtils.getFirstMonthDateJalaali(this.option("date"));
                var firstMonthDayOffset = this._getFirstDayOfWeek() - firstDay.getDay();
                var daysInWeek = this.option("colCount");
                if (firstMonthDayOffset >= 0) {
                    firstMonthDayOffset -= daysInWeek
                }
                firstDay.setDate(firstDay.getDate() + firstMonthDayOffset);
                return firstDay
            }


            var firstDay = dateUtils.getFirstMonthDate(this.option("date"));
            var firstMonthDayOffset = this._getFirstDayOfWeek() - firstDay.getDay();
            var daysInWeek = this.option("colCount");
            if (firstMonthDayOffset >= 0) {
                firstMonthDayOffset -= daysInWeek
            }
            firstDay.setDate(firstDay.getDate() + firstMonthDayOffset);
            return firstDay
        }
        Views.month.prototype._isOtherView = function (cellDate) {
            if (this.option('jalaali') === '1') {
                return moment(cellDate).jMonth() !== moment(this.option("date")).jMonth()
            }
            return cellDate.getMonth() !== this.option("date").getMonth()
        }
        Views.month.prototype._getFirstDayOfWeek = function () {
            if (this.option('jalaali') === '1') {
                return 6;
            }
            return typeUtils.isDefined(this.option("firstDayOfWeek")) ? this.option("firstDayOfWeek") : dateLocalization.firstDayOfWeekIndex()
        }

        Views.month.prototype._getFirstCellData = function () {
            if (this.option('jalaali') === '1') {
                var firstDay = dateUtils.getFirstMonthDateJalaali(this.option("date"));
                var firstMonthDayOffset = this._getFirstDayOfWeek() - firstDay.getDay();
                var daysInWeek = this.option("colCount");
                if (firstMonthDayOffset >= 0) {
                    firstMonthDayOffset -= daysInWeek
                }
                firstDay.setDate(firstDay.getDate() + firstMonthDayOffset);
                return firstDay
            }
            var firstDay = dateUtils.getFirstMonthDate(this.option("date"));
            var firstMonthDayOffset = this._getFirstDayOfWeek() - firstDay.getDay();
            var daysInWeek = this.option("colCount");
            if (firstMonthDayOffset >= 0) {
                firstMonthDayOffset -= daysInWeek
            }
            firstDay.setDate(firstDay.getDate() + firstMonthDayOffset);
            return firstDay
        }



        Views.year.prototype._isDateOutOfRange = function (cellDate) {
            if (this.option('jalaali') === '1') {
                return !dateUtils.dateInRange(cellDate, dateUtils.getFirstMonthDateJalaali(this.option("min")), dateUtils.getLastMonthDateJalaali(this.option("max")))
            }
            return !dateUtils.dateInRange(cellDate, dateUtils.getFirstMonthDate(this.option("min")), dateUtils.getLastMonthDate(this.option("max")))
        }
        Views.year.prototype._getCellText = function (cellDate) {
            if (this.option('jalaali') === '1') {
                return months_format_fa[moment(cellDate).jMonth()]
            }
            return dateLocalization.getMonthNames("abbreviated")[cellDate.getMonth()]
        }
        Views.year.prototype._getFirstCellData = function () {
            if (this.option('jalaali') === '1') {
                var data = new Date(this.option("date"));
                let m = moment(`${moment(data).jYear()}/1/1`, 'jYYYY/jM/jD')
                return m.toDate();
            }

            var data = new Date(this.option("date"));
            data.setDate(1);
            data.setMonth(0);
            return data
        }
        Views.year.prototype.getNavigatorCaption = function () {
            if (this.option('jalaali') === '1') {
                return moment(this.option("date")).jYear();
            }
            return dateLocalization.format(this.option("date"), "yyyy")
        }
        Views.decade.prototype._getCellText = function (cellDate) {
            //jYear
            if (this.option('jalaali') === '1') {
                return moment(cellDate).jYear();
            }
            return dateLocalization.format(cellDate, "yyyy")
        }

        Views.decade.prototype.getNavigatorCaption = function () {
            var currentDate = this.option("date");
            var firstYearInDecade = dateUtils.getFirstYearInDecade(currentDate);
            var startDate = new Date(currentDate);
            var endDate = new Date(currentDate);
            startDate.setFullYear(firstYearInDecade);
            endDate.setFullYear(firstYearInDecade + 9);
            if (this.option('jalaali') === '1') {
                return moment(startDate).jYear() + "-" + moment(endDate).jYear();
            }
            return dateLocalization.format(startDate, "yyyy") + "-" + dateLocalization.format(endDate, "yyyy")
        }

        Views.century.prototype._getCellText = function (cellDate) {
            if (this.option('jalaali') === '1') {
                var startDate = moment(cellDate).jYear()
                var endDate = new Date(cellDate);
                endDate.setFullYear(endDate.getFullYear() + 9);
                return startDate + " - " + moment(endDate).jYear();
            }
            var startDate = dateLocalization.format(cellDate, "yyyy");
            var endDate = new Date(cellDate);
            endDate.setFullYear(endDate.getFullYear() + 9);
            return startDate + " - " + dateLocalization.format(endDate, "yyyy")
        }

        Views.century.prototype.getNavigatorCaption = function () {
            var currentDate = this.option("date");
            var firstYearInDecade = dateUtils.getFirstYearInDecade(currentDate);
            var startDate = new Date(currentDate);
            var endDate = new Date(currentDate);
            startDate.setFullYear(firstYearInDecade);
            endDate.setFullYear(firstYearInDecade + 9);
            if (this.option('jalaali') === '1') {
                return moment(startDate).jYear() + "-" + moment(endDate).jYear();
            }
            return dateLocalization.format(startDate, "yyyy") + "-" + dateLocalization.format(endDate, "yyyy")
        }



    }


}

export default DxfaDate;

