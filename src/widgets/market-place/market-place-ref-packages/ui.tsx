import './style.scss'

export const MarketPlaceRefPackages = () => {
  const scrollToContent = (contentId: string) => {
    const content = document.getElementById(contentId)
    if (content) {
      content.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    }
  }

  return (
    <div className="market-place-ref-packages">
      <button
        onClick={() => scrollToContent('activityPackages')}
        className="market-place-ref-packages__item"
        autoFocus
      >
        Активность
      </button>
      <button
        onClick={() => scrollToContent('')}
        className="market-place-ref-packages__item"
      >
        Редактор
      </button>
      <button
        onClick={() => scrollToContent('strategyPackages')}
        className="market-place-ref-packages__item"
      >
        Стратегии
      </button>
    </div>
  )
}
