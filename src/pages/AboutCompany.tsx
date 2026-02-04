import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Building, Users, Award, TrendingUp } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BASE_URL } from '@/data/organization';

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${BASE_URL}/about`,
  name: 'О компании ПолМастер',
  description:
    'ПолМастер — надёжный поставщик напольных покрытий с 2009 года. 15+ лет на рынке, 5000+ клиентов, собственный шоурум и бригада укладчиков в Москве.',
  mainEntity: { '@id': `${BASE_URL}/#organization` },
};

import ceoImage from '@/assets/team/ceo.jpg';
import salesManagerImage from '@/assets/team/sales-manager.jpg';
import warehouseManagerImage from '@/assets/team/warehouse-manager.jpg';
import designerImage from '@/assets/team/designer.jpg';

const timeline = [
  {
    year: '2009',
    title: 'Основание компании',
    description: 'Открытие первого магазина напольных покрытий в Москве. Начало работы с ведущими европейскими производителями.',
  },
  {
    year: '2012',
    title: 'Расширение ассортимента',
    description: 'Добавление новых категорий: паркетная доска, виниловые покрытия. Открытие собственного склада.',
  },
  {
    year: '2015',
    title: 'Открытие шоурума',
    description: 'Запуск современного шоурума площадью 500 м² с образцами более 300 видов покрытий.',
  },
  {
    year: '2018',
    title: 'Сервис укладки',
    description: 'Создание собственной бригады мастеров по укладке. Введение гарантии на монтажные работы.',
  },
  {
    year: '2021',
    title: 'Онлайн-магазин',
    description: 'Запуск интернет-магазина с доставкой по всей России. Внедрение 3D-визуализации покрытий.',
  },
  {
    year: '2024',
    title: 'Лидер рынка',
    description: 'Более 10 000 довольных клиентов. Партнёрство с 50+ ведущими брендами. Расширение команды.',
  },
];

const team = [
  {
    name: 'Андрей Петров',
    position: 'Генеральный директор',
    description: 'Основатель компании с 20-летним опытом в сфере напольных покрытий',
    image: ceoImage,
  },
  {
    name: 'Елена Соколова',
    position: 'Руководитель отдела продаж',
    description: 'Эксперт по работе с клиентами, помогает подобрать идеальное решение',
    image: salesManagerImage,
  },
  {
    name: 'Сергей Козлов',
    position: 'Начальник склада',
    description: 'Обеспечивает оперативную доставку и контроль качества товаров',
    image: warehouseManagerImage,
  },
  {
    name: 'Анна Михайлова',
    position: 'Дизайнер интерьеров',
    description: 'Помогает визуализировать покрытие в вашем интерьере',
    image: designerImage,
  },
];

const stats = [
  { icon: Building, value: '15', label: 'Лет на рынке' },
  { icon: Users, value: '10 000+', label: 'Довольных клиентов' },
  { icon: Award, value: '50+', label: 'Брендов-партнёров' },
  { icon: TrendingUp, value: '500+', label: 'Видов покрытий' },
];

const AboutCompany = () => {
  usePageMeta(
    'О компании ПолМастер',
    'ПолМастер — надёжный поставщик напольных покрытий с 2009 года. 15+ лет на рынке, 5000+ клиентов, собственный шоурум и бригада укладчиков в Москве.'
  );
  return (
    <div className="min-h-screen">
      <SchemaMarkup data={aboutSchema} />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container-custom">
          <PageBreadcrumbs
            items={[{ label: 'Главная', href: '/' }, { label: 'О компании' }]}
            currentPath="/about"
            className="mb-6"
          />
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building className="w-8 h-8 text-primary" />
            </div>
            <h1 className="heading-lg mb-4">О компании</h1>
            <p className="text-body">
              Узнайте историю компании «ПолМастер» и познакомьтесь с нашей командой профессионалов
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-primary-foreground">
                <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Наша история
            </span>
            <h2 className="heading-lg mt-2">Путь к успеху</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                      <span className="text-primary font-bold text-lg">{item.year}</span>
                      <h3 className="font-semibold text-lg mt-1 mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Наша команда
            </span>
            <h2 className="heading-lg mt-2">Профессионалы своего дела</h2>
            <p className="text-body mt-4 max-w-2xl mx-auto">
              Каждый член нашей команды — эксперт в своей области, 
              готовый помочь вам сделать правильный выбор
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.position}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Готовы преобразить ваш дом?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Наши специалисты помогут подобрать идеальное напольное покрытие 
              для любого помещения и бюджета
            </p>
            <a href="/contacts" className="inline-block bg-background text-foreground px-8 py-3 rounded-full font-medium hover:bg-background/90 transition-colors">
              Связаться с нами
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutCompany;
