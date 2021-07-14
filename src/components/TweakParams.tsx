import { ChangeEvent } from "react";

export type Params = {
  height: number;
  gutterWidth: number;
  slideWidth: number;
};

type TweakParamsProps = {
  params: Params;
  setParams: (params: Params) => void;
};

const TweakParams = (props: TweakParamsProps) => {
  const { params, setParams } = props;
  const bind = (k: keyof Params) => ({
    value: params[k],
    onChange: (v: number) => setParams({ ...params, [k]: v }),
  });
  return (
    <div className="absolute top-[10px] right-[20px] select-none">
      <Range name="height" min={100} max={300} {...bind("height")} />
      <Range name="gutterWidth" min={5} max={50} {...bind("gutterWidth")} />
      <Range name="slideWidth" min={120} max={300} {...bind("slideWidth")} />
    </div>
  );
};

type RangeProps = {
  name: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
};

const Range = (props: RangeProps) => {
  const { onChange, name, ...p } = props;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };
  return (
    <div>
      <div>{`${name} (${props.value})`}</div>
      <input type="range" {...p} onChange={handleChange} />
    </div>
  );
};

export default TweakParams;
