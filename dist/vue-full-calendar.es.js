import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import defaultsDeep from 'lodash.defaultsdeep';

var FullCalendar = require('fullcalendar/dist/fullcalendar');

var FullCalendar$1 = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "calendar", attrs: { "id": "calendar" } });
    }, staticRenderFns: [],
    props: {
        events: {
            default: function _default() {
                return [];
            }
        },

        eventSources: {
            default: function _default() {
                return [];
            }
        },

        editable: {
            default: function _default() {
                return true;
            }
        },

        selectable: {
            default: function _default() {
                return true;
            }
        },

        selectHelper: {
            default: function _default() {
                return true;
            }
        },

        header: {
            default: function _default() {
                return {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                };
            }
        },

        defaultView: {
            default: function _default() {
                return 'agendaWeek';
            }
        },

        sync: {
            default: function _default() {
                return false;
            }
        },

        config: {
            type: Object,
            default: function _default() {
                return {};
            }
        }
    },

    data: function data() {
        return {
            calendar: null
        };
    },


    computed: {
        defaultConfig: function defaultConfig() {
            var self = this;
            return {
                header: this.header,
                defaultView: this.defaultView,
                editable: this.editable,
                selectable: this.selectable,
                selectHelper: this.selectHelper,
                aspectRatio: 2,
                timeFormat: 'HH:mm',
                events: this.events,
                eventSources: this.eventSources,

                eventRender: function eventRender() {
                    if (this.sync) {
                        self.events = self.calendar.clientEvents();
                    }

                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    self.$emit.apply(self, ['event-render'].concat(_toConsumableArray(args)));
                },
                eventDestroy: function eventDestroy(event) {
                    if (this.sync) {
                        self.events = self.calendar.clientEvents();
                    }
                },
                eventClick: function eventClick() {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        args[_key2] = arguments[_key2];
                    }

                    self.$emit.apply(self, ['event-selected'].concat(_toConsumableArray(args)));
                },
                eventDrop: function eventDrop() {
                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        args[_key3] = arguments[_key3];
                    }

                    self.$emit.apply(self, ['event-drop'].concat(_toConsumableArray(args)));
                },
                eventReceive: function eventReceive() {
                    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                        args[_key4] = arguments[_key4];
                    }

                    self.$emit.apply(self, ['event-receive'].concat(_toConsumableArray(args)));
                },
                eventResize: function eventResize() {
                    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                        args[_key5] = arguments[_key5];
                    }

                    self.$emit.apply(self, ['event-resize'].concat(_toConsumableArray(args)));
                },
                dayClick: function dayClick() {
                    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                        args[_key6] = arguments[_key6];
                    }

                    self.$emit.apply(self, ['day-click'].concat(_toConsumableArray(args)));
                },
                select: function select(start, end, jsEvent, view, resource) {
                    self.$emit('event-created', {
                        start: start,
                        end: end,
                        allDay: !start.hasTime() && !end.hasTime(),
                        view: view,
                        resource: resource
                    });
                }
            };
        }
    },

    mounted: function mounted() {
        var _this = this;

        var cal = this.$el;

        this.$on('remove-event', function (event) {
            if (event && event.hasOwnProperty('id')) {
                _this.calendar.removeEvents(event.id);
            } else {
                _this.calendar.removeEvents(event);
            }
        });

        this.$on('rerender-events', function () {
            _this.calendar.rerenderEvents();
        });

        this.$on('refetch-events', function () {
            _this.calendar.refetchEvents();
        });

        this.$on('render-event', function (event) {
            _this.calendar.renderEvent(event);
        });

        this.$on('reload-events', function () {
            _this.calendar.removeEvents();
            _this.calendar.addEventSource(_this.events);
        });

        this.$on('rebuild-sources', function () {
            _this.calendar.removeEventSources();
            _this.eventSources.map(function (event) {
                _this.calendar.addEventSource(event);
            });
        });

        this.calendar = new FullCalendar.Calendar(cal, defaultsDeep(this.config, this.defaultConfig));
        this.calendar.render();
    },


    methods: {
        fireMethod: function fireMethod() {
            var _calendar;

            for (var _len7 = arguments.length, options = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                options[_key7] = arguments[_key7];
            }

            return (_calendar = this.calendar)[options.shift()].apply(_calendar, _toConsumableArray(options));
        }
    },

    watch: {
        events: {
            deep: true,
            handler: function handler(val) {
                this.calendar.removeEvents();
                this.calendar.addEventSource(this.events);
            }
        },
        eventSources: {
            deep: true,
            handler: function handler(val) {
                this.$emit('rebuild-sources');
            }
        }
    },

    beforeDestroy: function beforeDestroy() {
        this.$off('remove-event');
        this.$off('rerender-events');
        this.$off('refetch-events');
        this.$off('render-event');
        this.$off('reload-events');
        this.$off('rebuild-sources');
    }
};

var index = {
    install: function install(Vue, options) {
        Vue.component('full-calendar', FullCalendar$1);
    }
};

export { FullCalendar$1 as FullCalendar };
export default index;
