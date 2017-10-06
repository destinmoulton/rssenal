import React, { Component } from "react";
import { connect } from "react-redux";

class EntriesList extends Component {
    constructor(props){
        super(props);
    }

    _filterEntries(){
        const { entries, filter } = this.props;

        return entries;
    }

    render() {
        const entriesToDisplay = this._filterEntries();
        console.log(entriesToDisplay);
        let entryList = [];
        entriesToDisplay.map((entry)=>{
            const el =  <div key={entry._id}>
                            {entry.title}
                        </div>;

            entryList.push(el);
        })
        return (
            <div>
                {entryList}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    const { entries } = state;
    return {
        entries: entries.entries
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(EntriesList);