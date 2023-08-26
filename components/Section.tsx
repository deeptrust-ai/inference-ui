import type { ReactNode } from "react";

type ISectionProps = {
  title?: string;
  description?: string;
  yPadding?: string;
  children: ReactNode;
};

const Section = (props: ISectionProps) => (
  <div
    className={`mx-auto max-w-screen-lg px-3 ${
      props.yPadding ? props.yPadding : "py-16"
    }`}
  >
    {(props.title || props.description) && (
      <div className="mb-12">
        {props.title && <h2 className="text-4xl font-bold ">{props.title}</h2>}
        {props.description && (
          <div className="mt-4 text-xl md:px-20 text-slate-400">
            {props.description}
          </div>
        )}
      </div>
    )}

    {props.children}
  </div>
);

export default Section;
