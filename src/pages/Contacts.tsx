import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BASE_URL, organizationData } from '@/data/organization';

const contactsSchema = [
  {
    '@type': 'ContactPage',
    url: `${BASE_URL}/contacts`,
    name: 'Контакты ПолМастер',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: organizationData.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: organizationData.address.addressLocality,
        streetAddress: organizationData.address.streetAddress,
      },
      telephone: organizationData.telephone,
      email: organizationData.email,
      openingHours: organizationData.openingHours,
    },
  },
];

const Contacts = () => {
  usePageMeta(
    'Контакты',
    'Адрес шоурума ПолМастер в Москве, телефон, email, режим работы. Приезжайте или оставьте заявку — бесплатная консультация.'
  );
  return (
    <div className="min-h-screen">
      <SchemaMarkup data={contactsSchema} />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container-custom">
          <PageBreadcrumbs
            items={[{ label: 'Главная', href: '/' }, { label: 'Контакты' }]}
            currentPath="/contacts"
            className="mb-6"
          />
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h1 className="heading-lg mb-4">Контакты</h1>
            <p className="text-body">
              Приезжайте в наш шоурум или свяжитесь с нами любым удобным способом
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Address */}
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                    <p className="text-muted-foreground">
                      г. Москва, ул. Примерная, д. 123<br />
                      ТЦ «ПолМаркет», 2 этаж
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                    <a href="tel:+74951234567" className="text-primary text-xl font-medium hover:underline">
                      +7 (495) 123-45-67
                    </a>
                    <p className="text-muted-foreground text-sm mt-1">
                      Бесплатная консультация
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a href="mailto:info@polmaster.ru" className="text-primary hover:underline">
                      info@polmaster.ru
                    </a>
                    <p className="text-muted-foreground text-sm mt-1">
                      Ответим в течение 2 часов
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Время работы</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Пн-Пт: 9:00 — 20:00</p>
                      <p>Сб: 10:00 — 18:00</p>
                      <p>Вс: выходной</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Мы в социальных сетях</h3>
                <div className="flex gap-4">
                  <a
                    href="https://vk.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.365 1.26 2.179 1.818.616.422 1.084.33 1.084.33l2.178-.03s1.14-.071.6-.974c-.045-.074-.318-.663-1.634-1.875-1.378-1.27-1.193-1.065.466-3.26.633-.839 1.07-1.746 1.07-1.746s.208-.51-.213-.584c-.423-.075-1.096-.03-1.096-.03h-2.31s-.202-.027-.35.063c-.146.087-.24.29-.24.29s-.432 1.152-.993 2.097c-1.21 1.92-1.695 2.023-1.895 1.904-.463-.28-.347-1.12-.347-1.72 0-1.87.283-2.65-.55-2.853-.277-.067-.48-.112-1.19-.119-.91-.008-1.681.003-2.115.217-.29.143-.513.46-.376.478.169.024.55.103.753.38.264.358.255 1.16.255 1.16s.152 2.202-.354 2.473c-.346.186-.823-.194-1.848-1.93-.524-.89-.916-1.877-.916-1.877s-.076-.187-.212-.288c-.164-.122-.394-.16-.394-.16H4.47s-.32.01-.437.148c-.105.125-.008.382-.008.382s2.024 4.742 4.321 7.125c2.107 2.186 4.5 2.04 4.5 2.04h1.083s.327-.036.494-.217z" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/74951234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-lg h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5887!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIxLjAiTiAzN8KwMzcnMDIuMyJF!5e0!3m2!1sru!2sru!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Карта расположения офиса"
                />
              </div>

              {/* Company Info */}
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Реквизиты организации</h3>
                    <div className="text-muted-foreground space-y-1 text-sm">
                      <p><span className="text-foreground">Название:</span> ООО «ПолМастер»</p>
                      <p><span className="text-foreground">ИНН:</span> 7712345678</p>
                      <p><span className="text-foreground">ОГРН:</span> 1234567890123</p>
                      <p><span className="text-foreground">КПП:</span> 771201001</p>
                      <p><span className="text-foreground">Юридический адрес:</span> 123456, г. Москва, ул. Примерная, д. 123, офис 45</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacts;
