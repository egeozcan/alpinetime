"use strict";

require("react-date-picker/index.css");
const React = require("react");
const stateTree = require("../stateTree.js");
const TwoCols = require("../components/main/Layout/TwoCols.jsx");
const lookups = stateTree.select("stores", "lookups");
const DatePicker = require("react-date-picker");
const Input = require("react-bootstrap/lib/Input");
const Modal = require("react-bootstrap/lib/Modal");

const typeMap = {
    string: "text",
    int32: "number",
    int: "number"
};

function getOptionsForLookupType(lookupType) {
    var loadedLookups = lookups.get();
    if (!loadedLookups) {
        return [];
    }
    return loadedLookups
        .filter(l => l.Type === lookupType)
        .map(l => {return {ID: l.ID, Value: l.Value, Description: l.Description}; });
}

let EntityFormFields = React.createClass({
    mixins: [stateTree.mixin],
    cursors: { definitions: ["definitions"], lookups: ["stores", "lookups"] },
    propTypes: {
        initialValues: React.PropTypes.object
    },
    getDefaultProps() {
        return { initialValues: {} };
    },
    getInitialState() {
        return {vals: Object.assign({}, this.props.initialValues)};
    },
    componentWillReceiveProps(nextProps) {
        let vals = Object.assign({}, this.state.vals, nextProps.initialValues);
        this.setState({ vals });
    },
    componentWillUpdate(nextProps, nextState) {
        if (typeof this.props.onChange === "function") {
            this.props.onChange(nextState.vals);
        }
    },
    valueChanged(e, val, prop) {
        let vals = Object.assign({}, this.state.vals);
        if (e.preventDefault) {
            e.preventDefault();
            vals[prop] = val || e.target.value;
        } else {
            vals[prop] = e;
        }
        this.setState({ vals });
    },
    render() {
        let entity = this.props.entity;
        let entityDef = this.cursors.definitions.get()[entity];
        if (!entityDef) {
            return null;
        }
        let fields = Object.keys(entityDef).map((prop, i) => {
            let input = "";
            let type = entityDef[prop].type;
            let identifier = prop.replace(/ID$/, "");
            let title = identifier.replace(/([A-Z])/g, " $1");
            let currentValue = this.state.vals[prop];
            switch (type) {
                case "string":
                case "int":
                    let inputType = typeMap[type];
                    /*if (inputType === "text" && currentValue && currentValue.length > 70) {
                        inputType = "textarea";
                    }*/
                    input = (
                        <Input
                            autofocus={i === 0}
                            label={title}
                            key={i}
                            value={currentValue}
                            onChange={e => this.valueChanged(e, null, prop)}
                            id={prop}
                            type={inputType} />
                    );
                    break;
                case "Time":
                    input = (
                        <div className="form-group">
                            <label>
                                <span>
                                    {title}
                                </span>
                            </label>
                            <DatePicker key={i} onChange={e => this.valueChanged(e, null, prop) } />
                        </div>
                    );
                    break;
                default:
                    if (entityDef[prop].ref === "Lookup") {
                        let lookups = getOptionsForLookupType(identifier);
                        let options = lookups.map((o, n) => {
                            return (
                                <option key={n} value={o.ID}>
                                    {o.Value}
                                </option>
                            );
                        });
                        let selectedID = currentValue || 0;
                        let selectedValue = lookups.filter(l => l.ID === selectedID)[0];
                        input = (
                            <Input
                                onChange={e => this.valueChanged(e, null, prop) }
                                type="select"
                                key={i}
                                value={selectedValue ? selectedValue.ID : null}
                                help={selectedValue ? selectedValue.Description : null}
                                label={title}>
                                <option value="">Please Select</option>
                                {options}
                            </Input>
                        );
                    }
                    break;
            }
            return (
                <div key={prop + "_field"}>
                    {input}
                </div>
            );
        });
        return (<div>{fields}</div>);
    }
});

export default React.createClass({
    mixins: [stateTree.mixin],
    cursors: { tasks: ["stores", "tasks"] },
    render() {
        let task = this.cursors.tasks.select([1]).get();
        let content = (
            <Modal onRequestHide={() => {}}>
                <div className="modal-body" action="#">
                    <EntityFormFields
                        onChange={(state) => console.log("result:", JSON.stringify(state, null, 2))}
                        entity="Task"
                        initialValues={Object.assign({}, task)}
                        />
                </div>
                <div className="modal-footer">
                </div>
            </Modal>
        );
        return (<TwoCols Sidebar={content} Content={Array(15).join("_").split("_").map((e, i) => <p key={i}>{i+1}</p>)}></TwoCols>);
    }
});