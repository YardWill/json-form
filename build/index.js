import * as tslib_1 from "tslib";
import * as React from 'react';
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
            if (!err) {
                // tslint:disable-next-line:no-console
                console.log(_this.state);
                submitHandler(_this.state);
            }
        };
        _this.state = props.initialData || {};
        return _this;
    }
    Form.prototype.render = function () {
        var _this = this;
        var state = this.state;
        var config = this.props.config;
        return React.createElement("div", null,
            config.map(function (item) {
                var Component = componentLib[item.type];
                var value = state[item.target];
                return React.createElement(Component, { key: item.target, value: value, onChange: function (e) { return _this.onChange(item.target, e); }, placeholder: item.placeholder });
            }),
            React.createElement("div", { onClick: this.submit }, "submit"));
    };
    return Form;
}(React.Component));
export default Form;
//# sourceMappingURL=index.js.map