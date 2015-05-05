"use strict";

import React from "react";

export default {
    titles: React.PropTypes.func,
    data: React.PropTypes.array,
    containerElement: React.PropTypes.string,
    filter: React.PropTypes.func,
    sort: React.PropTypes.func,
    filterUrlPrefix: React.PropTypes.string,
    storeName: React.PropTypes.string.isRequired,
    itemsInPage: React.PropTypes.number,
    queryPrefix: React.PropTypes.string,
    removeAllTitles: React.PropTypes.bool
};