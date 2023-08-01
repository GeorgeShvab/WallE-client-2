import { FC } from 'react'
import ContentLoader from 'react-content-loader'

const DocumentLoader: FC = () => {
  return (
    <div className="px-6">
      <div className="py-2.5">
        <ContentLoader
          speed={2}
          width={'100%'}
          height={40}
          viewBox="0 0 100% 40"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="40" />
        </ContentLoader>
      </div>
      <div className="pt-4 pb-6">
        <div className="mb-2">
          <ContentLoader
            speed={2}
            width={'100%'}
            height={42}
            viewBox="0 0 100% 42"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="42" />
          </ContentLoader>
        </div>
        <ContentLoader
          speed={2}
          width={'100%'}
          height={'calc(100vh - 152px)'}
          viewBox="0 0 100% calc(100vh - 152px)"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="calc(100vh - 152px)" />
        </ContentLoader>
      </div>
    </div>
  )
}

export default DocumentLoader
