import { useMemo, useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";

type CarouselSlide = {
  name: string;
  imgSrc: string;
};

type CarouselProps = {
  height: number;
  slides: CarouselSlide[];
  slideWidth: number;
  gutterWidth: number;
};

const PADDING = 20;

const Carousel = (props: CarouselProps) => {
  const { slides, slideWidth, gutterWidth, height } = props;
  const [containerRef, { width: totalWidth }] = useMeasure<HTMLDivElement>();
  const [cursor, setCursor] = useState(0);

  const nbDisplayedSlides = useNbDisplayedSlides(props, totalWidth);

  const offset =
    -1 * (cursor * slideWidth + cursor * gutterWidth) +
    (totalWidth -
      (nbDisplayedSlides * slideWidth +
        (nbDisplayedSlides - 1) * gutterWidth)) /
      2;

  const canPrev = cursor > 0;
  const canNext = cursor + nbDisplayedSlides < slides.length;

  const prev = () => setCursor(cursor - 1);
  const next = () => setCursor(cursor + 1);

  // ensure cursor is correctly re-set if needed if page is resized
  useEffect(() => {
    const handler = () => {
      setCursor((cursor) => {
        if (cursor + nbDisplayedSlides > slides.length) {
          return slides.length - nbDisplayedSlides;
        }
        return cursor;
      });
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [setCursor, nbDisplayedSlides, slides.length]);

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{ height: height + PADDING * 2 }}
      ref={containerRef}
    >
      <div
        className="absolute left-0 flex"
        style={{ bottom: PADDING, top: PADDING }}
      >
        {totalWidth > 0 && (
          <CarouselSlides
            slides={slides}
            offset={offset}
            slideWidth={slideWidth}
            gutterWidth={gutterWidth}
            cursor={cursor}
            nbDisplayedSlides={nbDisplayedSlides}
          />
        )}
      </div>
      {canPrev && (
        <div className="absolute top-0 left-[10px] bottom-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={prev}
            className="pointer-events-auto bg-blue-800 text-white font-bold w-[40px] h-[40px] rounded-full"
          >
            {"<"}
          </button>
        </div>
      )}
      {canNext && (
        <div className="absolute top-0 right-[10px] bottom-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={next}
            className="pointer-events-auto bg-blue-800 text-white font-bold w-[40px] h-[40px] rounded-full"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

const useNbDisplayedSlides = (props: CarouselProps, totalWidth: number) => {
  const { slideWidth, gutterWidth, slides } = props;
  const nbTotalSlides = slides.length;
  return useMemo(() => {
    let nb = 0;
    while (
      (nb + 1) * slideWidth + nb * gutterWidth < totalWidth &&
      nb < nbTotalSlides
    ) {
      nb++;
    }
    return nb;
  }, [slideWidth, gutterWidth, nbTotalSlides, totalWidth]);
};

type CarouselSlidesProps = {
  slides: CarouselSlide[];
  slideWidth: number;
  gutterWidth: number;
  offset: number;
  cursor: number;
  nbDisplayedSlides: number;
};

const CarouselSlides = (props: CarouselSlidesProps) => {
  const { offset, slides, slideWidth, gutterWidth, cursor, nbDisplayedSlides } =
    props;
  const spring = useSpring({
    transform: `translate3d(${offset}px, 0, 0)`,
  });

  return (
    <animated.div style={spring} className="flex">
      {slides.map((slide, i) => {
        const isOut = i < cursor - 1;
        const inner = isOut ? null : (
          <Slide
            slide={slide}
            slideWidth={slideWidth}
            isVisible={i >= cursor && i < cursor + nbDisplayedSlides}
          />
        );
        const style = { width: slideWidth, marginRight: gutterWidth };
        return (
          <div key={slide.name} style={style} className="flex">
            {inner}
          </div>
        );
      })}
    </animated.div>
  );
};

type SlideProps = {
  slide: CarouselSlide;
  slideWidth: number;
  isVisible: boolean;
};

const Slide = (props: SlideProps) => {
  const { slide, slideWidth, isVisible } = props;
  const spring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: `scale(${isVisible ? 1 : 0.8})`,
  });
  return (
    <animated.div
      key={slide.name}
      style={{
        width: slideWidth,
        backgroundImage: `url(${slide.imgSrc})`,
        backgroundSize: "cover",
        ...spring,
      }}
      className="p-4 shadow-md rounded-md text-white font-bold"
    >
      <span className="bg-gray-700 bg-opacity-70">{slide.name}</span>
    </animated.div>
  );
};

export default Carousel;
