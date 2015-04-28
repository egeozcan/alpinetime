"use strict";

require("react-date-picker/index.css");
const React = require("react");
const stateTree = require("../stateTree.js");
const TwoCols = require("../components/main/Layout/TwoCols.jsx");
const lookups = stateTree.select("stores", "lookups");
const DatePicker = require("react-date-picker");
const DropdownButton = require("react-bootstrap/lib/DropdownButton");
const MenuItem = require("react-bootstrap/lib/MenuItem");
const Tooltip = require("react-bootstrap/lib/Tooltip");
const OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");
const Input = require("react-bootstrap/lib/Input");

const typeMap = {
    string: "text",
    int32: "number",
    int: "number"
};

function getOptionsForLookupType(lookupType) {
    return lookups
        .get()
        .filter(l => l.Type === lookupType)
        .map(l => [l.ID, l.Value, l.Description]);
}

let EntityFormFields = React.createClass({
    mixins: [stateTree.mixin],
    cursors: { definitions: ["definitions"] },
    propTypes: {
        initialValues: React.PropTypes.object
    },
    getDefaultProps() {
        return { initialValues: {} };
    },
    getInitialState() {
        return {vals: Object.assign({}, this.props.initialValues)};
    },
    componentWillUpdate(nextProps, nextState) {
        if (typeof this.props.onChange === "function") {
            this.props.onChange(nextState);
        }
    },
    valueChanged(e, val, prop) {
        e.preventDefault();
        this.setState({[prop]: val || e.target.value});
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
            let title = prop.replace(/ID$/, "");
            switch (type) {
                case "string":
                case "int":
                    input = (
                        <Input
                            autofocus={i === 0}
                            label={title}
                            key={i}
                            onChange={e => this.valueChanged(e, null, prop)}
                            id={prop}
                            type={typeMap[type]} />
                    );
                    break;
                case "Time":
                    input = (<DatePicker key={i} />);
                    break;
                default:
                    if (entityDef[prop].ref === "Lookup") {
                        let lookups = getOptionsForLookupType(title);
                        let options = lookups.map((o, n) => {
                            let menuItem = (
                                    <MenuItem
                                        onClick={e => this.valueChanged(e, o[0], prop) }
                                        key={n}
                                        eventkey={n}>
                                        {o[1]}
                                    </MenuItem>
                            );
                            return o[2] ? (
                                <OverlayTrigger key={n} overlay={<Tooltip>{o[2]}</Tooltip>}>
                                    {menuItem}
                                </OverlayTrigger>
                            ) : menuItem;
                        });
                        let selectedID = this.state[prop] || 0;
                        input = (
                            <DropdownButton
                                bsStyle={"default"}
                                title={selectedID !== 0 ? lookups.filter(l => l[0] === selectedID)[0][1] : title}>
                                {options}
                            </DropdownButton>
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
    render() {
        let content = <EntityFormFields onChange={(state) => console.log(state)} entity="Task"></EntityFormFields>;
        return (<TwoCols Content={content}></TwoCols>);
    }
});