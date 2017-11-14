import { AllHtmlEntities } from "html-entities";
import * as moment from "moment";
import * as React from 'react';
import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import { TEntryID, IEntry, TFeeds, IRootStoreState, ISetting } from "../../interfaces";

// Define a typescript interface for the striptags module (@types/striptags did not work)
interface IStriptags{
    (html: string, allowedTags?: string | string[]): string;
}
const striptags: IStriptags = require("striptags");

const htmlEntities = new AllHtmlEntities();

interface IEntryItemProps {
    entry: IEntry;
    feeds: TFeeds;
    toggleEntry: (entryId: TEntryID)=>void;
    isActive: boolean;
    settings: ISetting[];
}

class EntryItem extends React.Component<IEntryItemProps> {

    state = {
        shouldShowImages: false
    };

    constructor(props: IEntryItemProps){
        super(props);

    }

    componentWillReceiveProps({ settings }: IEntryItemProps){
        let shouldShowImages = false;
        settings.forEach((setting)=>{
            if(setting.key === "show_images"){
                shouldShowImages = setting.value;
            }
        });

        this.setState({
            shouldShowImages
        })
    }

    _toggleEntry(entryId: TEntryID){
        const { toggleEntry } = this.props;

        toggleEntry(entryId);
    }

    _getBodyHTML(){
        const { entry } = this.props;
        const { shouldShowImages } = this.state;

        let body = htmlEntities.decode(entry.content);

        let tagsToAllow = ["a", "img"];
        if(!shouldShowImages){
            tagsToAllow = ["a"];
        }
        body = striptags(body, tagsToAllow);
        return {__html: body};
    }

    _getActiveEntryContent(){
        const { entry, feeds } = this.props;

        const activeFeed = feeds.get(entry.feed_id);
        const creator = (entry.creator !== undefined || entry.creator !== "") ? " by "+ entry.creator : "";
        const timeAgo = moment(entry.publish_date).fromNow()

        const info = <div className="rss-entry-info-container">{activeFeed.title}{creator} -- {timeAgo}</div>;

        const body = <div 
                        dangerouslySetInnerHTML={this._getBodyHTML()}
                        className="rss-entry-content-container"></div>

        const link =  <div
                        className="rss-entry-link-container">
                        <a
                            target="_blank"
                            href={entry.link}>
                            <Icon name="external square"/> Visit Website
                        </a>
                    </div>
        
        return (
            <div>{info}{body}{link}</div>
        );
    }

    render() {
        const { entry, isActive } = this.props;

        let content = null;
        if(isActive){
            content = this._getActiveEntryContent();
        }

        const title = htmlEntities.decode(entry.title);
        
        const entryClass = (entry.has_read) ? "rss-entry-title-hasread" : "rss-entry-title-unread";
        return (
            <div className="rss-entry-container" id={`rss-entry-item-${entry._id}`}>
                <div
                    className={entryClass}
                    onClick={this._toggleEntry.bind(this, entry._id)}>{title}</div>
                    {content}
            </div>
        );
    }
}

const mapStateToProps = (state: IRootStoreState)=>{
    const { feeds, settings } = state;
    return {
        feeds: feeds.feeds,
        settings: settings.settings
    }
}
export default connect(mapStateToProps)(EntryItem);