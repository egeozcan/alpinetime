"use strict";

const React = require("react");
const stateTree = require("../stateTree.js");
const TwoCols = require("../components/main/Layout/TwoCols.jsx");
const lookups = stateTree.select("stores", "lookups");
const DatePicker = require("react-date-picker");
const DropdownButton = require("react-bootstrap/lib/DropdownButton");
const MenuItem = require("react-bootstrap/lib/MenuItem");
const Tooltip = require("react-bootstrap/lib/Tooltip");
const OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");

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
    valueChanged(name, newVal) {
        console.log(name, newVal);
    },
    render() {
        var entity = this.props.entity;
        var entityDef = this.cursors.definitions.get()[entity];
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
                    input = (<input key={i} type={typeMap[type]} />);
                    break;
                case "Time":
                    input = (<DatePicker key={i} />);
                    break;
                default:
                    if (entityDef[prop].ref === "Lookup") {
                        let options = getOptionsForLookupType(title).map((o, n) => {
                            return (
                                <OverlayTrigger overlay={<Tooltip>{o[2]}</Tooltip>}>
                                    <MenuItem
                                        eventkey={n}
                                        key={n}>
                                        {o[1]}
                                    </MenuItem>
                                </OverlayTrigger>
                            );
                        });
                        input = (
                            <DropdownButton
                                bsStyle={"default"}
                                title={title}
                                key={i}>
                                {options}
                            </DropdownButton>
                        );
                    }
                    break;
            }
            var def = entityDef[prop];
            return (
                <div key={prop + "_field"}>
                    <h4>{prop}</h4>
                    {input}
                    <pre>{JSON.stringify(def, null, 2)}</pre>
                </div>
            );
        });
        return (<div>{fields}</div>);
    }
});

export default React.createClass({
    render() {
        let content = <EntityFormFields entity='Package'></EntityFormFields>;
        return (<TwoCols Content={content}></TwoCols>);
    }
});