import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Advantages from '@/components/Advantages';
import About from '@/components/About';
import Products from '@/components/Products';
import Reviews from '@/components/Reviews';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BASE_URL, organizationData } from '@/data/organization';

const indexSchema = [
  {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: organizationData.name,
    url: organizationData.url,
    logo: organizationData.logo,
    description: organizationData.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: organizationData.address.addressLocality,
      streetAddress: organizationData.address.streetAddress,
    },
    telephone: organizationData.telephone,
    email: organizationData.email,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: organizationData.openingHoursSpecification.dayOfWeek,
      opens: organizationData.openingHoursSpecification.opens,
      closes: organizationData.openingHoursSpecification.closes,
    },
  },
  {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'ПолМастер — напольные покрытия в Москве',
    publisher: { '@id': `${BASE_URL}/#organization` },
  },
];

const Index = () => {
  usePageMeta(
    'Напольные покрытия в Москве | ПолМастер - 15+ лет опыта',
    'Купить ламинат, паркет, виниловый пол от 500₽/м². Бесплатный замер, доставка. 5000+ довольных клиентов, 50+ брендов в наличии'
  );
  return (
    <div className="min-h-screen">
      <SchemaMarkup data={indexSchema} />
      <Header />
      <Hero />
      <Advantages />
      <About />
      <Products />
      <Reviews />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
