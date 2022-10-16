import React from 'react';
import './App.css';
const responsiveImage: ResponsiveImageOutput = require('./moon.jpg?placeholder=true&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048')
const responsiveImageWebp: ResponsiveImageOutput = require('./moon.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=webp')

interface ResponsiveImageOutput {
  src: string
  srcSet: string
  placeholder: string | undefined
  images: { path: string; width: number; height: number }[]
  width: number
  height: number
  toString: () => string
}
console.log(responsiveImage)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <img
          srcSet={responsiveImage.srcSet}
          src={responsiveImage.src}
          // sizes="(min-width: 1024px) 1024px, 100vw"
          loading="lazy"
        /> */}
        <picture>
          <source srcSet={responsiveImageWebp.srcSet} type='image/webp' sizes='(min-width: 1024px) 1024px, 100vw' />
          <img
            src={responsiveImage.src}
            srcSet={responsiveImage.srcSet}
            width={responsiveImage.width}
            height={responsiveImage.height}
            sizes='(min-width: 1024px) 1024px, 100vw'
            loading="lazy"
          />
        </picture>
      </header>
    </div>
  );
}

export default App;
