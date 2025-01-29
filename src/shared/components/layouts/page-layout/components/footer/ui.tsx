import './style.scss'

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__left">
        <div className="footer__item">© 2024 PRM4ALL. All Rights Reserved.</div>
      </div>
      <div className="footer__right">
        <div className="footer__item">Web 3.0</div>
        <a
          className="footer__item"
          href="https://prm4all.gitbook.io/prm4all/v/whitepaper-prm4all-v-1.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhitePaper
        </a>
        <div className="footer__item">SmartContract</div>
      </div>
    </div>
  )
}
