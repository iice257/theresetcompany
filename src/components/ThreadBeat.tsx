import { PostCard } from './PostCard';
import type { PostKey } from '@/content/posts';

export function ThreadBeat({ ids, className = '' }: { ids: PostKey[]; className?: string }) {
  return <div className={`thread-beat ${className}`}>
    <div className="beat-cards">{ids.slice(0, 2).map(id => <PostCard key={id} id={id}/>)}</div>
    {ids.length > 2 && <details className="thread-more">
      <summary>+ {ids.length - 2} more in the thread <span aria-hidden="true">â†—</span></summary>
      <div>{ids.slice(2).map(id => <PostCard key={id} id={id}/>)}</div>
    </details>}
  </div>;
}
