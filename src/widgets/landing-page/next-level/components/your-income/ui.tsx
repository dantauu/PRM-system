import './style.scss'
import BlobImage from '@/assets/landing/images/bl2.gif'
import ChartImage from '@/assets/landing/images/graphik.png'

export const YourIncome = () => {
  return (
    <div className="your-income">
      <div className="your-income__header">
        <div className="your-income__title">Ваш доход</div>
        <div className="your-income__month">August</div>
        <div className="your-income__chevron"></div>
        <div className="your-income__per-day">Day 9-15.1k</div>
      </div>
      <div className="your-income__chart">
        <div className="your-income__blob">
          <img
            className="your-income__blob-img"
            src={BlobImage}
            alt="blob"
          />
        </div>

        <img
          className="your-income__chart-image"
          src={ChartImage}
          alt="Revenue"
        />
      </div>
      <div className="your-income__price">
        <div className="your-income__price-value">$6,000</div>
        <div className="your-income__price-chart"></div>
      </div>
      <div className="your-income__total">
        <div className="your-income__total-left">
          <div className="your-income__total-spent">Total Spent</div>
          <div className="your-income__total-date">August,2023</div>
        </div>
        <div className="your-income__total-right">
          <div className="your-income__total-percent">+24%</div>
          <div className="your-income__total-last-month">Last Month</div>
        </div>
      </div>
    </div>
  )
}
