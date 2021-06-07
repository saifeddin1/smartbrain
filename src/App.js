import React, { Component } from 'react'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logos/Logo'
import Rank from './components/Ranks/Rank'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import './App.css'
import Particles from 'react-particles-js';

import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey : '4004b4cc2bcf47d5b5ede4f565309fb7'
})

const particlesOption = {
  particles: {
    number:  {
      value: 70,
      density: {
        enable: true,
        value_area : 800
      }
    }
  }
}
export class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputimg');
    const width = Number(img.width)
    const height = Number(img.height)
    console.log(width, height);
    console.log(face.left_col, face.top_row);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.right_col * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box:box})
  }
  onInputChange = (e) => {
    this.setState({ input: e.target.value});
  }

  onButtonSubmit = () =>  { 
    this.setState({imageUrl: this.state.input})
    console.log(this.state.imageUrl);
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input,
    ).then(res => this.displayFaceBox(this.calculateFaceLocation(res))) //.outputs[0].data.regions[0].region_info.bounding_box)
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  
  render() {
    const { imageUrl, box, isSignedIn  ,route} = this.state;
    return (
      <div className="App">
      <Particles params={particlesOption} className='particles'/>
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
      {route === 'home' 
      ? 
      <>
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={imageUrl} box={box}/>  
      </>
      : (
        route == 'signin'
        ? <SignIn onRouteChange={this.onRouteChange}  />
        : <Register onRouteChange={this.onRouteChange}  /> 
      ) 
        }
      </div>
    );
  }
}

export default App
