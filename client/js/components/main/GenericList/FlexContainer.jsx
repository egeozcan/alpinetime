"use strict";

import React from "react";

var FlexContainer = React.createClass({
    render() {
        let titles = this.props.titles(this.props.data)
            .filter((title) => !this.props.hidetitles || this.props.hidetitles.indexOf(title.name) === -1);

        let TitleRow = this.props.removeAllTitles ? false : titles.map(t => (
            <div className="box-col" key={t.name} style={t.style}>
                {t.title || t.name}
            </div>));

        let Rows = this.props.data
            .map((datarow, i) => {
                let Row = titles.map(t => (
                    <div className="box-col" key={t.name} style={t.style}>
                        {t.getter ? t.getter(datarow, i) : datarow[t.name]}
                    </div>));
                return (
                    <div className="box-row" key={i}>
                        {Row}
                    </div>);
            });

        return (
            <div>
                <div className="box-container">
                    <div className="box-title-row">
                        {TitleRow}
                    </div>
                    {Rows}
                </div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = FlexContainer;