import "./skeletonLoader.css";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const SkeletonLoader = ({ width, height, borderRadius }: SkeletonProps) => {
  return (
    <div
      className="skeleton-loader"
      style={{
        width: width || "100%",
        height: height || "20px",
        borderRadius: borderRadius || "9px",
      }}
    />
  );
};

export default SkeletonLoader;
