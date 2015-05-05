"use strict";

import React from "react";
import Grid from "react-bootstrap/lib/Grid";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

function ensureKeys(el) {
    if (!Array.isArray(el)) {
        return el;
    }
    return el.map((_el, i) => {
        if (!_el || !!_el.key) {
            return _el;
        }
        if (_el._isReactElement) {
            return React.cloneElement(_el, { key: i });
        }
        return (<div key={i}>{_el}</div>);
    });
}

export default React.createClass({
    render() {
        let sidebar = null;
        let mainColspan = 12;
        let mainColPull = 0;
        if (!!this.props.Sidebar && (!Array.isArray(this.props.Sidebar) || this.props.Sidebar.length > 0)) {
            mainColspan = 8;
            mainColPull = 4;
            sidebar = (
                <Col sm={4} smPush={8} className="content">
                    {ensureKeys(this.props.Sidebar)}
                </Col>
            );
        }
        return (
            <Grid fluid role="main">
                <Row>
                    {sidebar}
                    <Col sm={mainColspan} smPull={mainColPull} className="content">
                        {ensureKeys(this.props.Content)}
                    </Col>
                </Row>
            </Grid>
        );
    }
});