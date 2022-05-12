import React from "react";
import { List } from 'immutable';
import { Map } from 'immutable';
import "./DrawArea.css";
import axios from "axios";

const axios_ = axios.create({
    baseURL: 'http://localhost:5000',
    headers: { 'Content-Type': 'application/json' },
  })

const saveSvgAsPng = require('save-svg-as-png')

const imageOptions = {
    scale: 5,
    encoderOptions: 1,
    backgroundColor: 'white',
}


export default class DrawArea extends React.Component {
    constructor(props) {
        super(props);
        this.initState = {
            isDrawing: false,
            lines: new List(),
            post_request: false,
            predicted: new List(),
            font_size: ['20px','20px','20px','20px','20px','20px','20px','20px','20px','20px']
        };
        this.state = this.initState;
        this.drawAreaRef = React.createRef();
        this.draw = this.draw.bind(this)
        this.startDraw = this.startDraw.bind(this)
        this.finishDraw = this.finishDraw.bind(this)
        this.clearDrawingArea = this.clearDrawingArea.bind(this)
        this.predict = this.predict.bind(this)
    }

    async predict(){
        saveSvgAsPng.svgAsPngUri(document.getElementById('drawing'), imageOptions).then(uri => {
            const response = axios_.post('/predict', uri)
            return response;
        }).then(response => {
            this.setState(prevState => ({
                predicted: response.data.predicted,
                font_size: response.data.font_size
            }))
        })
    }

    startDraw(mouseEvent) {
        if (mouseEvent.button !== 0) {
            return;
        }

        const point = this.getCoordinates(mouseEvent);
        
        this.setState(prevState => ({
            lines: prevState.lines.push(new List([point])),
            isDrawing: true,
            }));
    }

    getCoordinates(mouseEvent) {
        if (!this.drawAreaRef.current) {return}
        const boundingRect = this.drawAreaRef.current.getBoundingClientRect();
        return new Map({
            x: mouseEvent.clientX - boundingRect.left,
            y: mouseEvent.clientY - boundingRect.top,
        });
    }

    draw(mouseEvent) {
        if (!this.state.isDrawing) {
            return;
        }

        const point = this.getCoordinates(mouseEvent);

        this.setState(prevState => ({
                lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point)),
                post_request: true
        }));
    }

    finishDraw(){
        this.setState({isDrawing: false})
        if (this.state.post_request){
            this.predict()
            this.setState({post_request: false})
        }
    }

    clearDrawingArea(){
        this.setState({
            isDrawing: false,
            lines: new List(),
            post_request: false,
            predicted: new List(),
            font_size: ['20px','20px','20px','20px','20px','20px','20px','20px','20px','20px']
        });
    }

    componentDidMount() {
        document.addEventListener("mouseup", this.finishDraw);
      }

    componentWillUnmount() {
    document.removeEventListener("mouseup", this.finishDraw);
    }

    render() {
        return (
                <div 
                    ref={this.drawAreaRef} 
                    className="drawArea"
                    onMouseDown={this.startDraw}
                    onMouseMove={this.draw}
                    onMouseUp = {this.finishDraw}
                    onMouseLeave = {this.finishDraw}
                >
                    <Drawing lines={this.state.lines} />
                    <button onClick={this.clearDrawingArea}>Clear drawing</button>
                    <div className="predictions">
                        {[...Array(10)].map((x, i) =>
                            <p key={i} style={{fontSize: this.state.font_size[i]}}>{i}</p>
                        )}
                    </div>
                </div>
        );
    }
}

function DrawLine({ line }) {
    const pathData = 'M ' + line.map(p => {
        return `${p.get('x')} ${p.get('y')}`;
    }).join(" L ")

    return <path className="path" d={pathData}/>;
}

function Drawing({lines}) {
    return(
        <svg className="drawing" id='drawing'>
            {lines.map((line, index) => (
                <DrawLine key={index} line={line} />
            ))}
        </svg>
    );
}



 
