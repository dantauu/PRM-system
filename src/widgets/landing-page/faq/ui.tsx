import './style.scss'
import { FAQAccordion, FAQItem, RunningLine } from '@/entities/landing-page'
import { LandingLayout } from '@/shared/components'

const AccordeonFAQ: FAQItem[] = [
  {
    id: 1,
    title: 'Что такое PRM?',
    content: [
      'Приложение для повышения конверсии продаж вашего бизнеса.',
      <br key={1} />,
      <br key={2} />,
      'PRM позволяет:',
      <br key={3} />,
      'Монетизировать свои социальные сети;',
      <br key={4} />,
      'Вести статистику;',
      <br key={5} />,
      'Привлекать новых партнёров в автоматическом режиме;',
      <br key={6} />,
      'Создавать стратегии привлечения новых клиентов;',
      <br key={7} />,
      'Оптимизировать работу своей клиентской/партнерской сети в автоматическом режиме;',
      <br key={8} />,
      'Продавать свои стратегии продаж.',
    ],
  },
  {
    id: 2,
    title: 'На каких платформах доступна PRM?',
    content: ['Система будет доступна как в web версии, так и в приложении для IOS и Android.'],
  },
  {
    id: 3,
    title: 'На чём построена система?',
    content: [
      'Система построена на платформе WEB 3.0 все расчеты и начисления ведутся с помощью смартконтракта.',
    ],
  },
  {
    id: 4,
    title: 'Для кого этот продукт?',
    content: ['Для всех людей занимающихся MLM бизнесом. Или любой другой сферой продаж.'],
  },
  {
    id: 5,
    title: 'Есть ли свой маркетинг в рамках PRM?',
    content: [
      'Да, в рамках PRM4ALL есть маркетинг, позволяющий получать до 60% c товарооборота до 15 уровней в глубину.',
    ],
  },
  {
    id: 6,
    title: 'Есть ли whitepaper и смартконтракт?',
    content: (
      <>
        Да, у нас есть написанный{' '}
        <a
          href="https://prm4all.gitbook.io/prm4all/v/whitepaper-prm4all-v-1.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Whitepaper
        </a>
        , а также смартконтракты.
      </>
    ),
  },
]

export const LandingFAQ = () => {
  return (
    <LandingLayout.Section
      anchor="FAQ"
      className="landing-faq"
      useDefaultMT
    >
      <LandingLayout.Section
        className="landing-faq__running-line"
        noMargin
      >
        <RunningLine
          text="FAQ"
          title="Часто задаваемые вопросы"
        />
      </LandingLayout.Section>

      <FAQAccordion
        className="landing-faq__accordion"
        items={AccordeonFAQ}
      />
    </LandingLayout.Section>
  )
}
