import './style.scss'

const navItems = [
  { href: '#AboutProject', title: 'О проекте' },
  { href: '#AssistantsAdvantages', title: 'Преимущества' },
  { href: '#BlockChain', title: 'BlockChain' },
  { href: '#Presentation', title: 'Презентация' },
  { href: '#FAQ', title: 'FAQ' },
]

export const LandingNavigation = () => {
  // Render
  const renderNavItem = (item: (typeof navItems)[number]) => {
    if (item.href) {
      return (
        <a
          key={item.title}
          className="navigation__item"
          href={item.href}
        >
          {item.title}
        </a>
      )
    }

    return (
      <div
        key={item.title}
        className="navigation__item"
      >
        {item.title}
      </div>
    )
  }

  return <div className="navigation">{navItems.map((item) => renderNavItem(item))}</div>
}
