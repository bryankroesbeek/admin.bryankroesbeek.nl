import * as React from 'react'
import { Link } from 'react-router-dom';

type ImageProps = {

}

type ImageState = {
    show: boolean
    imgsrc: string
}

export class ImageComponent extends React.Component<ImageProps, ImageState> {
    constructor(props: ImageProps) {
        super(props)

        this.state = {
            imgsrc: "",
            show: false
        }
    }

    loadImage(input: File) {
        let r = new FileReader()
        r.readAsDataURL(input)
        r.onload = () => {
            this.setState({ imgsrc: r.result.toString() }, () => {
                this.setState({ show: true })
            })
        }
    }

    render() {
        return (<div>
            <img src={this.state.imgsrc} alt="" />
            <input onChange={e => this.loadImage(e.target.files[0])} type="file" name="image" id="image" accept="image/png, image/jpeg" />
        </div>)
    }
}