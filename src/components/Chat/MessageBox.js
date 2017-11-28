import React, { Component } from 'react';
import './MessageBox.css';
import SystemMessage from './SystemMessage';
import Avatar from './Avatar';

const moment = require('moment');
const classNames = require('classnames');

export class MessageBox extends Component {
    render() {
        var positionCls = classNames('rce-mbox', { 'rce-mbox-right': this.props.position === 'right' });
        var thatAbsoluteTime = this.props.type !== 'text' && this.props.type !== 'file' && !(this.props.type === 'location' && this.props.text);

        return (
            <div
                className={classNames('rce-container-mbox', this.props.className)}
                onClick={this.props.onClick}>
                {
                    this.props.renderAddCmp instanceof Function &&
                    this.props.renderAddCmp()
                }
                {
                    this.props.type === 'system' ?
                        <SystemMessage
                            text={this.props.text} />
                        :
                        <div
                            className={classNames(
                                positionCls,
                                {'rce-mbox--clear-padding': thatAbsoluteTime},
                                {'rce-mbox--clear-notch': !this.props.notch}
                            )}>
                            <div className='rce-mbox-body'>
                                {
                                    this.props.forwarded === true &&
                                    <div
                                        className={classNames(
                                            'rce-mbox-forward',
                                            { 'rce-mbox-forward-right': this.props.position === 'left' },
                                            { 'rce-mbox-forward-left': this.props.position === 'right' }
                                        )}
                                        onClick={this.props.onForwardClick}>
                                    </div>
                                }

                                {
                                    (this.props.title || this.props.avatar) &&
                                    <p
                                        style={this.props.titleColor && { color: this.props.titleColor }}
                                        onClick={this.props.onTitleClick}
                                        className={classNames('rce-mbox-title', {
                                            'rce-mbox-title--clear': this.props.type === 'text',
                                        })}>
                                        {
                                            this.props.avatar &&
                                            <Avatar
                                                src={this.props.avatar}/>
                                        }
                                        {
                                            this.props.title &&
                                            <span>{this.props.title}</span>
                                        }
                                    </p>
                                }

                                {
                                    this.props.type === 'text' &&
                                    <div className="rce-mbox-text">
                                        {this.props.text}
                                    </div>
                                }

                                <div className={classNames('rce-mbox-time', { 'rce-mbox-time-block': thatAbsoluteTime })}>
                                    {
                                        this.props.date &&
                                        !isNaN(this.props.date) &&
                                        (
                                            this.props.dateString ||
                                            moment(this.props.date).fromNow()
                                        )
                                    }
                                </div>
                            </div>

                            {
                                this.props.notch &&
                                (this.props.position === 'right' ?
                                        <svg className="rce-mbox-right-notch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M0 0v20L20 0" />
                                        </svg>
                                        :
                                        <div>
                                            <svg className="rce-mbox-left-notch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <defs>
                                                    <filter id="filter1" x="0" y="0">
                                                        <feOffset result="offOut" in="SourceAlpha" dx="-2" dy="-5" />
                                                        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
                                                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                                                    </filter>
                                                </defs>
                                                <path d="M20 0v20L0 0" filter="url(#filter1)" />
                                            </svg>
                                        </div>
                                )
                            }
                        </div>
                }
            </div>
        );
    }
}

MessageBox.defaultProps = {
    position: 'left',
    type: 'text',
    text: '',
    title: null,
    titleColor: null,
    onTitleClick: null,
    onForwardClick: null,
    date: new Date(),
    data: {},
    onClick: null,
    onOpen: null,
    onDownload: null,
    forwarded: false,
    status: null,
    dateString: null,
    notch: true,
    avatar: null,
    renderAddCmp: null,
};


export default MessageBox;