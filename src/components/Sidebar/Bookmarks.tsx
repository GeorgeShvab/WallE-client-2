import useBookmarks from '@/hooks/useBookmarks'
import { FC } from 'react'
import BookmarkDocuments from '../Document/BookmarkDocuments'

const Bookmarks: FC = () => {
  const bookmarks = useBookmarks()

  return (
    <div
      className="overflow-hidden duration-300 transition-all"
      style={{ height: bookmarks.bookmarks.length ? bookmarks.bookmarks.length * 40 + 64 + 'px' : '0' }}
    >
      <div>
        <div className="flex justify-between items-center mb-2 py-0.5 px-4">
          <h3 className="text-sm text-neutral-500 font-medium">Закладки</h3>
        </div>
        <div className="px-2">{bookmarks.bookmarks && <BookmarkDocuments documents={bookmarks.bookmarks} />}</div>
      </div>
      <div className="px-4">
        <hr className="h-px bg-neutral-300 my-4" />
      </div>
    </div>
  )
}

export default Bookmarks
