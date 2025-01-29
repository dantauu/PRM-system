import './style.scss'
import { useFunnelStatuses } from '@/shared/hooks/strategy/use-funnel-statuses'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

const FunnelChart = () => {
  const { items } = useFunnelStatuses({})
  const svgRef = useRef()

  // Функция для проверки, содержит ли значение поля name числа
  const containsNumbers = (value: string) => {
    return /\d/.test(value)
  }

  // Фильтрация items, чтобы исключить элементы с числами в поле name
  const filteredItems = items.filter((item) => !containsNumbers(item.name))

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr('width', 300).attr('height', 350)
    const margin = { top: 0, right: 0, bottom: 0, left: 0 }
    const width = 300
    const height = 350
    // const totalValue = data.reduce((acc, d) => acc + d.value, 0);

    svg.selectAll('*').remove()

    const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

    // const colorScale = d3.scaleLinear()
    //     .domain([0, data.length])
    //     .range(["#11658a", "#57c3f2"]);

    const trapezoidWidth = width
    let accumulatedHeight = 0
    const widthReductionStep = 22
    let currentTopWidth = trapezoidWidth

    filteredItems.forEach((d, i) => {
      const trapezoidHeight = height / filteredItems.length
      let bottomWidth = Math.max(currentTopWidth - widthReductionStep, 10)

      currentTopWidth = bottomWidth
      const x = (width - currentTopWidth) / 2
      const y = accumulatedHeight

      const pathData = d3.path()
      pathData.moveTo(x, y)
      pathData.lineTo(x + currentTopWidth, y)
      pathData.lineTo(
        x + currentTopWidth - (currentTopWidth - bottomWidth) / 2,
        y + trapezoidHeight
      )
      pathData.lineTo(x + (currentTopWidth - bottomWidth) / 2, y + trapezoidHeight)
      pathData.closePath()

      chart
        .append('path')
        .attr('d', pathData.toString())
        .attr('fill', d.color)
        .attr('stroke', '#e4edf0')

      // chart
      //   .append('text')
      //   .attr('x', x + topWidth / 2)
      //   .attr('y', y + trapezoidHeight / 2)
      //   .attr('text-anchor', 'middle')
      //   .attr('fill', 'white')
      //   .style('font-size', '12px')
      //   .text(`${d.name} : ${d.value}`)

      accumulatedHeight += trapezoidHeight
    })
  }, [filteredItems])

  return (
    <div className="funnel">
      <svg
        ref={svgRef}
        width={300}
        height={400}
      ></svg>
    </div>
  )
}

export default FunnelChart
