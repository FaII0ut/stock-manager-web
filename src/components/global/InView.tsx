import React, { useEffect, useState } from "react";
import { useInView } from "react-hook-inview";

interface InViewProps {
  callback: () => void;
}

const InView = ({ callback }: InViewProps) => {
  const [ref, isVisible] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    isVisible ? callback() : null;
  });

  return <div ref={ref}></div>;
};

export default InView;
