import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = ({height = 200, width = "100%", lines = 2}) => (
  <div className="bg-cyber-glass neon-skeleton rounded-2xl shadow-neon p-3 flex flex-col items-center">
    <Skeleton
      height={height}
      width={width}
      borderRadius={12}
      baseColor="#3f0fff"
      highlightColor="#00fff7"
      className="neon-skeleton"
    />
    <div className="mt-4 w-full">
      {[...Array(lines)].map((_, i) => (
        <Skeleton
          key={i}
          width={`${70 - i * 10}%`}
          height={20 - i * 2}
          baseColor="#3f0fff"
          highlightColor="#00fff7"
          className="mt-2 neon-skeleton"
        />
      ))}
    </div>
  </div>
);

export default SkeletonCard;
