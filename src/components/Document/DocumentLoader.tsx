import ContentLoader from 'react-content-loader'

const DocumentLoader = () => (
  <div className="py-1">
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
)

export default DocumentLoader
