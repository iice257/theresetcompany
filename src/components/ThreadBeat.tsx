import { PostCard } from './PostCard';
import type { PostKey } from '@/content/posts';

export function ThreadBeat({
  ids,
  className = '',
  visible = 2,
}: {
  ids: PostKey[];
  className?: string;
  visible?: number;
}) {
  return (
    <div className={`thread-beat ${className}`}>
      <div className="beat-cards">
        {ids.slice(0, visible).map((id) => (
          <PostCard key={id} id={id} />
        ))}
      </div>
      {ids.length > visible && (
        <details className="thread-more">
          <summary>
            + {ids.length - visible} more in the thread{' '}
            <span aria-hidden="true">↗</span>
          </summary>
          <div>
            {ids.slice(visible).map((id) => (
              <PostCard key={id} id={id} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
