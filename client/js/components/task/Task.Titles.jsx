"use strict";

import React from "react";
import Lookup from "../main/Lookup.jsx";

export default function() {
    return [
        {name: "Name"},
        {name: "Status", getter(row) { return (<Lookup lookupID={row.TaskStatusID} />); }},
        {name: "Category", getter(row) { return (<Lookup lookupID={row.TaskCategoryID} />); }},
        {name: "Priority", getter(row) { return (<Lookup lookupID={row.TaskPriorityID} />); }},
        {name: "Description"}
    ];
}