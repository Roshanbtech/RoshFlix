import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = ({height = 200, width = "100%", lines = 2}) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-3 flex flex-col items-center">
      <Skeleton height={height} width={width} borderRadius={8} />
      <div className="mt-4 w-full">
        {[...Array(lines)].map((_, i) => (
          <Skeleton key={i} width={`${70 - i * 10}%`} height={20 - i * 2} className="mt-2" />
        ))}
      </div>
    </div>
    </>
  )
}

export default SkeletonCard