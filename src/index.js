import React, { Component } from 'react';
import styled from 'styled-components';
import shortId from 'shortid';
import PerfectScrollbar from 'perfect-scrollbar';

class ScrollingList extends Component {
    constructor(props) {
        super(props)
        this.id = shortId.generate()
    }

    componentDidMount() {
        this._setupScroll();
    }

    componentDidUpdate() {
        this._setupScroll(true)
    }

    _setupScroll(update) {
        const ps = new PerfectScrollbar(document.getElementById(this.id), {
            wheelSpeed: .5
        })
        if(update) ps.update()
    }

    render() {
        const { maxWidth, maxHeight, color, style, className, children } = this.props;
        return (
            <Wrapper id={this.id} maxHeight={maxHeight || '200px'} maxWidth={maxWidth || '100%'} color={color || '#ccc'} style={style} className={className}>
                {children}
            </Wrapper>
        );
    }
}

export default ScrollingList;

const hex2rgb = hex => {
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c = hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255].join(',');
    }
    throw new Error('Invalid HEX value provided for ScrollingList prop "color" ');
}

const Wrapper = styled.div`
    max-width: ${props => props.maxWidth};
    max-height: ${props => props.maxHeight};
    position: relative;
    overflow: hidden;
    border-radius: 0;
    .ps__rail-y {
        opacity:0;
        background: ${props => 'rgba('+hex2rgb(props.color)+',.15)'};
        width:8px;
        position:absolute;
        right:0;
        top:0;
        cursor:pointer;
        .ps__thumb-y {
            position:absolute;
            border-radius: 20px;
            background: ${props => props.color};
            width:100%;
            right:0;
            cursor:pointer;
        }
    }
    .ps__rail-x {
        opacity:0;
        background: ${props => 'rgba('+hex2rgb(props.color)+',.1)'};
        height:8px;
        position:absolute;
        bottom:0;
        cursor:pointer;
        .ps__thumb-x {
            position:absolute;
            border-radius: 20px;
            background: ${props => props.color};
            height:100%;
            bottom:0;
            cursor:pointer;
        }
    }
    &.ps--active-x {
        padding-bottom:8px;
        .ps__rail-x { 
            opacity:1; 
        }
    }
    &.ps--active-y {
        padding-right:8px;
        .ps__rail-y { 
            opacity:1; 
        }
    }
`