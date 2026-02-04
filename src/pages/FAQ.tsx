import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BASE_URL } from '@/data/organization';

const faqData = [
  {
    question: 'Какой срок доставки напольных покрытий?',
    answer: 'Доставка по Москве осуществляется в течение 1-3 рабочих дней. Для Московской области срок составляет 2-5 дней. Доставка в регионы России занимает от 5 до 14 дней в зависимости от удалённости. При наличии товара на складе возможна доставка в день заказа.',
  },
  {
    question: 'Предоставляете ли вы услуги по укладке напольных покрытий?',
    answer: 'Да, мы предоставляем полный комплекс услуг по укладке всех видов напольных покрытий. Наши мастера имеют многолетний опыт работы и проходят регулярное обучение. Стоимость укладки зависит от типа покрытия и сложности работ. Мы предоставляем гарантию на монтажные работы сроком 2 года.',
  },
  {
    question: 'Какую гарантию вы даёте на продукцию?',
    answer: 'На все напольные покрытия действует гарантия производителя от 5 до 25 лет в зависимости от бренда и типа покрытия. Ламинат и паркетная доска обычно имеют гарантию 10-25 лет, виниловые покрытия — 5-15 лет. Гарантия распространяется на заводские дефекты при соблюдении условий эксплуатации.',
  },
  {
    question: 'Как правильно выбрать напольное покрытие для квартиры?',
    answer: 'При выборе покрытия учитывайте: назначение помещения (жилое, коммерческое), проходимость, наличие тёплого пола, влажность. Для кухни и ванной подойдут влагостойкие покрытия — кварц-винил или влагостойкий ламинат. Для спальни и гостиной — паркетная или инженерная доска. Наши консультанты помогут подобрать оптимальный вариант бесплатно.',
  },
  {
    question: 'Можно ли вернуть товар, если он не подошёл?',
    answer: 'Да, вы можете вернуть товар надлежащего качества в течение 14 дней с момента покупки при сохранении товарного вида и упаковки. Возврат товара ненадлежащего качества осуществляется в соответствии с законом о защите прав потребителей. Для оформления возврата обратитесь в наш офис или позвоните по телефону.',
  },
  {
    question: 'Есть ли у вас рассрочка или кредит на покупку?',
    answer: 'Да, мы предлагаем беспроцентную рассрочку на срок до 12 месяцев при покупке от 30 000 рублей. Также доступно оформление кредита через банки-партнёры. Решение по кредиту принимается в течение 15 минут. Для оформления потребуется только паспорт.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const FAQ = () => {
  usePageMeta(
    'Вопросы и ответы',
    'Ответы на популярные вопросы: доставка, укладка, гарантия, выбор напольного покрытия. ПолМастер — консультации и помощь в подборе.'
  );
  return (
    <div className="min-h-screen">
      <SchemaMarkup data={faqSchema} />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container-custom">
          <PageBreadcrumbs
            items={[{ label: 'Главная', href: '/' }, { label: 'Вопросы и ответы' }]}
            currentPath="/faq"
            className="mb-6"
          />
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="heading-lg mb-4">Вопросы и ответы</h1>
            <p className="text-body">
              Ответы на самые популярные вопросы наших клиентов. 
              Не нашли ответ? Свяжитесь с нами!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-12 p-8 bg-secondary rounded-2xl text-center">
            <h3 className="text-xl font-semibold mb-2">Остались вопросы?</h3>
            <p className="text-muted-foreground mb-6">
              Наши специалисты готовы помочь вам с выбором покрытия
            </p>
            <a href="/contacts" className="btn-primary inline-block">
              Связаться с нами
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
