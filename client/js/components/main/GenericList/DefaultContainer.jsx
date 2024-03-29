"use strict";

import React from "react";
import Table from "react-bootstrap/lib/table";

var DefaultContainer = React.createClass({
    render() {
        let titles = this.props.titles(this.props.data)
            .filter((title) => !this.props.hidetitles || this.props.hidetitles.indexOf(title.name) === -1);

        let TableTitles = titles.map(t => (<th key={t.name}>{t.title || t.name}</th>));

        let Rows = this.props.data
            .map((datarow, i) => {
                let row = titles.map(t => (<td key={t.name}>{t.getter ? t.getter(datarow, i) : datarow[t.name]}</td>));
                return (<tr key={i}>{row}</tr>);
            });

        let HeadSection = this.props.removeTitles ? false : (
                <thead>
                    <tr>
                        {TableTitles}
                    </tr>
                </thead>
            );

        return (
            <div>
                <Table responsive>
                    {HeadSection}
                    <tbody>
                        {Rows}
                    </tbody>
                </Table>
                {this.props.children}
            </div>
        );
    }
});

module.exports = DefaultContainer;