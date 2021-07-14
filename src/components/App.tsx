import { useState } from "react";

import Carousel from "components/Carousel";
import TweakParams, { Params } from "components/TweakParams";

import doge1 from "../assets/doge1.jpg";
import doge2 from "../assets/doge2.jpg";
import doge3 from "../assets/doge3.jpg";
import doge4 from "../assets/doge4.jpg";
import doge5 from "../assets/doge5.jpg";
import doge6 from "../assets/doge6.jpg";
import doge7 from "../assets/doge7.jpg";

const slides = [
  { name: "doge1", imgSrc: doge1 },
  { name: "doge2", imgSrc: doge2 },
  { name: "doge3", imgSrc: doge3 },
  { name: "doge4", imgSrc: doge4 },
  { name: "doge5", imgSrc: doge5 },
  { name: "doge6", imgSrc: doge6 },
  { name: "doge7", imgSrc: doge7 },
];

const DEFAULT_PARAMS: Params = {
  height: 200,
  slideWidth: 200,
  gutterWidth: 30,
};

const App = () => {
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const { height, slideWidth, gutterWidth } = params;
  return (
    <div className="flex-grow flex flex-col justify-center">
      <Carousel
        height={height}
        slideWidth={slideWidth}
        gutterWidth={gutterWidth}
        slides={slides}
      />
      <TweakParams params={params} setParams={setParams} />
      <LinkToSource />
    </div>
  );
};

const LinkToSource = () => (
  <div className="absolute bottom-0 left-0 right-0 text-center">
    <a
      rel="noreferrer noopener"
      target="_blank"
      className="underline"
      href="https://github.com/meriadec/carousel-demo"
    >
      source code
    </a>
  </div>
);

export default App;
