import * as tslib_1 from "tslib";
import * as React from 'react';
import { Subject } from 'rxjs';
var componentLib = {};
export var registerComponent = function (type, Component) {
    componentLib[type] = Component;
};
var Form = /** @class */ (function (_super) {
    tslib_1.__extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (target, value) {
            var _a;
            _this.subscribes[target].next(value);
            _this.setState((_a = {}, _a[target] = value, _a));
        };
        _this.submit = function () {
            var _a = _this.props, config = _a.config, errorHandler = _a.errorHandler, submitHandler = _a.submitHandler;
            var err = config.some(function (item) {
                if (item.test && !item.test(_this.state[item.target])) {
                    errorHandler(item.errorMsg);
                    return true;
                }
                else {
                    return false;
                }
            });
            submitHandler(_this.state);
            if (!err) {
                // tslint:disable-next-line:no-console
                console.log(_this.state);
            }
        };
        _this.reset = function () {
            _this.setState(tslib_1.__assign({}, _this.props.initialData));
        };
        _this.state = props.initialData || {};
        _this.subscribes = {};
        _this.props.config.map(function (_a) {
            var target = _a.target;
            _this.subscribes[target] = new Subject();
        });
        _this.props.effects(function (target) { return _this.subscribes[target]; }, function (target, value) {
            var _a;
            return _this.setState((_a = {}, _a[target] = value, _a));
        });
        return _this;
    }
    Form.prototype.render = function () {
        var _this = this;
        console.log('render');
        var state = this.state;
        var _a = this.props, config = _a.config, button = _a.button, inline = _a.inline;
        return React.createElement("div", null,
            config.map(function (item) {
                var Component = componentLib[item.type];
                var value = state[item.target];
                return React.createElement("div", { key: item.target, style: { display: inline ? 'inline-flex' : 'flex', margin: '0 20px 20px 0' } },
                    React.createElement("div", { style: { paddingRight: 20, width: !inline ? '80px' : 'auto' } },
                        item.title,
                        ":"),
                    React.createElement(Component, { value: value, onChange: function (e) { return _this.onChange(item.target, e); }, placeholder: item.placeholder }));
            }),
            button(this.submit, this.reset));
    };
    return Form;
}(React.Component));
export default Form;
//# sourceMappingURL=index.js.map